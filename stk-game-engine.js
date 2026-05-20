/* ════════════════════════════════════════════
   STK ARCHITECTURE — GAME ENGINE PARTAGÉ
   Utilisé par chaque manche via stk-game-engine.js
════════════════════════════════════════════ */

let G = {
  cards: [], flipped: [], matched: [],
  locked: false, moves: 0, score: 0,
  startTime: null, timerInt: null, elapsed: 0
};

/* ── Navigation ── */
function goHome() {
  clearInterval(G.timerInt);
  window.location.href = 'index.html';
}
function goToRound(n) {
  clearInterval(G.timerInt);
  window.location.href = 'manche' + n + '.html';
}
function restartRound() {
  document.getElementById('overlay-complete').classList.remove('show');
  initRound();
}

/* ── Shuffle ── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* ── Timer ── */
function startTimer(pairCount) {
  const fill = document.getElementById('timer-fill');
  const txt  = document.getElementById('timer-text');
  const max  = pairCount * 30;
  fill.style.width = '100%';
  clearInterval(G.timerInt);
  G.timerInt = setInterval(() => {
    G.elapsed = Math.floor((Date.now() - G.startTime) / 1000);
    const pct = Math.max(0, 100 - (G.elapsed / max * 100));
    fill.style.width = pct + '%';
    fill.style.background = pct < 25 ? '#C0392B' : pct < 55 ? '#E67E22' : '#7A9668';
    txt.textContent = G.elapsed + 's';
  }, 1000);
}

/* ── Make card element (toujours face visible) ── */
function makeCard(card, style) {
  const el = document.createElement('div');
  el.className = 'card style-' + style + ' always-visible';
  el.dataset.uid    = card.uid;
  el.dataset.pairId = card.pairId;
  el.innerHTML = `
    <div class="card-face card-front">
      <div class="card-emoji">${card.emoji}</div>
      <div class="card-label">${card.label}</div>
    </div>`;
  el.addEventListener('click', () => selectCard(card.uid));
  return el;
}

/* ── Selection logic ── */
function selectCard(uid) {
  if (G.locked) return;
  if (G.matched.flat().includes(uid)) return;
  if (G.flipped.includes(uid)) {
    document.querySelector(`.card[data-uid="${uid}"]`).classList.remove('selected');
    G.flipped = G.flipped.filter(u => u !== uid);
    return;
  }
  const el = document.querySelector(`.card[data-uid="${uid}"]`);
  el.classList.add('selected');
  G.flipped.push(uid);
  if (G.flipped.length === 2) {
    G.locked = true;
    G.moves++;
    updateDisplays();
    checkMatch();
  }
}

function checkMatch() {
  const [u1, u2] = G.flipped;
  const c1 = G.cards.find(c => c.uid === u1);
  const c2 = G.cards.find(c => c.uid === u2);

  if (c1.pairId === c2.pairId) {
    setTimeout(() => {
      [u1, u2].forEach(u => {
        const el = document.querySelector(`.card[data-uid="${u}"]`);
        el.classList.remove('selected');
        el.classList.add('matched');
      });
      G.matched.push([u1, u2]);
      const bonus = Math.max(0, 80 - G.moves * 4);
      G.score += 100 + bonus;
      showEdu(c1.edu);
      showBlossom();
      showConnexionLabel();
      updateProgress();
      updateDisplays();
      G.flipped = [];
      G.locked  = false;
      if (typeof onMatchFound === 'function') onMatchFound(G.matched.length);
      if (G.matched.length === ROUND_DATA.pairs.length) {
        setTimeout(roundComplete, 700);
      }
    }, 300);
  } else {
    [u1, u2].forEach(u => {
      document.querySelector(`.card[data-uid="${u}"]`).classList.add('error');
    });
    setTimeout(() => {
      [u1, u2].forEach(u => {
        const el = document.querySelector(`.card[data-uid="${u}"]`);
        el.classList.remove('selected', 'error');
      });
      G.flipped = [];
      G.locked  = false;
    }, 700);
  }
}

/* ── Progress ── */
function updateProgress() {
  const total = ROUND_DATA.pairs.length;
  for (let i = 0; i < total; i++) {
    const d = document.getElementById('pd-' + i);
    if (!d) continue;
    d.classList.remove('done', 'active');
    if (i < G.matched.length) d.classList.add('done');
    else if (i === G.matched.length) d.classList.add('active');
  }
}

/* ── Blossom ── */
function showBlossom() {
  const b = document.getElementById('blossom-overlay');
  b.classList.add('show');
  setTimeout(() => b.classList.remove('show'), 950);
}

/* ── Connexion label ── */
function showConnexionLabel() {
  const lbl = document.getElementById('connexion-label');
  lbl.textContent = ROUND_DATA.connexionLabel;
  lbl.classList.add('show');
  setTimeout(() => lbl.classList.remove('show'), 2200);
}

/* ── Edu panel ── */
function showEdu(edu) {
  document.getElementById('edu-panel').innerHTML = `
    <div class="edu-images">
      <div class="edu-img-box">${edu.emojiA}</div>
      <div class="edu-img-box">${edu.emojiB}</div>
    </div>
    <div class="edu-pair-name">${edu.title}</div>
    <div class="edu-dash">${edu.desc}</div>
  `;
}

/* ── Displays ── */
function updateDisplays() {
  document.getElementById('score-num').textContent   = G.score;
  document.getElementById('moves-num').textContent   = G.moves;
  document.getElementById('matches-num').textContent = G.matched.length;
}

/* ── Round complete ── */
function roundComplete() {
  clearInterval(G.timerInt);
  G.elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  launchConfetti();
  document.getElementById('ov-round').textContent = ROUND_DATA.roundNum;
  document.getElementById('ov-score').textContent = G.score;
  document.getElementById('ov-moves').textContent = G.moves;
  document.getElementById('ov-time').textContent  = G.elapsed + 's';
  const btnNext = document.getElementById('btn-next-round');
  if (ROUND_DATA.roundNum < 4) {
    btnNext.style.display = '';
    btnNext.textContent   = 'Manche ' + (ROUND_DATA.roundNum + 1) + ' →';
    btnNext.onclick = () => goToRound(ROUND_DATA.roundNum + 1);
  } else {
    btnNext.style.display = 'none';
  }
  setTimeout(() => document.getElementById('overlay-complete').classList.add('show'), 350);
}

/* ── Confetti ── */
function launchConfetti() {
  const cols = ['#7A9668','#C8B89A','#9AA5A8','#8B6044','#F2A7C3','#D4B870'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}vw;top:${15+Math.random()*45}vh;
      background:${cols[Math.floor(Math.random()*cols.length)]};
      animation-delay:${Math.random()*.55}s;
      animation-duration:${1.2+Math.random()*.9}s;
      transform:rotate(${Math.random()*360}deg);`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

/* ── Init commun ── */
function initRound() {
  clearInterval(G.timerInt);
  G.cards = []; G.flipped = []; G.matched = [];
  G.locked = false; G.moves = 0; G.score = 0;
  G.startTime = Date.now(); G.elapsed = 0;

  /* Progress dots */
  const pr = document.getElementById('progress-row');
  pr.innerHTML = '';
  ROUND_DATA.pairs.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'prog-dot'; d.id = 'pd-' + i;
    pr.appendChild(d);
  });
  updateProgress();

  /* Deck */
  const deck = [];
  ROUND_DATA.pairs.forEach((pair) => {
    deck.push({ uid: pair.id + '-a', pairId: pair.id, emoji: pair.a.emoji, label: pair.a.label, edu: pair.edu });
    deck.push({ uid: pair.id + '-b', pairId: pair.id, emoji: pair.b.emoji, label: pair.b.label, edu: pair.edu });
  });
  shuffle(deck);
  G.cards = deck;

  /* Grid */
  const grid = document.getElementById('cards-grid');
  grid.className = 'cards-grid ' + ROUND_DATA.layout;
  grid.innerHTML = '';
  document.querySelectorAll('.branch-flower').forEach(f => f.remove());
  deck.forEach(c => grid.appendChild(makeCard(c, ROUND_DATA.cardStyle)));

  /* Edu reset */
  document.getElementById('edu-panel').innerHTML =
    '<div class="edu-empty">Trouvez une paire pour découvrir le lien biomimétique…</div>';
  document.getElementById('connexion-label').classList.remove('show');

  updateDisplays();
  startTimer(ROUND_DATA.pairs.length);

  /* Engrave SVG */
  if (typeof ENGRAVING_SVG !== 'undefined') {
    document.getElementById('engraving-svg').innerHTML = ENGRAVING_SVG;
  }
}
