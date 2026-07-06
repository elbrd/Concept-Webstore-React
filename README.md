# Concept-Webstore

En konceptuell e-handelsapplikation utvecklad med React, Vite och Node.js. Projektet började som en implementation i Vanilla JavaScript och byggdes senare om från grunden i React, med fokus på komponentbaserad utveckling, tydligare ansvarsfördelning och en mer skalbar arkitektur.

Applikationen är uppdelad i en fristående klient och server där frontend hanterar användargränssnitt och routing, medan backend exponerar API:er för datahantering och autentisering. Projektet har främst fungerat som en plattform för att utforska modern frontend- och backendutveckling samt hur de olika delarna samverkar i en fullstackapplikation.

## Teknik

### Frontend

- React
- Vite
- CSS Modules
- React Router

### Backend

- Node.js
- Express
- Mongoose
- JSON Web Token (JWT)

## Projektstruktur

```text
client/
└── src/
    ├── components/
    ├── hooks/
    ├── pages/
    ├── scripts/
    ├── stores/
    └── styles/

server/
├── middlewares/
├── models/
├── routes/
├── scripts/
└── services/
```

## Arkitektur

- Komponentbaserad frontend med React
- Separation mellan klient och server
- Modulär backend med Express
- Centraliserad routing och API-struktur
- Återanvändbara komponenter, hooks och services
- CSS Modules för lokalt kapslade stilar
