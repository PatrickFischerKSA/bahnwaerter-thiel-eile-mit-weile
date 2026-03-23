const GRID_SIZE = 13;
const START_INDICES = new Set([0, 10, 20, 30]);
const SPECIAL_FIELDS = new Map([
  [2, 'text'],
  [7, 'schicksal'],
  [12, 'deutung'],
  [18, 'text'],
  [23, 'schicksal'],
  [28, 'deutung'],
  [33, 'text'],
  [38, 'schicksal']
]);

const TRACK_COORDS = [
  { x: 6, y: 1 },
  { x: 7, y: 1 },
  { x: 8, y: 1 },
  { x: 9, y: 1 },
  { x: 10, y: 1 },
  { x: 11, y: 1 },
  { x: 11, y: 2 },
  { x: 11, y: 3 },
  { x: 11, y: 4 },
  { x: 11, y: 5 },
  { x: 11, y: 6 },
  { x: 11, y: 7 },
  { x: 11, y: 8 },
  { x: 11, y: 9 },
  { x: 11, y: 10 },
  { x: 11, y: 11 },
  { x: 10, y: 11 },
  { x: 9, y: 11 },
  { x: 8, y: 11 },
  { x: 7, y: 11 },
  { x: 6, y: 11 },
  { x: 5, y: 11 },
  { x: 4, y: 11 },
  { x: 3, y: 11 },
  { x: 2, y: 11 },
  { x: 1, y: 11 },
  { x: 1, y: 10 },
  { x: 1, y: 9 },
  { x: 1, y: 8 },
  { x: 1, y: 7 },
  { x: 1, y: 6 },
  { x: 1, y: 5 },
  { x: 1, y: 4 },
  { x: 1, y: 3 },
  { x: 1, y: 2 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 }
];

const PLAYER_PRESETS = [
  {
    tone: 'rot',
    defaultName: 'Signalrot',
    startIndex: 0,
    homeCells: [
      { x: 0, y: 0, pieceIndex: 0 },
      { x: 1, y: 0, pieceIndex: 1 },
      { x: 2, y: 0, pieceIndex: 2 },
      { x: 0, y: 1, pieceIndex: 3 }
    ],
    laneCells: [
      { x: 6, y: 2 },
      { x: 6, y: 3 },
      { x: 6, y: 4 },
      { x: 6, y: 5 }
    ]
  },
  {
    tone: 'blau',
    defaultName: 'Nebelblau',
    startIndex: 10,
    homeCells: [
      { x: 10, y: 0, pieceIndex: 0 },
      { x: 11, y: 0, pieceIndex: 1 },
      { x: 12, y: 0, pieceIndex: 2 },
      { x: 12, y: 1, pieceIndex: 3 }
    ],
    laneCells: [
      { x: 10, y: 6 },
      { x: 9, y: 6 },
      { x: 8, y: 6 },
      { x: 7, y: 6 }
    ]
  },
  {
    tone: 'gruen',
    defaultName: 'Waldgrün',
    startIndex: 20,
    homeCells: [
      { x: 12, y: 10, pieceIndex: 0 },
      { x: 12, y: 11, pieceIndex: 1 },
      { x: 11, y: 12, pieceIndex: 2 },
      { x: 12, y: 12, pieceIndex: 3 }
    ],
    laneCells: [
      { x: 6, y: 10 },
      { x: 6, y: 9 },
      { x: 6, y: 8 },
      { x: 6, y: 7 }
    ]
  },
  {
    tone: 'gelb',
    defaultName: 'Messinggelb',
    startIndex: 30,
    homeCells: [
      { x: 0, y: 10, pieceIndex: 0 },
      { x: 0, y: 11, pieceIndex: 1 },
      { x: 0, y: 12, pieceIndex: 2 },
      { x: 1, y: 12, pieceIndex: 3 }
    ],
    laneCells: [
      { x: 2, y: 6 },
      { x: 3, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 }
    ]
  }
];

const ACTION_LIBRARY = [
  { key: '1-11', label: '1 / 11', kind: 'choice', summary: 'Start, 1 oder 11', copies: 8 },
  { key: '13', label: '13', kind: 'choice', summary: 'Start oder 13', copies: 8 },
  { key: '4pm', label: '4 ±', kind: 'choice', summary: '4 vor oder zurück', copies: 8 },
  { key: '7', label: '7', kind: 'split', summary: '7 aufteilen', copies: 8 },
  { key: 'swap', label: 'Tausch', kind: 'swap', summary: 'Figuren tauschen', copies: 8 },
  { key: '2', label: '2', kind: 'move', steps: 2, summary: '2 vor', copies: 8 },
  { key: '3', label: '3', kind: 'move', steps: 3, summary: '3 vor', copies: 8 },
  { key: '5', label: '5', kind: 'move', steps: 5, summary: '5 vor', copies: 8 },
  { key: '6', label: '6', kind: 'move', steps: 6, summary: '6 vor', copies: 8 },
  { key: '8', label: '8', kind: 'move', steps: 8, summary: '8 vor', copies: 8 },
  { key: '9', label: '9', kind: 'move', steps: 9, summary: '9 vor', copies: 8 },
  { key: '10', label: '10', kind: 'move', steps: 10, summary: '10 vor', copies: 8 },
  { key: '12', label: '12', kind: 'move', steps: 12, summary: '12 vor', copies: 8 },
  { key: 'joker', label: '?', kind: 'joker', summary: 'beliebige Karte', copies: 6 }
];

const LITERATURE_CARDS = {
  text: [
    {
      title: 'Warum die zweite Ehe?',
      prompt: 'Warum heiratet Thiel nach Minnas Tod relativ schnell erneut?',
      options: [
        'Weil Tobias eine verlässliche Betreuung braucht.',
        'Weil der Pastor ihn dazu zwingt.',
        'Weil Minna ihn darum gebeten hat.',
        'Weil er in der Kirche verspottet wird.'
      ],
      correct: 0,
      explanation: 'Thiel begründet die zweite Heirat ausdrücklich mit Tobias, der ohne verlässliche Pflege nicht gut versorgt ist.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Minnas Tod',
      prompt: 'Wie stirbt Minna im Text?',
      options: [
        'Bei einem Brand im Wärterhaus.',
        'An einer Krankheit im Winter.',
        'Im Wochenbett nach Tobias’ Geburt.',
        'Bei einem Unfall am Bahnübergang.'
      ],
      correct: 2,
      explanation: 'Minna stirbt im Wochenbett; Tobias überlebt, bleibt aber schwach und pflegebedürftig.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Die Bude als Kapelle',
      prompt: 'Was macht Thiel nachts aus seinem Wärterhäuschen?',
      options: [
        'Einen Treffpunkt für Arbeiter.',
        'Eine Kapelle der Erinnerung an Minna.',
        'Eine Schlafstätte für Tobias.',
        'Ein Lager für Kartoffeln und Werkzeuge.'
      ],
      correct: 1,
      explanation: 'Mit Foto, Bibel und Gesangbuch verwandelt Thiel die Bude in einen sakral aufgeladenen Erinnerungsraum.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Der abgelegene Posten',
      prompt: 'Was prägt Thiels Dienstort besonders stark?',
      options: [
        'Lärm der Großstadt und dauernde Menschenmengen.',
        'Die Nähe zu einem Hafen.',
        'Die Abgeschiedenheit im märkischen Kiefernforst.',
        'Ein Militärlager neben dem Übergang.'
      ],
      correct: 2,
      explanation: 'Der Text betont die Isolation des Postens im märkischen Kiefernforst als psychisch verstärkenden Raum.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Lene und Tobias',
      prompt: 'Wie behandelt Lene Tobias überwiegend?',
      options: [
        'Mit fürsorglicher Geduld.',
        'Mit Gleichgültigkeit und später offener Härte.',
        'Als gleichberechtigtes Lieblingskind.',
        'Sie schickt ihn in die Schule und schützt ihn.'
      ],
      correct: 1,
      explanation: 'Lene wendet sich von Tobias ab, nutzt ihn aus und setzt ihn Gewalt und Überforderung aus.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Die Katastrophe',
      prompt: 'Welche Situation führt unmittelbar zu Tobias’ Tod?',
      options: [
        'Thiel vergisst die Barriere zu schließen.',
        'Lene nimmt Tobias zum Kartoffelsetzen mit an die Gleise.',
        'Tobias läuft nachts allein in den Wald.',
        'Ein Blitz schlägt in das Wärterhaus ein.'
      ],
      correct: 1,
      explanation: 'Lene besteht darauf, dass Tobias beim Feldstück an der Bahn bleibt; kurz darauf wird er vom Zug erfasst.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    }
  ],
  deutung: [
    {
      title: 'Innerer Riss',
      prompt: 'Welcher Gegensatz bestimmt Thiels Innenleben besonders stark?',
      options: [
        'Pflicht und Besitzgier.',
        'Erinnerung an Minna und Abhängigkeit von Lene.',
        'Stadtleben und Landlust.',
        'Humor und Leichtsinn.'
      ],
      correct: 1,
      explanation: 'Thiel schwankt zwischen vergeistigter Bindung an Minna und roher, schuldbehafteter Abhängigkeit von Lene.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Naturalistische Studie',
      prompt: 'Warum passt die Bezeichnung „novellistische Studie“ gut zum Text?',
      options: [
        'Weil der Erzähler vor allem Märchenfiguren erfindet.',
        'Weil Milieu, Körperlichkeit und psychische Prozesse genau beobachtet werden.',
        'Weil fast nur Dialoge vorkommen.',
        'Weil der Text ohne Konflikte auskommt.'
      ],
      correct: 1,
      explanation: 'Der Text wirkt stellenweise wie eine genaue Fall- und Milieustudie: Arbeit, Raum, Körper und Psyche greifen eng ineinander.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Bahn und Wald',
      prompt: 'Welche Deutung trifft das Motivfeld aus Bahn und Natur am besten?',
      options: [
        'Die Natur bleibt völlig harmlos, nur Technik ist bedrohlich.',
        'Bahn und Wald bilden ein Spannungsfeld aus Ordnung, Isolation und Gefahr.',
        'Der Wald steht nur für Ferien und Erholung.',
        'Die Bahn ist ausschließlich Symbol für Fortschritt.'
      ],
      correct: 1,
      explanation: 'Der Forst isoliert, die Bahn beschleunigt und bedroht; zusammen verdichten sie Thiels Situation.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Vision und Wahn',
      prompt: 'Welche Funktion haben Thiels religiöse Rituale und Visionen?',
      options: [
        'Sie zeigen nur komische Seiten an ihm.',
        'Sie halten die Handlung an, ohne Bedeutung.',
        'Sie kompensieren Schuld und führen zugleich tiefer in die Zerrüttung.',
        'Sie beweisen, dass Thiel übernatürliche Kräfte besitzt.'
      ],
      correct: 2,
      explanation: 'Die Rituale geben Thiel Halt, steigern aber zugleich seine Abspaltung und den späteren Wahn.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Tobias als Zentrum',
      prompt: 'Warum ist Tobias für die Gesamtdeutung so wichtig?',
      options: [
        'Er zeigt den wirtschaftlichen Aufstieg der Familie.',
        'An ihm bündeln sich Fürsorge, Gewalt, Schuld und moralisches Versagen.',
        'Er erzählt den Text aus seiner Sicht.',
        'Er rettet Lene am Ende.'
      ],
      correct: 1,
      explanation: 'Tobias macht die Brutalität im Familiengefüge sichtbar und wird zum Auslöser von Schuld, Wahn und Gewalt.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Ende der Kontrolle',
      prompt: 'Was zeigt das Ende besonders deutlich?',
      options: [
        'Dass Thiel am Schluss alles nüchtern erklärt.',
        'Dass soziale und psychische Spannungen in totale Entgrenzung umschlagen.',
        'Dass die Dorfgemeinschaft harmonisch vermittelt.',
        'Dass Lene die eigentliche Erzählerin war.'
      ],
      correct: 1,
      explanation: 'Nach Tobias’ Tod kippt Thiels mühsame Selbstkontrolle in Raserei, Mord und endgültigen Wahnsinn.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    }
  ],
  schicksal: [
    {
      title: 'Kirchgang in Neu-Zittau',
      prompt: 'Thiel hält an seinem Ritual fest. Für einen Moment ordnet sich sein Inneres.',
      explanation: 'Die Sonntagsgänge zur Kirche markieren Gewohnheit, Pflicht und das Bedürfnis nach Ordnung.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Nachtwache in der Bude',
      prompt: 'Foto, Bibel und Gesangbuch liegen bereit. Der abgelegene Posten wird zum Schutzraum.',
      explanation: 'Die sakrale Aufladung des Häuschens hält Thiel kurzfristig zusammen.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Pfiff der Maschine',
      prompt: 'Ein gellender Warnruf durchschneidet den Forst. Alles scheint einen Takt zu früh.',
      explanation: 'Die Eisenbahn ist im Text nicht nur Arbeitswelt, sondern permanentes Droh- und Beschleunigungsmotiv.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Barriere im Blick',
      prompt: 'Für einen Augenblick sitzt jede Bewegung. Dienst, Rhythmus und Aufmerksamkeit greifen ineinander.',
      explanation: 'Berufsroutine gibt Thiel zeitweise Halt und Struktur.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Roter Nebel',
      prompt: 'Nach Tobias’ Tod verschiebt sich Wahrnehmung in Wahn und Gewaltfantasie.',
      explanation: 'Der Text zeichnet den Übergang vom seelischen Bruch zur Raserei mit drastischen Bildern nach.',
      reward: { kind: 'loseShield', amount: 1, text: 'Du verlierst 1 Schutzmarke, falls vorhanden.' }
    },
    {
      title: 'Erschöpfung am Damm',
      prompt: 'Milieu, Hitze, Arbeit und innerer Druck legen sich schwer auf die Runde.',
      explanation: 'Im Naturalismus wirken Umwelt und Körper nicht dekorativ, sondern handlungsprägend.',
      reward: { kind: 'none', amount: 0, text: 'Kein Bonus in dieser Runde.' }
    }
  ]
};

const boardEl = document.getElementById('board');
const playerInputsEl = document.getElementById('playerInputs');
const playerCountPicker = document.getElementById('playerCountPicker');
const newGameBtn = document.getElementById('newGameBtn');
const currentPlayerChip = document.getElementById('currentPlayerChip');
const roundSizeEl = document.getElementById('roundSize');
const deckCountEl = document.getElementById('deckCount');
const handAreaEl = document.getElementById('handArea');
const activeCardSummaryEl = document.getElementById('activeCardSummary');
const actionOptionsEl = document.getElementById('actionOptions');
const turnHintEl = document.getElementById('turnHint');
const playerListEl = document.getElementById('playerList');
const logListEl = document.getElementById('logList');
const recentCardEl = document.getElementById('recentCard');
const modalEl = document.getElementById('cardModal');
const cardTypeEl = document.getElementById('cardType');
const cardTitleEl = document.getElementById('cardTitle');
const cardPromptEl = document.getElementById('cardPrompt');
const cardOptionsEl = document.getElementById('cardOptions');
const cardFeedbackEl = document.getElementById('cardFeedback');
const cardContinueBtn = document.getElementById('cardContinueBtn');

let selectedPlayerCount = 2;
let uniqueCardId = 0;
let state = createInitialState();

function createInitialState() {
  return {
    players: [],
    currentPlayer: 0,
    currentRound: 0,
    activeDealSize: 6,
    currentDealSize: 6,
    nextDealSize: 5,
    deck: [],
    discard: [],
    playableCardIds: [],
    selectedCardId: null,
    actionContext: null,
    pendingLiterature: null,
    recentCard: null,
    log: [],
    gameOver: false
  };
}

function coordKey(x, y) {
  return `${x},${y}`;
}

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function cloneLiteratureDeck(type) {
  return shuffle(
    LITERATURE_CARDS[type].map((card) => ({ ...card, reward: { ...card.reward } }))
  );
}

function buildActionDeck() {
  const deck = [];
  ACTION_LIBRARY.forEach((template) => {
    for (let count = 0; count < template.copies; count += 1) {
      uniqueCardId += 1;
      deck.push({
        ...template,
        uid: `${template.key}-${uniqueCardId}`
      });
    }
  });
  return shuffle(deck);
}

function getConfiguredName(playerIndex, fallback) {
  const input = document.querySelector(`[data-player-name="${playerIndex}"]`);
  const raw = input ? input.value.trim() : '';
  return raw || fallback;
}

function setupPlayers(count) {
  return PLAYER_PRESETS.slice(0, count).map((preset, playerIndex) => ({
    id: `player-${playerIndex + 1}`,
    playerIndex,
    tone: preset.tone,
    name: getConfiguredName(playerIndex, preset.defaultName),
    startIndex: preset.startIndex,
    homeCells: preset.homeCells,
    laneCells: preset.laneCells,
    shields: 0,
    insights: 0,
    outForRound: false,
    deckIndices: { text: 0, deutung: 0, schicksal: 0 },
    literatureDecks: {
      text: cloneLiteratureDeck('text'),
      deutung: cloneLiteratureDeck('deutung'),
      schicksal: cloneLiteratureDeck('schicksal')
    },
    hand: [],
    pieces: Array.from({ length: 4 }, (_, pieceIndex) => ({
      id: `${preset.tone}-${pieceIndex + 1}`,
      pieceIndex,
      steps: -1
    }))
  }));
}

function renderPlayerInputs() {
  playerInputsEl.innerHTML = '';
  PLAYER_PRESETS.slice(0, selectedPlayerCount).forEach((preset, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'player-input';
    wrapper.dataset.tone = preset.tone;

    const label = document.createElement('label');
    label.setAttribute('for', `player-name-${index}`);
    label.textContent = `Spieler ${index + 1}`;

    const input = document.createElement('input');
    input.id = `player-name-${index}`;
    input.dataset.playerName = String(index);
    input.type = 'text';
    input.maxLength = 18;
    input.value = preset.defaultName;

    wrapper.append(label, input);
    playerInputsEl.appendChild(wrapper);
  });
}

function buildCellMeta() {
  const meta = new Map();

  TRACK_COORDS.forEach((coord, index) => {
    const preset = PLAYER_PRESETS.find((entry) => entry.startIndex === index);
    meta.set(coordKey(coord.x, coord.y), {
      type: 'track',
      index,
      special: SPECIAL_FIELDS.get(index) || null,
      startTone: preset ? preset.tone : null
    });
  });

  PLAYER_PRESETS.forEach((preset) => {
    preset.homeCells.forEach((homeCell) => {
      meta.set(coordKey(homeCell.x, homeCell.y), {
        type: 'home',
        ownerTone: preset.tone,
        pieceIndex: homeCell.pieceIndex
      });
    });

    preset.laneCells.forEach((laneCell, laneIndex) => {
      meta.set(coordKey(laneCell.x, laneCell.y), {
        type: 'home-lane',
        ownerTone: preset.tone,
        laneIndex
      });
    });
  });

  meta.set(coordKey(6, 6), { type: 'center' });
  return meta;
}

const CELL_META = buildCellMeta();

function getCurrentPlayer() {
  return state.players[state.currentPlayer];
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 10);
}

function getPieceState(player, piece) {
  if (piece.steps === -1) return { zone: 'home' };
  if (piece.steps >= 0 && piece.steps < 40) {
    return {
      zone: 'track',
      absoluteIndex: (player.startIndex + piece.steps) % 40
    };
  }
  if (piece.steps >= 40 && piece.steps < 44) {
    return {
      zone: 'lane',
      laneIndex: piece.steps - 40
    };
  }
  return { zone: 'finish' };
}

function relativeTrackSteps(playerIndex, absoluteIndex) {
  const player = state.players[playerIndex];
  return (absoluteIndex - player.startIndex + 40) % 40;
}

function getPiecesOnTrack(absoluteIndex) {
  const result = [];
  state.players.forEach((player, playerIndex) => {
    player.pieces.forEach((piece) => {
      const pieceState = getPieceState(player, piece);
      if (pieceState.zone === 'track' && pieceState.absoluteIndex === absoluteIndex) {
        result.push({ playerIndex, piece });
      }
    });
  });
  return result;
}

function getTrackOccupant(absoluteIndex) {
  return getPiecesOnTrack(absoluteIndex)[0] || null;
}

function getLaneOccupant(playerIndex, laneIndex) {
  const player = state.players[playerIndex];
  return player.pieces.find((piece) => {
    const pieceState = getPieceState(player, piece);
    return pieceState.zone === 'lane' && pieceState.laneIndex === laneIndex;
  }) || null;
}

function getProtectedStartOccupant(absoluteIndex) {
  const occupant = getTrackOccupant(absoluteIndex);
  if (!occupant) return null;
  const owner = state.players.find((player) => player.startIndex === absoluteIndex);
  if (!owner) return null;
  return owner.playerIndex === occupant.playerIndex && occupant.piece.steps === 0 ? occupant : null;
}

function nextForwardStep(current) {
  if (current === -1 || current === 44) return null;
  if (current < 44) return current + 1;
  return null;
}

function nextBackwardStep(current) {
  if (current === -1 || current === 44) return null;
  if (current > 40) return current - 1;
  if (current === 40) return 39;
  if (current > 0) return current - 1;
  if (current === 0) return 39;
  return null;
}

function simulateMove(playerIndex, pieceId, amount) {
  const player = state.players[playerIndex];
  const piece = player.pieces.find((entry) => entry.id === pieceId);
  if (!piece || piece.steps === -1 || piece.steps === 44 || amount === 0) {
    return { valid: false };
  }

  const direction = amount > 0 ? 1 : -1;
  let current = piece.steps;

  for (let step = 1; step <= Math.abs(amount); step += 1) {
    const next = direction > 0 ? nextForwardStep(current) : nextBackwardStep(current);
    if (next === null) return { valid: false };
    if (direction > 0 && next > 44) return { valid: false };
    if (direction > 0 && current >= 40 && next > 44) return { valid: false };

    if (next >= 0 && next < 40) {
      const absoluteIndex = (player.startIndex + next) % 40;
      const protectedOccupant = getProtectedStartOccupant(absoluteIndex);
      if (protectedOccupant && !(protectedOccupant.playerIndex === playerIndex && protectedOccupant.piece.id === pieceId)) {
        return { valid: false };
      }
    }

    if (next >= 40 && next < 44) {
      const laneOccupant = getLaneOccupant(playerIndex, next - 40);
      if (laneOccupant && laneOccupant.id !== pieceId) {
        return { valid: false };
      }
    }

    current = next;
  }

  if (amount > 0 && current > 44) return { valid: false };
  return { valid: true, destination: current };
}

function canMovePiece(playerIndex, pieceId, amount) {
  return simulateMove(playerIndex, pieceId, amount).valid;
}

function canEnterStart(playerIndex) {
  const player = state.players[playerIndex];
  const protectedOccupant = getProtectedStartOccupant(player.startIndex);
  if (!protectedOccupant) return true;
  return protectedOccupant.playerIndex !== playerIndex;
}

function getStartablePieces(playerIndex) {
  if (!canEnterStart(playerIndex)) return [];
  return state.players[playerIndex].pieces.filter((piece) => piece.steps === -1);
}

function resolveLandingOnTrack(playerIndex, pieceId, absoluteIndex) {
  const movingPlayer = state.players[playerIndex];
  const occupant = getTrackOccupant(absoluteIndex);
  if (!occupant) return;
  if (occupant.playerIndex === playerIndex && occupant.piece.id === pieceId) return;

  const protectedOccupant = getProtectedStartOccupant(absoluteIndex);
  if (protectedOccupant) return;

  const defender = state.players[occupant.playerIndex];
  if (defender.shields > 0) {
    defender.shields -= 1;
    addLog(`${defender.name} schützt eine Figur mit einer Schutzmarke.`);
  } else {
    occupant.piece.steps = -1;
    addLog(`${movingPlayer.name} schickt ${defender.name}s Figur zurück ins Depot.`);
  }
}

function queueLiteratureFromTrack(playerIndex, pieceId) {
  const player = state.players[playerIndex];
  const piece = player.pieces.find((entry) => entry.id === pieceId);
  const pieceState = getPieceState(player, piece);
  if (pieceState.zone !== 'track') return;
  const type = SPECIAL_FIELDS.get(pieceState.absoluteIndex);
  if (!type) return;

  const deckIndex = player.deckIndices[type] % player.literatureDecks[type].length;
  const card = player.literatureDecks[type][deckIndex];
  player.deckIndices[type] += 1;
  state.pendingLiterature = { playerIndex, pieceId, type, card };
}

function movePieceByAmount(playerIndex, pieceId, amount, registerLiterature = true) {
  const player = state.players[playerIndex];
  const piece = player.pieces.find((entry) => entry.id === pieceId);
  const simulation = simulateMove(playerIndex, pieceId, amount);
  if (!piece || !simulation.valid) return false;

  piece.steps = simulation.destination;
  const pieceState = getPieceState(player, piece);

  if (pieceState.zone === 'track') {
    resolveLandingOnTrack(playerIndex, pieceId, pieceState.absoluteIndex);
    if (registerLiterature) queueLiteratureFromTrack(playerIndex, pieceId);
  }

  if (pieceState.zone === 'finish') {
    addLog(`${player.name} bringt eine Figur in die Zielstation.`);
  }

  return true;
}

function enterPiece(playerIndex, pieceId) {
  const player = state.players[playerIndex];
  const piece = player.pieces.find((entry) => entry.id === pieceId);
  if (!piece || piece.steps !== -1 || !canEnterStart(playerIndex)) return false;

  piece.steps = 0;
  resolveLandingOnTrack(playerIndex, pieceId, player.startIndex);
  addLog(`${player.name} bringt eine Figur mit einer Startkarte ins Spiel.`);
  return true;
}

function getSwapSources(playerIndex) {
  const player = state.players[playerIndex];
  return player.pieces.filter((piece) => {
    const pieceState = getPieceState(player, piece);
    return pieceState.zone === 'track' && piece.steps !== 0;
  });
}

function getSwapTargets(playerIndex) {
  const result = [];
  state.players.forEach((player, otherIndex) => {
    if (otherIndex === playerIndex) return;
    player.pieces.forEach((piece) => {
      const pieceState = getPieceState(player, piece);
      if (pieceState.zone !== 'track') return;
      if (piece.steps === 0) return;
      result.push({ playerIndex: otherIndex, piece });
    });
  });
  return result;
}

function executeSwap(playerIndex, sourcePieceId, targetPlayerIndex, targetPieceId) {
  const sourcePlayer = state.players[playerIndex];
  const targetPlayer = state.players[targetPlayerIndex];
  const sourcePiece = sourcePlayer.pieces.find((piece) => piece.id === sourcePieceId);
  const targetPiece = targetPlayer.pieces.find((piece) => piece.id === targetPieceId);
  if (!sourcePiece || !targetPiece) return false;

  const sourceState = getPieceState(sourcePlayer, sourcePiece);
  const targetState = getPieceState(targetPlayer, targetPiece);
  if (sourceState.zone !== 'track' || targetState.zone !== 'track') return false;
  if (sourcePiece.steps === 0 || targetPiece.steps === 0) return false;

  sourcePiece.steps = relativeTrackSteps(playerIndex, targetState.absoluteIndex);
  targetPiece.steps = relativeTrackSteps(targetPlayerIndex, sourceState.absoluteIndex);
  queueLiteratureFromTrack(playerIndex, sourcePieceId);
  addLog(`${sourcePlayer.name} tauscht eine Figur mit ${targetPlayer.name}.`);
  return true;
}

function buildChoiceVariantsForCard(playerIndex, card) {
  const player = state.players[playerIndex];

  if (card.key === '1-11') {
    return [
      {
        id: 'start',
        label: 'Start',
        description: 'Figur aus dem Depot aufs Startfeld',
        action: { kind: 'start' }
      },
      {
        id: 'move-1',
        label: '1 vor',
        description: 'Eine Figur 1 Feld vor',
        action: { kind: 'move', steps: 1 }
      },
      {
        id: 'move-11',
        label: '11 vor',
        description: 'Eine Figur 11 Felder vor',
        action: { kind: 'move', steps: 11 }
      }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  if (card.key === '13') {
    return [
      {
        id: 'start',
        label: 'Start',
        description: 'Figur aus dem Depot aufs Startfeld',
        action: { kind: 'start' }
      },
      {
        id: 'move-13',
        label: '13 vor',
        description: 'Eine Figur 13 Felder vor',
        action: { kind: 'move', steps: 13 }
      }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  if (card.key === '4pm') {
    return [
      {
        id: 'move-4',
        label: '4 vor',
        description: 'Eine Figur 4 Felder vor',
        action: { kind: 'move', steps: 4 }
      },
      {
        id: 'move-back-4',
        label: '4 zurück',
        description: 'Eine Figur 4 Felder rückwärts',
        action: { kind: 'move', steps: -4 }
      }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  if (card.kind === 'joker') {
    const jokerOptions = [
      {
        id: 'joker-start',
        label: 'Joker: Start',
        description: 'wie Startkarte',
        action: { kind: 'start' }
      },
      {
        id: 'joker-1',
        label: 'Joker: 1',
        description: '1 Feld vor',
        action: { kind: 'move', steps: 1 }
      },
      {
        id: 'joker-11',
        label: 'Joker: 11',
        description: '11 Felder vor',
        action: { kind: 'move', steps: 11 }
      },
      {
        id: 'joker-13',
        label: 'Joker: 13',
        description: '13 Felder vor',
        action: { kind: 'move', steps: 13 }
      },
      {
        id: 'joker-forward-4',
        label: 'Joker: 4 vor',
        description: '4 Felder vor',
        action: { kind: 'move', steps: 4 }
      },
      {
        id: 'joker-back-4',
        label: 'Joker: 4 zurück',
        description: '4 Felder rückwärts',
        action: { kind: 'move', steps: -4 }
      },
      {
        id: 'joker-7',
        label: 'Joker: 7',
        description: '7 aufteilen',
        action: { kind: 'split' }
      },
      {
        id: 'joker-swap',
        label: 'Joker: Tausch',
        description: 'Positionen tauschen',
        action: { kind: 'swap' }
      },
      {
        id: 'joker-12',
        label: 'Joker: 12',
        description: '12 Felder vor',
        action: { kind: 'move', steps: 12 }
      }
    ];
    return jokerOptions.filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  return [];
}

function isVariantPlayable(playerIndex, action) {
  const player = state.players[playerIndex];

  if (action.kind === 'start') {
    return getStartablePieces(playerIndex).length > 0;
  }

  if (action.kind === 'move') {
    return player.pieces.some((piece) => canMovePiece(playerIndex, piece.id, action.steps));
  }

  if (action.kind === 'split') {
    return player.pieces.some((piece) => getLegalSplitAmounts(playerIndex, piece.id, 7).length > 0);
  }

  if (action.kind === 'swap') {
    return getSwapSources(playerIndex).length > 0 && getSwapTargets(playerIndex).length > 0;
  }

  return false;
}

function getLegalSplitAmounts(playerIndex, pieceId, remaining) {
  const legal = [];
  for (let amount = 1; amount <= remaining; amount += 1) {
    if (canMovePiece(playerIndex, pieceId, amount)) {
      legal.push(amount);
    }
  }
  return legal;
}

function computePlayableCardIds(playerIndex) {
  const player = state.players[playerIndex];
  return player.hand
    .filter((card) => getResolvedVariantsForCard(playerIndex, card).length > 0)
    .map((card) => card.uid);
}

function getResolvedVariantsForCard(playerIndex, card) {
  if (card.kind === 'move') {
    return isVariantPlayable(playerIndex, { kind: 'move', steps: card.steps })
      ? [{ label: `${card.steps} vor`, action: { kind: 'move', steps: card.steps } }]
      : [];
  }

  if (card.kind === 'split') {
    return isVariantPlayable(playerIndex, { kind: 'split' })
      ? [{ label: '7 aufteilen', action: { kind: 'split' } }]
      : [];
  }

  if (card.kind === 'swap') {
    return isVariantPlayable(playerIndex, { kind: 'swap' })
      ? [{ label: 'Tausch', action: { kind: 'swap' } }]
      : [];
  }

  return buildChoiceVariantsForCard(playerIndex, card);
}

function drawActionCard() {
  if (state.deck.length === 0) {
    state.deck = shuffle(state.discard);
    state.discard = [];
  }
  return state.deck.pop() || null;
}

function dealNextRound() {
  const dealSize = state.currentDealSize;
  state.players.forEach((player) => {
    player.outForRound = false;
    player.hand = [];
  });

  for (let draw = 0; draw < dealSize; draw += 1) {
    state.players.forEach((player) => {
      const card = drawActionCard();
      if (card) player.hand.push(card);
    });
  }

  state.currentRound += 1;
  state.activeDealSize = dealSize;
  addLog(`Neue Kartenrunde ${state.currentRound}: ${dealSize} Aktionskarten pro Person.`);
  state.currentDealSize = state.nextDealSize;
  state.nextDealSize = state.nextDealSize === 1 ? 6 : state.nextDealSize - 1;
}

function getSelectedCard() {
  const player = getCurrentPlayer();
  return player.hand.find((card) => card.uid === state.selectedCardId) || null;
}

function clearActionSelection() {
  state.selectedCardId = null;
  state.actionContext = null;
}

function discardSelectedCard() {
  const player = getCurrentPlayer();
  const index = player.hand.findIndex((card) => card.uid === state.selectedCardId);
  if (index >= 0) {
    const [card] = player.hand.splice(index, 1);
    state.discard.push(card);
  }
  clearActionSelection();
}

function finishPlayedCard() {
  const player = getCurrentPlayer();
  const playedCard = getSelectedCard();
  const won = player.pieces.every((piece) => piece.steps === 44);
  if (playedCard) {
    addLog(`${player.name} spielt ${playedCard.label}.`);
  }
  discardSelectedCard();

  if (won) {
    state.gameOver = true;
    turnHintEl.textContent = `${player.name} gewinnt die Partie.`;
    addLog(`${player.name} gewinnt die Partie.`);
    render();
    return;
  }

  if (state.pendingLiterature) {
    openLiteratureModal();
    render();
    return;
  }

  moveToNextPlayer();
}

function moveToNextPlayer() {
  clearActionSelection();
  state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
  ensureTurnReady();
}

function ensureTurnReady() {
  if (state.gameOver) {
    render();
    return;
  }

  let loops = 0;
  while (loops < 20) {
    if (state.players.every((player) => player.hand.length === 0)) {
      dealNextRound();
    }

    const player = getCurrentPlayer();
    if (player.hand.length === 0 || player.outForRound) {
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
      loops += 1;
      continue;
    }

    state.playableCardIds = computePlayableCardIds(state.currentPlayer);
    if (state.playableCardIds.length === 0) {
      addLog(`${player.name} hat keine spielbare Karte und legt die Resthand ab.`);
      state.discard.push(...player.hand);
      player.hand = [];
      player.outForRound = true;
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
      loops += 1;
      continue;
    }

    turnHintEl.textContent = `${player.name} wählt eine DOG-Aktionskarte.`;
    render();
    return;
  }

  render();
}

function startNewGame() {
  uniqueCardId = 0;
  state = createInitialState();
  state.players = setupPlayers(selectedPlayerCount);
  state.deck = buildActionDeck();
  state.log = ['Neue Partie gestartet.'];
  dealNextRound();
  state.currentPlayer = 0;
  ensureTurnReady();
}

function selectCard(cardId) {
  if (state.gameOver || state.pendingLiterature) return;
  if (!state.playableCardIds.includes(cardId)) return;

  if (state.selectedCardId === cardId) {
    clearActionSelection();
    turnHintEl.textContent = `${getCurrentPlayer().name} wählt eine DOG-Aktionskarte.`;
    render();
    return;
  }

  state.selectedCardId = cardId;
  const card = getSelectedCard();
  const variants = getResolvedVariantsForCard(state.currentPlayer, card);

  if (variants.length === 1) {
    activateAction(variants[0].action);
  } else {
    state.actionContext = {
      stage: 'choose-variant',
      options: variants
    };
    turnHintEl.textContent = `Lege fest, wie ${card.label} gespielt wird.`;
  }
  render();
}

function activateAction(action) {
  if (action.kind === 'move') {
    state.actionContext = {
      stage: 'pick-piece',
      actionKind: 'move',
      steps: action.steps
    };
    turnHintEl.textContent = `Wähle eine Figur für ${action.steps > 0 ? `${action.steps} vor` : `${Math.abs(action.steps)} zurück`}.`;
  } else if (action.kind === 'start') {
    state.actionContext = {
      stage: 'pick-piece',
      actionKind: 'start'
    };
    turnHintEl.textContent = 'Wähle eine Figur aus dem Depot für das Startfeld.';
  } else if (action.kind === 'split') {
    state.actionContext = {
      stage: 'pick-split-piece',
      actionKind: 'split',
      remaining: 7,
      pendingPieceId: null
    };
    turnHintEl.textContent = 'Verteile die 7 auf eine oder mehrere eigene Figuren.';
  } else if (action.kind === 'swap') {
    state.actionContext = {
      stage: 'pick-swap-source',
      actionKind: 'swap',
      sourcePieceId: null
    };
    turnHintEl.textContent = 'Wähle zuerst deine eigene Tauschfigur.';
  }
}

function handleActionOption(optionId) {
  if (!state.actionContext) return;

  if (state.actionContext.stage === 'choose-variant') {
    const option = state.actionContext.options.find((entry) => entry.label === optionId);
    if (!option) return;
    activateAction(option.action);
    render();
    return;
  }

  if (state.actionContext.stage === 'pick-split-amount') {
    const amount = Number(optionId);
    const { pendingPieceId } = state.actionContext;
    const success = movePieceByAmount(state.currentPlayer, pendingPieceId, amount, false);
    if (!success) return;

    const remaining = state.actionContext.remaining - amount;
    if (remaining <= 0) {
      queueLiteratureFromTrack(state.currentPlayer, pendingPieceId);
      finishPlayedCard();
      return;
    }

    state.actionContext = {
      stage: 'pick-split-piece',
      actionKind: 'split',
      remaining
    };
    turnHintEl.textContent = `Noch ${remaining} Felder aus der 7 verteilen.`;
    render();
  }
}

function isTokenSelectable(playerIndex, piece) {
  if (!state.actionContext || state.gameOver || state.pendingLiterature) return false;
  if (playerIndex !== state.currentPlayer && state.actionContext.stage !== 'pick-swap-target') return false;

  if (state.actionContext.stage === 'pick-piece') {
    if (state.actionContext.actionKind === 'start') {
      return playerIndex === state.currentPlayer && piece.steps === -1 && enterWouldBeLegal(playerIndex, piece.id);
    }
    if (state.actionContext.actionKind === 'move') {
      return playerIndex === state.currentPlayer && canMovePiece(playerIndex, piece.id, state.actionContext.steps);
    }
  }

  if (state.actionContext.stage === 'pick-split-piece') {
    return playerIndex === state.currentPlayer
      && getLegalSplitAmounts(playerIndex, piece.id, state.actionContext.remaining).length > 0;
  }

  if (state.actionContext.stage === 'pick-swap-source') {
    return playerIndex === state.currentPlayer
      && getSwapSources(state.currentPlayer).some((entry) => entry.id === piece.id);
  }

  if (state.actionContext.stage === 'pick-swap-target') {
    return playerIndex !== state.currentPlayer
      && getSwapTargets(state.currentPlayer).some((entry) => entry.playerIndex === playerIndex && entry.piece.id === piece.id);
  }

  return false;
}

function enterWouldBeLegal(playerIndex, pieceId) {
  return getStartablePieces(playerIndex).some((piece) => piece.id === pieceId);
}

function handleTokenSelection(playerIndex, pieceId) {
  const player = state.players[playerIndex];
  const piece = player ? player.pieces.find((entry) => entry.id === pieceId) : null;
  if (!state.actionContext || !piece || !isTokenSelectable(playerIndex, piece)) return;

  if (state.actionContext.stage === 'pick-piece') {
    if (state.actionContext.actionKind === 'start') {
      if (enterPiece(playerIndex, pieceId)) {
        finishPlayedCard();
      }
      return;
    }

    if (state.actionContext.actionKind === 'move') {
      if (movePieceByAmount(playerIndex, pieceId, state.actionContext.steps, true)) {
        finishPlayedCard();
      }
      return;
    }
  }

  if (state.actionContext.stage === 'pick-split-piece') {
    const legalAmounts = getLegalSplitAmounts(playerIndex, pieceId, state.actionContext.remaining);
    if (legalAmounts.length === 0) return;
    state.actionContext = {
      ...state.actionContext,
      stage: 'pick-split-amount',
      pendingPieceId: pieceId,
      legalAmounts
    };
    turnHintEl.textContent = `Wie viele Felder soll Figur ${pieceId.split('-')[1]} ziehen?`;
    render();
    return;
  }

  if (state.actionContext.stage === 'pick-swap-source') {
    state.actionContext = {
      ...state.actionContext,
      stage: 'pick-swap-target',
      sourcePieceId: pieceId
    };
    turnHintEl.textContent = 'Wähle nun eine gegnerische Figur als Tauschziel.';
    render();
    return;
  }

  if (state.actionContext.stage === 'pick-swap-target') {
    const success = executeSwap(state.currentPlayer, state.actionContext.sourcePieceId, playerIndex, pieceId);
    if (success) {
      finishPlayedCard();
    }
  }
}

function applyLiteratureReward(playerIndex, pieceId, reward) {
  const player = state.players[playerIndex];
  if (!reward || reward.kind === 'none') return reward ? reward.text : '';

  if (reward.kind === 'shield') {
    player.shields += reward.amount;
    return reward.text;
  }

  if (reward.kind === 'insight') {
    player.insights += reward.amount;
    return reward.text;
  }

  if (reward.kind === 'loseShield') {
    const loss = Math.min(player.shields, reward.amount);
    player.shields -= loss;
    return loss > 0 ? reward.text : 'Keine Schutzmarke vorhanden.';
  }

  if (reward.kind === 'advance') {
    if (canMovePiece(playerIndex, pieceId, reward.amount)) {
      movePieceByAmount(playerIndex, pieceId, reward.amount, false);
      return reward.text;
    }
    return 'Kein freies Bonusfeld verfügbar.';
  }

  return '';
}

function openLiteratureModal() {
  const pending = state.pendingLiterature;
  if (!pending) return;

  const { card, type } = pending;
  modalEl.classList.remove('hidden');
  modalEl.setAttribute('aria-hidden', 'false');
  cardTypeEl.textContent = type === 'text' ? 'Textkarte' : type === 'deutung' ? 'Deutungskarte' : 'Schicksalskarte';
  cardTitleEl.textContent = card.title;
  cardPromptEl.textContent = card.prompt;
  cardOptionsEl.innerHTML = '';
  cardFeedbackEl.textContent = '';
  cardContinueBtn.classList.add('hidden');

  if (type === 'schicksal') {
    const rewardText = applyLiteratureReward(pending.playerIndex, pending.pieceId, card.reward);
    cardFeedbackEl.textContent = `${card.explanation} ${rewardText}`.trim();
    updateRecentCard(type, card.title, `${card.prompt} ${card.explanation}`, rewardText);
    cardContinueBtn.classList.remove('hidden');
    return;
  }

  card.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.dataset.optionIndex = String(index);
    button.textContent = option;
    cardOptionsEl.appendChild(button);
  });
}

function resolveLiteratureAnswer(optionIndex) {
  const pending = state.pendingLiterature;
  if (!pending || pending.type === 'schicksal') return;

  const { card } = pending;
  const correct = optionIndex === card.correct;
  const buttons = [...cardOptionsEl.querySelectorAll('.option-btn')];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === card.correct) button.classList.add('correct');
    if (index === optionIndex && index !== card.correct) button.classList.add('incorrect');
  });

  let rewardText = 'Kein Bonus.';
  if (correct) {
    rewardText = applyLiteratureReward(pending.playerIndex, pending.pieceId, card.reward);
    state.players[pending.playerIndex].insights += 1;
  }

  cardFeedbackEl.textContent = `${correct ? 'Richtig.' : 'Noch nicht.'} ${card.explanation} ${correct ? rewardText : ''}`.trim();
  updateRecentCard(
    pending.type,
    card.title,
    `${card.prompt} ${card.explanation}`,
    correct ? rewardText : 'Antwort ohne Bonus abgeschlossen.'
  );
  cardContinueBtn.classList.remove('hidden');
  render();
}

function closeLiteratureModal() {
  modalEl.classList.add('hidden');
  modalEl.setAttribute('aria-hidden', 'true');
  state.pendingLiterature = null;
  moveToNextPlayer();
}

function updateRecentCard(type, title, body, rewardText) {
  state.recentCard = { type, title, body, rewardText };
}

function renderRecentCard() {
  if (!state.recentCard) {
    recentCardEl.className = 'recent-card empty';
    recentCardEl.textContent = 'Noch keine Karte aufgedeckt.';
    return;
  }

  recentCardEl.className = 'recent-card';
  recentCardEl.innerHTML = '';

  const kicker = document.createElement('p');
  kicker.className = 'mini-label';
  kicker.textContent = state.recentCard.type === 'text'
    ? 'Text'
    : state.recentCard.type === 'deutung'
      ? 'Deutung'
      : 'Schicksal';

  const title = document.createElement('h3');
  title.textContent = state.recentCard.title;

  const body = document.createElement('p');
  body.textContent = state.recentCard.body;

  const reward = document.createElement('p');
  reward.textContent = state.recentCard.rewardText;

  recentCardEl.append(kicker, title, body, reward);
}

function renderPlayerList() {
  playerListEl.innerHTML = '';
  state.players.forEach((player, index) => {
    const finished = player.pieces.filter((piece) => piece.steps === 44).length;
    const active = player.pieces.filter((piece) => piece.steps >= 0 && piece.steps < 44).length;

    const card = document.createElement('div');
    card.className = `player-card${index === state.currentPlayer ? ' current' : ''}`;

    const header = document.createElement('div');
    header.className = 'player-card-header';

    const name = document.createElement('div');
    name.className = 'player-card-name';
    name.textContent = player.name;

    const chip = document.createElement('span');
    chip.className = 'player-chip';
    chip.dataset.tone = player.tone;
    chip.textContent = player.tone.toUpperCase();

    header.append(name, chip);

    const meta = document.createElement('div');
    meta.className = 'player-card-meta';
    [
      `Hand ${player.hand.length}`,
      `Unterwegs ${active}`,
      `Im Ziel ${finished}`,
      `Schutz ${player.shields}`,
      `Erkenntnis ${player.insights}`
    ].forEach((label) => {
      const pill = document.createElement('span');
      pill.className = 'meta-pill';
      pill.textContent = label;
      meta.appendChild(pill);
    });

    card.append(header, meta);
    playerListEl.appendChild(card);
  });
}

function renderLog() {
  logListEl.innerHTML = '';
  state.log.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    logListEl.appendChild(li);
  });
}

function renderHand() {
  const player = getCurrentPlayer();
  const playableSet = new Set(state.playableCardIds);
  handAreaEl.innerHTML = '';

  player.hand.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hand-card';
    button.dataset.cardId = card.uid;
    if (!playableSet.has(card.uid)) button.classList.add('disabled');
    if (state.selectedCardId === card.uid) button.classList.add('selected');

    const title = document.createElement('strong');
    title.textContent = card.label;
    const summary = document.createElement('span');
    summary.textContent = card.summary;
    button.append(title, summary);
    handAreaEl.appendChild(button);
  });
}

function renderActiveCard() {
  const selectedCard = getSelectedCard();
  if (!selectedCard) {
    activeCardSummaryEl.className = 'recent-card empty';
    activeCardSummaryEl.textContent = 'Wähle eine spielbare Aktionskarte aus deiner Hand.';
    return;
  }

  activeCardSummaryEl.className = 'recent-card';
  activeCardSummaryEl.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = selectedCard.label;
  const body = document.createElement('p');
  body.textContent = selectedCard.summary;
  activeCardSummaryEl.append(title, body);
}

function renderActionOptions() {
  actionOptionsEl.innerHTML = '';
  if (!state.actionContext) return;

  if (state.actionContext.stage === 'choose-variant') {
    state.actionContext.options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-option-btn';
      button.dataset.optionId = option.label;
      button.textContent = `${option.label} · ${option.action.kind === 'move' ? 'Zug' : option.description || 'Option'}`;
      actionOptionsEl.appendChild(button);
    });
    return;
  }

  if (state.actionContext.stage === 'pick-split-amount') {
    state.actionContext.legalAmounts.forEach((amount) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-option-btn';
      button.dataset.optionId = String(amount);
      button.textContent = `${amount} Feld${amount === 1 ? '' : 'er'}`;
      actionOptionsEl.appendChild(button);
    });
  }
}

function renderTurnPanel() {
  const player = getCurrentPlayer();
  currentPlayerChip.textContent = player.name;
  currentPlayerChip.dataset.tone = player.tone;
  roundSizeEl.textContent = `${state.activeDealSize}`;
  deckCountEl.textContent = String(state.deck.length);
  renderHand();
  renderActiveCard();
  renderActionOptions();
}

function createTokenButton(playerIndex, piece) {
  const player = state.players[playerIndex];
  const button = document.createElement('button');
  button.className = 'token';
  button.type = 'button';
  button.dataset.playerIndex = String(playerIndex);
  button.dataset.pieceId = piece.id;
  button.dataset.tone = player.tone;
  button.textContent = String(piece.pieceIndex + 1);

  if (isTokenSelectable(playerIndex, piece)) {
    button.classList.add('selectable');
  } else {
    button.disabled = true;
  }

  return button;
}

function renderBoard() {
  boardEl.innerHTML = '';

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const meta = CELL_META.get(coordKey(x, y));
      const cell = document.createElement('div');
      cell.className = 'cell';

      if (!meta) {
        cell.classList.add('void');
      } else if (meta.type === 'track') {
        cell.classList.add('track');
        if (meta.startTone) cell.classList.add('start-field', `start-${meta.startTone}`);
        if (meta.special) cell.classList.add(`special-${meta.special}`);

        const badge = document.createElement('div');
        badge.className = 'cell-badge';
        badge.textContent = meta.startTone
          ? 'S'
          : meta.special === 'text'
            ? 'T'
            : meta.special === 'deutung'
              ? 'D'
              : meta.special === 'schicksal'
                ? 'S'
                : '';
        if (badge.textContent) cell.appendChild(badge);

        const occupant = getTrackOccupant(meta.index);
        if (occupant) {
          const stack = document.createElement('div');
          stack.className = 'token-stack';
          stack.appendChild(createTokenButton(occupant.playerIndex, occupant.piece));
          cell.appendChild(stack);
        }
      } else if (meta.type === 'home') {
        cell.classList.add('home');
        cell.dataset.owner = meta.ownerTone;
        const playerIndex = state.players.findIndex((player) => player.tone === meta.ownerTone);
        if (playerIndex >= 0) {
          const player = state.players[playerIndex];
          const piece = player.pieces.find((entry) => entry.pieceIndex === meta.pieceIndex && entry.steps === -1);
          if (piece) {
            const stack = document.createElement('div');
            stack.className = 'token-stack';
            stack.appendChild(createTokenButton(playerIndex, piece));
            cell.appendChild(stack);
          }
        }
      } else if (meta.type === 'home-lane') {
        cell.classList.add('home-lane');
        cell.dataset.owner = meta.ownerTone;
        const playerIndex = state.players.findIndex((player) => player.tone === meta.ownerTone);
        if (playerIndex >= 0) {
          const occupant = getLaneOccupant(playerIndex, meta.laneIndex);
          if (occupant) {
            const stack = document.createElement('div');
            stack.className = 'token-stack';
            stack.appendChild(createTokenButton(playerIndex, occupant));
            cell.appendChild(stack);
          }
        }
      } else if (meta.type === 'center') {
        cell.classList.add('center');
        const centerTitle = document.createElement('div');
        centerTitle.className = 'center-title';
        centerTitle.textContent = 'Zielstation';
        const centerSub = document.createElement('div');
        centerSub.className = 'center-sub';
        centerSub.textContent = `${state.players.reduce((sum, player) => sum + player.pieces.filter((piece) => piece.steps === 44).length, 0)} Figuren im Ziel`;
        cell.append(centerTitle, centerSub);
      }

      boardEl.appendChild(cell);
    }
  }
}

function render() {
  renderTurnPanel();
  renderPlayerList();
  renderBoard();
  renderLog();
  renderRecentCard();
}

playerCountPicker.addEventListener('click', (event) => {
  const button = event.target.closest('.count-btn');
  if (!button) return;
  selectedPlayerCount = Number(button.dataset.count);
  [...playerCountPicker.querySelectorAll('.count-btn')].forEach((entry) => {
    entry.classList.toggle('active', entry === button);
  });
  renderPlayerInputs();
});

newGameBtn.addEventListener('click', startNewGame);

handAreaEl.addEventListener('click', (event) => {
  const cardButton = event.target.closest('.hand-card');
  if (!cardButton) return;
  selectCard(cardButton.dataset.cardId);
});

actionOptionsEl.addEventListener('click', (event) => {
  const button = event.target.closest('.action-option-btn');
  if (!button) return;
  handleActionOption(button.dataset.optionId);
});

boardEl.addEventListener('click', (event) => {
  const token = event.target.closest('.token');
  if (!token) return;
  handleTokenSelection(Number(token.dataset.playerIndex), token.dataset.pieceId);
});

cardOptionsEl.addEventListener('click', (event) => {
  const button = event.target.closest('.option-btn');
  if (!button) return;
  resolveLiteratureAnswer(Number(button.dataset.optionIndex));
});

cardContinueBtn.addEventListener('click', closeLiteratureModal);
modalEl.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
    if (state.pendingLiterature && state.pendingLiterature.type === 'schicksal') {
      closeLiteratureModal();
    }
  }
});

renderPlayerInputs();
startNewGame();
