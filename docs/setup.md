# Setup Guide

## 1. Clone the repository

## 2. Configure environment variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env.local
```

## 3. Install dependencies

```bash
pnpm install
```

## 4. Start database

```bash
supabase start
```

## 5. Run the development server

```bash
pnpm dev
```

Visit `http://localhost:3000` to view the app.
