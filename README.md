# 🐄 QurbaniHat – Livestock Booking Platform

A modern online marketplace for booking Qurbani animals (cows, goats) during Eid ul-Adha in Bangladesh.

## 🔗 Live URL

> Replace with your Vercel URL after deployment: `https://qurbanihat.vercel.app`

## ✨ Key Features

- Browse all Qurbani animals with filtering (type) and sorting (price)
- Detailed animal pages with booking form
- User authentication via email/password and Google OAuth (better-auth)
- Protected booking form – login required
- My Profile page with photo, name, and email
- Update profile (name and photo URL)
- Responsive design: mobile, tablet, desktop
- Toast notifications for all user actions
- Loading skeletons for data fetch
- 404 Not Found page

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework |
| `better-auth` | Authentication (email + Google OAuth) |
| `mongoose` | MongoDB ODM (used by better-auth adapter) |
| `react-hook-form` | Form handling and validation |
| `react-hot-toast` | Toast notifications |
| `lucide-react` | Icon library |
| `tailwindcss` | Utility-first CSS |

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/qurbanihat.git
cd qurbanihat
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```env
MONGODB_URI=mongodb+srv://...
BETTER_AUTH_SECRET=your-random-32-char-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment (Vercel)

See the full deployment instructions at the bottom of this README.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.js
│   │   └── register/page.js
│   ├── animals/
│   │   ├── page.js
│   │   └── [id]/page.js
│   ├── my-profile/
│   │   ├── page.js
│   │   └── update/page.js
│   ├── api/auth/[...all]/route.js
│   ├── layout.js
│   ├── page.js
│   └── not-found.js
├── components/
│   ├── layout/ (Navbar, Footer, MainLayout)
│   └── ui/ (AnimalCard)
├── lib/
│   ├── auth.js       (server-side better-auth config)
│   └── auth-client.js (client-side auth hooks)
public/
└── animals.json      (animal data)
```

## 🌐 Deployment Instructions

### MongoDB Atlas Setup
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → Create free cluster
2. Create a database user under **Database Access**
3. Whitelist all IPs (`0.0.0.0/0`) under **Network Access**
4. Copy the connection string and use it as `MONGODB_URI`

### Google OAuth Setup
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → APIs & Services → Credentials → OAuth 2.0 Client ID
3. Authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
4. Copy Client ID and Client Secret

### Vercel Deployment
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all environment variables (update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel URL)
4. Deploy!
