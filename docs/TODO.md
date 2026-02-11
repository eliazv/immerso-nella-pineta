- docs\todo2.md
- backoffice: Periodi da migliorare escludi mesi inverno . lista prenotazioni se clicco tutte deve partire dalle piu lointane e andrae alle piu passate, inverti oridnamento
- reintroduci src\components\BookingForm.tsx in book page e migliroalo , agigungi anche prezzo per notte che posso customizzare io da qualche parte (magari se sito è relamente visitato)
- carosello deve scorrere in automatico (dopo un po si ferma) e le frecice devono essere visibili, a volte escono dallo schermo
- - dropdown header deve mostrare nome completo non solo Pineta 3 ad esempio M Immerso nella Pineta 3, idem per pineta 8
- in /chi-siamo c'è sezione Cosa Dicono i Nostri Ospiti . con le recensioni, magari implemetale in src\pages\Index.tsx come carosello (usa una libreria cariselli gia fatta) dove scorrono in automatico all'infinito mettilo in una buona zona della home src\pages\Index.tsx che anche sotto src\pages\AccommodationSelector.tsx .
- Google Business Profile ce l'ho ma non ha recensioni perhce la gente me lae lascia su airbnb non li.
- https://media-cdn.tripadvisor.com/media/photo-s/01/8b/6c/ec/hotel-buratti.jpg immagine canale di notte di cervia, questa usala per iun blog magari inerente
- per questo istema di Prenotazione Calendario Integrato in teoria c'era gia un componete che lo faceva nel repo, riesci a trovarlo?
- anche se integrassi prezzi reali se nessuno si fila il sito sarebbe lavoro inutyile, magari questi prezzi reali posso in qulche moso integrarli con i sistemi di google o altri motori di ricerca non ota?

- per articolo mercato serale usa questa immagine: https://www.viviromagna.it/archivio/eventi/7415/aghi-di-pino.jpg . anche epr altri articoli sarebbe utile prendessi immaigni relai di pinarella o almneo non ripetessi le immaigni
- tutti i blog e aricoli devono avere sspazio sopra per non andare sotto a header e tasto tornal blog
- dropdown header deve mostrare nome completo non solo Pineta 3 ad esempio M Immerso nella Pineta 3, idem per pineta 8

- come icoan scheda del browser usa public\images\logo.nobg.ico
- rimuovi immagini che non servono superflue da public\images e rioganizzale
- in /attractions se ci sono articoli di blog che parlando di eventi al click sulla card eventi deve portare a qull'articolo
- in src\pages\Index.tsx migliuroa sezione Comfort, privacy e natura e la mia posizione, nle card sono torppoo grandi , cercha il milglior dessign e unisci tuto insieme senza allungare troppo la pagina
- in sezione Attrazioni e consigli utili se clicco su card risoranti locali o venti e ativita porta ad attrazioni pagina
- inotlre verifica che le info piu importanti di docs\airbnb-data.md siano presenti nella pagina magari in punti non molto centrali come nella sezione Informazioni utili o Faq

- prendi info airbnb e mettile dentro alloggio
- rianalizza tutto il sito, al momento è un po incasinato perche ci sono duplicazioni per ogni alloggio, vorrei che rendessi il sito di base unico e poi cliccando su un alloggio lo approfondisci vorrei che al momento togliessi dropdown in alto a sisnitra tutti i blog devono avere header e footer. quindi home in header porta sempre a src\pages\AccommodationSelector.tsx che è la home , anche click nel logo a sinsitra che deve essere il testo Immerso nella pineta. prenota ora
- hero togli 5 minutoi dal mare nella pineta e 4 posti card e magari metile di ficno con altre info piu condensate...
- togli cin dal footer

roceda a isolare ulteriormente AlloggiatiWeb (import dinamico delle funzionalità pesanti),
aggiunga JSON-LD per le pagine prerenderate, o
prepari i comandi e i file da caricare sul server per il deploy statico?

- se cambio pagina deve sempre partire dall'alto la pagina, non che se ho scrollato in fondo e cambio pagina quella nuova parte da quell'altezza
- rimuovi icone src\components\BreadcrumbSEO.tsx:89:6 da parte alta della pagina
- inoltre quale sarebbe il link eprfetto di questo sito? il dominio deve essere .eliazavatta.it, cosa consigli? immerso.eliazavatta.it che sarebbe il nome del brand delle case o pinarella.eliazavatta.it che sarebbe piu uniforme al luogo ma meno personale?
- animazione di apertura e chiusura del dropdown di selezione dell'allogio e sfondo fallo leggermente traspaarente come header, metti icona alloggio di foianco a pineta 3 e 8
- il bottone fluttuante scrivici deve avere icona whatsapp ed essere presente in tutte le apgine dell'app

- in pagina vlog ci devono essere tutte lae card di tutti gli articoli, righe da 3 card suu desktop, adattabeili in base larghezza schemro

- /attractions ha senso dividerla in tab? o si puo migliraore la disposizione e la navigazione di questa pagina? anche per seo
- link social nel footer toglili
- hero in modalita mobile metti un po di spazio prima ch einizi ill tiutolo senno finisce sotto l'header
- hero desktop: Pinarella di Cervia , 4,5 stelle su Airbnb metitli uno sopra l'altro a destra di finco a gallaria foto ma orinetati a destra com'erano rpima. mentee per mobile va bene dove li hai messi ora
- nel blog agigungi contenuti e ariticoli che aiutino a fare seo e portare traffico al sito , incentrati su cervia e pinarella e dintorni

- cin appartemtno pineta 8 è IT039007C2UTCCNWG5 mentre CIN pinetqa 3 è : IT039007C2RWYMLE52
- src\pages\Index.tsx migliroa visualizzazione mobile della sezione hero, inoltre i due badge Pinarella di Cervia 4,5 stelle su Airbnb devi metterli in fono non in coma alla sezione e si devono acnhe essi adattare alla visualizzazione mobile. card Info Cards - Più belle e moderne falle meno grandi
- analizza e migliroa tutte le altre sezioni di src\pages\Index.tsx organizzando meglio le info e rendendole piuu chiare e belle di design
- migliroa design e funzionalita della pagina attractions e della pagina dell'alloggio
- pagina chi siamo proprietari dal anno 1970 , mio nonno ha contruito questa palazzetta e la gestimo sempre noi gli affitti da quando è stata costruita. per le recensioni della pagina usa le migliroi tra queste , magari tagliandole o riadattandole

- http://localhost:8080/pineta3/attractions e http://localhost:8080/pineta8/attractions sono uguali, non è meglio far eun unico perocrso unificato?
- header se clicco home porta a / a volte al psoto che a http://localhost:8080/pineta3/ o pineta 8 in base a dove sono, risolvi
- home , card alloggio metti prezzo a destrera del titolo, tolgi un po di info non necessarie e riorganizzale e le card falle piu piccole e meno lunghe
- http://localhost:8080/chi-siamo

- viene gestito bene il sito per il fatto che ci sono piu alloggi?
- header se siamo nella aprte piu alta della pagina http://localhost:8080/pineta8 o http://localhost:8080/pineta3 dove non ha ancora lo sfondo voglio che ci siano colori piu chairi nelle scritte, NELLE ALTRE PAGINE NO
- header se clicco home deve portare a http://localhost:8080/pineta8 o http://localhost:8080/pineta3 non a http://localhost:8080/ . mentre click sul logo a sisntira deve portare a http://localhost:8080/
- migliroa hero section , rendila piu bella info piu organizzate e meno info qui ma piu belal hero section . titoli falli piu nromali e visibili

- src\pages\AccommodationSelector.tsx falla piu bella questa pagina come desing e piu , card degli alloggi piu compatte con info piu organizzatte, sfondo miglire e info piu organizzate. aggiungi anche qui footer e header direi. card alloggio metti prezzo a destrera del titolo, tolgi un po di info non necessarie e riorganizzale e le card falle piu piccole e meno lunghe
- header se sono nella parte piu alta di pagina http://localhost:8080/pineta8 o 3 dove non ha sfodno , deve avere colori dei testi molto chiari ,s correndo o nelle altre pagine stessi colri. se clicco al taasto home non deve MAI portare a AccommodationSelector ma sempre a http://localhost:8080/pineta8 o 3 . se clicco loa a sisnitra porta a AccommodationSelector
- migliroa design del footer e orgnaizza meglio le informaizoni
- http://localhost:8080/pineta3/attractions e http://localhost:8080/pineta8/attractions sono uguali, non è meglio far eun unico perocrso unificato?
- viene gestito bene il sito per il fatto che ci sono piu alloggi? si puo miglriaore qualcosa?

# altro vecchio

- vorrei separare il backoffice dal sito immerso, clona questa parte in un'altra cartella (questa "C:\Users\zavat\Desktop\Progetti\rentpilot-yo") fuori dal progetto immerso, portando tutto quello che serve per riprodurre il rpogetto . togli controllo con pin e implementa un accesso con google. il progetto attuale lascialo cosi

- l'app si deve chiamre rentpilot, passa l'icona
- per chiudere le modali ci sono 2 x, lasciane solo una
- landing page per illustrare funzionalità dell'app per venderla
- scrivi un documento per illustrare che piani di pagaento faresti per questo picoclo strumento, come monetizzeresti. valuta molte alternative e trova la piu giusta per questa app. nel documento scrivi anche la descrizione dell'app
- piano di come sponsorizzare questa app gratuitamente

---

- attualmente il sito è di di presentazione di un alloggio, vorrei aggiungere un altro alloggio usando lo stesso sito ma solo cambiando i contenuti. in piu vorrei che la home fosse una pagina dove puoi scegliere se visualizzare uno o l'altro alloggio. l'allogigo attuale si chiamerà immerso nella pineta 3 mentre il nuovo immerso nella pinete 8. predisponi quindi il sito a supportare 2 alloggi uguali che hanno pero dati e foto diversi. non duplicare i file ma fai in modo che in base all'url che sto visitando cambi i contenuti della pagine (ignora backoffice, quello lascialo cosi com'è). che ti sembra questo approccio? potremmo fare di meglio? consigli di duplicare il codice o usare questo approccio? consigliami senza fare modifiche al momento
- adatta queste stringhe anche al nuovo allogigo: 4 posti letto, identificato dal numero 3, Massimo 4 ospiti. il cin dell'appartmento 8 è IT039007C2UTCCNWG5. in galleria foto del numero 8 ci sono ancora foto del numero 3 adatta poi al momento per appartmaento 8 togli card Accessibilità
- migliora seo
- pagina prenota togli modulo e lascia solo miei contatti email e cellulare
- cambia questa faq seconda di queale appartmaento stiamo visualizzanado: {
  question: "Quante persone può ospitare l'appartamento?",
  answer:
  "L'appartamento può ospitare fino a 4 persone con 1 letto matrimoniale e 2 letti singoli. È perfetto per famiglie o gruppi di amici che visitano Pinarella di Cervia.",
  },
- scrivi anche in entrambi gli appartmanti che accettano animali domestici , mettilo nel punto piu appropriato
- scrivi che hanno 4,5 stelle su airbnb
- vedo nell'header Home > Appartamento Pineta 8 di src\pages\Index.tsx:83:6 toglilo
- vdo in console erore: main.js:313 GET https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true net::ERR_BLOCKED_BY_CLIENT come mai?
