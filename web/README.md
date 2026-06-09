# B3 Stock Viewer

This repository contains the **front-end application** I've developed for the INOA technical challenge.

Built on top of a reusable front-end template refined across multiple projects, the architecture prioritizes scalability, consistency, and developer experience.

This web application focuses on **speed, clarity, and visual consistency**, without becoming heavy or over-engineered.

<br />

## Features

- Historical stock prices visualization
- Multiple ticker selection
- Custom date range filtering
- CSV export
- Partial result handling
- Loading, empty and error states
- Light and dark themes

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
  <code>Lucide Icons</code>
</p>

```bash
src/
├── app/
│   └── router.tsx          # application routing configuration
│
├── pages/
│   └── home/               # main stock viewer page
│
├── components/
│   ├── atoms/              # small, reusable UI pieces (button, callout, form fields)
│   ├── molecules/          # composed components (card, date range picker)
│   ├── organisms/          # larger UI sections (charts, content states, side panel)
│   └── ui/                 # raw shadcn/ui base components
│
├── api/                    # axios client, API requests and response types
├── lib/                    # shared utilities (cn, helpers)
├── hooks/                  # reusable React hooks
├── themes/                 # design tokens and theme definitions
├── assets/                 # static images used by the interface
│
└── App.tsx                 # application entry point (router orchestration)
```

## Usage

Before running the application, make sure to set the `B3_STOCK_VIEWER_API_BASE_URL` variable inside the `.env` file with the API base URL.

```
# Install dependencies and run the project

npm install
npm run dev
```
