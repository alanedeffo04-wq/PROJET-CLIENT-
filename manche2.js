/* ════════════════════════════════════════════
   MANCHE 2 — Écosystème Marin
   Fond : Récif de corail gravé | Cartes : galets ronds
════════════════════════════════════════════ */

const ROUND_DATA = {
  roundNum: 2,
  title:    "Manche 2",
  subtitle: "Écosystème Marin",
  manche:   "Manche 2 : L'Écosystème Marin & L'Architecture Aquatique",
  cardStyle:"r2",
  layout:   "layout-r2",
  connexionLabel: "Connexion Établie - Floraison Maritime",
  pairs: [
    {
      id: "corail-co2",
      a:  { emoji:"🪸", label:"Corail" },
      b:  { emoji:"🧊", label:"Ciment CO₂" },
      edu:{
        title:"CORAIL / CIMENT CO₂",
        desc: "Les polypes de corail séquestrent le carbone pour construire leur squelette calcaire. Ce mécanisme inspire la création de ciments neutres en carbone qui absorbent le CO₂ pendant leur production.",
        emojiA:"🪸", emojiB:"🧊"
      }
    },
    {
      id: "baleine-eolienne",
      a:  { emoji:"🐋", label:"Baleine à Bosse" },
      b:  { emoji:"🌬️", label:"Éolienne Tubercule" },
      edu:{
        title:"NAGEOIRE DE BALEINE / PALE D'ÉOLIENNE",
        desc: "Les tubercules sur les nageoires de la baleine à bosse réduisent la résistance hydrodynamique. Ce principe améliore l'efficacité aérodynamique des pales d'éoliennes.",
        emojiA:"🐋", emojiB:"🌬️"
      }
    },
    {
      id: "nautile-escalier",
      a:  { emoji:"🐚", label:"Nautile" },
      b:  { emoji:"🌀", label:"Escalier Spirale" },
      edu:{
        title:"NAUTILE / ESCALIER SPIRALÉ",
        desc: "La spirale logarithmique du nautile combine efficacité structurelle et beauté mathématique. Ce principe inspire des escaliers hélicoïdaux et structures architecturales organiques.",
        emojiA:"🐚", emojiB:"🌀"
      }
    },
    {
      id: "requin-revetement",
      a:  { emoji:"🦈", label:"Peau de Requin" },
      b:  { emoji:"🏊", label:"Revêtement Riblet" },
      edu:{
        title:"PEAU DE REQUIN / REVÊTEMENTS AÉRODYNAMIQUES",
        desc: "Les écailles dermiques du requin réduisent la traînée dans l'eau. Ce principe inspire des revêtements à micro-reliefs pour façades et structures exposées au vent.",
        emojiA:"🦈", emojiB:"🏊"
      }
    }
  ]
};

/* ── SVG Gravure : Récif de corail ── */
const ENGRAVING_SVG = `
  <!-- Corail gauche -->
  <path d="M160 510 Q162 450 158 410 Q154 370 148 340" stroke="#5A3A12" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M158 410 Q140 390 128 360 Q118 335 115 308" stroke="#5A3A12" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M158 430 Q178 408 188 380 Q196 355 192 328" stroke="#5A3A12" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M148 370 Q132 352 126 326" stroke="#5A3A12" stroke-width="2" stroke-linecap="round"/>
  <path d="M148 370 Q165 348 170 318" stroke="#5A3A12" stroke-width="2" stroke-linecap="round"/>
  <path d="M115 308 Q108 285 112 265 M115 308 Q125 285 130 262" stroke="#5A3A12" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M192 328 Q198 305 195 282 M192 328 Q180 306 178 280" stroke="#5A3A12" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Corail centre -->
  <path d="M450 510 Q452 440 448 395 Q444 360 440 330" stroke="#5A3A12" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M448 395 Q428 372 418 342 Q410 318 412 292" stroke="#5A3A12" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M448 410 Q472 385 482 352 Q490 325 486 296" stroke="#5A3A12" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M440 360 Q422 338 418 308" stroke="#5A3A12" stroke-width="2" stroke-linecap="round"/>
  <path d="M412 292 Q405 268 410 248 M412 292 Q422 270 426 246" stroke="#5A3A12" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Corail droit -->
  <path d="M740 510 Q742 445 738 400 Q734 362 730 330" stroke="#5A3A12" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M738 400 Q718 376 708 346 Q700 320 702 292" stroke="#5A3A12" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M738 418 Q762 394 772 362 Q780 334 776 306" stroke="#5A3A12" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M730 370 Q712 348 708 318 M730 370 Q748 348 752 316" stroke="#5A3A12" stroke-width="2" stroke-linecap="round"/>
  <!-- Fond récif -->
  <path d="M50 490 Q200 460 350 475 Q500 490 650 465 Q780 445 880 470" stroke="#5A3A12" stroke-width="2" stroke-linecap="round" opacity=".5"/>
  <!-- Lien organique -->
  <path d="M280 430 Q360 400 440 415 Q520 430 600 405 Q660 388 720 410"
        stroke="#7A9668" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round" opacity=".55"/>
`;

/* ── Lancement ── */
initRound();
