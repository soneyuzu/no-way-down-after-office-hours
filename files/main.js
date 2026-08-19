const ANIM = {
  open: { window: 0.62, backdrop: 0.38, content: 0.34, ease: 'power3.out', contentEase: 'power2.out' },
  close: { window: 0.22, backdrop: 0.16, content: 0.1, ease: 'power2.in', contentEase: 'power2.in' },
  folder: { tilt: 0.32, reset: 0.48, expand: 0.44, ease: 'power3.out' },
  stack: { enter: 0.86, stagger: 0.07, ease: 'power4.out' },
};

const ANIM_MOBILE = {
  open: { window: 0.52, backdrop: 0.28, content: 0.32, ease: 'power4.out', contentEase: 'power3.out' },
  close: { window: 0.28, backdrop: 0.2, content: 0.12, ease: 'power3.in', contentEase: 'power2.in' },
  folder: { tilt: 0, reset: 0, expand: 0, ease: 'power3.out' },
  stack: { enter: 0.56, stagger: 0.05, ease: 'power3.out' },
};

const mqTouch = window.matchMedia('(hover: none), (max-width: 900px)');

function isTouchUI() {
  return mqTouch.matches;
}

function syncTouchClass() {
  document.documentElement.classList.toggle('touch-ui', isTouchUI());
  const hint = document.querySelector('.stage-hint');
  if (hint) {
    hint.textContent = isTouchUI()
      ? 'Tap a file to open the dossier'
      : 'Hover a file · click to open the dossier';
  }
}

function anim() {
  return isTouchUI() ? ANIM_MOBILE : ANIM;
}

const folders = [
  {
    id: 'code-001', type: 'code', character: { name: 'ELAT', image: 'elat.webp', side: 'left' },
    tab: { label: 'ELAT' }, code: 'ELT-001',
    theme: {
      primary: '#e8e2d8', secondary: '#d8e0dc', tab: '#c5d4cf', tabText: '#2d302d',
      accent: '#6b84a5', text: '#2d302d', muted: '#7b8d87', highlight: '#524d49', hoverAccent: '#5a7394', nameColor: '#6b84a5',
    },
    oc: {
      name: 'ELAT', number: '001',
      soundtrack: { title: "Chagall's Dream", audio: 'public/music/elat-chagalls-dream.mp3' },
      profile: { mbti: 'INFJ', hobbies: ['Plants, photography, poetry'], likes: ['Cats, classic novels, rainy weather'], dislikes: ['Spiders, superficiality, noise'], favoriteFood: 'Fruit tarts', leastFavoriteFood: 'Spicy and greasy foods' },
      accent: '#6b84a5', dark: '#524d49', paper: '#ede8df', ink: '#2d302d', soft: '#7b8d87', muted: '#b3aba3', highlight: '#5a7394', hoverAccent: '#6b84a5',
    },
  },
  {
    id: 'code-002', type: 'code', character: { name: 'EVREN', image: 'evren.webp', side: 'right' },
    tab: { label: 'EVREN' }, code: 'EVR-002',
    theme: {
      primary: '#f2efe9', secondary: '#e8e4de', tab: '#683a43', tabText: '#f2efe9',
      accent: '#683a43', text: '#262727', muted: '#b1adac', highlight: '#68844c', hoverAccent: '#7a4550', nameColor: '#683a43',
    },
    oc: {
      name: 'EVREN', number: '002',
      soundtrack: { title: 'TRACK TO BE ADDED', url: '' },
      profile: { mbti: '', hobbies: [], likes: [], dislikes: [], favoriteFood: '', leastFavoriteFood: '' },
      accent: '#683a43', dark: '#2f3438', paper: '#eeece7', ink: '#262727', soft: '#b1adac', muted: '#988f8e', highlight: '#68844c', hoverAccent: '#7a4550',
    },
  },
  {
    id: 'code-003', type: 'code', character: { name: 'ISARN', image: 'isarn.webp', side: 'right' },
    tab: { label: 'ISARN' }, code: 'ISR-003',
    theme: {
      primary: '#ece7de', secondary: '#e2dcd3', tab: '#a89aa8', tabText: '#2b2929',
      accent: '#a89aa8', text: '#302d2d', muted: '#6d5c58', highlight: '#bba99d', hoverAccent: '#9788a0', nameColor: '#8a7a96',
    },
    oc: {
      name: 'ISARN', number: '003', 
      soundtrack: { title: 'TRACK TO BE ADDED', url: '' },
      profile: { mbti: '', hobbies: [], likes: [], dislikes: [], favoriteFood: '', leastFavoriteFood: '' },
      accent: '#a89aa8', dark: '#2b2929', paper: '#ece7de', ink: '#302d2d', soft: '#6d5c58', muted: '#9a8e8c', highlight: '#bba99d', hoverAccent: '#9788a0',
    },
  },
  {
    id: 'code-004', type: 'code', character: { name: 'YEFIM', image: 'yefim.webp', side: 'left' },
    tab: { label: 'YEFIM' }, code: 'YFM-004',
    theme: {
      primary: '#dfe3e4', secondary: '#cfd4d6', tab: '#17191a', tabText: '#ecebe8',
      accent: '#566f73', text: '#202222', muted: '#8e9899', highlight: '#17191a', hoverAccent: '#4a6368', nameColor: '#566f73',
    },
    oc: {
      name: 'YEFIM', number: '004',
      soundtrack: { title: 'TRACK TO BE ADDED', url: '' },
      profile: { mbti: '', hobbies: [], likes: [], dislikes: [], favoriteFood: '', leastFavoriteFood: '' },
      accent: '#566f73', dark: '#17191a', paper: '#e6e8e6', ink: '#202222', soft: '#8e9899', muted: '#bfc0c0', highlight: '#3f4244', hoverAccent: '#4a6368',
    },
  },
  {
    id: 'code-005', type: 'code', character: { name: 'YUMIN', image: 'yumin.webp', side: 'right' },
    tab: { label: 'YUMIN' }, code: 'YMN-005',
    theme: {
      primary: '#e8e4db', secondary: '#d9d4c8', tab: '#44504f', tabText: '#e8e4db',
      accent: '#71819a', text: '#272b2a', muted: '#97998f', highlight: '#44504f', hoverAccent: '#5f7088', nameColor: '#71819a',
    },
    oc: {
      name: 'YUMIN', number: '005',
      soundtrack: { title: 'TRACK TO BE ADDED', url: '' },
      profile: { mbti: '', hobbies: [], likes: [], dislikes: [], favoriteFood: '', leastFavoriteFood: '' },
      accent: '#71819a', dark: '#2c302f', paper: '#e8e4db', ink: '#272b2a', soft: '#97998f', muted: '#c9c5b7', highlight: '#44504f', hoverAccent: '#5f7088',
    },
  },
];

const stack = document.getElementById('folderStack');
const overlay = document.getElementById('moodOverlay');
const backdrop = document.getElementById('moodBackdrop');
const moodWindow = document.getElementById('moodWindow');
const moodContent = document.getElementById('moodContent');
const closeBtn = document.getElementById('moodClose');
const ambientCanvas = document.getElementById('ambientCanvas');

let activeFolder = null;
let isAnimating = false;

function themeVars(theme = {}) {
  if (!theme.primary) return '';
  return [
    `--folder-primary:${theme.primary}`,
    `--folder-secondary:${theme.secondary || theme.primary}`,
    `--folder-tab:${theme.tab || theme.primary}`,
    `--folder-tab-text:${theme.tabText || theme.text || '#111'}`,
    `--folder-accent:${theme.accent}`,
    `--folder-text:${theme.text || '#111'}`,
    `--folder-muted:${theme.muted || theme.text}`,
    `--folder-highlight:${theme.highlight || theme.accent}`,
    `--folder-hover:${theme.hoverAccent || theme.accent}`,
    `--folder-name:#111111`,
  ].join(';');
}

function moodThemeVars(oc = {}) {
  return [
    `--accent:${oc.accent}`,
    `--dark:${oc.dark}`,
    `--paper:${oc.paper}`,
    `--ink:${oc.ink}`,
    `--soft:${oc.soft}`,
    `--muted:${oc.muted || oc.soft}`,
    `--highlight:${oc.highlight || oc.dark}`,
    `--hover-accent:${oc.hoverAccent || oc.accent}`,
  ].join(';');
}

function escapeHtml(value = '') {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
}

function characterPeek(folder) {
  if (!folder.character) return '';
  // On mobile/touch, skip character images entirely (no hover preview)
  if (isTouchUI()) return '';
  const base = folder.character.image.replace('.webp', '');
  return `
    <div class="character-peek character-peek--${folder.character.side}" aria-hidden="true">
      <img src="public/characters/${base}_normalized.webp" alt="" draggable="false" decoding="async">
    </div>`;
}

function renderFolderBody(folder) {
  const characterName = folder.character?.name || '';
  return `
    <div class="code-content">
      <div class="code-label">${folder.code}</div>
      <div class="code-graphic">
        <div class="fortune-text folder-character-name">${escapeHtml(characterName.toUpperCase())}</div>
      </div>
      <div class="code-edge" aria-hidden="true"></div>
    </div>`;
}

function renderFolders() {
  stack.innerHTML = folders.map((folder, i) => {
    const themeStyle = folder.theme ? themeVars(folder.theme) : '';
    return `
      <article
        class="folder folder--${folder.id}"
        data-id="${folder.id}"
        data-index="${i}"
        style="z-index:${folders.length - i};${themeStyle}"
      >
        <div class="folder-slot">
          <div class="folder-surface">
            <div class="folder-body">
              ${characterPeek(folder)}
              <div class="folder-shimmer" aria-hidden="true"></div>
              <div class="folder-edge-shadow" aria-hidden="true"></div>
            </div>
          </div>
          <div class="folder-chrome">
            <div class="folder-tab">${folder.tab.label}</div>
            ${renderFolderBody(folder)}
          </div>
        </div>
      </article>`;
  }).join('');

  const stackAnim = anim().stack;
  if (isTouchUI()) {
    gsap.from('.folder', {
      y: 18,
      opacity: 0,
      duration: stackAnim.enter,
      stagger: stackAnim.stagger,
      ease: stackAnim.ease,
      delay: 0.06,
      force3D: true,
    });
  } else {
    gsap.from('.folder', {
      x: -48,
      opacity: 0,
      duration: stackAnim.enter,
      stagger: stackAnim.stagger,
      ease: stackAnim.ease,
      delay: 0.08,
      force3D: true,
    });
  }

  initFolderInteractions();
}

function listItems(items, emptyLabel = 'TO BE ADDED') {
  return (items && items.length)
    ? items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
    : `<li class="is-empty">${escapeHtml(emptyLabel)}</li>`;
}

function mbtiValue(value = '') {
  const text = value.trim();
  return text
    ? `<p class="mbti-value">${escapeHtml(text.toUpperCase())}</p>`
    : `<p class="mbti-value is-empty">TO BE ADDED</p>`;
}

function audioPlayer(song = {}) {
  const title = song.title || 'TRACK TO BE ADDED';
  const src = song.audio || '';
  if (!src) {
    return `
      <div class="audio-empty">
        <span class="audio-empty-mark">♪</span>
        <div>
          <span class="audio-kicker">FAVOURITE SONG</span>
          <strong>TRACK TO BE ADDED</strong>
        </div>
      </div>`;
  }

  const barCount = isTouchUI() ? 0 : 36;
  const bars = Array.from({ length: barCount }, (_, i) => `<i style="--h:${18 + ((i * 17) % 68)}%"></i>`).join('');
  return `
    <div class="audio-player" data-audio-src="${escapeHtml(src)}">
      <audio preload="metadata" src="${escapeHtml(src)}"></audio>
      <div class="audio-top">
        <div class="audio-mark" aria-hidden="true"><span>♪</span></div>
        <div class="audio-copy">
          <span class="audio-kicker">FAVOURITE SONG</span>
          <strong>${escapeHtml(title)}</strong>
        </div>
        <button class="audio-play" type="button" data-audio-toggle aria-label="Play or pause">
          <span class="audio-play-icon">▶</span>
          <span class="audio-play-label">PLAY</span>
        </button>
      </div>
      <div class="audio-progress-row">
        <span class="audio-time" data-audio-current>0:00</span>
        <input class="audio-range" data-audio-range type="range" min="0" max="100" value="0" step="0.1" aria-label="Song progress">
        <span class="audio-time" data-audio-duration>0:00</span>
      </div>
      <div class="audio-wave" aria-hidden="true">${bars}</div>
    </div>`;
}

function buildMoodBoard(folder) {
  const oc = folder.oc;
  const profile = oc.profile || {};
  const themeStyle = moodThemeVars(oc);
  const imageBase = folder.character.image.replace('.webp', '');

  const food = `
    <div class="food-pair">
      <div><span>FAVOURITE</span><strong>${escapeHtml(profile.favoriteFood || 'TO BE ADDED')}</strong></div>
      <div><span>LEAST FAVOURITE</span><strong>${escapeHtml(profile.leastFavoriteFood || 'TO BE ADDED')}</strong></div>
    </div>`;

  return `
    <div class="mood-board mood-unified" style="${themeStyle}">
      <div class="mood-bg-texture" aria-hidden="true"></div>
      <div class="mood-bg-accent" aria-hidden="true"></div>

      <header class="archive-topline">
        <button class="archive-close" type="button" data-close-mood aria-label="Close moodboard"><span>CLOSE</span><strong>×</strong></button>
      </header>

      <main class="mood-canvas">
        <section class="hero-identity">
          <div class="hero-index">${String(oc.number).padStart(2, '0')}</div>
          <div class="hero-copy">
            <h1>${escapeHtml(oc.name)}</h1>
            <p>character dossier · file ${escapeHtml(String(oc.number).padStart(2, '0'))}</p>
          </div>
        </section>

        <figure class="portrait-module" data-tilt>
          <div class="portrait-window">
            <div class="portrait-glow" aria-hidden="true"></div>
            <div class="portrait-frame-corner portrait-frame-corner--tl" aria-hidden="true"></div>
            <div class="portrait-frame-corner portrait-frame-corner--br" aria-hidden="true"></div>
            <img src="public/characters/${imageBase}_normalized.webp" alt="${escapeHtml(oc.name)}" draggable="false" decoding="async">
          </div>
        </figure>

        <section class="facts-module">
          <div class="fact-list">
            <article class="fact-row fact-mbti" data-fact="01"><div class="fact-num">01</div><div class="fact-copy"><h2>MBTI</h2>${mbtiValue(profile.mbti)}</div></article>
            <article class="fact-row" data-fact="02"><div class="fact-num">02</div><div class="fact-copy"><h2>HOBBIES</h2><ul>${listItems(profile.hobbies)}</ul></div></article>
            <article class="fact-row" data-fact="03"><div class="fact-num">03</div><div class="fact-copy"><h2>LIKES</h2><ul>${listItems(profile.likes)}</ul></div></article>
            <article class="fact-row" data-fact="04"><div class="fact-num">04</div><div class="fact-copy"><h2>DISLIKES</h2><ul>${listItems(profile.dislikes)}</ul></div></article>
            <article class="fact-row fact-food" data-fact="05"><div class="fact-num">05</div><div class="fact-copy"><h2>FOOD</h2>${food}</div></article>
          </div>
        </section>

        <section class="sound-module">
          ${audioPlayer(oc.soundtrack)}
        </section>
      </main>
    </div>`;
}

function openMoodBoard(folderEl, folder) {
  if (isAnimating || !folder.oc) return;
  isAnimating = true;
  activeFolder = folderEl;

  const rect = folderEl.getBoundingClientRect();
  moodContent.innerHTML = buildMoodBoard(folder);
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('mood-open');

  const openAnim = anim().open;
  const mobile = isTouchUI();

  if (mobile) {
    gsap.set(moodWindow, {
      x: 0,
      y: 0,
      yPercent: 100,
      scale: 1,
      opacity: 1,
      rotation: 0,
      transformOrigin: 'center bottom',
      force3D: true,
    });
    gsap.set(backdrop, { opacity: 0 });
  } else {
    gsap.set(moodWindow, {
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
      scale: 0.12,
      opacity: 0,
      rotation: -1.8,
      transformOrigin: 'center center',
      force3D: true,
    });
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      attachMoodInteractions();
    },
  });

  tl.to(backdrop, { opacity: 1, duration: openAnim.backdrop, ease: 'power2.out' }, 0);

  if (mobile) {
    tl.to(moodWindow, {
      yPercent: 0,
      duration: openAnim.window,
      ease: openAnim.ease,
      force3D: true,
    }, 0);
  } else {
    tl.to(moodWindow, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: openAnim.window,
      ease: openAnim.ease,
      force3D: true,
    }, 0);
  }

  if (!mobile) {
    tl.from('.archive-topline', { y: -14, opacity: 0, duration: openAnim.content, ease: openAnim.contentEase }, 0.22)
      .from('.hero-identity > *', { y: 20, opacity: 0, duration: openAnim.content, stagger: 0.05, ease: openAnim.contentEase }, 0.26)
      .from('.portrait-module', { x: -24, opacity: 0, scale: 0.98, duration: 0.44, ease: openAnim.contentEase }, 0.3)
      .from('.fact-row', { x: 18, opacity: 0, duration: openAnim.content, stagger: 0.05, ease: openAnim.contentEase }, 0.34)
      .from('.sound-module', { y: 14, opacity: 0, duration: 0.34, ease: openAnim.contentEase }, 0.48);
    gsap.to('.folder:not(.folder--active)', { opacity: 0.14, scale: 0.99, duration: 0.38, ease: 'power2.out' });
  } else {
    // On mobile, ensure all content is immediately visible (no stale gsap state)
    gsap.set(['.archive-topline', '.hero-identity', '.hero-identity > *', '.portrait-module', '.portrait-window img', '.fact-row', '.sound-module', '.mood-canvas'], { opacity: 1, visibility: 'visible', clearProps: 'transform' });
  }

  folderEl.classList.add('folder--active');
}

function closeMoodBoard() {
  if (isAnimating || !activeFolder) return;
  isAnimating = true;

  const folderEl = activeFolder;
  const rect = folderEl.getBoundingClientRect();
  const audio = moodContent.querySelector('audio');
  if (audio) audio.pause();

  const closeAnim = anim().close;
  const mobile = isTouchUI();

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      moodContent.innerHTML = '';
      folderEl.classList.remove('folder--active');
      activeFolder = null;
      isAnimating = false;
      document.body.classList.remove('mood-open');
      gsap.set(moodWindow, { clearProps: 'all' });
      gsap.set(backdrop, { clearProps: 'opacity' });
    },
  });

  if (mobile) {
    tl.to(moodWindow, {
      yPercent: 100,
      duration: closeAnim.window,
      ease: closeAnim.ease,
      force3D: true,
    }, 0)
      .to(backdrop, { opacity: 0, duration: closeAnim.backdrop, ease: 'power2.in' }, 0);
  } else {
    tl.to('.mood-board > *', { opacity: 0, y: -6, duration: closeAnim.content, stagger: 0.008, ease: closeAnim.contentEase }, 0)
      .to(backdrop, { opacity: 0, duration: closeAnim.backdrop, ease: 'power2.in' }, 0.02)
      .to(moodWindow, {
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: 0.1,
        opacity: 0,
        rotation: 1.2,
        duration: closeAnim.window,
        ease: closeAnim.ease,
        force3D: true,
      }, 0)
      .to('.folder', { opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' }, 0.04);
  }
}

function formatTime(value = 0) {
  const sec = Math.max(0, Math.floor(value));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

function attachAudioPlayers() {
  moodContent.querySelectorAll('.audio-player').forEach((shell) => {
    const audio = shell.querySelector('audio');
    const button = shell.querySelector('[data-audio-toggle]');
    const range = shell.querySelector('[data-audio-range]');
    const current = shell.querySelector('[data-audio-current]');
    const duration = shell.querySelector('[data-audio-duration]');
    const label = shell.querySelector('.audio-play-label');
    const icon = shell.querySelector('.audio-play-icon');

    const sync = () => {
      const playing = !audio.paused;
      shell.classList.toggle('is-playing', playing);
      label.textContent = playing ? 'PAUSE' : 'PLAY';
      icon.textContent = playing ? 'Ⅱ' : '▶';
      current.textContent = formatTime(audio.currentTime);
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        duration.textContent = formatTime(audio.duration);
        range.value = String((audio.currentTime / audio.duration) * 100);
      }
    };

    button.addEventListener('click', async () => {
      if (audio.paused) {
        try { await audio.play(); } catch { /* autoplay blocked */ }
      } else {
        audio.pause();
      }
      sync();
    });

    ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended'].forEach((evt) => {
      audio.addEventListener(evt, () => {
        if (evt === 'ended') audio.currentTime = 0;
        sync();
      });
    });

    range.addEventListener('input', () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = (Number(range.value) / 100) * audio.duration;
      }
    });

    shell.querySelectorAll('.audio-wave i').forEach((bar, i) => {
      bar.style.setProperty('--i', i);
    });

    sync();
  });
}

function attachPortraitTilt() {
  if (isTouchUI()) return;
  const module = moodContent.querySelector('[data-tilt]');
  if (!module) return;

  const windowEl = module.querySelector('.portrait-window');
  const img = module.querySelector('img');
  const rotY = gsap.quickTo(windowEl, 'rotateY', { duration: 0.45, ease: 'power2.out' });
  const rotX = gsap.quickTo(windowEl, 'rotateX', { duration: 0.45, ease: 'power2.out' });
  const imgX = gsap.quickTo(img, 'x', { duration: 0.5, ease: 'power2.out' });
  const imgY = gsap.quickTo(img, 'y', { duration: 0.5, ease: 'power2.out' });

  module.addEventListener('mousemove', (e) => {
    const rect = module.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotY(x * 7);
    rotX(-y * 5);
    imgX(x * 10);
    imgY(y * 6);
  });

  module.addEventListener('mouseleave', () => {
    rotY(0);
    rotX(0);
    imgX(0);
    imgY(0);
  });
}

function attachMoodInteractions() {
  moodContent.querySelectorAll('[data-close-mood]').forEach((btn) => {
    btn.addEventListener('click', closeMoodBoard);
  });

  attachAudioPlayers();
  attachPortraitTilt();
}

function folderCollapseRatio(folder) {
  const surface = folder.querySelector('.folder-surface');
  if (!surface) return 0.4;
  const base = folder.offsetWidth || 1;
  const expanded = surface.offsetWidth || base;
  return Math.min(1, base / expanded);
}

const folderControls = new Map();

function collapseOtherFolders(except) {
  folderControls.forEach((ctrl, folder) => {
    if (folder !== except) ctrl.collapse();
  });
}

function initFolderInteractions() {
  folderControls.clear();
  const folderAnim = anim().folder;
  const touch = isTouchUI();

  stack.querySelectorAll('.folder').forEach((folder) => {
    const surface = folder.querySelector('.folder-surface');
    const peekImg = folder.querySelector('.character-peek img');
    let expanded = false;
    let baseRatio = folderCollapseRatio(folder);

    if (touch) {
      gsap.set(surface, { scaleX: 1, clearProps: 'transform', force3D: false });
      folderControls.set(folder, {
        expand: () => {},
        collapse: () => {},
        isExpanded: () => false,
      });
      return;
    }

    const scaleX = gsap.quickTo(surface, 'scaleX', { duration: folderAnim.expand, ease: folderAnim.ease });
    const tiltX = gsap.quickTo(folder, 'rotateY', { duration: folderAnim.tilt, ease: folderAnim.ease });
    const tiltY = gsap.quickTo(folder, 'rotateX', { duration: folderAnim.tilt, ease: folderAnim.ease });
    const peekY = peekImg ? gsap.quickTo(peekImg, 'y', { duration: 0.42, ease: 'power2.out' }) : null;
    const peekScale = peekImg ? gsap.quickTo(peekImg, 'scale', { duration: 0.42, ease: 'power2.out' }) : null;

    gsap.set(surface, { scaleX: baseRatio, transformOrigin: 'left center', force3D: true });

    const expand = () => {
      if (activeFolder) return;
      expanded = true;
      folder.classList.add('folder--expanded');
      scaleX(1);
      if (peekY) peekY(-8);
      if (peekScale) peekScale(1.03);
    };

    const collapse = () => {
      expanded = false;
      folder.classList.remove('folder--expanded');
      scaleX(baseRatio);
      gsap.to(folder, { rotateY: 0, rotateX: 0, duration: folderAnim.reset, ease: 'power3.out' });
      if (peekY) peekY(0);
      if (peekScale) peekScale(1);
    };

    folderControls.set(folder, {
      expand,
      collapse,
      isExpanded: () => expanded,
    });

    const resetRatio = () => {
      baseRatio = folderCollapseRatio(folder);
      if (!expanded) scaleX(baseRatio);
    };

    window.addEventListener('resize', resetRatio);

    folder.addEventListener('mouseenter', () => {
      if (activeFolder) return;
      expand();
    });

    folder.addEventListener('mouseleave', () => {
      collapse();
    });

    folder.addEventListener('mousemove', (e) => {
      if (!expanded) return;
      const rect = folder.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
      tiltX(x);
      tiltY(-y);
    });
  });
}

function initAmbientCanvas() {
  if (!ambientCanvas) return;
  if (isTouchUI()) {
    ambientCanvas.width = 0;
    ambientCanvas.height = 0;
    ambientCanvas.style.display = 'none';
    return;
  }
  const ctx = ambientCanvas.getContext('2d');
  let w = 0;
  let h = 0;
  let frame = 0;
  const dots = [];

  const resize = () => {
    w = ambientCanvas.width = window.innerWidth;
    h = ambientCanvas.height = window.innerHeight;
    dots.length = 0;
    const count = Math.min(42, Math.floor(w * h / 32000));
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.25,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.28 + 0.06,
      });
    }
  };

  const draw = () => {
    frame += 1;
    if (frame % 2 === 0) {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 228, 216, ${d.a})`;
        ctx.fill();
      });
    }
    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize);
}

let tapGuard = { x: 0, y: 0, tracking: false, moved: false };

stack.addEventListener('pointerdown', (e) => {
  tapGuard = { x: e.clientX, y: e.clientY, tracking: true, moved: false };
});

stack.addEventListener('pointermove', (e) => {
  if (!tapGuard.tracking) return;
  if (Math.abs(e.clientX - tapGuard.x) > 12 || Math.abs(e.clientY - tapGuard.y) > 12) {
    tapGuard.moved = true;
  }
});

stack.addEventListener('pointerup', () => {
  tapGuard.tracking = false;
});

stack.addEventListener('pointercancel', () => {
  tapGuard.tracking = false;
  tapGuard.moved = true;
});

stack.addEventListener('click', (e) => {
  if (tapGuard.moved) return;
  const folderEl = e.target.closest('.folder');
  if (!folderEl || isAnimating) return;
  const folder = folders.find((f) => f.id === folderEl.dataset.id);
  if (!folder) return;
  openMoodBoard(folderEl, folder);
});

closeBtn.addEventListener('click', closeMoodBoard);
backdrop.addEventListener('click', closeMoodBoard);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMoodBoard();
});

syncTouchClass();
mqTouch.addEventListener('change', syncTouchClass);

renderFolders();
initAmbientCanvas();
