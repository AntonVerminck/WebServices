# Dossier

> Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak uit dit document.
> Lees <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet> om te weten hoe een Markdown-bestand opgemaakt moet worden.
> Verwijder alle instructies (lijnen die starten met >).

- Student: Anton Verminck
- Studentennummer: xxxxxxxxx
- E-mailadres: <mailto:anton.verminck@student.hogent.be>
- Demo: <DEMO_LINK_HIER>
- GitHub-repository: <GITHUB_REPO_LINK_HIER>
- Front-end Web Development
  - Online versie: <LINK_ONLINE_VERSIE_HIER>
- Web Services:
  - Online versie: <https://webservices-0cc2.onrender.com/>

## Logingegevens

### Lokaal

- Gebruikersnaam/e-mailadres: anton@email.be
- Wachtwoord: 1234678

- Gebruikersnaam/e-mailadres: tom@email.be
- Wachtwoord: 12345678

### Online

- Gebruikersnaam/e-mailadres: anton@email.be
- Wachtwoord: 1234678

- Gebruikersnaam/e-mailadres: tom@email.be
- Wachtwoord: 12345678


## Projectbeschrijving

> Omschrijf hier duidelijk waarover jouw project gaat. Voeg een domeinmodel (of EERD) toe om jouw entiteiten te verduidelijken.

## API calls

> Maak hier een oplijsting van alle API cals in jouw applicatie. Groepeer dit per entiteit. Hieronder een voorbeeld.
> Dit is weinig zinvol indien je enkel Front-end Web Development volgt, verwijder dan deze sectie.
> Indien je als extra Swagger koos, dan voeg je hier een link toe naar jouw online documentatie. Swagger geeft nl. exact (en nog veel meer) wat je hieronder moet schrijven.

### Gebruikers

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

### Reviews

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

### Films

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

### Screenings

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

### Health

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Web Services

#### Datalaag

- [X] voldoende complex en correct (meer dan één tabel (naast de user tabel), tabellen bevatten meerdere kolommen, 2 een-op-veel of veel-op-veel relaties)
- [X] één module beheert de connectie + connectie wordt gesloten bij sluiten server
- [X] heeft migraties - indien van toepassing
- [X] heeft seeds

#### Repositorylaag

- [X] definieert één repository per entiteit - indien van toepassing
- [X] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
- [X] er worden kindrelaties opgevraagd (m.b.v. JOINs) - indien van toepassing

#### Servicelaag met een zekere complexiteit

- [X] bevat alle domeinlogica
- [X] er wordt gerelateerde data uit meerdere tabellen opgevraagd
- [X] bevat geen services voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [X] bevat geen SQL-queries of databank-gerelateerde code

#### REST-laag

- [X] meerdere routes met invoervalidatie
- [X] meerdere entiteiten met alle CRUD-operaties
- [X] degelijke foutboodschappen
- [X] volgt de conventies van een RESTful API
- [X] bevat geen domeinlogica
- [X] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [X] degelijke autorisatie/authenticatie op alle routes

#### Algemeen

- [X] er is een minimum aan logging en configuratie voorzien
- [X] een aantal niet-triviale én werkende integratietesten (min. 1 entiteit in REST-laag >= 90% coverage, naast de user testen)
- [X] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [X] minstens één extra technologie die we niet gezien hebben in de les
- [X] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [X] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [X] de API draait online
- [X] duidelijke en volledige README.md
- [X] er werden voldoende (kleine) commits gemaakt
- [X] volledig en tijdig ingediend dossier

## Projectstructuur

### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

## Extra technologie

### Web Services

De extra technologie is api.doc ivp swagger.

## Gekende bugs

### Web Services

Neen, geen gekende bugs.

## Reflectie

Eerst wou ik sequelize gebruiken, maar kreeg dit niet werkende, voor de herexamens heb ik gekozen om met api doc te werken.
Mogelijke extra's zijn reviews ophalen binnen een bepaalde periode, om recente reviews van verschillende films te tonen.
Het is zeker een vak waar veel tijd in sluipt om naast het volgen van de opzet van de budget app ook zelf volledig te begrijpen wat elke lijn code doet.
