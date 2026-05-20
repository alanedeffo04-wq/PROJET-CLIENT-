/* ════════════════════════════════════════════
   MANCHE 1 — Biomimétisme Classique
   Arbre progressif : se révèle paire par paire
════════════════════════════════════════════ */

const ROUND_DATA = {
  roundNum: 1,
  title:    "Manche 1",
  subtitle: "Biomimétisme Classique",
  manche:   "Manche 1 : Biomimétisme & Innovations Architecturales",
  cardStyle:"r1",
  layout:   "layout-r1",
  connexionLabel: "Connexion Établie - Floraison",
  pairs: [
    {
      id: "martin-tgv",
      a:  { emoji:"🦋", label:"Martin-Pêcheur" },
      b:  { emoji:"🚄", label:"TGV Japonais" },
      edu:{
        title:"MARTIN-PÊCHEUR / TGV JAPONAIS",
        desc: "L'optimisation du bec pour pénétrer l'eau a inspiré la forme aérodynamique du nez du Shinkansen pour réduire le bruit lors du passage dans les tunnels.",
        emojiA:"🦋", emojiB:"🚄"
      }
    },
    {
      id: "termitiere-eastgate",
      a:  { emoji:"🪲", label:"Termitière" },
      b:  { emoji:"🏢", label:"Eastgate Building" },
      edu:{
        title:"TERMITIÈRE / EASTGATE BUILDING",
        desc: "Les termites régulent la température de leurs galeries par des cheminées naturelles. L'Eastgate Building à Harare utilise ce principe pour se climatiser sans air conditionné.",
        emojiA:"🪲", emojiB:"🏢"
      }
    },
    {
      id: "lotus-beton",
      a:  { emoji:"🌿", label:"Feuille de Lotus" },
      b:  { emoji:"🧱", label:"Béton Hydrophobe" },
      edu:{
        title:"LOTUS / BÉTON HYDROPHOBE",
        desc: "La microstructure de la feuille de lotus repousse l'eau et les salissures. Ce principe inspire des revêtements architecturaux autonettoyants qui réduisent la maintenance.",
        emojiA:"🌿", emojiB:"🧱"
      }
    },
    {
      id: "abeille-facade",
      a:  { emoji:"🐝", label:"Alvéoles d'Abeille" },
      b:  { emoji:"🏛️", label:"Façade Alvéolaire" },
      edu:{
        title:"ALVÉOLES D'ABEILLE / FAÇADE ALVÉOLAIRE",
        desc: "L'hexagone maximise la résistance structurelle avec un minimum de matière. Ce principe inspire des panneaux de façade ultra-légers et des structures porteuses modernes.",
        emojiA:"🐝", emojiB:"🏛️"
      }
    }
  ]
};

/* ══════════════════════════════════════════════════
   SVG Gravure — Arbre en fantôme (guide très discret)
   L'arbre complet est gravé en arrière-plan, très pâle,
   comme une empreinte dans le bois — les couches colorées
   se superposent par-dessus au fil des bonnes réponses.
══════════════════════════════════════════════════ */
const ENGRAVING_SVG = `
  <defs>
    <filter id="ef-deep">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="b"/>
      <feOffset dx="1.5" dy="2" in="b"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
    <filter id="ef-mid">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="b"/>
      <feOffset dx="1" dy="1.2" in="b"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
    <filter id="ef-fine">
      <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="b"/>
      <feOffset dx="0.5" dy="0.7" in="b"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>

  <!-- ░ Empreinte fantôme — tronc ░ -->
  <path d="M448 510 C447 480 445 448 443 415 C441 382 440 348 439 314
           C438 280 438 248 438 218 C437 192 437 168 436 145 C436 128 435 112 435 96"
        stroke="rgba(60,35,10,0.07)" stroke-width="34" fill="none" stroke-linecap="round"/>
  <!-- ░ Empreinte fantôme — racines ░ -->
  <path d="M443 475 C422 482 396 488 365 494 C336 500 305 504 272 508"
        stroke="rgba(60,35,10,0.06)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M453 473 C476 480 502 486 530 492 C558 498 588 502 618 506"
        stroke="rgba(60,35,10,0.06)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <!-- ░ Empreinte fantôme — branches basses ░ -->
  <path d="M440 390 C415 378 386 364 354 350 C324 337 290 324 254 311 C226 301 197 291 166 282"
        stroke="rgba(60,35,10,0.055)" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M441 395 C468 382 498 368 530 354 C560 341 592 328 626 315 C652 305 680 295 710 285"
        stroke="rgba(60,35,10,0.055)" stroke-width="18" fill="none" stroke-linecap="round"/>
  <!-- ░ Empreinte fantôme — branches moyennes ░ -->
  <path d="M439 300 C412 288 382 274 350 260 C319 247 285 234 250 222 C222 212 193 202 162 192"
        stroke="rgba(60,35,10,0.05)" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M440 295 C466 282 496 268 528 254 C558 241 590 228 624 215 C650 205 677 195 706 185"
        stroke="rgba(60,35,10,0.05)" stroke-width="15" fill="none" stroke-linecap="round"/>
  <!-- ░ Empreinte fantôme — branches hautes ░ -->
  <path d="M437 210 C409 196 378 182 344 168 C312 155 278 143 242 131 C214 122 185 113 154 104"
        stroke="rgba(60,35,10,0.045)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M439 205 C466 191 496 177 528 163 C559 150 592 138 626 126 C653 117 680 108 710 99"
        stroke="rgba(60,35,10,0.045)" stroke-width="13" fill="none" stroke-linecap="round"/>
  <!-- ░ Empreinte fantôme — cime ░ -->
  <path d="M435 96 C432 76 429 58 426 42 C423 28 420 16 417 6"
        stroke="rgba(60,35,10,0.04)" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M435 96 C420 80 403 64 384 50 C367 38 348 26 328 16"
        stroke="rgba(60,35,10,0.04)" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M436 96 C452 80 470 64 490 50 C508 38 528 26 550 16"
        stroke="rgba(60,35,10,0.04)" stroke-width="9" fill="none" stroke-linecap="round"/>
`;

/* ══════════════════════════════════════════════════
   CSS des couches d'arbre animées
══════════════════════════════════════════════════ */
(function injectTreeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Groupe SVG pour chaque étape */
    .tree-layer {
      opacity: 0;
      transition: none;
    }
    .tree-layer.revealed {
      animation: treeReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes treeReveal {
      0%   { opacity: 0; filter: blur(6px) brightness(1.6); transform-origin: center bottom; transform: scaleY(0.85); }
      30%  { opacity: 1; filter: blur(1px) brightness(1.2); }
      100% { opacity: 1; filter: blur(0) brightness(1);     transform: scaleY(1); }
    }

    /* Pétales qui tombent après chaque révélation */
    @keyframes petalFall {
      0%   { transform: translate(0,0) rotate(0deg);   opacity:1; }
      100% { transform: translate(var(--dx), 160px) rotate(var(--rot)); opacity:0; }
    }
    .petal {
      position: absolute;
      font-size: 18px;
      pointer-events: none;
      animation: petalFall 2.2s ease-in forwards;
      z-index: 20;
    }

    /* Lueur verte sur le lien organique quand l'arbre est complet */
    .tree-link-glow {
      filter: drop-shadow(0 0 6px #7A9668) drop-shadow(0 0 12px #7A9668);
      animation: linkPulse 2s ease-in-out infinite;
    }
    @keyframes linkPulse {
      0%,100% { opacity: 0.7; }
      50%      { opacity: 1;   }
    }
  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════════
   Construction des couches SVG progressives
   Couche 0 (match 1) : Racines + Tronc
   Couche 1 (match 2) : Branches basses
   Couche 2 (match 3) : Branches moyennes + hautes
   Couche 3 (match 4) : Cime + rameaux + lien vert complet
══════════════════════════════════════════════════ */
const TREE_LAYERS = [
  /* ── COUCHE 0 : Racines & Tronc ── */
  `<g class="tree-layer" id="tree-layer-0">
    <!-- Racines -->
    <path d="M443 475 C422 482 396 488 365 494 C336 500 305 504 272 508"
          stroke="rgba(52,28,7,0.34)" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M453 473 C476 480 502 486 530 492 C558 498 588 502 618 506"
          stroke="rgba(52,28,7,0.34)" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M272 508 C255 512 238 516 220 520" stroke="rgba(52,28,7,0.22)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M272 508 C260 514 246 518 230 524" stroke="rgba(52,28,7,0.18)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M618 506 C634 510 650 514 668 518" stroke="rgba(52,28,7,0.22)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M618 506 C636 512 652 516 670 522" stroke="rgba(52,28,7,0.18)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- Tronc principal — masse -->
    <path d="M448 510 C447 480 445 448 443 415 C441 382 440 348 439 314
             C438 280 438 248 438 218 C437 192 437 168 436 145 C436 128 435 112 435 96"
          stroke="rgba(50,25,6,0.42)" stroke-width="36" fill="none" stroke-linecap="round" filter="url(#ef-deep)"/>
    <!-- Tronc — bord gauche (texture) -->
    <path d="M432 510 C431 480 430 448 429 415 C428 380 427 346 427 312
             C426 278 426 246 426 216 C426 190 426 166 426 142"
          stroke="rgba(50,25,6,0.15)" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Tronc — bord droit (texture) -->
    <path d="M464 508 C463 478 462 446 461 413 C460 379 460 345 460 311
             C459 277 459 245 458 215 C458 189 457 165 457 141"
          stroke="rgba(50,25,6,0.15)" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Stries d'écorce -->
    <path d="M434 460 C438 454 441 449 444 444" stroke="rgba(50,25,6,0.13)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M435 420 C439 414 442 408 445 403" stroke="rgba(50,25,6,0.12)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M436 378 C440 372 443 367 446 362" stroke="rgba(50,25,6,0.12)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M437 336 C440 330 443 325 446 320" stroke="rgba(50,25,6,0.11)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M437 294 C440 288 443 283 446 278" stroke="rgba(50,25,6,0.11)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M437 252 C440 247 443 242 446 237" stroke="rgba(50,25,6,0.1)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M437 212 C440 207 443 202 446 197" stroke="rgba(50,25,6,0.1)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M436 172 C439 167 442 162 445 157" stroke="rgba(50,25,6,0.09)" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>`,

  /* ── COUCHE 1 : Branches basses ── */
  `<g class="tree-layer" id="tree-layer-1">
    <!-- Grande branche basse gauche -->
    <path d="M440 390 C415 378 386 364 354 350 C324 337 290 324 254 311 C226 301 197 291 166 282"
          stroke="rgba(50,26,6,0.38)" stroke-width="19" fill="none" stroke-linecap="round" filter="url(#ef-deep)"/>
    <!-- Sous-branche G bas 1 -->
    <path d="M254 311 C232 296 208 281 182 266 C160 253 137 241 112 230"
          stroke="rgba(50,26,6,0.28)" stroke-width="11" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Sous-branche G bas 2 (vers bas) -->
    <path d="M254 311 C238 326 220 341 200 356 C182 369 162 382 140 394"
          stroke="rgba(50,26,6,0.24)" stroke-width="9" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Rameaux bas gauche -->
    <path d="M112 230 C96 219 80 208 62 198" stroke="rgba(48,24,5,0.18)" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <path d="M112 230 C98 243 82 256 64 268" stroke="rgba(48,24,5,0.16)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M140 394 C124 404 106 414 86 422" stroke="rgba(48,24,5,0.16)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <!-- Noeud bifurcation G bas -->
    <circle cx="254" cy="311" r="5" stroke="rgba(50,25,6,0.25)" stroke-width="2" fill="none"/>

    <!-- Grande branche basse droite -->
    <path d="M441 395 C468 382 498 368 530 354 C560 341 592 328 626 315 C652 305 680 295 710 285"
          stroke="rgba(50,26,6,0.38)" stroke-width="19" fill="none" stroke-linecap="round" filter="url(#ef-deep)"/>
    <!-- Sous-branche D bas 1 -->
    <path d="M626 315 C648 300 672 285 698 270 C720 257 744 245 770 234"
          stroke="rgba(50,26,6,0.28)" stroke-width="11" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Sous-branche D bas 2 (vers bas) -->
    <path d="M626 315 C644 330 664 345 686 358 C706 371 728 382 752 393"
          stroke="rgba(50,26,6,0.24)" stroke-width="9" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Rameaux bas droite -->
    <path d="M770 234 C788 223 806 212 824 202" stroke="rgba(48,24,5,0.18)" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <path d="M770 234 C784 247 800 260 818 272" stroke="rgba(48,24,5,0.16)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M752 393 C768 403 786 413 806 421" stroke="rgba(48,24,5,0.16)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <!-- Noeud bifurcation D bas -->
    <circle cx="626" cy="315" r="5" stroke="rgba(50,25,6,0.25)" stroke-width="2" fill="none"/>
  </g>`,

  /* ── COUCHE 2 : Branches moyennes & hautes ── */
  `<g class="tree-layer" id="tree-layer-2">
    <!-- Branche moyenne gauche -->
    <path d="M439 300 C412 288 382 274 350 260 C319 247 285 234 250 222 C222 212 193 202 162 192"
          stroke="rgba(50,26,6,0.34)" stroke-width="16" fill="none" stroke-linecap="round" filter="url(#ef-deep)"/>
    <path d="M250 222 C226 208 200 194 172 180 C148 168 122 157 94 146"
          stroke="rgba(50,26,6,0.26)" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M250 222 C232 238 212 254 190 270 C170 284 148 298 124 311"
          stroke="rgba(50,26,6,0.22)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Rameaux G moyen -->
    <path d="M94 146 C78 135 60 124 40 114" stroke="rgba(48,24,5,0.17)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M94 146 C80 159 64 172 46 184" stroke="rgba(48,24,5,0.15)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M124 311 C106 321 86 331 64 340" stroke="rgba(48,24,5,0.15)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="250" cy="222" r="4.5" stroke="rgba(50,25,6,0.22)" stroke-width="1.8" fill="none"/>

    <!-- Branche haute gauche -->
    <path d="M437 210 C409 196 378 182 344 168 C312 155 278 143 242 131 C214 122 185 113 154 104"
          stroke="rgba(50,26,6,0.3)" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M242 131 C218 117 192 103 164 90 C140 79 114 68 86 58"
          stroke="rgba(50,26,6,0.22)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M242 131 C222 147 200 163 176 178 C154 192 130 205 104 217"
          stroke="rgba(50,26,6,0.18)" stroke-width="7" fill="none" stroke-linecap="round" filter="url(#ef-fine)"/>
    <path d="M86 58 C70 47 52 36 32 26" stroke="rgba(48,24,5,0.16)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M86 58 C72 71 56 84 38 96" stroke="rgba(48,24,5,0.14)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="242" cy="131" r="4" stroke="rgba(50,25,6,0.2)" stroke-width="1.5" fill="none"/>

    <!-- Branche moyenne droite -->
    <path d="M440 295 C466 282 496 268 528 254 C558 241 590 228 624 215 C650 205 677 195 706 185"
          stroke="rgba(50,26,6,0.34)" stroke-width="16" fill="none" stroke-linecap="round" filter="url(#ef-deep)"/>
    <path d="M624 215 C648 201 674 187 702 173 C726 161 752 150 780 139"
          stroke="rgba(50,26,6,0.26)" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M624 215 C644 231 666 247 690 261 C712 275 736 287 762 299"
          stroke="rgba(50,26,6,0.22)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M780 139 C796 128 812 117 830 107" stroke="rgba(48,24,5,0.17)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M780 139 C796 152 814 165 834 177" stroke="rgba(48,24,5,0.15)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M762 299 C778 309 796 319 816 328" stroke="rgba(48,24,5,0.15)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="624" cy="215" r="4.5" stroke="rgba(50,25,6,0.22)" stroke-width="1.8" fill="none"/>

    <!-- Branche haute droite -->
    <path d="M439 205 C466 191 496 177 528 163 C559 150 592 138 626 126 C653 117 680 108 710 99"
          stroke="rgba(50,26,6,0.3)" stroke-width="14" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M626 126 C650 112 676 98 704 85 C728 74 754 63 782 53"
          stroke="rgba(50,26,6,0.22)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <path d="M626 126 C648 142 672 158 698 172 C722 186 748 198 776 209"
          stroke="rgba(50,26,6,0.18)" stroke-width="7" fill="none" stroke-linecap="round" filter="url(#ef-fine)"/>
    <path d="M782 53 C798 42 816 31 836 22" stroke="rgba(48,24,5,0.16)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M782 53 C798 66 816 79 836 91" stroke="rgba(48,24,5,0.14)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="626" cy="126" r="4" stroke="rgba(50,25,6,0.2)" stroke-width="1.5" fill="none"/>
  </g>`,

  /* ── COUCHE 3 : Cime + rameaux terminaux + lien organique ── */
  `<g class="tree-layer" id="tree-layer-3">
    <!-- Cime — montée centrale -->
    <path d="M435 96 C432 76 429 58 426 42 C423 28 420 16 417 6"
          stroke="rgba(50,25,6,0.32)" stroke-width="12" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Cime — branche gauche -->
    <path d="M435 96 C420 80 403 64 384 50 C367 38 348 26 328 16"
          stroke="rgba(50,25,6,0.28)" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Cime — branche droite -->
    <path d="M436 96 C452 80 470 64 490 50 C508 38 528 26 550 16"
          stroke="rgba(50,25,6,0.28)" stroke-width="10" fill="none" stroke-linecap="round" filter="url(#ef-mid)"/>
    <!-- Noeud cime -->
    <circle cx="435" cy="96" r="6" stroke="rgba(50,25,6,0.28)" stroke-width="2" fill="none"/>
    <!-- Rameaux de cime -->
    <path d="M417 6 C410 -4 401 -12 390 -18" stroke="rgba(48,24,5,0.18)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M417 6 C424 -4 432 -12 442 -18" stroke="rgba(48,24,5,0.18)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M328 16 C312 4 294 -6 274 -14" stroke="rgba(48,24,5,0.16)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M328 16 C320 28 310 40 298 52" stroke="rgba(48,24,5,0.14)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M550 16 C566 4 584 -6 604 -14" stroke="rgba(48,24,5,0.16)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M550 16 C558 28 568 40 580 52" stroke="rgba(48,24,5,0.14)" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- ── Lien organique final (vert, animé) ── -->
    <path id="organic-link" class="tree-link-glow"
          d="M140 310 Q210 278 300 292 Q370 304 438 288 Q508 272 592 286 Q668 298 748 272"
          stroke="#7A9668" stroke-width="2.4" stroke-dasharray="8 5" stroke-linecap="round" opacity="0.72"/>
    <circle cx="140" cy="310" r="4" fill="#7A9668" opacity="0.7"/>
    <circle cx="438" cy="288" r="4" fill="#7A9668" opacity="0.7"/>
    <circle cx="748" cy="272" r="4" fill="#7A9668" opacity="0.7"/>
    <text x="444" y="282" font-family="Georgia, serif" font-size="9" fill="#7A9668" opacity="0.65"
          text-anchor="middle" font-style="italic">lien biomimétique</text>
  </g>`
];

/* ══════════════════════════════════════════════════
   Injection des couches dans le SVG au chargement
══════════════════════════════════════════════════ */
(function injectTreeLayers() {
  // On attend que le DOM soit prêt
  function inject() {
    const svg = document.getElementById('engraving-svg');
    if (!svg) { setTimeout(inject, 80); return; }
    TREE_LAYERS.forEach(layer => {
      const tmp = document.createElementNS('http://www.w3.org/2000/svg','g');
      tmp.innerHTML = layer;
      while (tmp.firstChild) svg.appendChild(tmp.firstChild);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

/* ══════════════════════════════════════════════════
   Révélation progressive : une couche par bonne réponse
══════════════════════════════════════════════════ */
function onMatchFound(matchCount) {
  const idx = matchCount - 1; // 0..3

  /* 1. Révèle la couche d'arbre correspondante */
  const layer = document.getElementById('tree-layer-' + idx);
  if (layer) {
    layer.classList.add('revealed');
  }

  /* 2. Pluie de pétales depuis une position aléatoire */
  spawnPetals(idx);

  /* 3. Fleur sur la grille (comportement d'origine conservé) */
  const FLOWER_POSITIONS = [
    { top: '22%', left: '28%' },
    { top: '32%', right: '30%' },
    { top: '50%', left: '24%' },
    { top: '55%', right: '38%' },
  ];
  const grid = document.getElementById('cards-grid');
  if (grid) {
    const pos = FLOWER_POSITIONS[Math.min(idx, FLOWER_POSITIONS.length - 1)];
    const flower = document.createElement('div');
    flower.className = 'branch-flower';
    flower.textContent = '🌸';
    flower.style.top = pos.top;
    if (pos.left)  flower.style.left  = pos.left;
    if (pos.right) flower.style.right = pos.right;
    grid.appendChild(flower);
  }
}

/* ── Pétales tombants ── */
function spawnPetals(layerIdx) {
  const board = document.querySelector('.main-board');
  if (!board) return;
  const petals = ['🌸','🌺','🌼','🍃','✿'];
  const count = 6 + layerIdx * 3; // plus de pétales à chaque étape
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = petals[Math.floor(Math.random() * petals.length)];
      const x = 10 + Math.random() * 80;
      p.style.left = x + '%';
      p.style.top  = (5 + Math.random() * 20) + '%';
      p.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
      p.style.setProperty('--rot', (Math.random() * 540 - 270) + 'deg');
      p.style.animationDuration = (1.8 + Math.random() * 1.4) + 's';
      p.style.fontSize = (14 + Math.random() * 10) + 'px';
      board.appendChild(p);
      setTimeout(() => p.remove(), 3200);
    }, i * 120);
  }
}

/* ── Lancement ── */
initRound();