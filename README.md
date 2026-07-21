# Warlock — Portfolio Site

A dark, sigil-themed portfolio built with plain HTML/CSS/JS — no build step, so it works straight out of the box on GitHub Pages.

## Adding your artwork

Every image space is a placeholder right now (a numbered gradient tile), so nothing looks broken before you add real art.

1. Drop your image files into the `images/` folder, e.g. `images/work-01.jpg`.
2. Open `index.html` and find the matching tile. Each one has a line like:
   ```html
   <div class="art-tile" style="--art-img:url('images/work-01.jpg')">
   ```
   Point that path at your file. That's it — the gradient placeholder is only a fallback and disappears automatically once the image loads.
3. Same idea for the **Featured Pieces** section (`images/featured-01.jpg`, etc.) — those are the three larger spotlight slots.
4. Update the `<span class="art-tile__tag">` and `<span class="art-tile__title">` text next to each tile with the real medium and title.
5. Add or remove `<div class="art-tile">` blocks in the gallery to match how many pieces you actually have. Classes `span-tall` and `span-wide` control tile size for visual variety — mix them in wherever you like.

Recommended image size: roughly 1200px on the long edge, compressed as .jpg or .webp, so the site stays fast.

## Personalizing text

- **Hero tagline** and **About** copy (`index.html`) are placeholders written for a "3 years experience" dark-fantasy/digital-art angle — swap in your own bio, specialties, and stats.
- **Skills** list — edit the `<ul class="skills__list">` items to match your actual toolset.
- **Contact** — replace the `mailto:` address and the four social links (currently `href="#"`) with your real profiles.

## Running it locally

No build tools needed. Just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` within a minute or two.

If you'd rather the site live at `https://YOUR-USERNAME.github.io` directly (no repo name in the URL), name the repository `YOUR-USERNAME.github.io`.

## File structure

```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/        ← put your artwork files here
└── README.md
```
