/* ════════════════════════════════════════════
   MANCHE 3 — Donner Vie à la Maison STK
   Fond : Plan de maison / trame architecturale | Cartes : galets ronds
════════════════════════════════════════════ */

const ROUND_DATA = {
  roundNum: 3,
  title:    "Round 3",
  subtitle: "Donner Vie à la Maison STK",
  manche:   "Manche 3 : La Maison Moderne & L'Habitat Durable",
  cardStyle:"r3",
  layout:   "layout-r3",
  connexionLabel: "Connexion Établie - Floraison Urbaine",
  pairs: [
    {
      id: "nid-structure",
      a:  { emoji:"🪺", label:"Nid d'Oiseau" },
      b:  { emoji:"🏡", label:"Structure Tissée" },
      edu:{
        title:"NID D'OISEAU / STRUCTURE TISSÉE",
        desc: "L'oiseau tisse des branches pour créer un abri résilient et durable. Ce principe d'habitat tissé inspire des méthodes de construction durables et la modularité des structures architecturales modernes.",
        emojiA:"🪺", emojiB:"🏡"
      }
    },
    {
      id: "papillon-facade",
      a:  { emoji:"🦋", label:"Papillon Morpho" },
      b:  { emoji:"🔵", label:"Façade Photonique" },
      edu:{
        title:"PAPILLON MORPHO / FAÇADE PHOTONIQUE",
        desc: "Le papillon Morpho produit sa couleur bleue par nanostructures, sans pigment. Ce principe inspire des façades changeant de teinte selon l'angle, réduisant les besoins en peinture.",
        emojiA:"🦋", emojiB:"🔵"
      }
    },
    {
      id: "gecko-vitrage",
      a:  { emoji:"🦎", label:"Gecko" },
      b:  { emoji:"🪟", label:"Vitrage Gecko" },
      edu:{
        title:"GECKO / SYSTÈMES D'ADHÉSION RÉVERSIBLE",
        desc: "Le gecko adhère aux surfaces verticales grâce à des millions de nanopoils. Ce principe inspire des systèmes de fixation réversibles pour panneaux de façade et vitrages modulaires.",
        emojiA:"🦎", emojiB:"🪟"
      }
    },
    {
      id: "bambou-poteau",
      a:  { emoji:"🎍", label:"Bambou" },
      b:  { emoji:"🏗️", label:"Structure Tubulaire" },
      edu:{
        title:"BAMBOU / STRUCTURES TUBULAIRES",
        desc: "Le bambou doit sa résistance à sa structure tubulaire creuse et ses nœuds répartisseurs de contraintes. Ce principe inspire des poteaux creux et des éléments de charpente légers.",
        emojiA:"🎍", emojiB:"🏗️"
      }
    },
    {
      id: "nautile-plan",
      a:  { emoji:"🐚", label:"Coquille Nautile" },
      b:  { emoji:"📐", label:"Plan Spiral" },
      edu:{
        title:"COQUILLE NAUTILE / PLAN EN SPIRALE",
        desc: "La spirale de croissance du nautile obéit à la suite de Fibonacci. Ce principe guide la conception de plans d'habitat dont les espaces s'organisent de manière organique et efficiente.",
        emojiA:"🐚", emojiB:"📐"
      }
    }
  ]
};

/* ── SVG Gravure : Plan de maison ── */
const ENGRAVING_SVG = `
  <!-- Plan masse maison -->
  <rect x="120" y="100" width="320" height="250" rx="3" stroke="#2C1A0A" stroke-width="1.8" opacity=".55"/>
  <rect x="140" y="120" width="140" height="110" rx="2" stroke="#2C1A0A" stroke-width="1.2" opacity=".45"/>
  <rect x="140" y="240" width="120" height="95"  rx="2" stroke="#2C1A0A" stroke-width="1.2" opacity=".45"/>
  <rect x="290" y="120" width="130" height="95"  rx="2" stroke="#2C1A0A" stroke-width="1.2" opacity=".45"/>
  <rect x="290" y="225" width="130" height="110" rx="2" stroke="#2C1A0A" stroke-width="1.2" opacity=".45"/>
  <!-- Toit maison droite -->
  <path d="M480 200 L590 120 L700 200 L700 350 L480 350 Z" stroke="#2C1A0A" stroke-width="1.8" opacity=".5" fill="none"/>
  <path d="M480 200 L590 120 L700 200" stroke="#2C1A0A" stroke-width="2" opacity=".55"/>
  <line x1="540" y1="350" x2="540" y2="200" stroke="#2C1A0A" stroke-width="1" opacity=".35"/>
  <line x1="640" y1="350" x2="640" y2="200" stroke="#2C1A0A" stroke-width="1" opacity=".35"/>
  <line x1="480" y1="270" x2="700" y2="270" stroke="#2C1A0A" stroke-width="1" opacity=".35"/>
  <!-- Arbre paysager -->
  <circle cx="760" cy="180" r="40" stroke="#2C1A0A" stroke-width="1.5" opacity=".4" fill="none"/>
  <line x1="760" y1="220" x2="760" y2="270" stroke="#2C1A0A" stroke-width="1.5" opacity=".4"/>
  <circle cx="180" cy="420" r="28" stroke="#2C1A0A" stroke-width="1.2" opacity=".38" fill="none"/>
  <line x1="180" y1="448" x2="180" y2="480" stroke="#2C1A0A" stroke-width="1.2" opacity=".38"/>
  <!-- Côtes / flèches de mesure -->
  <line x1="120" y1="85" x2="440" y2="85" stroke="#2C1A0A" stroke-width=".9" opacity=".35"/>
  <line x1="120" y1="82" x2="120" y2="88" stroke="#2C1A0A" stroke-width=".9" opacity=".35"/>
  <line x1="440" y1="82" x2="440" y2="88" stroke="#2C1A0A" stroke-width=".9" opacity=".35"/>
  <line x1="105" y1="100" x2="105" y2="350" stroke="#2C1A0A" stroke-width=".9" opacity=".35"/>
  <line x1="102" y1="100" x2="108" y2="100" stroke="#2C1A0A" stroke-width=".9" opacity=".35"/>
  <line x1="102" y1="350" x2="108" y2="350" stroke="#2C1A0A" stroke-width=".9" opacity=".35"/>
  <!-- Lien organique floraison urbaine -->
  <path d="M300 380 Q400 355 500 365 Q600 375 680 355"
        stroke="#7A9668" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round" opacity=".5"/>
`;

/* ── Lancement ── */
initRound();
