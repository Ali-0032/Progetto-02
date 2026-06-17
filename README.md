SUPSI 2026  
Corso d’interaction design, CV429.01  
Docenti: A. Gysin, G. Profeta  

Progetto 2: Un piccolo passo per l'uomo, un grande balzo per l'umanità.

# NASA 70 Archive
Autore: Alissa Bionda \
[NASA 70 Archive](https://github.com/ixd-supsi/2026/tree/main/esempi/es06_array_7)


## Introduzione e tema
NASA 70 Archive è un sito web archivio progettato per raccogliere centinaia di progetti web realizzati utilizzando i dati raccolti dalla NASA, in occasione delle celebrazioni per il suo settantesimo anniversario.


## Riferimenti progettuali
I principali riferimenti progettuali per lo sviluppo del sito sono stati l'archivio digitale Europeana e una proposta visiva individuata su Pinterest. Nello specifico, Europeana è stato utilizzato come modello per l'organizzazione dell'archivio, in particolare per l'impostazione delle card e per il sistema di tag. Dal punto di vista estetico e visivo, invece, il progetto si è ispirato all'interfaccia web di un museo.

<table>
  <tr>
    <td style="border: 2px solid #000000; padding: 10px; display: inline-block;">
      <img width="1728" height="995" alt="Screenshot 2026-06-17 alle 10 10 09" src="https://github.com/user-attachments/assets/76a40ecd-b602-4214-bc7a-e83112fce8db" style="display: block;" />
    </td>
  </tr>
</table>

<br />


<img width="736" height="1203" alt=" -2" src="https://github.com/user-attachments/assets/84f805a2-f6e1-4c67-a3d5-915daec8d9be" />
<br />

## Design dell’interfaccia e modalità di interazione
### Design dell'interfaccia:
L’estetica dell'interfaccia si ispira al brutalismo digitale, in particolare per quanto riguarda l’uso di titolazioni molto grandi e la struttura a griglia adottata per le card. Questa scelta stilistica è stata fatta con lo scopo di trasmettere il senso di tecnicità e rigore scientifico che caratterizzano i dati della NASA. Inoltre, le dimensioni imponenti dei titoli sono state pensate per richiamare visivamente il concetto di immensità legato all'universo e ai corpi celesti studiati dall'agenzia.
Infine, il carattere tipografico usato per il sito web è l’Helvetica, utilizzato nelle versioni Bold e Regular in quanto font istituzionale della NASA.

### Modalità di interazione:
L’esperienza utente inizia dalla home page, che presenta una breve descrizione volta a contestualizzare i contenuti e le finalità dell'archivio.
<table>
  <tr>
    <td style="border: 2px solid #000000; padding: 10px;">
      <img width="1711" height="2821" alt="NASA 70 - Home" src="https://github.com/user-attachments/assets/719939c3-78ca-4de8-ae7c-4f9a44becb15" />
    </td>
  </tr>
</table>

<br />

Nella stessa pagina è presente la sezione Playlists of the Day, in cui vengono proposte quotidianamente tre raccolte basate su tematiche differenti. Ciascuna playlist include 9 progetti dell'archivio legati al tema del giorno, con lo scopo di guidare nella navigazione l'utente indeciso attraverso una selezione mirata di contenuti.
<table>
  <tr>
    <td style="border: 2px solid #000000; padding: 10px; display: inline-block;">
      <img width="3422" height="4996" alt="NASA 70 - Playlist" src="https://github.com/user-attachments/assets/7e33ed68-785a-4494-826a-8c3ee9da62d2" style="display: block;" />
    </td>
  </tr>
</table>

<br />

L'accesso all'archivio completo è fruibile tramite il menu di navigazione, il footer o l'apposito pulsante posizionato sotto il testo descrittivo della home. All'interno dell'archivio, un'interfaccia dedicata permette di gestire i tag e l'ordinamento dei progetti in base a titolo, autore e data, integrando inoltre una barra di ricerca interna che opera sui medesimi criteri. Infine, le card dei progetti mostrano la relativa descrizione testuale tramite un effetto mouse-over; questa scelta progettuale è stata adottata per mantenere l'interfaccia pulita, evitando di sovraccaricare visivamente le schede con troppe informazioni simultanee. In aggiunta, l'esplorazione dei contenuti nell'archivio è organizzata tramite una paginazione posta in fondo alla schermata, dove ogni pagina ospita un massimo di 30 progetti.
<table>
  <tr>
    <td style="border: 2px solid #000000; padding: 10px; display: inline-block;">
      <img width="3422" height="5116" alt="NASA 70 - Archive" src="https://github.com/user-attachments/assets/4c19d881-0c59-4335-a99b-807f346c30b5" style="display: block;" />
    </td>
  </tr>
</table>

<br />
<table>
  <tr>
    <td style="border: 2px solid #000000; padding: 10px; display: inline-block;">
      <img width="1728" height="995" alt="Screenshot 2026-06-17 alle 11 52 17" src="https://github.com/user-attachments/assets/bbac30ed-e945-4ffe-a87f-fc870c3e9658" style="display: block;" />
    </td>
  </tr>
</table>

<br />


## Tecnologia usata
Nunc consequat interdum varius sit amet mattis vulputate. Vehicula ipsum a arcu cursus vitae congue. Odio ut sem nulla pharetra. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Quisque egestas diam in arcu cursus. Eget nulla facilisi etiam dignissim diam. Aenean sed adipiscing diam donec adipiscing tristique. Porttitor massa id neque aliquam. Sem viverra aliquet eget sit amet tellus cras. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Lacus sed turpis tincidunt id aliquet risus feugiat.


```JavaScript
const image = new Image();
image.onload = () => {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(
		gl.TEXTURE_2D,
		level,
		internalFormat,
		srcFormat,
		srcType,
		image
	);
	if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
		gl.generateMipmap(gl.TEXTURE_2D);
	} else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
};
image.src = url;
```

## Target e contesto d’uso
Sed enim ut sem viverra aliquet eget sit. Iaculis at erat pellentesque adipiscing commodo. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Ipsum faucibus vitae aliquet nec ullamcorper sit. Tempus quam pellentesque nec nam aliquam sem et tortor. Turpis egestas sed tempus urna et pharetra pharetra massa. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel.

[<img src="doc/munari.jpg" width="300" alt="Supplemento al dizionario italiano">]()
