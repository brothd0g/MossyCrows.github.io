 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
index 7301bb054932c7b8cf54e12b075660701a755d67..51e11d67f732971057fe1ba5c21896e62abaa10a 100644
--- a/script.js
+++ b/script.js
@@ -1,108 +1,127 @@
-guestbookKey = 'mossycrows_guestbook_entries_v1';
-seedEntries = [
+const guestbookKey = 'mossycrows_guestbook_entries_v2';
+const seedEntries = [
   {
-    name: 'solstice',
-    message: 'this is so cool',
-    createdAt: '2026-03-15T09:10:00.000Z'
+    name: 'lunaSignal',
+    message: 'the colors are sooo dreamy, i love the shrine energy.',
+    createdAt: '2026-03-15T08:15:00.000Z'
   },
   {
-    name: 'Ang3l0099',
-    message: 'bookmarked instantly',
-    createdAt: '2026-03-14T21:45:00.000Z'
+    name: 'cemeteryMp3',
+    message: 'obsessed with the sketchbook section already.',
+    createdAt: '2026-03-14T20:40:00.000Z'
   },
   {
-    name: 'bluehonu',
-    message: 'post process videos next!',
-    createdAt: '2026-03-13T13:20:00.000Z'
+    name: 'mothMail',
+    message: 'please post every oc ever, thank you.',
+    createdAt: '2026-03-13T11:05:00.000Z'
   }
 ];
 
- form = document.getElementById('guestbook-form');
- nameInput = document.getElementById('guest-name');
- messageInput = document.getElementById('guest-message');
- list = document.getElementById('guestbook-list');
-
- escapeHtml(text) {
-   text
+function escapeHtml(text) {
+  return String(text)
     .replaceAll('&', '&amp;')
     .replaceAll('<', '&lt;')
     .replaceAll('>', '&gt;')
     .replaceAll('"', '&quot;')
     .replaceAll("'", '&#39;');
 }
 
- loadEntries() {
-   {
-     stored = localStorage.getItem(guestbookKey);
+function loadEntries() {
+  try {
+    const stored = localStorage.getItem(guestbookKey);
 
-     (!stored) {
+    if (!stored) {
       localStorage.setItem(guestbookKey, JSON.stringify(seedEntries));
-       [...seedEntries];
+      return [...seedEntries];
     }
 
-     parsed = JSON.parse(stored);
-
-     (!Array.isArray(parsed)) {
-       [...seedEntries];
+    const parsed = JSON.parse(stored);
+    if (!Array.isArray(parsed)) {
+      return [...seedEntries];
     }
 
-     parsed.slice(0, 30);
-  }  (error) {
+    return parsed.slice(0, 30);
+  } catch (error) {
     console.warn('Guestbook entries could not be loaded.', error);
-     [...seedEntries];
+    return [...seedEntries];
   }
 }
 
- saveEntries(entries) {
+function saveEntries(entries) {
   localStorage.setItem(guestbookKey, JSON.stringify(entries.slice(0, 30)));
 }
 
- renderEntries(entries) {
-   markup = entries
-    .map((entry) => {
-       safeName = escapeHtml(entry.name || 'anon');
-       safeMessage = escapeHtml(entry.message || '');
-       date =  Date(entry.createdAt);
-       safeDate = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
+function renderEntries(listElement, entries) {
+  if (!listElement) {
+    return;
+  }
 
-       [
+  const markup = entries
+    .map((entry) => {
+      const safeName = escapeHtml(entry.name || 'anon');
+      const safeMessage = escapeHtml(entry.message || '');
+      const date = new Date(entry.createdAt);
+      const safeDate = Number.isNaN(date.getTime())
+        ? 'unknown time'
+        : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
+
+      return [
         '<article class="entry">',
-        `<p><strong>${safeName}:</strong> ${safeMessage}</p>`,
-        `<time>${safeDate}</time>`,
+        `<p><strong>${safeName}</strong> // ${safeMessage}</p>`,
+        `<time datetime="${escapeHtml(entry.createdAt || '')}">${safeDate}</time>`,
         '</article>'
       ].join('');
     })
     .join('');
 
-  list.innerHTML = markup;
+  listElement.innerHTML = markup;
 }
 
- (form && nameInput && messageInput && list) {
-   entries = loadEntries();
-  renderEntries(entries);
+function setupGuestbook() {
+  const form = document.getElementById('guestbook-form');
+  const nameInput = document.getElementById('guest-name');
+  const messageInput = document.getElementById('guest-message');
+  const list = document.getElementById('guestbook-list');
+  const notice = document.getElementById('guestbook-notice');
+
+  let entries = loadEntries();
+  renderEntries(list, entries);
+
+  if (!form || !nameInput || !messageInput) {
+    return;
+  }
 
   form.addEventListener('submit', (event) => {
     event.preventDefault();
 
-     name = nameInput.value.trim();
-     message = messageInput.value.trim();
+    const name = nameInput.value.trim();
+    const message = messageInput.value.trim();
 
-     (!name || !message) {
-      ;
+    if (!name || !message) {
+      if (notice) {
+        notice.textContent = 'Please add both a name and a message.';
+      }
+      return;
     }
 
     entries = [
       {
         name,
         message,
-        createdAt:  Date().toISOString()
+        createdAt: new Date().toISOString()
       },
       ...entries
     ].slice(0, 30);
 
     saveEntries(entries);
-    renderEntries(entries);
+    renderEntries(list, entries);
     form.reset();
     nameInput.focus();
+
+    if (notice) {
+      notice.textContent = 'Saved on this browser. Swap to a shared backend later if you want a public guestbook.';
+    }
   });
 }
+
+setupGuestbook();
 
EOF
)
