# dmaximboi Portfolio

Adewuyi Ayuba Opeyemi. maxiM. Full-Stack Developer. Chemistry Graduate. STEM Educator.

**Live:** dmaximboi.vercel.app

---

## Stack

- **Monorepo:** Turborepo
- **Frontend:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **Animation:** Framer Motion + CSS spring physics
- **Routing:** React Router v6
- **Deployment:** Vercel
- **Messages:** Google Apps Script + Google Sheets
- **Shared packages:** @dmaximboi/ui, @dmaximboi/config-ts, @dmaximboi/config-tailwind

---

## Structure

```
dmaximboi/
  apps/
    web/                    Portfolio frontend
      src/
        components/         Cursor, Ambient, Nav
        pages/              Home, Code, Teach, About, Dashboard, NotFound
        hooks/              useScrollReveal
        styles/             globals.css
      .env.example          Environment variable template
      vercel.json           Vercel SPA routing config
  packages/
    ui/                     Shared tokens, data, utilities
    config-ts/              Shared TypeScript config
    config-tailwind/        Shared Tailwind config
  turbo.json
  package.json
```

---

## Routes

| Route | Page |
|---|---|
| / | Home (hero, what I do, projects, skills, contact) |
| /code | All projects and tech stack |
| /teach | Teaching subjects and booking |
| /about | Biography, values, timeline |
| /dmxb-inbox | Private message dashboard (PIN protected) |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/dmaximboi.git
cd dmaximboi

# Install dependencies
npm install

# Copy env template
cp apps/web/.env.example apps/web/.env.local

# Fill in your values in .env.local

# Start dev server
npm run dev
```

The portfolio runs at http://localhost:3000

---

## Environment Variables

Add these in **Vercel > Project Settings > Environment Variables**

| Variable | Description |
|---|---|
| VITE_SHEETS_URL | Google Apps Script web app URL |
| VITE_SHEET_ID | Google Sheet ID from the sheet URL |
| VITE_SHEETS_API_KEY | Google Sheets API key from Cloud Console |
| VITE_DASHBOARD_PIN | PIN to access /dmxb-inbox |

---

## Google Apps Script Setup

1. Go to sheets.google.com on desktop
2. Create a sheet named **dmaximboi Messages**
3. Add headers in row 1: Timestamp, Name, Email, Subject, Message, Status
4. Click Extensions then Apps Script
5. Paste the script from GOOGLE_SCRIPT.js in this repo
6. Click Deploy > New Deployment > Web App
7. Execute as: Me. Access: Anyone
8. Copy the URL into VITE_SHEETS_URL

---

## Vercel Deployment

1. Push this repo to GitHub
2. Go to vercel.com, import the repo
3. Set Root Directory to apps/web
4. Add all environment variables
5. Deploy

Every push to main auto-deploys.

---

## Dashboard Access

Visit dmaximboi.vercel.app/dmxb-inbox

Enter your VITE_DASHBOARD_PIN. All contact form messages appear here pulled live from your Google Sheet.

---

## Design System

- **Background:** #0a0704 (near black with warm undertone)
- **Amber:** #c8860a / #f0a830 / #ffbc4d
- **Coffee:** #3d1f0a / #5c3015
- **Cream:** #e8d5b0 / #9e8a6a
- **Glass:** backdrop-filter blur 28px, amber-tinted borders
- **Motion:** Framer Motion spring physics, stiffness 200 damping 20
- **Fonts:** Playfair Display (display), Cabinet Grotesk (body), DM Mono (mono)

---

## Author

Adewuyi Ayuba Opeyemi. AO Adewuyi. maxiM. dmaximboi.

dmaximboi@gmail.com
