# Mystrypedia — Archival Journal of Fascinating Mysteries

> **"Explore the Unknown. Discover the Unexplained."**

Mystrypedia is a high-performance, mobile-responsive editorial web publication built for an academic SEO and Answer Engine Optimization (AEO) capstone assignment. It provides deep, peer-reviewed investigations into historical enigmas, ancient civilizations, and unexplained maritime phenomena.

---

## 🏛️ Project Overview & Architecture

- **Intended Live URL:** `https://mystrypedia.vercel.app/`
- **Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons
- **Editorial Niche:** Historical mysteries, ancient civilizations, oceanographic phenomena, and forensic demystification.
- **Design Philosophy:** Premium dark navy (`#0a0e17`), charcoal, warm parchment, and subtle gold accents (`#d4af37`), zero-pill typography, and responsive museum-grade layout.

---

## 📄 Site Structure & Canonical URLs

The website contains four fully developed pages with unique URLs and targeted keyword strategies:

1. **Homepage (`/`):**
   - **Primary Keyword:** `fascinating mysteries`
   - **Related Keywords:** `unexplained mysteries`, `historical mysteries`
   - **AEO Headings:** Two question-based H2 headings with immediate 1st-paragraph direct answers.
2. **Bermuda Triangle (`/bermuda-triangle-mysteries`):**
   - **Primary Keyword:** `Bermuda Triangle mysteries`
   - **Related Keywords:** `Bermuda Triangle disappearances`, `Bermuda Triangle theories`
   - **Word Count:** ~1,420 words of original evidentiary content.
3. **Egyptian Pyramids (`/how-egyptian-pyramids-were-built`):**
   - **Primary Keyword:** `how Egyptian pyramids were built`
   - **Related Keywords:** `ancient Egyptian pyramid construction`, `Egyptian pyramid building methods`
   - **Word Count:** ~1,480 words detailing Diary of Merer papyri, ramp mechanics, and Giza worker excavations.
4. **Mary Celeste (`/mary-celeste-mystery`):**
   - **Primary Keyword:** `Mary Celeste mystery`
   - **Related Keywords:** `Mary Celeste disappearance`, `abandoned ship mystery`
   - **Word Count:** ~1,390 words investigating the 1872 derelict discovery, Gibraltar court transcripts, and alcohol vapor pressure chemistry.

---

## 🎯 Technical SEO & AEO Highlights

- **AEO Direct Answer Blocks:** Every page features at least two question-based H2 headings followed immediately by a concise 40–60 word factual summary in the first paragraph, engineered for Google Featured Snippets, Perplexity citations, and AI Overviews.
- **JSON-LD Schema Markup:** Injects Schema.org `@type: "WebSite"`, `"Organization"`, `"Article"`, `"BreadcrumbList"`, and `"FAQPage"` into `<head>` dynamically.
- **Image Optimization & Zero Layout Shifts:** All images specify explicit `width` and `height` (1280x720) to prevent Cumulative Layout Shift (CLS), with descriptive contextual `alt` tags and editorial figure captions.
- **Direct Search Functionality:** Real client-side index covering titles, keywords, section headings, and article excerpts, with `Cmd+K` / `Ctrl+K` keyboard shortcut.
- **Built-in SEO Inspector:** Includes an interactive on-page audit panel (click **SEO Audit** in the navigation) allowing evaluators to audit character counts, keyword placements, canonical tags, and raw JSON-LD graphs in real time.
- **Valid Crawl Assets:** Includes clean, crawlable `public/robots.txt` and `public/sitemap.xml` pointing to canonical production URLs.

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates an optimized static distribution in the `dist/` directory.

---

## 🚀 Deployment Guide

### Deploying to GitHub
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Mystrypedia SEO website and documentation"
   ```
2. Link your remote repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/mystrypedia.git
   git push -u origin main
   ```

### Deploying to Vercel
1. Install Vercel CLI (optional) or import your repository directly via the [Vercel Dashboard](https://vercel.com/new).
2. The project contains a pre-configured `vercel.json` rewrite file:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
3. Set Framework Preset to **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

---

## 📋 Evaluation & Evidence Documentation

- **`keyword-research.md`:** Complete 8-column keyword research and search intent table (copyable into Excel/Sheets or TSV).
- **`SEO-Assignment-Evidence.md`:** 10-point checklist of screenshots to capture, DevTools audit procedures, and on-page technical benchmarks.
