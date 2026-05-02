# IBBMASTER — PWA Setup (Flat Structure)

All files go directly in the ROOT of your GitHub repository. No subfolders needed.

---

## Files to Upload to GitHub Root

```
(root of repo)
├── index.html              ← Main app
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service worker
├── .nojekyll               ← Disables Jekyll
├── icon-48.png
├── icon-96.png
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
├── wide.png                ← Play Store screenshot
└── mobile.png              ← Play Store screenshot
```

## ⚠️ deploy.yml — MUST go in a subfolder

The `deploy.yml` file CANNOT go in root. You must create the path:
`.github/workflows/deploy.yml`

### How to create the folder on GitHub web:
1. Click **Add file → Create new file**
2. In the filename box type exactly: `.github/workflows/deploy.yml`
3. Paste the contents of `deploy.yml` from this ZIP
4. Click **Commit changes**

---

## Enable GitHub Pages

1. Go to **Settings → Pages**
2. Under Source select **GitHub Actions**
3. Push any file to trigger the workflow
4. Site goes live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## ⚠️ If URL has a subfolder (e.g. /ibbmaster-pwa/)

Edit `manifest.json` — change these three lines:
```json
"id": "/ibbmaster-pwa/",
"start_url": "/ibbmaster-pwa/",
"scope": "/ibbmaster-pwa/"
```

And in `index.html` find the serviceWorker.register line and change to:
```js
navigator.serviceWorker.register('/ibbmaster-pwa/sw.js', { scope: '/ibbmaster-pwa/' })
```

---

## PWABuilder

Go to **https://www.pwabuilder.com** → enter your Pages URL → Package for Stores → Android → Generate Package → download APK.
