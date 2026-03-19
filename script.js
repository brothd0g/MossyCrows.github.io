guestbookKey = 'mossycrows_guestbook_entries_v1';
seedEntries = [
  {
    name: 'solstice',
    message: 'this is so cool',
    createdAt: '2026-03-15T09:10:00.000Z'
  },
  {
    name: 'Ang3l0099',
    message: 'bookmarked instantly',
    createdAt: '2026-03-14T21:45:00.000Z'
  },
  {
    name: 'bluehonu',
    message: 'post process videos next!',
    createdAt: '2026-03-13T13:20:00.000Z'
  }
];

 form = document.getElementById('guestbook-form');
 nameInput = document.getElementById('guest-name');
 messageInput = document.getElementById('guest-message');
 list = document.getElementById('guestbook-list');

 escapeHtml(text) {
   text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

 loadEntries() {
   {
     stored = localStorage.getItem(guestbookKey);

     (!stored) {
      localStorage.setItem(guestbookKey, JSON.stringify(seedEntries));
       [...seedEntries];
    }

     parsed = JSON.parse(stored);

     (!Array.isArray(parsed)) {
       [...seedEntries];
    }

     parsed.slice(0, 30);
  }  (error) {
    console.warn('Guestbook entries could not be loaded.', error);
     [...seedEntries];
  }
}

 saveEntries(entries) {
  localStorage.setItem(guestbookKey, JSON.stringify(entries.slice(0, 30)));
}

 renderEntries(entries) {
   markup = entries
    .map((entry) => {
       safeName = escapeHtml(entry.name || 'anon');
       safeMessage = escapeHtml(entry.message || '');
       date =  Date(entry.createdAt);
       safeDate = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();

       [
        '<article class="entry">',
        `<p><strong>${safeName}:</strong> ${safeMessage}</p>`,
        `<time>${safeDate}</time>`,
        '</article>'
      ].join('');
    })
    .join('');

  list.innerHTML = markup;
}

 (form && nameInput && messageInput && list) {
   entries = loadEntries();
  renderEntries(entries);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

     name = nameInput.value.trim();
     message = messageInput.value.trim();

     (!name || !message) {
      ;
    }

    entries = [
      {
        name,
        message,
        createdAt:  Date().toISOString()
      },
      ...entries
    ].slice(0, 30);

    saveEntries(entries);
    renderEntries(entries);
    form.reset();
    nameInput.focus();
  });
}
