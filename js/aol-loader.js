// aol-loader.js — recreates the old "AOL Web Browser Simulator" prank:
// text appears to load in character-by-character, then stalls partway
// through the sentence and never finishes.

(function () {
  document.querySelectorAll('.aol-loading').forEach((el) => {
    const fullText = el.getAttribute('data-text') || el.textContent;
    const stallAt = Math.floor(fullText.length * (0.4 + Math.random() * 0.3)); // stall 40-70% through
    el.textContent = '';

    let i = 0;
    function typeChar() {
      if (i >= stallAt) {
        // stall forever — add a blinking cursor to sell the "still loading" bit
        const cursor = document.createElement('span');
        cursor.className = 'blink';
        cursor.textContent = '_';
        el.appendChild(cursor);
        setInterval(() => {
          cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
        return;
      }
      el.textContent += fullText[i];
      i++;
      setTimeout(typeChar, 40 + Math.random() * 80);
    }
    typeChar();
  });
})();
