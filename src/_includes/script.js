const searchInput = document.getElementById('search');
const episodes = document.querySelectorAll('.episode');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Batch DOM updates using requestAnimationFrame for smoother performance
let rafId = null;

searchInput.addEventListener('input', (e) => {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => {
    const query = e.target.value.toLowerCase();

    episodes.forEach(episode => {
      const title = episode.dataset.title.toLowerCase();
      const titleElement = episode.querySelector('.episode-title');
      const originalTitle = episode.dataset.title;

      if (title.includes(query)) {
        episode.classList.remove('hidden');
        titleElement.innerHTML = highlightMatch(originalTitle, e.target.value);
      } else {
        episode.classList.add('hidden');
        titleElement.textContent = originalTitle;
      }
    });
  });
});
