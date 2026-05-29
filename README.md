# B3 Stock Viewer API

This repository contains the **back-end application** I've developed for the INOA technical challenge.

Built on top of a reusable back-end template, made in NestJS, I've been studing and using for a while.

It includes conection to the Brapi API to get historical stock prices and local cache for the data.

Focused on clarity and consistency, prioritizing practical product constraints over heavy abstractions or theoretical scalability.

<br />

## Project structure

<p align="start"> 
  Stack: &nbsp;
  <code>NestJS</code> · 
  <code>TypeScript</code> · 
</p>

```bash
src/
│
├── integrations/
│   └── brapi/ # brapi api connection?
│
├── modules/
│   ├── someModule/ # someModule feature module
│   │   ├── someModule.controller.ts
│   │   ├── someModule.service.ts
│   │   ├── someModule.props.ts
│   │   └── dto/
│   │       └── create-someModule.dto.ts
│   │
│   └── health/ # health check module
│
├── app.module.ts # root application module
│
└── main.ts # application entry point
```
