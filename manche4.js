/* ════════════════════════════════════════════
   MANCHE 4 — L'Ossature Technique & L'Ingénierie Déléguée
   Fond : Blueprint avion | Cartes : galets ronds
════════════════════════════════════════════ */

const ROUND_DATA = {
  roundNum: 4,
  title:    "Round 4",
  subtitle: "L'Ossature Technique & L'Ingénierie Déléguée",
  manche:   "Manche 4 : L'Ossature Technique & L'Ingénierie Déléguée",
  cardStyle:"r4",
  layout:   "layout-r4",
  connexionLabel: "Connexion Établie - Floraison Urbaine",
  pairs: [
    {
      id: "os-avion",
      a:  { emoji:"🦴", label:"Os Humain" },
      b:  { emoji:"✈️", label:"Structure d'Avion" },
      edu:{
        title:"OS HUMAIN / STRUCTURE D'AVION (TREILLIS DÉLÉGUÉ)",
        desc: "L'architecture interne du fémur humain est poreuse et optimisée pour répartir les charges avec un poids minimal. Ce principe de structure technique en treillis variable a inspiré la légèreté et la résistance des structures d'ailes d'avions modernes.",
        emojiA:"🦴", emojiB:"✈️"
      }
    },
    {
      id: "araignee-pont",
      a:  { emoji:"🕷️", label:"Toile d'Araignée" },
      b:  { emoji:"🌉", label:"Pont Suspendu" },
      edu:{
        title:"TOILE D'ARAIGNÉE / PONT SUSPENDU",
        desc: "La toile d'araignée répartit les forces de tension sur un réseau minimal de fils. Ce principe inspire l'ingénierie des ponts suspendus à câbles, combinant légèreté et résistance maximale.",
        emojiA:"🕷️", emojiB:"🌉"
      }
    },
    {
      id: "nacre-beton",
      a:  { emoji:"🐚", label:"Nacre (Abalone)" },
      b:  { emoji:"🧱", label:"Béton Nacré" },
      edu:{
        title:"NACRE / BÉTON COMPOSITE LAMELLAIRE",
        desc: "La nacre de l'abalone est extrêmement résistante grâce à sa structure lamellaire en briques imbriquées. Ce principe inspire des bétons composites à microstructure hiérarchique bien plus résistants.",
        emojiA:"🐚", emojiB:"🧱"
      }
    },
    {
      id: "gecko-plan",
      a:  { emoji:"🦎", label:"Lézard (Trame)" },
      b:  { emoji:"📐", label:"Trame Structurelle" },
      edu:{
        title:"RÉSEAU VASCULAIRE / TRAME URBAINE",
        desc: "Le réseau vasculaire des lézards optimise la distribution depuis le centre vers la périphérie. Ce principe inspire la conception de trames urbaines et de réseaux de distribution énergétique efficaces.",
        emojiA:"🦎", emojiB:"📐"
      }
    },
    {
      id: "oursin-dome",
      a:  { emoji:"🦔", label:"Oursin" },
      b:  { emoji:"🔮", label:"Dôme Géodésique" },
      edu:{
        title:"OURSIN / DÔME GÉODÉSIQUE",
        desc: "La coque de l'oursin est formée de plaques nervurées qui répartissent les contraintes uniformément. Ce principe inspire les dômes géodésiques et coques architecturales utilisées en architecture moderne.",
        emojiA:"🦔", emojiB:"🔮"
      }
    }
  ]
};

/* ══════════════════════════════════════════════════════════════
   SVG Gravure — Blueprint technique d'avion (vue 3/4 dessus)
   Style plan d'ingénierie : lignes de cotes, sections, labels,
   grille de référence, treillis interne, nervures détaillées.
══════════════════════════════════════════════════════════════ */
const ENGRAVING_SVG = `
  <defs>
    <!-- Grille de référence blueprint -->
    <pattern id="grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M20 0 L0 0 0 20" fill="none" stroke="#2C1A0A" stroke-width="0.3" opacity="0.18"/>
    </pattern>
    <pattern id="grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M100 0 L0 0 0 100" fill="none" stroke="#2C1A0A" stroke-width="0.6" opacity="0.22"/>
    </pattern>
  </defs>

  <!-- ░░ Grille de fond blueprint ░░ -->
  <rect x="40" y="30" width="820" height="460" fill="url(#grid-fine)" rx="2"/>
  <rect x="40" y="30" width="820" height="460" fill="url(#grid-major)" rx="2"/>

  <!-- ░░ Cadre de dessin technique ░░ -->
  <rect x="42" y="32" width="816" height="456" fill="none" stroke="#2C1A0A" stroke-width="1.2" opacity="0.35"/>
  <rect x="48" y="38" width="804" height="444" fill="none" stroke="#2C1A0A" stroke-width="0.5" opacity="0.22"/>

  <!-- ░░ Cartouche titre (coin inf. droit) ░░ -->
  <rect x="670" y="440" width="186" height="48" fill="none" stroke="#2C1A0A" stroke-width="0.8" opacity="0.4"/>
  <line x1="670" y1="454" x2="856" y2="454" stroke="#2C1A0A" stroke-width="0.6" opacity="0.35"/>
  <line x1="730" y1="454" x2="730" y2="488" stroke="#2C1A0A" stroke-width="0.6" opacity="0.35"/>
  <text x="676" y="451" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.5" letter-spacing="0.5">PLAN N°</text>
  <text x="676" y="464" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.45">STK-M4-AVN</text>
  <text x="736" y="451" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.5" letter-spacing="0.5">ÉCHELLE</text>
  <text x="736" y="464" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.45">1 : 200</text>
  <text x="676" y="478" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.5">VUE DESSUS — STRUCTURE</text>
  <text x="676" y="486" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.45">Manche 4 · Ossature Technique</text>

  <!-- ░░ Axe longitudinal central ░░ -->
  <line x1="80" y1="265" x2="820" y2="265"
        stroke="#2C1A0A" stroke-width="0.8" stroke-dasharray="12 4 2 4" opacity="0.45"/>
  <!-- Axe transversal -->
  <line x1="450" y1="55" x2="450" y2="435"
        stroke="#2C1A0A" stroke-width="0.8" stroke-dasharray="12 4 2 4" opacity="0.35"/>

  <!-- ══════════════ FUSELAGE ══════════════ -->
  <!-- Contour extérieur fuselage -->
  <path d="
    M770 265
    C770 245 740 228 700 222
    C660 216 580 213 500 212
    C440 211 380 212 320 214
    C260 216 200 222 160 230
    C130 237 115 252 115 265
    C115 278 130 287 160 294
    C200 302 260 308 320 310
    C380 312 440 312 500 312
    C580 311 660 308 700 302
    C740 296 770 282 770 265 Z"
    stroke="#2C1A0A" stroke-width="2" opacity="0.55" fill="none"/>

  <!-- Paroi intérieure fuselage (double coque) -->
  <path d="
    M748 265
    C748 250 724 237 690 232
    C655 227 582 225 510 224
    C450 223 390 224 332 226
    C278 228 230 234 195 242
    C170 248 160 257 160 265
    C160 273 170 279 195 285
    C230 292 278 298 332 300
    C390 302 450 303 510 302
    C582 301 655 299 690 294
    C724 289 748 278 748 265 Z"
    stroke="#2C1A0A" stroke-width="1" opacity="0.3" fill="none" stroke-dasharray="4 2"/>

  <!-- Nez de l'avion (ogive) -->
  <path d="M770 265 C800 265 840 262 868 260 L868 268 C840 268 800 267 770 265"
        stroke="#2C1A0A" stroke-width="1.5" opacity="0.5" fill="none"/>
  <path d="M868 260 C876 261 884 263 888 265 C884 267 876 268 868 268"
        stroke="#2C1A0A" stroke-width="1.5" opacity="0.5" fill="none"/>

  <!-- Queue / empennage fuselage -->
  <path d="M115 255 C100 252 84 256 78 265 C84 274 100 278 115 275"
        stroke="#2C1A0A" stroke-width="1.5" opacity="0.5" fill="none"/>

  <!-- Cloisons de fuselage (frames) -->
  <line x1="760" y1="236" x2="760" y2="294" stroke="#2C1A0A" stroke-width="1.2" opacity="0.4"/>
  <line x1="720" y1="228" x2="720" y2="302" stroke="#2C1A0A" stroke-width="1.2" opacity="0.4"/>
  <line x1="680" y1="222" x2="680" y2="308" stroke="#2C1A0A" stroke-width="1.1" opacity="0.38"/>
  <line x1="640" y1="218" x2="640" y2="312" stroke="#2C1A0A" stroke-width="1.1" opacity="0.38"/>
  <line x1="600" y1="215" x2="600" y2="315" stroke="#2C1A0A" stroke-width="1" opacity="0.35"/>
  <line x1="560" y1="213" x2="560" y2="317" stroke="#2C1A0A" stroke-width="1" opacity="0.35"/>
  <line x1="520" y1="212" x2="520" y2="318" stroke="#2C1A0A" stroke-width="1" opacity="0.32"/>
  <line x1="480" y1="212" x2="480" y2="318" stroke="#2C1A0A" stroke-width="1" opacity="0.32"/>
  <line x1="440" y1="212" x2="440" y2="318" stroke="#2C1A0A" stroke-width="1" opacity="0.32"/>
  <line x1="400" y1="213" x2="400" y2="317" stroke="#2C1A0A" stroke-width="1" opacity="0.32"/>
  <line x1="360" y1="214" x2="360" y2="316" stroke="#2C1A0A" stroke-width="1" opacity="0.32"/>
  <line x1="320" y1="216" x2="320" y2="314" stroke="#2C1A0A" stroke-width="1" opacity="0.35"/>
  <line x1="280" y1="220" x2="280" y2="310" stroke="#2C1A0A" stroke-width="1" opacity="0.35"/>
  <line x1="240" y1="225" x2="240" y2="305" stroke="#2C1A0A" stroke-width="1" opacity="0.35"/>
  <line x1="200" y1="233" x2="200" y2="297" stroke="#2C1A0A" stroke-width="1.1" opacity="0.38"/>
  <line x1="165" y1="242" x2="165" y2="288" stroke="#2C1A0A" stroke-width="1.1" opacity="0.38"/>

  <!-- Numérotation des cloisons -->
  <text x="757" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.1</text>
  <text x="717" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.2</text>
  <text x="677" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.3</text>
  <text x="637" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.4</text>
  <text x="597" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.5</text>
  <text x="557" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.6</text>
  <text x="447" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.8</text>
  <text x="197" y="208" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">FR.12</text>

  <!-- Hublots (vue dessus = rectangles arrondis) -->
  <rect x="718" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="678" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="638" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="598" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="558" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="518" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="478" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="438" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="398" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="358" y="212" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="318" y="213" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.4" fill="none"/>
  <rect x="278" y="215" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.4" fill="none"/>
  <!-- Idem côté bas fuselage -->
  <rect x="718" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="678" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="638" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="598" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="558" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="518" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.45" fill="none"/>
  <rect x="478" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="438" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="358" y="311" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.42" fill="none"/>
  <rect x="318" y="312" width="12" height="7" rx="3.5" stroke="#2C1A0A" stroke-width="0.9" opacity="0.4" fill="none"/>

  <!-- ══════════════ AILE GAUCHE (BAS) ══════════════ -->
  <!-- Contour extérieur aile gauche -->
  <path d="
    M560 310
    C540 325 500 355 460 385
    C430 408 395 428 360 440
    C330 450 310 452 300 448
    C292 444 294 438 305 430
    C325 416 360 398 395 378
    C430 358 460 335 490 312"
    stroke="#2C1A0A" stroke-width="2" opacity="0.55" fill="none"/>

  <!-- Nervures aile gauche -->
  <line x1="490" y1="312" x2="450" y2="372" stroke="#2C1A0A" stroke-width="1" opacity="0.38"/>
  <line x1="470" y1="325" x2="420" y2="392" stroke="#2C1A0A" stroke-width="0.9" opacity="0.35"/>
  <line x1="450" y1="338" x2="392" y2="408" stroke="#2C1A0A" stroke-width="0.9" opacity="0.35"/>
  <line x1="428" y1="352" x2="365" y2="422" stroke="#2C1A0A" stroke-width="0.9" opacity="0.33"/>
  <line x1="406" y1="366" x2="342" y2="432" stroke="#2C1A0A" stroke-width="0.8" opacity="0.3"/>
  <line x1="382" y1="380" x2="322" y2="440" stroke="#2C1A0A" stroke-width="0.8" opacity="0.28"/>
  <line x1="356" y1="393" x2="306" y2="440" stroke="#2C1A0A" stroke-width="0.7" opacity="0.26"/>

  <!-- Longeron principal aile gauche -->
  <path d="M540 316 C510 340 472 372 436 400 C408 422 378 436 350 444"
        stroke="#2C1A0A" stroke-width="1.4" opacity="0.42" stroke-dasharray="6 2"/>

  <!-- Longeron secondaire -->
  <path d="M525 312 C498 334 464 364 428 392 C402 413 374 428 346 438"
        stroke="#2C1A0A" stroke-width="0.9" opacity="0.3" stroke-dasharray="4 3"/>

  <!-- Volet / aileron aile gauche -->
  <path d="M490 312 C472 325 452 340 435 356 L440 362 C458 346 478 330 496 318 Z"
        stroke="#2C1A0A" stroke-width="1" opacity="0.4" fill="none"/>
  <text x="468" y="360" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.42"
        transform="rotate(-48,468,360)">VOLET</text>

  <!-- Indicateur de flèche d'aile gauche -->
  <line x1="560" y1="310" x2="340" y2="442" stroke="#2C1A0A" stroke-width="0.7" opacity="0.28" stroke-dasharray="2 4"/>
  <text x="430" y="398" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.42"
        transform="rotate(-30,430,398)">FLÈCHE 28°</text>

  <!-- ══════════════ AILE DROITE (HAUT) ══════════════ -->
  <!-- Contour extérieur aile droite -->
  <path d="
    M560 220
    C540 205 500 175 460 145
    C430 122 395 102 360 90
    C330 80 310 78 300 82
    C292 86 294 92 305 100
    C325 114 360 132 395 152
    C430 172 460 195 490 218"
    stroke="#2C1A0A" stroke-width="2" opacity="0.55" fill="none"/>

  <!-- Nervures aile droite -->
  <line x1="490" y1="218" x2="450" y2="158" stroke="#2C1A0A" stroke-width="1" opacity="0.38"/>
  <line x1="470" y1="205" x2="420" y2="138" stroke="#2C1A0A" stroke-width="0.9" opacity="0.35"/>
  <line x1="450" y1="192" x2="392" y2="122" stroke="#2C1A0A" stroke-width="0.9" opacity="0.35"/>
  <line x1="428" y1="178" x2="365" y2="108" stroke="#2C1A0A" stroke-width="0.9" opacity="0.33"/>
  <line x1="406" y1="164" x2="342" y2="98" stroke="#2C1A0A" stroke-width="0.8" opacity="0.3"/>
  <line x1="382" y1="150" x2="322" y2="90" stroke="#2C1A0A" stroke-width="0.8" opacity="0.28"/>
  <line x1="356" y1="137" x2="306" y2="90" stroke="#2C1A0A" stroke-width="0.7" opacity="0.26"/>

  <!-- Longeron principal aile droite -->
  <path d="M540 214 C510 190 472 158 436 130 C408 108 378 94 350 86"
        stroke="#2C1A0A" stroke-width="1.4" opacity="0.42" stroke-dasharray="6 2"/>

  <!-- Longeron secondaire -->
  <path d="M525 218 C498 196 464 166 428 138 C402 117 374 102 346 92"
        stroke="#2C1A0A" stroke-width="0.9" opacity="0.3" stroke-dasharray="4 3"/>

  <!-- Volet / aileron aile droite -->
  <path d="M490 218 C472 205 452 190 435 174 L440 168 C458 184 478 200 496 212 Z"
        stroke="#2C1A0A" stroke-width="1" opacity="0.4" fill="none"/>
  <text x="468" y="170" font-family="monospace" font-size="5" fill="#2C1A0A" opacity="0.42"
        transform="rotate(48,468,170)">VOLET</text>

  <!-- Indicateur de flèche d'aile droite -->
  <line x1="560" y1="220" x2="340" y2="88" stroke="#2C1A0A" stroke-width="0.7" opacity="0.28" stroke-dasharray="2 4"/>

  <!-- ══════════════ EMPENNAGES ══════════════ -->
  <!-- Empennage horizontal gauche (bas) -->
  <path d="
    M148 282
    C130 295 110 316 98 332
    C92 340 90 346 94 350
    C100 354 112 350 128 340
    C148 328 166 310 180 294"
    stroke="#2C1A0A" stroke-width="1.8" opacity="0.5" fill="none"/>

  <!-- Nervures empennage horiz gauche -->
  <line x1="160" y1="290" x2="126" y2="334" stroke="#2C1A0A" stroke-width="0.8" opacity="0.32"/>
  <line x1="145" y1="295" x2="110" y2="340" stroke="#2C1A0A" stroke-width="0.8" opacity="0.3"/>
  <line x1="130" y1="302" x2="100" y2="344" stroke="#2C1A0A" stroke-width="0.7" opacity="0.28"/>

  <!-- Empennage horizontal droit (haut) -->
  <path d="
    M148 248
    C130 235 110 214 98 198
    C92 190 90 184 94 180
    C100 176 112 180 128 190
    C148 202 166 220 180 236"
    stroke="#2C1A0A" stroke-width="1.8" opacity="0.5" fill="none"/>

  <!-- Nervures empennage horiz droit -->
  <line x1="160" y1="240" x2="126" y2="196" stroke="#2C1A0A" stroke-width="0.8" opacity="0.32"/>
  <line x1="145" y1="234" x2="110" y2="190" stroke="#2C1A0A" stroke-width="0.8" opacity="0.3"/>
  <line x1="130" y1="228" x2="100" y2="185" stroke="#2C1A0A" stroke-width="0.7" opacity="0.28"/>

  <!-- Dérive (empennage vertical) — vue dessus = forme au sol -->
  <path d="M115 258 C100 256 88 260 80 265 C88 270 100 274 115 272"
        stroke="#2C1A0A" stroke-width="1.5" opacity="0.45" fill="none"/>
  <line x1="78" y1="265" x2="68" y2="265" stroke="#2C1A0A" stroke-width="2" opacity="0.4"/>
  <line x1="68" y1="258" x2="68" y2="272" stroke="#2C1A0A" stroke-width="1.5" opacity="0.4"/>

  <!-- ══════════════ ANNOTATIONS & COTES ══════════════ -->
  <!-- Cote envergure totale -->
  <line x1="300" y1="462" x2="300" y2="456" stroke="#2C1A0A" stroke-width="0.8" opacity="0.45"/>
  <line x1="300" y1="459" x2="870" y2="459" stroke="#2C1A0A" stroke-width="0.8" opacity="0.45"/>
  <line x1="870" y1="456" x2="870" y2="462" stroke="#2C1A0A" stroke-width="0.8" opacity="0.45"/>
  <!-- Flèches cotes -->
  <polygon points="304,458 300,456 300,462" fill="#2C1A0A" opacity="0.45"/>
  <polygon points="866,458 870,456 870,462" fill="#2C1A0A" opacity="0.45"/>
  <text x="585" y="457" font-family="monospace" font-size="6" fill="#2C1A0A" opacity="0.48" text-anchor="middle">LONGUEUR FUSELAGE : 57,0 m</text>

  <!-- Cote aile gauche -->
  <line x1="300" y1="444" x2="300" y2="470" stroke="#2C1A0A" stroke-width="0.6" opacity="0.3" stroke-dasharray="3 2"/>
  <line x1="555" y1="320" x2="555" y2="470" stroke="#2C1A0A" stroke-width="0.6" opacity="0.3" stroke-dasharray="3 2"/>
  <line x1="300" y1="468" x2="555" y2="468" stroke="#2C1A0A" stroke-width="0.8" opacity="0.38"/>
  <text x="428" y="476" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.45" text-anchor="middle">DEMI-ENVERGURE : 30,4 m</text>

  <!-- Cote largeur fuselage -->
  <line x1="640" y1="212" x2="620" y2="212" stroke="#2C1A0A" stroke-width="0.6" opacity="0.3" stroke-dasharray="3 2"/>
  <line x1="640" y1="318" x2="620" y2="318" stroke="#2C1A0A" stroke-width="0.6" opacity="0.3" stroke-dasharray="3 2"/>
  <line x1="622" y1="212" x2="622" y2="318" stroke="#2C1A0A" stroke-width="0.8" opacity="0.38"/>
  <text x="614" y="266" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.45"
        text-anchor="middle" transform="rotate(-90,614,266)">LARGEUR : 6,0 m</text>

  <!-- Repères de section (A-A, B-B) -->
  <line x1="560" y1="55" x2="560" y2="435" stroke="#2C1A0A" stroke-width="0.7" opacity="0.22" stroke-dasharray="5 3"/>
  <circle cx="560" cy="60" r="7" stroke="#2C1A0A" stroke-width="0.7" opacity="0.38" fill="none"/>
  <text x="560" y="63" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.48" text-anchor="middle">A</text>
  <circle cx="560" cy="430" r="7" stroke="#2C1A0A" stroke-width="0.7" opacity="0.38" fill="none"/>
  <text x="560" y="433" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.48" text-anchor="middle">A</text>

  <line x1="400" y1="55" x2="400" y2="435" stroke="#2C1A0A" stroke-width="0.7" opacity="0.18" stroke-dasharray="5 3"/>
  <circle cx="400" cy="60" r="7" stroke="#2C1A0A" stroke-width="0.7" opacity="0.32" fill="none"/>
  <text x="400" y="63" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">B</text>
  <circle cx="400" cy="430" r="7" stroke="#2C1A0A" stroke-width="0.7" opacity="0.32" fill="none"/>
  <text x="400" y="433" font-family="monospace" font-size="5.5" fill="#2C1A0A" opacity="0.4" text-anchor="middle">B</text>

  <!-- Labels zones -->
  <text x="700" y="265" font-family="monospace" font-size="6.5" fill="#2C1A0A" opacity="0.4"
        text-anchor="middle" dominant-baseline="middle">COCKPIT</text>
  <text x="580" y="265" font-family="monospace" font-size="6.5" fill="#2C1A0A" opacity="0.35"
        text-anchor="middle" dominant-baseline="middle">AVIONIQUE</text>
  <text x="450" y="265" font-family="monospace" font-size="6.5" fill="#2C1A0A" opacity="0.35"
        text-anchor="middle" dominant-baseline="middle">SOUTE AVANT</text>
  <text x="320" y="265" font-family="monospace" font-size="6.5" fill="#2C1A0A" opacity="0.35"
        text-anchor="middle" dominant-baseline="middle">SOUTE ARRIÈRE</text>
  <text x="185" y="265" font-family="monospace" font-size="6.5" fill="#2C1A0A" opacity="0.35"
        text-anchor="middle" dominant-baseline="middle">APU</text>

  <!-- Treillis ossature interne (biomimétique os/treillis) -->
  <path d="M700 240 L720 255 L700 270 L680 255 Z"
        stroke="#2C1A0A" stroke-width="0.8" opacity="0.3" fill="none"/>
  <path d="M660 238 L680 252 L660 266 L640 252 Z"
        stroke="#2C1A0A" stroke-width="0.8" opacity="0.28" fill="none"/>
  <path d="M620 236 L640 250 L620 264 L600 250 Z"
        stroke="#2C1A0A" stroke-width="0.8" opacity="0.26" fill="none"/>
  <path d="M580 235 L600 249 L580 263 L560 249 Z"
        stroke="#2C1A0A" stroke-width="0.7" opacity="0.24" fill="none"/>
  <path d="M540 235 L560 249 L540 263 L520 249 Z"
        stroke="#2C1A0A" stroke-width="0.7" opacity="0.24" fill="none"/>
  <path d="M500 235 L520 249 L500 263 L480 249 Z"
        stroke="#2C1A0A" stroke-width="0.7" opacity="0.22" fill="none"/>
  <path d="M460 235 L480 249 L460 263 L440 249 Z"
        stroke="#2C1A0A" stroke-width="0.7" opacity="0.22" fill="none"/>

  <!-- Ligne organique / lien biologique -->
  <path d="M300 390 Q360 370 420 378 Q490 388 560 368 Q620 352 680 362"
        stroke="#7A9668" stroke-width="1.8" stroke-dasharray="6 4" stroke-linecap="round" opacity="0.48"/>
  <circle cx="300" cy="390" r="3" fill="#7A9668" opacity="0.5"/>
  <circle cx="560" cy="368" r="3" fill="#7A9668" opacity="0.5"/>
  <circle cx="680" cy="362" r="3" fill="#7A9668" opacity="0.5"/>
  <text x="490" y="384" font-family="monospace" font-size="5" fill="#7A9668" opacity="0.55"
        text-anchor="middle">— lien biomimétique —</text>
`;

/* ── Lancement ── */
initRound();