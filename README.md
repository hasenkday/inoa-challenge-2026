# Notion to Nest API Template

This is a personal backend template I use to start projects quickly — for studies, experiments, small products, and portfolio pieces.

It is lightweight, clear, integrates with **Notion**, and is already configured to **deploy on Vercel**.

## Stack

<p align="center"> 
  <code>NestJS</code> · 
  <code>TypeScript</code> · 
  <code>Notion SDK</code> · 
  <code>Jest</code>
</p>

## Project structure

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
│   │   ├── contact.props.ts # Notion property mapping
│   │   └── dto/
│   │       └── create-contact.dto.ts
│   └── health/ # health check module
│
├── app.module.ts # root application module
│
└── main.ts # application entry point
```

## Usage

```
# Install dependencies and run the project

npm install
npm run start:dev
```

### Running tests

```
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:cov
```

### Notion setup

To use this template you need a Notion database for contacts.

#### 1. Create a new database in Notion with the following columns:

- Name (Title)
- Channel (Select)
- Contact (Rich text)
- Message (Rich text)
- Date Sent (Date)
- Status (Status)

#### 2. Create a Notion integration:

- Go to Notion integrations (notion.so).
- Create a new internal integration.
- Copy the integration token.

#### 3. Connect the integration to your database:

- Open the database page.
- Click Share → Add connections.
- Add your integration with edit permissions.

#### 4. Add your integration token and database ID to .env:

```env
  NOTION_TOKEN=your-secret-token
  NOTION_CONTACTS_DB_ID=your-database-id
```

#### Example request

```
# POST /api/contact
# Content-Type: application/json

{
  "name": "Test User",
  "channel": "E-mail",
  "contact": "test@example.com",
  "message": "Hello from API!"
}
```

#### Example response

```json
{
  "success": true,
  "message": "Contact saved successfully",
  "data": {
    "name": "Test User",
    "dateSent": "2026-01-23T12:53:00.000Z"
  }
}
```

---

<br />
<p align="center">
  This repository is shared for reference and personal use.
</p>
