/* =============================================================
   STK Architecture — Biomimétisme : Le Jeu
   Logique principale du jeu d'association.
   ============================================================= */

(() => {
  'use strict';

  // -----------------------------------------------------------
  // CONFIGURATION
  // -----------------------------------------------------------
  const CONFIG = {
    dataPath: 'data.json',
    storageKey: 'stk-biomim-state-v2',
    slotsPerRound: 12,            // grille 4x3
    pairsPerRound: 5,             // 5 paires = 10 cartes + 2 vides
    hintDuration: 6000,           // 6s d'affichage de l'indice (5-7s)
    cardRevealStagger: 40,        // ms entre l'apparition de chaque carte
    correctAnimDuration: 650,     // ms — temps avant d'ouvrir la modale
    wrongResetDuration: 900       // ms avant de désélectionner après erreur
  };

  // Mapping des manches aux saisons
  const SEASON_MAP = {
    1: 'spring',
    2: 'summer',
    3: 'autumn',
    4: 'winter'
  };

  // -----------------------------------------------------------
  // ÉTAT
  // -----------------------------------------------------------
  const state = {
    data: null,                   // contenu de data.json
    currentRound: 1,              // 1..4
    foundByRound: {},             // { 1: ['r1-p1', ...], 2: [...] }
    erroredCards: {},             // { 'r1-p1__bio': true, ... }
    layoutByRound: {},            // { 1: [<slotConfig>...], ... }
    selected: [],                 // tableau de 0 à 2 cartes en cours de sélection
    locked: false,                // bloque les clics pendant l'animation
    hintTimer: null
  };

  // -----------------------------------------------------------
  // DOM — sélecteurs réutilisés
  // -----------------------------------------------------------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const els = {
    seasonalBg: null,
    viewLanding: null,
    viewGame: null,
    btnStart: null,
    btnQuit: null,
    board: null,
    phase: null,
    roundTitle: null,
    found: null,
    total: null,

    hintToast: null,
    hintToastText: null,

    modalPair: null,
    modalPairTitle: null,
    modalPairBioName: null,
    modalPairArchiName: null,
    modalPairBioImg: null,
    modalPairArchiImg: null,
    modalPairText: null,
    modalPairContinue: null,

    modalRound: null,
    modalRoundTitle: null,
    modalRoundText: null,
    modalRoundFill: null,
    modalRoundPercent: null,
    modalRoundContinue: null,

    modalEnd: null,
    modalEndRestart: null,
    modalEndClose: null
  };

  // -----------------------------------------------------------
  // UTILITAIRES
  // -----------------------------------------------------------
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // -----------------------------------------------------------
  // PERSISTANCE — localStorage
  // -----------------------------------------------------------
  const saveState = () => {
    try {
      const snapshot = {
        currentRound: state.currentRound,
        foundByRound: state.foundByRound,
        erroredCards: state.erroredCards,
        layoutByRound: state.layoutByRound
      };
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(snapshot));
    } catch (e) {
      console.warn('Impossible de sauvegarder la progression', e);
    }
  };

  const loadState = () => {
    try {
      const raw = localStorage.getItem(CONFIG.storageKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  };

  const clearState = () => {
    try {
      localStorage.removeItem(CONFIG.storageKey);
    } catch (e) { /* noop */ }
  };

  // -----------------------------------------------------------
  // MÉCANIQUE DE L'ARBRE — Background progressif
  // -----------------------------------------------------------
  const updateSeasonalBackground = (round, foundCount) => {
    const season = SEASON_MAP[round] || 'spring';
    
    // Mise à jour de la classe de saison
    els.seasonalBg.className = 'seasonal-bg';
    els.seasonalBg.classList.add(`seasonal-bg--${season}`);

    // Calcul de l'opacité (0% → 100% sur 5 paires)
    const opacity = (foundCount / CONFIG.pairsPerRound) * 1;
    
    // Calcul du scale (1 → 1.05 progressif pour effet de "pousse")
    const scale = 1 + (foundCount / CONFIG.pairsPerRound) * 0.05;

    // Application des styles
    els.seasonalBg.style.opacity = opacity;
    els.seasonalBg.style.transform = `scale(${scale})`;
  };

  // -----------------------------------------------------------
  // GÉNÉRATION DU LAYOUT D'UNE MANCHE
  // -----------------------------------------------------------
  const buildRoundLayout = (round) => {
    const roundData = state.data.rounds.find((r) => r.round === round);
    if (!roundData) return [];

    const cards = [];
    roundData.pairs.forEach((pair) => {
      cards.push({
        type: 'card',
        pairId: pair.id,
        side: 'bio',
        name: pair.bio.name,
        label: pair.bio.label,
        image: pair.bio.image,
        caption: pair.bio.caption
      });
      cards.push({
        type: 'card',
        pairId: pair.id,
        side: 'archi',
        name: pair.archi.name,
        label: pair.archi.label,
        image: pair.archi.image,
        caption: pair.archi.caption
      });
    });

    // Compléter à 12 slots avec des cases vides
    while (cards.length < CONFIG.slotsPerRound) {
      cards.push({ type: 'empty' });
    }

    return shuffle(cards);
  };

  const getOrBuildLayout = (round) => {
    if (state.layoutByRound[round]) {
      return state.layoutByRound[round];
    }
    const layout = buildRoundLayout(round);
    state.layoutByRound[round] = layout;
    saveState();
    return layout;
  };

  // -----------------------------------------------------------
  // RECHERCHE D'UNE PAIRE PAR ID
  // -----------------------------------------------------------
  const findPair = (round, pairId) => {
    const r = state.data.rounds.find((x) => x.round === round);
    return r ? r.pairs.find((p) => p.id === pairId) : null;
  };

  // -----------------------------------------------------------
  // RENDU DU PLATEAU
  // -----------------------------------------------------------
  const renderBoard = () => {
    const round = state.currentRound;
    const layout = getOrBuildLayout(round);
    const found = state.foundByRound[round] || [];
    const roundData = state.data.rounds.find((r) => r.round === round);

    // En-tête de manche
    els.phase.textContent = `Manche ${round} / ${state.data.rounds.length}`;
    els.roundTitle.textContent = roundData.title;
    els.total.textContent = CONFIG.pairsPerRound;
    els.found.textContent = found.length;

    // Vidage
    els.board.innerHTML = '';

    // Mise à jour du background saisonnier
    updateSeasonalBackground(round, found.length);

    layout.forEach((slot, i) => {
      let cardEl;
      if (slot.type === 'empty') {
        cardEl = document.createElement('div');
        cardEl.className = 'card card--empty';
        cardEl.setAttribute('aria-hidden', 'true');
      } else {
        cardEl = document.createElement('button');
        cardEl.type = 'button';
        cardEl.className = 'card';
        cardEl.dataset.pairId = slot.pairId;
        cardEl.dataset.side = slot.side;
        cardEl.dataset.index = String(i);
        cardEl.setAttribute('aria-label', `${slot.label} : ${slot.name}`);

        // État résolu
        if (found.includes(slot.pairId)) {
          cardEl.classList.add('card--solved');
        }

        // Label discret
        const labelEl = document.createElement('span');
        labelEl.className = `card__label card__label--${slot.side}`;
        labelEl.textContent = slot.label;
        cardEl.appendChild(labelEl);

        // Média (image ou placeholder)
        const mediaEl = document.createElement('div');
        mediaEl.className = 'card__media';
        if (slot.image) {
          mediaEl.style.backgroundImage = `url('${slot.image}')`;
        }
        cardEl.appendChild(mediaEl);

        // Nom
        const nameEl = document.createElement('span');
        nameEl.className = 'card__name';
        nameEl.textContent = slot.name;
        cardEl.appendChild(nameEl);

        // Clic
        cardEl.addEventListener('click', () => onCardClick(cardEl));
      }

      els.board.appendChild(cardEl);
    });
  };

  // -----------------------------------------------------------
  // CLIC SUR UNE CARTE
  // -----------------------------------------------------------
  const onCardClick = async (cardEl) => {
    if (state.locked) return;
    if (cardEl.classList.contains('card--solved')) return;
    if (cardEl.classList.contains('card--selected')) return;

    const pairId = cardEl.dataset.pairId;
    const side = cardEl.dataset.side;

    state.selected.push({ pairId, side, el: cardEl });
    cardEl.classList.add('card--selected');

    if (state.selected.length === 2) {
      state.locked = true;
      await checkPair();
      state.locked = false;
    }
  };

  // -----------------------------------------------------------
  // VÉRIFICATION D'UNE PAIRE
  // -----------------------------------------------------------
  const checkPair = async () => {
    const [a, b] = state.selected;

    if (a.pairId === b.pairId && a.side !== b.side) {
      // Bonne paire
      a.el.classList.add('card--correct');
      b.el.classList.add('card--correct');

      await sleep(CONFIG.correctAnimDuration);

      const round = state.currentRound;
      if (!state.foundByRound[round]) {
        state.foundByRound[round] = [];
      }
      state.foundByRound[round].push(a.pairId);
      saveState();

      // Mise à jour du background
      const found = state.foundByRound[round];
      updateSeasonalBackground(round, found.length);

      // Mise à jour de l'UI
      els.found.textContent = found.length;

      // Marquer les cartes comme résolues
      a.el.classList.add('card--solved');
      b.el.classList.add('card--solved');

      state.selected = [];

      // Ouvrir la modale pédagogique
      openPairModal(round, a.pairId);

    } else {
      // Mauvaise paire
      a.el.classList.add('card--wrong');
      b.el.classList.add('card--wrong');

      await sleep(CONFIG.wrongResetDuration);

      a.el.classList.remove('card--wrong', 'card--selected');
      b.el.classList.remove('card--wrong', 'card--selected');

      // Marquer les cartes comme ayant été essayées
      const aKey = `${a.pairId}__${a.side}`;
      const bKey = `${b.pairId}__${b.side}`;
      
      const aWasErrored = state.erroredCards[aKey];
      const bWasErrored = state.erroredCards[bKey];

      state.erroredCards[aKey] = true;
      state.erroredCards[bKey] = true;
      saveState();

      // Afficher l'indice si les deux cartes avaient déjà été essayées
      if (aWasErrored && bWasErrored) {
        showHint(state.currentRound, a.pairId, b.pairId);
      }

      state.selected = [];
    }
  };

  // -----------------------------------------------------------
  // AFFICHAGE DES INDICES (Toast non-intrusif)
  // -----------------------------------------------------------
  const showHint = (round, pairId1, pairId2) => {
    const pair1 = findPair(round, pairId1);
    const pair2 = findPair(round, pairId2);

    // Choisir l'indice à afficher (priorité à la première paire)
    const hintText = pair1?.hint || pair2?.hint || 'Indice non disponible.';

    els.hintToastText.textContent = hintText;
    els.hintToast.hidden = false;
    els.hintToast.classList.add('visible');

    // Effacer le timer précédent
    if (state.hintTimer) {
      clearTimeout(state.hintTimer);
    }

    // Timer pour masquer l'indice après 6s
    state.hintTimer = setTimeout(() => {
      els.hintToast.classList.remove('visible');
      setTimeout(() => {
        els.hintToast.hidden = true;
      }, 400);
    }, CONFIG.hintDuration);
  };

  // -----------------------------------------------------------
  // MODALES — Gestion
  // -----------------------------------------------------------
  const openModal = (modal) => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  // -----------------------------------------------------------
  // MODALE — PAIRE TROUVÉE
  // -----------------------------------------------------------
  const openPairModal = (round, pairId) => {
    const pair = findPair(round, pairId);
    if (!pair) return;

    els.modalPairTitle.textContent = pair.explanation.title;
    els.modalPairText.textContent = pair.explanation.text;

    els.modalPairBioName.textContent = pair.bio.name;
    els.modalPairArchiName.textContent = pair.archi.name;

    if (pair.bio.image) {
      els.modalPairBioImg.style.backgroundImage = `url('${pair.bio.image}')`;
    } else {
      els.modalPairBioImg.style.backgroundImage = '';
    }

    if (pair.archi.image) {
      els.modalPairArchiImg.style.backgroundImage = `url('${pair.archi.image}')`;
    } else {
      els.modalPairArchiImg.style.backgroundImage = '';
    }

    openModal(els.modalPair);
  };

  const onPairModalContinue = () => {
    closeModal(els.modalPair);

    const round = state.currentRound;
    const found = state.foundByRound[round] || [];

    if (found.length >= CONFIG.pairsPerRound) {
      // Fin de manche
      if (round >= state.data.rounds.length) {
        // Fin de jeu
        openEndModal();
      } else {
        openRoundModal();
      }
    }
  };

  // -----------------------------------------------------------
  // MODALE — FIN DE MANCHE
  // -----------------------------------------------------------
  const openRoundModal = () => {
    const totalRounds = state.data.rounds.length;
    const completed = state.currentRound;
    const pct = Math.round((completed / totalRounds) * 100);

    els.modalRoundTitle.textContent = `Manche ${completed} complétée`;
    els.modalRoundText.textContent =
      'Cinq associations trouvées. Vous progressez dans la lecture des stratégies du vivant.';
    els.modalRoundPercent.textContent = `${pct}%`;

    openModal(els.modalRound);

    // Animation de remplissage de la barre
    requestAnimationFrame(() => {
      setTimeout(() => {
        els.modalRoundFill.style.width = `${pct}%`;
      }, 200);
    });
  };

  const onRoundModalContinue = () => {
    closeModal(els.modalRound);
    els.modalRoundFill.style.width = '0%';

    state.currentRound += 1;
    state.selected = [];
    saveState();

    renderBoard();
  };

  // -----------------------------------------------------------
  // MODALE — FIN DE JEU
  // -----------------------------------------------------------
  const openEndModal = () => {
    openModal(els.modalEnd);
  };

  const onEndRestart = () => {
    closeModal(els.modalEnd);
    resetGame();
    showView('game');
  };

  const onEndClose = () => {
    closeModal(els.modalEnd);
    
    // Reset du background
    els.seasonalBg.style.opacity = 0;
    els.seasonalBg.style.transform = 'scale(1)';
    els.seasonalBg.className = 'seasonal-bg';
    
    showView('landing');
  };

  // -----------------------------------------------------------
  // RÉINITIALISATION
  // -----------------------------------------------------------
  const resetGame = () => {
    state.currentRound = 1;
    state.foundByRound = {};
    state.erroredCards = {};
    state.layoutByRound = {};
    state.selected = [];
    clearState();
    renderBoard();
  };

  // -----------------------------------------------------------
  // VUES
  // -----------------------------------------------------------
  const showView = (name) => {
    if (name === 'landing') {
      els.viewLanding.hidden = false;
      els.viewGame.hidden = true;
    } else if (name === 'game') {
      els.viewLanding.hidden = true;
      els.viewGame.hidden = false;
      renderBoard();
    }
  };

  // -----------------------------------------------------------
  // DÉMARRAGE / REPRISE
  // -----------------------------------------------------------
  const startGame = () => {
    const saved = loadState();
    if (saved && saved.currentRound) {
      // Reprend une session existante
      state.currentRound = saved.currentRound;
      state.foundByRound = saved.foundByRound || {};
      state.erroredCards = saved.erroredCards || {};
      state.layoutByRound = saved.layoutByRound || {};

      // Sécurité : si la manche en cours est déjà complétée
      const round = state.currentRound;
      const found = state.foundByRound[round] || [];
      if (found.length >= CONFIG.pairsPerRound) {
        if (round >= state.data.rounds.length) {
          showView('game');
          openEndModal();
          return;
        }
        state.currentRound += 1;
        saveState();
      }
    } else {
      // Nouvelle partie
      state.currentRound = 1;
      state.foundByRound = {};
      state.erroredCards = {};
      state.layoutByRound = {};
    }
    showView('game');
  };

  const onQuit = () => {
    saveState();
    
    // Reset visuel du background
    const round = state.currentRound;
    const found = state.foundByRound[round] || [];
    
    // Fade out progressif
    els.seasonalBg.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    els.seasonalBg.style.opacity = 0;
    els.seasonalBg.style.transform = 'scale(1)';
    
    setTimeout(() => {
      showView('landing');
      updateStartButtonLabel();
    }, 300);
  };

  // Met à jour le libellé du bouton landing (Commencer / Reprendre)
  const updateStartButtonLabel = () => {
    const saved = loadState();
    const hasProgress =
      saved &&
      saved.foundByRound &&
      Object.values(saved.foundByRound).some(
        (arr) => Array.isArray(arr) && arr.length > 0
      );
    els.btnStart.textContent = hasProgress
      ? 'Reprendre l\'expérience'
      : "Commencer l'expérience";
  };

  // -----------------------------------------------------------
  // BIND DES ÉLÉMENTS DOM
  // -----------------------------------------------------------
  const bindDom = () => {
    els.seasonalBg = $('#seasonal-bg');
    els.viewLanding = $('#view-landing');
    els.viewGame = $('#view-game');
    els.btnStart = $('#btn-start');
    els.btnQuit = $('#btn-quit');
    els.board = $('#board');
    els.phase = $('#game-phase');
    els.roundTitle = $('#game-round-title');
    els.found = $('#game-found');
    els.total = $('#game-total');

    els.hintToast = $('#hint-toast');
    els.hintToastText = $('#hint-toast-text');

    els.modalPair = $('#modal-pair');
    els.modalPairTitle = $('#modal-pair-title');
    els.modalPairBioName = $('#modal-pair-bio-name');
    els.modalPairArchiName = $('#modal-pair-archi-name');
    els.modalPairBioImg = $('#modal-pair-bio-image');
    els.modalPairArchiImg = $('#modal-pair-archi-image');
    els.modalPairText = $('#modal-pair-text');
    els.modalPairContinue = $('#modal-pair-continue');

    els.modalRound = $('#modal-round');
    els.modalRoundTitle = $('#modal-round-title');
    els.modalRoundText = $('#modal-round-text');
    els.modalRoundFill = $('#modal-round-fill');
    els.modalRoundPercent = $('#modal-round-percent');
    els.modalRoundContinue = $('#modal-round-continue');

    els.modalEnd = $('#modal-end');
    els.modalEndRestart = $('#modal-end-restart');
    els.modalEndClose = $('#modal-end-close');

    els.btnStart.addEventListener('click', startGame);
    els.btnQuit.addEventListener('click', onQuit);
    els.modalPairContinue.addEventListener('click', onPairModalContinue);
    els.modalRoundContinue.addEventListener('click', onRoundModalContinue);
    els.modalEndRestart.addEventListener('click', onEndRestart);
    els.modalEndClose.addEventListener('click', onEndClose);

    // Échap ferme la modale paire
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !els.modalPair.hidden) {
        onPairModalContinue();
      }
    });
  };

  // -----------------------------------------------------------
  // INITIALISATION
  // -----------------------------------------------------------
  const init = async () => {
    bindDom();

    try {
      const res = await fetch(CONFIG.dataPath);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.data = await res.json();
    } catch (e) {
      console.error('Impossible de charger data.json', e);
      els.viewLanding.innerHTML =
        '<div style="padding:48px; text-align:center; color:#a85d3e;">' +
        'Erreur de chargement des données du jeu.<br>' +
        'Vérifie que <code>data.json</code> est bien servi depuis un serveur HTTP.' +
        '</div>';
      return;
    }

    updateStartButtonLabel();
  };

  // -----------------------------------------------------------
  // GO
  // -----------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();