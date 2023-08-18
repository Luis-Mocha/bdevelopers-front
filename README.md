# My Developer - Front

Il progetto ***MyDeveloper*** simula una web app che permette l'interazione tra un **utente interessato** (**UI**) e uno **sviluppatore registrato** (**SR**):
- l'utente interessato ha la possibilità di cercare e contattare uno sviluppatore professionista, al fine di richiedere una consultazione o un servizio professionale. 
- lo sviluppatore registrato può creare un profilo individuale, personalizzandolo tramite la condivisione delle proprie capacità professionali e delle informazioni personali che ritiene più adatte.

Nello specico il progetto si divide nella sezione dedicata all'**UI**, il cui sviluppo è contenuto in questa repository, e nella sezione di "back-office" dedicata allo **SR**, il cui sviluppo è contenuto nella repository [MyDeveloper-back](https://github.com/Luis-Mocha/bdevelopers-back).

---

Il sito è sviluppato tramite il framework javascript **[Vue.js](https://vuejs.org/)** e l'implementazione di **[Vue Router](https://router.vuejs.org/)**.

L'**UI** può cercare la sviluppatore che preferisce, avendo anche la possibilità di applicare filtri come "*campo di sviluppo*", "*voto medio*" o "*numero di recensioni*".
Al fine di non avere un *refresh* dell pagina quando si effettua una ricerca con nuovi filtri si effetttuano delle chiamate Ajax utilizzando **Axios**.
Una volta aperta la pagina dello sviluppatore di interesse l'utente ha la possibilità di inviare un messaggio privato e/o publicare una recensione pubblica.

Ogni pagina è resa ***responsive*** in modo da adattarsi agli schermi di diversi dispositivi. Questo è risultato è ottenuto tramite l'utilizzo di classi responsive **Bootstrap** e di **Media Query** personalizzate.

#### - Home Page

Presenta una *hero section* dinamica e sezioni che evidenziano i vantaggi e l'utilizzo della piattaforma.
Mostra in primo piano gli sviluppatori in evidenza e ne permette un accesso veloce alle pagine dettaglio. Inoltre offre la possibilità di ricercare uno sviluppatore in base al campo di sviluppo *(l'utente viene reidirizzato alla pagina ricerca sviluppatori)*.
*(Il backoffice permette allo sviluppatore registrato di mettere **in evidenza** il proprio profilo tramite un sistema di pagamento)*

#### - Pagina ricerca sviluppatori

Permette di visualizzare tutti gli sviluppatori iscritti al sito e di effettuare una ricerca avanzata senza il refresh della pagina, applicando dei filtri. Ogni cambiamento di input va a modificare i campi utili alla ricerca nell’url (ad esempio: /developers?fields=web). Dopo ogni cambiamento viene fatta una chiamata ajax con i parametri presenti nella URL.
I risultati vengono ordinati in base alla media dei voti ricevuti e del numero di recensione. Gli sviluppatori che hanno effettuato l'acquisto di un *piano premium* risultato comunque tra i primi risultati.
Ogni risultato permette l’accesso alla pagina di dettaglio dello sviluppatore.

#### - Pagina Sviluppatore

Permette di vedere il cv dello sviluppatore e le informazioni riguardanti, come indirizzo, email, tecnologie conosciute. 
È possibile inviare un messaggio allo sviluppatore per chiederne la disponibilità e scrivere
una recensione con voto e descrizione. Inoltre è possibile visualizzare le recensioni inserite da altri utenti e il conseguente voto medio.