// Disney+ Episode Scraper
// Usage: Run this in the browser console on a Disney+ season page
// Example: scrapeEpisodes(1)

function scrapeEpisodes(season) {
  const items = [...document.querySelectorAll('[data-testid="tab-panel--active"] [data-testid="set-item"]')]

  const episodes = items.map(item => {
    // Get episode ID from data attribute
    const disneyPlusId = item.getAttribute('data-item-id');

    // Get title (format: "1. The Magic Xylophone")
    const titleElement = item.querySelector('[data-testid="standard-regular-list-item-title"]');
    const titleText = titleElement ? titleElement.textContent.trim() : '';

    // Parse episode number and title
    const titleMatch = titleText.match(/^(\d+)\.\s*(.+)$/);
    if (!titleMatch) {
      console.warn('Could not parse title:', titleText);
      return null;
    }

    const episode = parseInt(titleMatch[1], 10);
    const title = titleMatch[2].trim();

    // Get description
    const descElement = item.querySelector('[data-testid="standard-regular-list-item-description"]');
    const description = descElement ? descElement.textContent.trim() : '';

    return {
      season: season,
      episode: episode,
      title: title,
      description: description,
      disneyPlusId: disneyPlusId
    };
  })
  .filter(ep => ep !== null)
  .sort((a, b) => a.episode - b.episode);

  // Output as JSON
  console.log(JSON.stringify(episodes, null, 2));

  return episodes;
}


