const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clear-search');
const episodes = document.querySelectorAll('.episode');

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function updateClearButton() {
  if (searchInput.value.length > 0) {
    clearBtn.classList.add('visible');
  } else {
    clearBtn.classList.remove('visible');
  }
}

// Batch DOM updates using requestAnimationFrame for smoother performance
let rafId = null;

searchInput.addEventListener('input', (e) => {
  if (rafId) cancelAnimationFrame(rafId);

  updateClearButton();

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

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  updateClearButton();
  searchInput.focus();

  // Reset all episodes to visible
  episodes.forEach(episode => {
    episode.classList.remove('hidden');
    const titleElement = episode.querySelector('.episode-title');
    titleElement.textContent = episode.dataset.title;
  });
});
