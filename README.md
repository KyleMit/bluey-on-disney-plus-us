# Bluey Episodes on Disney+ (US)

A searchable list of Bluey episodes with Disney+ season and episode numbers for the US. Click any episode to open it directly in the Disney+ app.

**Live site:** <https://bluey-episodes.netlify.app/>

## Architecture

* **Static site generator:** Eleventy (11ty)
* **Template engine:** Nunjucks
* **Styling:** Vanilla CSS (inlined at build)
* **JavaScript:** Vanilla JS (inlined at build)
* **Data source:** `src/_data/episodes.json`
* **Deployment:** Netlify (auto-deploys from main branch)

## File Structure

```none
src/
├── _data/
│   └── episodes.json          # Episode data with Disney+ IDs
├── _includes/
│   ├── style.css              # Styles (inlined at build)
│   └── script.js              # Search functionality (inlined at build)
├── index.njk                  # Main template
scrape-disney-plus.js          # Browser console scraper
.eleventy.js                   # Eleventy config
```

## Local Development

```bash
npm install
npm start                      # Runs at http://localhost:8080
```

## Updating Episodes

### 1. Scrape Disney+ Data

1. Open Disney+ in browser, navigate to a Bluey season page
2. Open browser console (F12)
3. Copy/paste contents of `scrape-disney-plus.js`
4. Run: `scrapeEpisodes(1)` (for season 1, 2, or 3)
5. Copy the JSON output
6. Append to `src/_data/episodes.json`
7. Repeat for all seasons

### 2. Test Locally

```bash
npm start
```

### 3. Deploy

Push to main branch - Netlify auto-deploys.

## Episode Data Format

```json
{
  "season": 1,
  "episode": 1,
  "title": "The Magic Xylophone",
  "description": "Bluey and Bingo squabble...",
  "disneyPlusId": "5f37b14c-483e-4322-8247-ca11ceb92415"
}
```

The `disneyPlusId` creates deep links to Disney+:

* Desktop: Opens in new tab
* Mobile: Opens in Disney+ app (if installed)

## Build

```bash
npm run build                  # Output to _site/
```
