# 🦊 Briefox.com — AI-Powered Design Tools

**Briefox** is a modern web application built with Next.js and Tailwind CSS that offers free, AI-powered design utilities to boost creative productivity. From generating professional design briefs to recommending perfect Google Fonts and extracting color palettes from images — Briefox simplifies your workflow.

---

## 🌐 Live Site

👉 [https://www.briefox.com](https://www.briefox.com)

---

## 📸 Screenshots

![Briefox Homepage](screenshots/homepage.png)

---

## 📌 Table of Contents

- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)

---

## 🚀 Features

Briefox includes three core tools to assist designers, developers, and creators:

### 1. 🎯 AI Design Brief Generator

- Automatically generates professional and concise design briefs.
- Input your design type, industry, and style preference.
- Uses Gemini AI for smart prompt generation.
- No login or subscription required.

### 2. ✒️ Keyword-Based Font Finder

- Input a keyword and get font suggestions from Google Fonts.
- AI selects top 5 fonts that best represent the mood or style.
- Live preview with custom text.
- 100% free-to-use fonts.

### 3. 🌈 Image-Based Color Palette Extractor

- Upload an image and extract the top 10 dominant colors.
- Provides HEX and RGB formats.
- Download palette as PNG, JSON, or CSS Variables.
- Built using Color Thief.

---

## ⚙️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org)
- **Styling:** Tailwind CSS
- **Animation:** Shadcn UI + Magic UI
- **AI Backend:** Google Gemini Pro via API
- **Rate Limiting:** MongoDB (IP-based with TTL logic)
- **Hosting:** Vercel (with custom domain)
- **Database:** MongoDB Atlas (Rate Limit model)

---

## 🛠 Getting Started

### 1. Clone the Repo

```
git clone https://github.com/your-username/briefox.git
cd briefox
```

### 2. Install Dependencies

```
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file at the root and add the following:

```
GEMINI_API=your_gemini_api_key
GOOGLE_CLOUD_API=your_google_cloud_api_key
MONGODB_URI=your_mongodb_connection_uri

NEXT_PUBLIC_FONT_FINDER_ROUTE = /api/font-finder
NEXT_PUBLIC_PROMPT_ROUTE = /api/generate-brief
NEXT_PUBLIC_FONT_CACHE_ROUTE = /api/font-cache
```

Make sure Google Font API is Enabled in your Google Cloude.

### 4. Run Project

```
npm run dev	// Run dev server (localhost:3000)
npm run build	// Build the app
```

---

## 📤 Deployment

> Briefox is deployed on [**Vercel**](https://vercel.com/)

* CI/CD is managed automatically via GitHub integration.
* Every push to `main` auto-deploys the latest version.
