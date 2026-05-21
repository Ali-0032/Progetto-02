let allProjects = [];
let filteredProjects = [];
let activeTags = new Set();
let activeSort = null;
let apiData;

// Percorsi da provare in ordine per trovare le immagini (aggiornati con la cartella 'immagini')
const IMG_BASES = [
    'https://ixd-supsi.github.io/n70api/immagini/',
    'https://raw.githubusercontent.com/ixd-supsi/n70api/main/immagini/',
    'https://ixd-supsi.github.io/n70api/imgs/',
    'https://ixd-supsi.github.io/n70api/images/'
];

function preload() {
    apiData = loadJSON('https://ixd-supsi.github.io/n70api/data.json');
}

function setup() {
    noCanvas();
    allProjects = Array.isArray(apiData) ? apiData : Object.values(apiData);
    filteredProjects = [...allProjects];
    setupUI();
    renderArchive();
}

function setupUI() {
    // Search principale
    select('#search-input').input((e) => {
        let q = e.target.value.toLowerCase();
        filteredProjects = allProjects.filter(p => {
            let t = (p.titolo || p.title || "").toLowerCase();
            let n = (p.nome || p.studente || p.author || p.autore || "").toLowerCase();
            return t.includes(q) || n.includes(q);
        });
        if (activeSort) sortProjects(activeSort);
        else renderArchive();
    });

    // Apertura modal tags
    select('#btn-tags').mousePressed(() => {
        let modal = select('#modal-tags');
        modal.addClass('open');
        document.getElementById('modal-search-input').value = '';
        renderModalTags('');
    });

    // Chiusura modal
    select('#close-modal').mousePressed(() => {
        select('#modal-tags').removeClass('open');
    });
    select('#modal-tags').mousePressed((e) => {
        if (e.target === document.getElementById('modal-tags')) {
            select('#modal-tags').removeClass('open');
        }
    });

    // Ricerca interna al modal
    document.getElementById('modal-search-input').addEventListener('input', (e) => {
        renderModalTags(e.target.value.toLowerCase());
    });

    // Sort by: apre/chiude dropdown
    select('#btn-sort').mousePressed(() => select('#sort-menu').toggleClass('show'));

    // Opzioni di sort — una alla volta
    selectAll('.sort-option').forEach(el => {
        el.elt.addEventListener('click', () => {
            let criteria = el.attribute('data-sort');
            if (activeSort === criteria) {
                clearSort();
            } else {
                activeSort = criteria;
                sortProjects(criteria);
                updateSortUI();
            }
            select('#sort-menu').removeClass('show');
        });
    });

    // Chiude il dropdown cliccando fuori
    document.addEventListener('click', (e) => {
        let container = document.querySelector('.dropdown-container');
        if (!container.contains(e.target)) {
            select('#sort-menu').removeClass('show');
        }
    });

    renderModalTags('');
}

/* Aggiorna l'aspetto delle voci nel menu sort */
function updateSortUI() {
    selectAll('.sort-option').forEach(el => {
        let criteria = el.attribute('data-sort');
        if (criteria === activeSort) {
            el.addClass('active');
            if (!el.elt.querySelector('.option-x')) {
                let x = document.createElement('span');
                x.className = 'option-x';
                x.textContent = '✕';
                el.elt.appendChild(x);
            }
        } else {
            el.removeClass('active');
            let x = el.elt.querySelector('.option-x');
            if (x) x.remove();
        }
    });
}

/* Rimuove il sort attivo */
function clearSort() {
    activeSort = null;
    if (activeTags.size > 0) {
        let tagsArray = [...activeTags];
        filteredProjects = allProjects.filter(p => p.tags && tagsArray.some(t => p.tags.includes(t)));
    } else {
        filteredProjects = [...allProjects];
    }
    updateSortUI();
    renderArchive();
}

/* Costruisce la lista tag nel modal */
function renderModalTags(query) {
    let uniqueTags = [...new Set(allProjects.flatMap(p => p.tags || []))].sort();
    let filtered = query ? uniqueTags.filter(t => t.toLowerCase().includes(query)) : uniqueTags;

    let activeContainer = document.getElementById('modal-active-tags');
    activeContainer.innerHTML = '';
    activeTags.forEach(tag => {
        let chip = document.createElement('div');
        chip.className = 'tag-active-chip';
        chip.innerHTML = `<span class="tag-label">${tag}</span><span class="chip-x">✕</span>`;
        chip.addEventListener('click', () => {
            activeTags.delete(tag);
            applyFilters();
            renderModalTags(document.getElementById('modal-search-input').value.toLowerCase());
        });
        activeContainer.appendChild(chip);
    });

    let tagsList = document.getElementById('tags-list');
    tagsList.innerHTML = '';
    filtered.forEach(tag => {
        let btn = document.createElement('button');
        btn.className = 'tag-btn' + (activeTags.has(tag) ? ' active' : '');
        btn.innerHTML = `<span class="tag-label">${tag}</span>`;
        btn.addEventListener('click', () => {
            if (activeTags.has(tag)) activeTags.delete(tag);
            else activeTags.add(tag);
            applyFilters();
            renderModalTags(document.getElementById('modal-search-input').value.toLowerCase());
        });
        tagsList.appendChild(btn);
    });
}

/* Formatta la data dall'oggetto { giorno, mese, anno } */
function getDataLabel(p) {
    let d = p.data || p.date;
    if (d && typeof d === 'object') {
        let g = d.giorno || d.day   || "";
        let m = d.mese   || d.month || "";
        let a = d.anno   || d.year  || "";
        return [g, m, a].filter(v => v !== "").join(".");
    }
    return String(d || p.anno || p.year || "----");
}

function renderArchive() {
    let container = select('#archive-grid');
    container.html('');

    filteredProjects.forEach(p => {
        let titolo      = p.titolo      || p.title       || "Progetto senza titolo";
        let autore      = p.autore      || p.nome        || p.studente || p.author || "Autore n.d.";
        let descrizione = p.descrizione || p.description || "";
        let dataStr     = getDataLabel(p);
        let projectUrl  = p.url  || p.link || null;

        // Nome file immagine (prima disponibile)
        let imgFile = "";
        if (Array.isArray(p.immagine) && p.immagine.length > 0) {
            imgFile = p.immagine[0];
        } else if (typeof p.immagine === 'string' && p.immagine) {
            imgFile = p.immagine;
        } else if (p.image) {
            imgFile = p.image;
        }

        // Bottone "view project" — solo se c'è un URL
        let btnHtml = projectUrl
            ? `<a class="btn-view" href="${projectUrl}" target="_blank" rel="noopener">
                 <span>view project</span>
               </a>`
            : '';

        // Immagine con fallback automatico su più percorsi base
        // onerror prova il percorso successivo nell'array IMG_BASES
        let imgHtml = imgFile
            ? `<img class="row-image"
                    src="${IMG_BASES[0]}${imgFile}"
                    data-img-file="${imgFile}"
                    data-img-base-index="0"
                    alt="${titolo}"
                    loading="lazy"
                    onerror="tryNextImgBase(this)">`
            : `<div class="row-image"></div>`;

        // Wrapper riga
        let rowWrapper = document.createElement('div');
        rowWrapper.className = 'table-row-wrapper';
        rowWrapper.innerHTML = `
            <div class="row-left">
                ${imgHtml}
                <div class="row-meta">
                    <div class="row-meta-author">${autore}</div>
                    <div class="row-meta-date">${dataStr}</div>
                </div>
            </div>
            <div class="row-right">
                <div class="row-title">${titolo}</div>
                <div class="row-description">${descrizione}</div>
                ${btnHtml}
            </div>
        `;

        container.elt.appendChild(rowWrapper);
    });
}

function applyFilters() {
    if (activeTags.size === 0) {
        filteredProjects = [...allProjects];
    } else {
        let tagsArray = [...activeTags];
        filteredProjects = allProjects.filter(p => {
            if (!p.tags) return false;
            return tagsArray.some(t => p.tags.includes(t));
        });
    }
    if (activeSort) sortProjects(activeSort);
    else renderArchive();
    updateActiveTagsUI();
}

function updateActiveTagsUI() {
    let container = document.getElementById('active-tags');
    container.innerHTML = '';
    activeTags.forEach(tag => {
        let chip = document.createElement('div');
        chip.className = 'archive-chip';
        chip.innerHTML = `<span class="tag-label">${tag}</span><span class="chip-x">✕</span>`;
        chip.addEventListener('click', () => {
            activeTags.delete(tag);
            applyFilters();
            renderModalTags(document.getElementById('modal-search-input').value.toLowerCase());
        });
        container.appendChild(chip);
    });
}

/* Estrae il valore di ordinamento normalizzato */
function getSortValue(p, criteria) {
    let val = "";
    if (criteria === 'author') {
        val = p.autore || p.nome || p.studente || p.author || p.name || "";
    } else if (criteria === 'title') {
        val = p.titolo || p.title || "";
    } else if (criteria === 'date') {
        let d = p.data || p.date;
        if (d && typeof d === 'object') {
            let a = String(d.anno  || d.year  || "0000").padStart(4, '0');
            let m = String(d.mese  || d.month || "00").padStart(2, '0');
            let g = String(d.giorno|| d.day   || "00").padStart(2, '0');
            val = a + m + g;
        } else {
            val = String(d || p.anno || p.year || "");
        }
    }
    return String(val).trim().toLowerCase();
}

function sortProjects(criteria) {
    filteredProjects.sort((a, b) => {
        let valA = getSortValue(a, criteria);
        let valB = getSortValue(b, criteria);
        return valA.localeCompare(valB, 'it', { sensitivity: 'base' });
    });
    renderArchive();
}

/* Prova il percorso base successivo se l'immagine non si carica */
// Spostata nello scope globale 'window' così l'attributo HTML onerror="tryNextImgBase(this)" può trovarla
window.tryNextImgBase = function(imgEl) {
    let idx = parseInt(imgEl.getAttribute('data-img-base-index') || '0');
    let file = imgEl.getAttribute('data-img-file') || '';
    idx += 1;
    if (idx < IMG_BASES.length) {
        imgEl.setAttribute('data-img-base-index', idx);
        imgEl.src = IMG_BASES[idx] + file;
    } else {
        // Nessun percorso funziona: rimuove onerror ed eventualmente mostra placeholder
        imgEl.onerror = null;
        imgEl.style.background = '#eee';
        imgEl.removeAttribute('src');
    }
}