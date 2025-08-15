# Web Services Budget

This is the backend used in lessons Web Services.

## Requirements

- NodeJS v17 or higher
- Yarn
- MySQL v8
- MySQL Workbench

## Before starting/testing this project

Maak een `.env` (development) en `.env.test` (testing) volgens een eigen lokale databank.

```bash
NODE_ENV=development
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
AUTH_JWT_SECRET=<YOUR-JWT-SECRET>
```

## Start this project

### Development

- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Make sure a `.env` exists (see above)
- Run the migrations: `yarn migrate:dev`
- Start the development server: `yarn start:dev`



### Testing
Zorg dat de variables zoals NODE_ENV correct zijn ingesteld in .env.test voor testing.

- Enable Corepack: `corepack enable`
- Install dependencies: `yarn`
- Make sure a `.env.test` exists (see above)
- Run the migrations: `yarn migrate:test`
- Build the project: `yarn test`
- Start the production server: `yarn test:coverage`


### Production, commando's idem als mijn opzet bij render:
Zorg opnieuw dat de env settings correct staan met de nodige aan passing aan NODE_ENV=production
- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Op render geef de variablen mee en zet NODE_ENV als production, lokaal maak gebruik van .env of maak aanpassingen in config/production
- Run the migrations: `yarn prisma migrate deploy`
- Build the project: `yarn build`
- Start the production server: `node build/src/index.js`

