# Daraja la Utamaduni Organization — Website

A complete website for **Daraja la Utamaduni Organization**, built with
Next.js 14 + Tailwind CSS, containing every section of the organization
profile (Director's message, About, Vision/Mission/Values, Development
Philosophy, 8 Programme Areas, Beneficiaries, Strategic Approach, Why
Partner, Partnership Opportunities, Flagship Programmes, SDG commitment,
National/AU alignment, Governance, MEAL, Theory of Change, and Contact).

The **Contact Us** form saves every submission straight into a Supabase
database table.

This guide takes you from these files to a live site on Vercel in about
15 minutes, using only the browser (no command-line experience required,
though a command-line path is included too).

---

## 1. Set up Supabase (the database)

1. Go to [supabase.com](https://supabase.com) → **New project** (free tier is enough).
2. Once the project is ready, open **SQL Editor** → **New query**.
3. Open the file `supabase/schema.sql` from this project, copy its contents,
   paste into the SQL editor, and click **Run**.
   This creates a `contact_messages` table and a security policy that lets
   the public website *insert* new messages but never *read* other
   people's submissions.
4. Go to **Project Settings → API**. You'll need two values in the next
   step:
   - **Project URL** (looks like `https://xxxxxxxx.supabase.co`)
   - **anon public** key (a long string under "Project API keys")

To view submitted messages later, go to **Table Editor → contact_messages**
inside your Supabase dashboard.

---

## 2. Push the code to GitHub

**Using the browser (no terminal):**
1. Go to [github.com/new](https://github.com/new), create a new repository,
   e.g. `daraja-la-utamaduni`.
2. On the new repo page, choose **uploading an existing file** and drag in
   every file/folder from this project (keep the folder structure intact).
3. Commit the files to the `main` branch.

**Using the terminal (if you have git installed):**
```bash
cd daraja-website
git init
git add .
git commit -m "Initial commit: Daraja la Utamaduni website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/daraja-la-utamaduni.git
git push -u origin main
```

> `.env.local` is already excluded via `.gitignore` — never commit real
> Supabase keys to GitHub. You'll add them directly in Vercel instead (next
> step).

---

## 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with your
   GitHub account.
2. Click **Import** next to the `daraja-la-utamaduni` repository.
3. Vercel auto-detects Next.js — leave the build settings as default.
4. Before clicking **Deploy**, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon public key |

5. Click **Deploy**. In about a minute you'll get a live URL like
   `https://daraja-la-utamaduni.vercel.app`.
6. To use your own domain later: **Project → Settings → Domains**.

From now on, every time you push a change to the `main` branch on GitHub,
Vercel automatically rebuilds and redeploys the site.

---

## 4. Run it locally (optional)

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase URL + key
npm run dev
```
Visit `http://localhost:3000`.

---

## Project structure

```
app/                  Next.js App Router pages, layout and global styles
components/           One component per website section (Hero, About, 
                       Programmes, ContactForm, etc.)
lib/supabaseClient.ts Supabase browser client
supabase/schema.sql   Database table + security policy (run once in Supabase)
public/logo.png       Organization logo, extracted from the profile
```

## Editing content

All text lives directly inside the component files under `components/` as
plain readable arrays/JSX — update names, phone numbers, or programme
descriptions there and redeploy by pushing to GitHub.

Placeholders worth checking before going live:
- Head office address / phone / email in `components/ContactForm.tsx`
  and `components/Footer.tsx` (currently the real details from the
  organization profile — update if they change).
- Social media links (footer currently has no social icons; add if
  needed).
