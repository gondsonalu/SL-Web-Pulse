# SLWebPulse 🚀

**Premium Web Development Agency Website** — Full-stack with React, Node.js, and Supabase.

[![Deploy Frontend](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Deploy Backend](https://img.shields.io/badge/Deploy-Render-blue)](https://render.com)
[![Database](https://img.shields.io/badge/DB-Supabase-green)](https://supabase.com)

---

## 📁 Project Structure

```
slwebpulse/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Hero, Services, Projects, About, Testimonials, FAQ, Contact
│   │   │   ├── ui/          # WhatsApp button, Loading screen
│   │   │   └── admin/       # ProtectedRoute
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── admin/       # Login, Layout, Dashboard, Projects, Services, About, Messages
│   │   ├── context/         # AuthContext
│   │   └── utils/           # api.js (Axios), supabase.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── config/supabase.js
│   ├── controllers/         # projectsController.js, mainControllers.js
│   ├── middleware/          # auth.js, errorHandler.js
│   ├── routes/index.js
│   ├── index.js             # Entry point
│   └── package.json
│
├── database/
│   ├── schema.sql           # All tables + RLS policies + seed data
│   └── storage.sql          # Supabase Storage buckets
│
├── vercel.json              # Vercel deployment config
├── render.yaml              # Render deployment config
└── package.json             # Root (concurrently dev)
```

---

## ⚡ Quick Start

### 1. Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free)
- Git

### 2. Clone & Install

```bash
git clone https://github.com/yourusername/slwebpulse.git
cd slwebpulse
npm run install:all
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `database/schema.sql`
3. Then run `database/storage.sql`
4. Get your credentials from **Settings → API**:
   - `Project URL`
   - `anon/public` key → for client
   - `service_role` key → for server (**keep secret!**)

### 4. Configure Environment Variables

**Server** — copy `server/.env.example` → `server/.env`:
```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
JWT_SECRET=your-random-secret-min-32-chars
ADMIN_EMAIL=admin@slwebpulse.com
ADMIN_PASSWORD=YourStrongPassword123!
CLIENT_URL=http://localhost:3000
```

**Client** — copy `client/.env.example` → `client/.env`:
```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 5. Run Development Servers

```bash
# From root — starts both client (port 3000) and server (port 5000)
npm run dev

# Or individually:
npm run dev:client   # React on http://localhost:3000
npm run dev:server   # Express on http://localhost:5000
```

Open **http://localhost:3000** for the website.  
Admin panel: **http://localhost:3000/admin**

---

## 🔐 Admin Panel

**URL:** `/admin`  
Login with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` set in your `.env`.

| Feature | Description |
|---|---|
| Dashboard | Stats overview, quick actions, recent messages |
| Projects | Add / Edit / Delete projects + image upload |
| Services | Edit all 6 service cards |
| About | Edit company info, CEO photo, tech stack |
| Messages | View all contact form submissions, reply via email / WhatsApp |

---

## 🗄️ Database Tables

| Table | Description |
|---|---|
| `projects` | Portfolio projects with tech stack, URLs, images |
| `services` | Service cards with icons, colors, features |
| `about` | Single-row company info config |
| `contact_messages` | Enquiries from the contact form |

All tables have **Row Level Security (RLS)** enabled.

---

## 🌐 API Endpoints

```
GET    /api/projects          Public — list all projects
GET    /api/projects/:id      Public — single project
POST   /api/projects          Protected — create project
PUT    /api/projects/:id      Protected — update project
DELETE /api/projects/:id      Protected — delete project

GET    /api/services          Public — list services
PUT    /api/services/:id      Protected — update service

GET    /api/about             Public — get about content
PUT    /api/about             Protected — update about

POST   /api/contact           Public — submit contact form (rate limited: 5/hr)
GET    /api/contact           Protected — list all messages
PATCH  /api/contact/:id/read  Protected — mark as read

POST   /api/admin/login       Public — get JWT token
GET    /api/admin/verify      Protected — verify token

GET    /health                Public — health check
```

---

## 🚀 Deployment

### Frontend → Vercel

```bash
cd client
npm run build          # Build first to check for errors

# Then deploy via Vercel CLI or connect GitHub repo
npx vercel --prod
```

Set these environment variables in **Vercel Dashboard**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL` → your Render backend URL (e.g. `https://slwebpulse-api.onrender.com/api`)

### Backend → Render

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect repo, set **Build Command:** `cd server && npm install`
4. Set **Start Command:** `cd server && npm start`
5. Add all env variables from `server/.env.example`

Or use the included `render.yaml` with Render's Blueprint feature.

### Database → Supabase (already hosted)

No deployment needed — Supabase is cloud-hosted.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TailwindCSS, Framer Motion, AOS |
| Backend | Node.js, Express 4, JWT auth |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| API Client | Axios |
| Animations | Framer Motion + AOS |
| Slider | Swiper.js |
| Notifications | React Hot Toast |
| File Upload | React Dropzone |
| Deployment | Vercel (FE) + Render (BE) |

---

## 📦 Key Features

- ✅ Black + Blue gradient glassmorphism UI
- ✅ Fully responsive (mobile-first)
- ✅ Smooth scroll animations (AOS + Framer Motion)
- ✅ Testimonials Swiper slider
- ✅ FAQ accordion
- ✅ WhatsApp floating chat button
- ✅ Loading screen animation
- ✅ Admin panel with JWT authentication
- ✅ Full CRUD for projects
- ✅ Image upload via Supabase Storage
- ✅ Contact form with rate limiting
- ✅ SEO meta tags + Open Graph + Structured Data
- ✅ Row Level Security on all DB tables
- ✅ Deployment-ready configs

---

## 📄 License

MIT © SLWebPulse
