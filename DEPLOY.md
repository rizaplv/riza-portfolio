# Riza Portfolio - Deployment Guide

## Prerequisites
- GitHub account
- Vercel account
- Neon/Supabase account for PostgreSQL
- Supabase account for Storage

## Step 1: Push to GitHub

```powershell
cd C:\Users\akc05\OneDrive\Desktop\riza-portfolio
git init
git remote add origin https://github.com/YOUR_USERNAME/riza-portfolio.git
git add .
git commit -m "Initial portfolio with admin dashboard"
git push -u origin main
```

## Step 2: Setup PostgreSQL Database

### Option A: Neon (Recommended)
1. Go to https://neon.tech
2. Sign up / Login
3. Create new project → "riza-portfolio-db"
4. Copy the connection string (starts with `postgresql://...`)

### Option B: Supabase
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database → Connection string
4. Copy the connection string

## Step 3: Setup Supabase Storage

1. Go to https://supabase.com
2. Create new project (if you haven't)
3. Go to Storage → Create bucket → name: `portfolio`
4. Set bucket as public
5. Go to Settings → API → Copy:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (under "service_role")

## Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Import Project → Import from GitHub
3. Select your `riza-portfolio` repo
4. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Step 5: Set Environment Variables in Vercel

In Vercel dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:pass@host/riza-portfolio-db
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=random-secret-key-min-32-chars
```

## Step 6: Initialize Database

After first deploy, run migration:

```powershell
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull .env.local

# Run database migration
npx prisma db push
```

Or use Vercel's post-deploy script.

## Step 7: Update Admin Credentials

After deployment, you can update admin credentials via Prisma Studio or seed script.

## Notes

- **Local development**: Uses SQLite + local filesystem
- **Production (Vercel)**: Uses PostgreSQL + Supabase Storage
- **Upload fallback**: If Supabase env vars are not set, falls back to local filesystem (development only)
