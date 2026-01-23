# My Portfolio API

This repository contains the **backend source** of my **personal portfolio**, built with NestJS and integrated with Notion. It reflects the structure and workflow I use to design and build API-driven products that support my portfolio frontend.

Focused on clarity and consistency, prioritizing practical product constraints over heavy abstractions or theoretical scalability. It is lightweight, clear, integrates with **Notion**, and is already configured to **deploy on Vercel**.

<br />

## Project structure

<p align="start"> 
  Stack: &nbsp;
  <code>NestJS</code> · 
  <code>TypeScript</code> · 
  <code>Notion SDK</code> · 
  <code>Jest</code>
</p>

```bash
src/
│
├── integrations/
│   └── notion/ # Notion client wrapper
│   └── supabase/ # Database management with Postgres (not added yet)
│
├── modules/
│   ├── contact/ # contact feature module
│   │   ├── contact.controller.ts
│   │   ├── contact.service.ts
│   │   ├── contact.props.ts
│   │   └── dto/
│   │       └── create-contact.dto.ts
│   │
│   ├── cases/ # cases feature module
│   │   ├── cases.controller.ts
│   │   ├── cases.service.ts
│   │   └── cases.props.ts
│   │
│   └── health/ # health check module
│
├── app.module.ts # root application module
│
└── main.ts # application entry point
```
