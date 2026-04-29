# EnclavAI — Landing Page

> **Your data. Your AI. Your device.**

Privacy-first personal AI that aggregates your data from all your apps into an encrypted on-device vault — and powers a local AI assistant with zero cloud processing.

🌐 **Live site:** [https://amirkhanworks.github.io/EnclavAI](https://amirkhanworks.github.io/EnclavAI)  
📋 **Waitlist form:** [https://tally.so/r/Bzbye1](https://tally.so/r/Bzbye1)

---

## What This Is

This repository contains the complete investor-facing landing page for EnclavAI. It is a **static site** — no framework, no build step, no server. Designed to:

- Communicate the product vision to angel investors
- Capture early user interest via a waitlist form
- Demonstrate the AI assistant concept via an interactive chat mockup
- Surface concrete use cases across finances, calendar, health, and email

---

## Repository Structure

```
/
├── index.html       ← Main landing page (all sections)
├── style.css        ← All styles (CSS variables + responsive)
├── script.js        ← Animations, chat demo, nav interactions
├── favicon.svg      ← SVG shield icon (no external deps)
└── README.md        ← This file
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create the repository

If you haven't already:
```bash
git init
git remote add origin https://github.com/amirkhanworks/EnclavAI.git
```

### Step 2 — Push all files

```bash
git add .
git commit -m "feat: EnclavAI landing page v1"
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

### Step 4 — Access your site

GitHub will display your live URL — typically:
```
https://amirkhanworks.github.io/EnclavAI
```

It may take 1–3 minutes to go live on first deploy.

---

## 🔧 Customisation Guide

### Replacing the Investor Email

Search for `[REPLACE THIS]` comments in `index.html`. There are **5 occurrences**:

1. **Nav bar** investor link
2. **Mobile nav** investor link
3. **Investor CTA strip** (mid-page)
4. **Footer** investor deck link
5. **Footer** contact email

Replace `investor@yourdomain.com` with your actual address in all places. Also update `hello@enclavai.app` with your real contact email.

### Swapping the Tally Form Embed

The form is already embedded using the live URL:
```
https://tally.so/r/Bzbye1
```

To change the form:
1. Go to your Tally dashboard → select the form
2. Click **Share** → **Embed** → copy the `data-tally-src` URL
3. Replace the existing `data-tally-src` value in `index.html`

### Adding a Privacy Policy Page

1. Create `privacy.html` in the root directory
2. Update the link in `index.html` footer: `href="privacy.html"`

---

## 🎨 Design Tokens

All design decisions are controlled by CSS variables at the top of `style.css`:

```css
:root {
  --bg:       #0A0F1E;   /* Deep navy background */
  --accent:   #5C6BC0;   /* Electric indigo accent */
  --accent-l: #7986CB;   /* Lighter indigo for hovers */
  --text-1:   #FFFFFF;   /* Primary text */
  --text-2:   #C5CBE0;   /* Secondary text */
  --text-3:   #8B95B5;   /* Muted text */
}
```

---

## 📋 Investor Feedback Applied (v2 Changes)

| Feedback | Change Made |
|---|---|
| Remove "simulated" label from testimonials | Relabelled as "Early Conversations" with note: "Names withheld at request" |
| Add concrete use case block | New **Real-Life Examples** section with Finance / Calendar / Health / Email cards |
| Make investor deck link more visible | Nav link styled as bordered pill; new full **Investor CTA strip** mid-page above waitlist |
| GDPR legal wording too strong | Softened to "helps users exercise this existing right through their own sessions" |
| Footer year was 2024 | Updated to **2026** throughout |

---

## 🔮 Future Tech Stack (Planned)

| Layer | Technology |
|---|---|
| Desktop app | Tauri (Rust) + React |
| Vault storage | SQLCipher (AES-256) + LanceDB (vector index) |
| On-device LLM | llama.cpp with Phi-3.5-mini / Llama 3.2 (GGUF Q4) |
| GDPR portability tooling | Python parsers + browser-mediated OAuth (user's own session) |
| Key derivation | Argon2id |
| Telemetry (opt-in only) | Self-hosted Plausible or none |

---

## 👥 Founders

| Name | LinkedIn |
|---|---|
| Amir Khan | [linkedin.com/in/aaamirkhan](https://www.linkedin.com/in/aaamirkhan/) |
| Vaibhav Dureja | [linkedin.com/in/vaibhav-dureja-5b7110123](https://www.linkedin.com/in/vaibhav-dureja-5b7110123/) |

---

## 📄 Legal

© 2026 EnclavAI. All rights reserved.

This repository contains the marketing landing page only. The core product software is not open-source.

> *No user data was collected or processed in the making of this website.*
