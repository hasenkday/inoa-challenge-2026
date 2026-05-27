# B3 Stock Viewer

This repository contains the **front-end application** I've developed for the INOA technical challenge.

Built on top of a reusable front-end template refined across multiple projects, the architecture prioritizes scalability, consistency, and developer experience.

This web application focuses on **speed, clarity, and visual consistency**, without becoming heavy or over-engineered.

<br />

## Project structure

<p align="start"> 
  Stack: &nbsp;
  <code>Vite</code> ·
  <code>React</code> ·
  <code>TypeScript</code> ·
  <code>Tailwind CSS v4</code> ·
  <code>CSS Modules</code> ·
  <code>@theme tokens</code> ·
  <code>shadcn/ui</code> ·
  TODO: add chart lib
</p>

```bash
src/
├── app/
│   └── router.tsx          # application routing configuration
│
├── pages/
│   ├── home/
│   │   └── index.ts        # home page
│   │
│   └── not-found/
│       └── index.ts        # not found page
│
├── layouts/
│   └── main-layout.tsx     # shared layout structure (header, footer, outlet)
│
├── components/
│   ├── atoms/              # small, reusable UI pieces (Button, Badge, Text)
│   ├── molecules/          # composed components (Card, InputField, Modal)
│   ├── organisms/          # larger UI sections (Header, Footer, ProjectList)
│   └── ui/                 # raw shadcn/ui components (Dialog, Dropdown, Tooltip)
│
├── api/                    # API access layer (REST, GraphQL, mocks)
├── hooks/                  # reusable React hooks (data fetching, logic)
│
├── themes/                 # design tokens and theme definitions
├── lib/                    # shared utilities (cn, helpers)
└── App.tsx                 # application entry point (router orchestration)
```

## Usage

Before running the application, make sure to set the `B3_STOCK_VIEWER_API_BASE_URL` variable inside the `.env` file with the API base URL.

```
# Install dependencies and run the project

npm install
npm run dev
```
