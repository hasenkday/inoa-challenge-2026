# B3 Stock Viewer

Project developed for the INOA technical challenge.

## Structure

- api/  -> NestJS + SQLite
- web/  -> React + TypeScript

## Setup

Please see the README file inside each application folder for more details.

```
# API
# Make sure to set the BRAPI_TOKEN variable in your .env file
# to enable requests to the Brapi API.

cd api/
npm install
npm run start:dev
```

```
# WEB
# Set the B3_STOCK_VIEWER_API_BASE_URL variable in your .env file
# to point to the API URL.

cd web/
npm install
npm run dev
```

