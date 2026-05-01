# IBBMASTER — PWA → GitHub Pages → PWABuilder → Android APK

Complete step-by-step guide to deploy IBBMASTER as a GitHub Pages PWA and build an Android APK via PWABuilder.

---

## Repository Structure

```
ibbmaster-pwa/
├── index.html              ← The full IBBMASTER app
├── manifest.json           ← PWA Web App Manifest (real file)
├── sw.js                   ← Service Worker (real file)
├── icons/
│   ├── icon-48.png         ← For Android home screen
│   ├── icon-96.png         ← Shortcuts
│   ├── icon-192.png        ← PWA standard icon
│   ├── icon-512.png        ← PWA large icon + splash
│   └── apple-touch-icon.png← iOS
├── screenshots/
│   ├── wide.png            ← Play Store wide screenshot (1280×720)
│   └── mobile.png          ← Play Store narrow screenshot (390×844)
├── .nojekyll               ← Disables Jekyll on GitHub Pages
└── .github/workflows/
    └── deploy.yml          ← Auto-deploy to GitHub Pages on push
```

---

## Step 1 — Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `ibbmaster-pwa` (or any name)
3. Set to **Public** (required for free GitHub Pages)
4. Click **Create repository**

---

## Step 2 — Upload Files to GitHub

### Option A — GitHub Web UI (easiest)

1. Open your new repository on GitHub
2. Click **"uploading an existing file"** or drag-and-drop
3. Upload ALL files maintaining the folder structure:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `.nojekyll`
   - `icons/` folder (all 5 PNG files)
   - `screenshots/` folder (both PNG files)
   - `.github/workflows/deploy.yml`
4. Click **Commit changes**

### Option B — Git CLI

```bash
git init
git add .
git commit -m "Initial IBBMASTER PWA deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ibbmaster-pwa.git
git push -u origin main
```

---

## Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will auto-run on the next push
4. After ~2 minutes, your site will be live at:
   `https://YOUR_USERNAME.github.io/ibbmaster-pwa/`

> **Important:** If your site is in a subfolder (e.g., `/ibbmaster-pwa/`), you must update `start_url` and `scope` in `manifest.json` to match. See "Subfolder Fix" below.

---

## Subfolder Fix (if your URL is a subdirectory)

If your GitHub Pages URL is `https://user.github.io/ibbmaster-pwa/` (not root), edit `manifest.json`:

```json
{
  "id": "/ibbmaster-pwa/",
  "start_url": "/ibbmaster-pwa/",
  "scope": "/ibbmaster-pwa/",
  ...
}
```

And update `sw.js` registration scope in `index.html`:
```js
navigator.serviceWorker.register('/ibbmaster-pwa/sw.js', { scope: '/ibbmaster-pwa/' })
```

---

## Step 4 — Verify PWA in Chrome DevTools

1. Open your GitHub Pages URL in Chrome on desktop
2. Press **F12 → Application → Manifest** — should show all icons, name, etc.
3. **Application → Service Workers** — should show `sw.js` as activated
4. **Lighthouse → PWA** — run audit, should score ✅ on all PWA checks

---

## Step 5 — Build Android APK via PWABuilder

1. Go to **https://www.pwabuilder.com/**
2. Enter your GitHub Pages URL:
   `https://YOUR_USERNAME.github.io/ibbmaster-pwa/`
3. Click **Start** — PWABuilder will fetch and validate your PWA
4. All checks should pass (manifest ✅, service worker ✅, HTTPS ✅)
5. Click **Package for Stores**
6. Select **Android** → **Generate Package**
7. Configure:
   - Package ID: `com.ibbmaster.jaibb` (or your choice)
   - App version: `27`
   - Version code: `27`
   - Signing: Choose **Generate new** or use your existing keystore
8. Click **Download** — you'll get a `.apk` and a `.aab` (Android App Bundle)

---

## Step 6 — Install APK on Android Device

### Direct Install (sideload):
1. Transfer the `.apk` to your Android device
2. In Settings → Security → enable **Install from Unknown Sources**
3. Open the APK file and install
4. IBBMASTER appears as a native app!

### Google Play Store:
1. Create a Google Play Console account ($25 one-time fee)
2. Create a new app
3. Upload the `.aab` file (preferred over `.apk`)
4. Complete store listing, screenshots, and submit for review

---

## PWABuilder Checklist

| Requirement | Status | Details |
|-------------|--------|---------|
| HTTPS | ✅ Auto | GitHub Pages provides HTTPS |
| Web App Manifest | ✅ | `/manifest.json` — real file |
| Service Worker | ✅ | `/sw.js` — real file, not blob |
| Icons 192×192 | ✅ | `icons/icon-192.png` |
| Icons 512×512 | ✅ | `icons/icon-512.png` |
| Maskable icons | ✅ | Both sizes have `"purpose": "maskable"` |
| `start_url` | ✅ | Set to `/` |
| `display: standalone` | ✅ | Full-screen app mode |
| `theme_color` | ✅ | `#070b12` |
| `background_color` | ✅ | `#070b12` |
| Screenshots | ✅ | Wide (1280×720) + Narrow (390×844) |
| Offline support | ✅ | SW caches app shell |
| `.nojekyll` | ✅ | Prevents GitHub Pages Jekyll issues |

---

## Updating the App

After making changes to `index.html`:
1. Commit and push to `main` branch
2. GitHub Actions automatically redeploys (~1–2 min)
3. Update `APP_CACHE` version in `sw.js` (e.g., `ibbmaster-v28`) to bust cache
4. Users will get the update on next app open

---

## Custom Domain (Optional)

To use a custom domain like `ibbmaster.app`:
1. Buy a domain (Namecheap, Google Domains, etc.)
2. In GitHub Pages settings, set **Custom domain**
3. Add a CNAME record pointing to `YOUR_USERNAME.github.io`
4. Update `manifest.json` `start_url` and `scope` to `/`
5. Rebuild APK with new domain URL in PWABuilder

---

*Generated for IBBMASTER v27 — JAIBB BPE 2026 Preparation Platform*
