# B3 Stock Viewer API

This repository contains the **back-end application** I've developed for the INOA technical challenge.

Built on top of a reusable back-end template, made in NestJS, I've been studing and using for a while. It includes conection to the brapi API to get historical stock prices and local cache for the data.

Focused on clarity and consistency, prioritizing practical product constraints over heavy abstractions or theoretical scalability.

<br />

## Project structure

<p align="start"> 
  Stack: &nbsp;
  <code>NestJS</code> · 
  <code>TypeScript</code> · 
  <code>brapi API</code> · 
  <code>SQLite</code>
</p>

```bash
src/
│
├── common/ # response patterns, constants.
│
├── integrations/
│   ├── brapi/ # brapi api integration.
│   └── sqlite/ # sqlite database integration.
│
├── modules/
│   ├── stocks/ # stocks feature module.
│   │   ├── stocks.module.ts
│   │   ├── stocks.controller.ts
│   │   ├── stocks.service.ts
│   │   ├── stocks.types.ts
│   │   │
│   │   ├── dto/ # defines and validates parameters to query.
│   │   ├── mappers/ # manage historical stock prices cache.
│   │   └── cache/ # manage historical stock prices cache.
│   │
│   └── health/ # health check module.
│
├── storage/ # generated automatically at runtime and contains
│            # the SQLite cache database for historical stock prices.
│
├── app.module.ts # root application module.
│
└── main.ts # application entry point.
```

## Usage

Before running the application, make sure to set the `BRAPI_TOKEN` variable inside the `.env` to ensure brapi's api response.

```
# Install dependencies and run the project

npm install
npm run start:dev
```
