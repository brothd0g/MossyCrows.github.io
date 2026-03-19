const guestbookKey = 'mossycrows_guestbook_entries_v1';
const seedEntries = [
  {
    name: 'solstice.exe',
    message: 'this theme RULES',
    createdAt: '2026-03-15T09:10:00.000Z'
  },
  {
    name: 'voidangel',
    message: 'bookmarked instantly',
    createdAt: '2026-03-14T21:45:00.000Z'
  },
  {
    name: 'mosswire',
    message: 'post process videos next!',
    createdAt: '2026-03-13T13:20:00.000Z'
  }
];

const form = document.getElementById('guestbook-form');
const nameInput = document.getElementById('guest-name');
const messageInput = document.getElementById('guest-message');
const list = document.getElementById('guestbook-list');

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function loadEntries() {
  try {
    const stored = localStorage.getItem(guestbookKey);

    if (!stored) {
      localStorage.setItem(guestbookKey, JSON.stringify(seedEntries));
      return [...seedEntries];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [...seedEntries];
    }

    return parsed.slice(0, 30);
  } catch (error) {
    console.warn('Guestbook entries could not be loaded.', error);
    return [...seedEntries];
  }
}

function saveEntries(entries) {
  localStorage.setItem(guestbookKey, JSON.stringify(entries.slice(0, 30)));
}

function renderEntries(entries) {
  const markup = entries
    .map((entry) => {
      const safeName = escapeHtml(entry.name || 'anon');
      const safeMessage = escapeHtml(entry.message || '');
      const date = new Date(entry.createdAt);
      const safeDate = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();

      return [
        '<article class="entry">',
        `<p><strong>${safeName}:</strong> ${safeMessage}</p>`,
        `<time>${safeDate}</time>`,
        '</article>'
      ].join('');
    })
    .join('');

  list.innerHTML = markup;
}

if (form && nameInput && messageInput && list) {
  let entries = loadEntries();
  renderEntries(entries);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      return;
    }

    entries = [
      {
        name,
        message,
        createdAt: new Date().toISOString()
      },
      ...entries
    ].slice(0, 30);

    saveEntries(entries);
    renderEntries(entries);
    form.reset();
    nameInput.focus();
  });
}
