const PIP_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M15 3h6v6M21 3l-7 7"/></svg>`;

const attached = new WeakSet();

function isVisible(video) {
  const rect = video.getBoundingClientRect();
  return rect.width > 80 && rect.height > 50;
}

function getAnchor(video) {
  // Trouve un parent positionné proche de la vidéo pour insérer le wrapper
  let el = video.parentElement;
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    if (style.position !== 'static') return el;
    el = el.parentElement;
  }
  return null;
}

function attachButton(video) {
  if (attached.has(video) || !isVisible(video)) return;

  // Le parent direct doit être positionné pour que `position:absolute` fonctionne
  const parent = video.parentElement;
  if (!parent) return;

  const parentStyle = getComputedStyle(parent);
  if (parentStyle.position === 'static') {
    parent.style.position = 'relative';
  }

  const btn = document.createElement('button');
  btn.className = 'vd-btn';
  btn.innerHTML = `${PIP_ICON} Float`;
  btn.title = 'Float on top of all windows';

  parent.appendChild(btn);
  attached.add(video);

  // Afficher le bouton au survol de la vidéo ou du bouton lui-même
  let hideTimer = null;

  const show = () => {
    clearTimeout(hideTimer);
    btn.classList.add('vd-visible');
  };

  const hide = () => {
    hideTimer = setTimeout(() => btn.classList.remove('vd-visible'), 300);
  };

  video.addEventListener('mouseenter', show);
  video.addEventListener('mouseleave', hide);
  btn.addEventListener('mouseenter', show);
  btn.addEventListener('mouseleave', hide);

  // Afficher aussi quand la vidéo démarre
  video.addEventListener('play', () => {
    show();
    setTimeout(hide, 2500);
  });

  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
      if (video.paused) await video.play().catch(() => {});
      await video.requestPictureInPicture();
    } catch (err) {
      console.warn('[VideoDetach]', err.message);
    }
  });
}

function scanVideos() {
  document.querySelectorAll('video').forEach(attachButton);
}

// Scan initial
scanVideos();

// Observer les ajouts dynamiques (SPA, lazy load)
const observer = new MutationObserver(() => scanVideos());
observer.observe(document.body, { childList: true, subtree: true });
