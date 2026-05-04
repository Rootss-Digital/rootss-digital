# Rootss Digital — Deployment Guide

## Before You Deploy: Add Your Images

Save these two files into the `src/images/` folder:

| File name to use | What it is |
|---|---|
| `sandra-headshot.jpg` | Your professional headshot |
| `rootss-logo.png` | Your Rootss Digital logo |

These exact file names are already referenced throughout the site.

---

## Step 1 — Install Node.js (one time only)

1. Go to https://nodejs.org
2. Download the **LTS version** (the green button)
3. Install it — just click Next through all the steps

---

## Step 2 — Install the site dependencies

1. Open the folder `C:\Users\angcl\rootss-digital` in File Explorer
2. Click the address bar at the top, type `cmd`, press Enter
3. In the black window that opens, type:

```
npm install
```

Press Enter and wait for it to finish (about 1 minute).

---

## Step 3 — Preview the site locally (optional but recommended)

In the same black window, type:

```
npm start
```

Then open your browser and go to: **http://localhost:8080**

You should see your full website. Press Ctrl+C to stop it when done.

---

## Step 4 — Put the site on GitHub (free)

1. Go to https://github.com and create a free account if you don't have one
2. Click the **+** button → **New repository**
3. Name it: `rootss-digital`
4. Make it **Private**
5. Click **Create repository**
6. Follow the instructions GitHub shows to "push an existing repository"

If you're not familiar with Git, message me and I'll walk you through this step.

---

## Step 5 — Deploy to Netlify (free hosting)

1. Go to https://netlify.com and sign up with your GitHub account
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** → select `rootss-digital`
4. Settings will auto-detect:
   - Build command: `npm run build`
   - Publish directory: `_site`
5. Click **Deploy site**

Your site will be live in about 2 minutes at a temporary URL like `rootss-digital.netlify.app`.

---

## Step 6 — Connect your domain (rootssdigital.com)

**In Netlify:**
1. Go to **Site configuration** → **Domain management**
2. Click **Add a domain** → type `rootssdigital.com`
3. Netlify will give you nameservers (looks like: `dns1.p01.nsone.net`)

**In Squarespace Domains (formerly Google Domains):**
1. Log in at https://domains.squarespace.com
2. Click on your domain `rootssdigital.com`
3. Go to **DNS** → **Nameservers**
4. Switch from "Squarespace nameservers" to **Custom nameservers**
5. Enter the nameservers Netlify gave you
6. Save — it takes up to 48 hours but usually works within 1–2 hours

---

## Step 7 — Enable the Blog CMS (Decap CMS)

This lets you write and publish blog posts from a simple dashboard at `rootssdigital.com/admin`.

**In Netlify:**
1. Go to **Site configuration** → **Identity**
2. Click **Enable Identity**
3. Under **Registration**, set to **Invite only**
4. Scroll down to **Git Gateway** → click **Enable Git Gateway**
5. Go to **Identity** → **Invite users** → enter your email
6. Check your email and accept the invite

Now go to `rootssdigital.com/admin` — log in with the account you just created.

**To write a new blog post:**
1. Go to `rootssdigital.com/admin`
2. Click **Blog Posts** → **New Blog Post**
3. Fill in Title, Description, and write your post
4. Click **Publish**
5. The site rebuilds automatically in about 1 minute

---

## Step 8 — Set up Calendly for booking (free)

1. Go to https://calendly.com and create a free account
2. Create a new event: **"1-on-1 Strategy Session — 60 min"**
3. Set your availability and price ($97)
4. Copy your Calendly link
5. Open `src/book.njk` in any text editor
6. Find the comment that says `<!-- Calendly inline widget will go here -->`
7. Uncomment those lines and paste your Calendly link where it says `YOUR_LINK`

---

## Updating the site later

Every time you want to make a change:
1. Edit the files in the `src/` folder
2. Netlify auto-deploys when you push to GitHub

For blog posts — just use the admin dashboard. No code needed.

---

## Contact

If you get stuck at any step, message Sandra at sandra@rootssdigital.com or DM on Instagram @rootssdigital.

Built with love for Rootss Digital — Visalia, CA.
