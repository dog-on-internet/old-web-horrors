// snow.js — recreates the old "broken image icon" snowfall bug as a feature.
// Instead of hearts (or whatever the page intended), broken-image placeholder
// icons drift down the screen, because the original image file was missing.

(function () {
  const container = document.createElement('div');
  container.id = 'snowfall';
  document.body.appendChild(container);

  const FLAKE_COUNT = 25;

  function makeBrokenImageFlake() {
    const img = document.createElement('img');
    // Intentionally broken src so the browser renders its native
    // "broken image" icon — that's the whole joke.
    img.src = 'this-image-does-not-exist-' + Math.random().toString(36).slice(2) + '.gif';
    img.alt = 'X';
    img.style.position = 'absolute';
    img.style.width = '24px';
    img.style.height = '24px';
    img.style.left = Math.random() * 100 + 'vw';
    img.style.top = '-30px';
    img.style.opacity = 0.85;

    const duration = 6 + Math.random() * 8;
    const drift = (Math.random() - 0.5) * 100;

    img.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)` },
        { transform: `translate(${drift}px, 110vh) rotate(${Math.random() > 0.5 ? 360 : -360}deg)` },
      ],
      {
        duration: duration * 1000,
        easing: 'linear',
      }
    );

    container.appendChild(img);
    setTimeout(() => img.remove(), duration * 1000);
  }

  for (let i = 0; i < FLAKE_COUNT; i++) {
    setTimeout(makeBrokenImageFlake, Math.random() * 4000);
  }

  setInterval(makeBrokenImageFlake, 900);
})();
