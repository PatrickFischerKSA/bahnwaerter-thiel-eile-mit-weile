const GRID_SIZE = 13;
const SAFE_TRACKS = new Set([0, 5, 10, 15, 20, 25, 30, 35]);
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

const CARDS = {
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
      reward: { kind: 'advance', amount: 2, text: 'Deine gewählte Figur fährt 2 Felder vor.' }
    },
    {
      title: 'Der abgelegene Posten',
      prompt: 'Was prägt Thiels Dienstort besonders stark?',
      options: [
        'Lärm der Grossstadt und dauernde Menschenmengen.',
        'Die Nähe zu einem Hafen.',
        'Die Abgeschiedenheit im märkischen Kiefernforst.',
        'Ein Militärlager neben dem Übergang.'
      ],
      correct: 2,
      explanation: 'Der Text betont die Isolation des Postens im märkischen Kiefernforst als psychisch verstärkenden Raum.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
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
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
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
      reward: { kind: 'advance', amount: 2, text: 'Deine gewählte Figur fährt 2 Felder vor.' }
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
      reward: { kind: 'advance', amount: 2, text: 'Deine gewählte Figur fährt 2 Felder vor.' }
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
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
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
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
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
      reward: { kind: 'advance', amount: 2, text: 'Deine gewählte Figur fährt 2 Felder vor.' }
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
      reward: { kind: 'advance', amount: 1, text: 'Deine gewählte Figur fährt 1 Feld vor.' }
    },
    {
      title: 'Barriere im Blick',
      prompt: 'Für einen Augenblick sitzt jede Bewegung. Dienst, Rhythmus und Aufmerksamkeit greifen ineinander.',
      explanation: 'Berufsroutine gibt Thiel zeitweise Halt und Struktur.',
      reward: { kind: 'advance', amount: 2, text: 'Deine gewählte Figur fährt 2 Felder vor.' }
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
const rollBtn = document.getElementById('rollBtn');
const currentPlayerChip = document.getElementById('currentPlayerChip');
const diceRawEl = document.getElementById('diceRaw');
const diceMoveEl = document.getElementById('diceMove');
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
let state = createInitialState();

function createInitialState() {
  return {
    players: [],
    currentPlayer: 0,
    turn: 1,
    lastRollRaw: null,
    lastMovePoints: null,
    awaitingMoveSelection: false,
    movablePieceIds: [],
    selectedPieceId: null,
    pendingCard: null,
    recentCard: null,
    log: [],
    gameOver: false
  };
}

function cloneCards(type) {
  const deck = CARDS[type].map((card) => ({ ...card, reward: { ...card.reward } }));
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
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
    sixStreak: 0,
    deckIndices: { text: 0, deutung: 0, schicksal: 0 },
    decks: {
      text: cloneCards('text'),
      deutung: cloneCards('deutung'),
      schicksal: cloneCards('schicksal')
    },
    pieces: Array.from({ length: 4 }, (_, pieceIndex) => ({
      id: `${preset.tone}-${pieceIndex + 1}`,
      pieceIndex,
      steps: -1
    }))
  }));
}

function getConfiguredName(playerIndex, fallback) {
  const input = document.querySelector(`[data-player-name="${playerIndex}"]`);
  const raw = input ? input.value.trim() : '';
  return raw || fallback;
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

function coordKey(x, y) {
  return `${x},${y}`;
}

function buildCellMeta() {
  const meta = new Map();

  TRACK_COORDS.forEach((coord, index) => {
    const key = coordKey(coord.x, coord.y);
    meta.set(key, {
      type: 'track',
      index,
      safe: SAFE_TRACKS.has(index),
      special: SPECIAL_FIELDS.get(index) || null
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
  state.log = state.log.slice(0, 8);
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

function getLaneOccupant(playerIndex, laneIndex) {
  const player = state.players[playerIndex];
  return player.pieces.find((piece) => getPieceState(player, piece).zone === 'lane' && getPieceState(player, piece).laneIndex === laneIndex) || null;
}

function isBlockadeAt(index) {
  if (!SAFE_TRACKS.has(index)) return false;
  const occupants = getPiecesOnTrack(index);
  if (occupants.length < 2) return false;
  return occupants.every((item) => state.players[item.playerIndex].tone === state.players[occupants[0].playerIndex].tone);
}

function projectedSteps(currentSteps, amount) {
  if (currentSteps === -1) return amount === 5 ? 0 : null;
  if (currentSteps === 44) return null;
  const max = 44;
  const proposed = currentSteps + amount;
  if (proposed <= max) return proposed;
  return max - (proposed - max);
}

function pathHitsBlockade(player, piece, amount) {
  if (piece.steps < 0 || amount <= 0) return false;
  let simulated = piece.steps;
  for (let step = 1; step <= amount; step += 1) {
    simulated = projectedSteps(simulated, 1);
    if (simulated === null) return true;
    if (simulated >= 0 && simulated < 40) {
      const absoluteIndex = (player.startIndex + simulated) % 40;
      const onStartCell = step === 1 && piece.steps >= 0 && piece.steps < 40
        && ((player.startIndex + piece.steps) % 40) === absoluteIndex;
      if (!onStartCell && isBlockadeAt(absoluteIndex)) return true;
    }
  }
  return false;
}

function canLandOnTrack(playerIndex, absoluteIndex, isEntry) {
  const occupants = getPiecesOnTrack(absoluteIndex);
  if (occupants.length === 0) return true;
  const ownOccupants = occupants.filter((entry) => entry.playerIndex === playerIndex);
  const otherOccupants = occupants.filter((entry) => entry.playerIndex !== playerIndex);

  if (SAFE_TRACKS.has(absoluteIndex)) {
    if (otherOccupants.length > 0) return false;
    if (ownOccupants.length >= 2) return false;
    return true;
  }

  if (ownOccupants.length > 0) return false;
  if (isEntry && otherOccupants.length > 0) return true;
  return true;
}

function canMovePiece(playerIndex, pieceId, amount) {
  const player = state.players[playerIndex];
  const piece = player.pieces.find((entry) => entry.id === pieceId);
  if (!piece || piece.steps === 44) return false;

  if (piece.steps === -1) {
    if (amount !== 5) return false;
    return canLandOnTrack(playerIndex, player.startIndex, true);
  }

  if (pathHitsBlockade(player, piece, amount)) return false;

  const nextSteps = projectedSteps(piece.steps, amount);
  if (nextSteps === null) return false;

  if (nextSteps >= 0 && nextSteps < 40) {
    const absoluteIndex = (player.startIndex + nextSteps) % 40;
    return canLandOnTrack(playerIndex, absoluteIndex, false);
  }

  if (nextSteps >= 40 && nextSteps < 44) {
    return !getLaneOccupant(playerIndex, nextSteps - 40);
  }

  return true;
}

function getMovablePieceIds(playerIndex, amount) {
  return state.players[playerIndex].pieces
    .filter((piece) => canMovePiece(playerIndex, piece.id, amount))
    .map((piece) => piece.id);
}

function movePiece(playerIndex, pieceId, amount, allowCardChain = true) {
  const player = state.players[playerIndex];
  const piece = player.pieces.find((entry) => entry.id === pieceId);
  if (!piece) return;

  const previousState = getPieceState(player, piece);
  const nextSteps = projectedSteps(piece.steps, amount);
  piece.steps = nextSteps;
  const newState = getPieceState(player, piece);

  if (newState.zone === 'track') {
    const occupants = getPiecesOnTrack(newState.absoluteIndex).filter(
      (entry) => !(entry.playerIndex === playerIndex && entry.piece.id === piece.id)
    );
    if (!SAFE_TRACKS.has(newState.absoluteIndex)) {
      occupants.forEach((entry) => {
        const defender = state.players[entry.playerIndex];
        if (defender.shields > 0) {
          defender.shields -= 1;
          addLog(`${defender.name} schützt eine Figur mit einer Schutzmarke.`);
        } else {
          entry.piece.steps = -1;
          addLog(`${player.name} schickt ${defender.name}s Figur zurück ins Depot.`);
        }
      });
    }
  }

  if (newState.zone === 'finish' && previousState.zone !== 'finish') {
    addLog(`${player.name} bringt eine Figur sicher in die Zielstation.`);
  }

  if (allowCardChain && newState.zone === 'track' && SPECIAL_FIELDS.has(newState.absoluteIndex)) {
    queueCard(playerIndex, pieceId, SPECIAL_FIELDS.get(newState.absoluteIndex));
  }
}

function queueCard(playerIndex, pieceId, type) {
  const player = state.players[playerIndex];
  const index = player.deckIndices[type] % player.decks[type].length;
  const card = player.decks[type][index];
  player.deckIndices[type] += 1;
  state.pendingCard = { playerIndex, pieceId, type, card };
  openCardModal();
}

function applyReward(playerIndex, pieceId, reward) {
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
      movePiece(playerIndex, pieceId, reward.amount, false);
      return reward.text;
    }
    player.insights += 1;
    return 'Kein freies Vorwärtsfeld verfügbar. Stattdessen 1 Erkenntnispunkt.';
  }

  return '';
}

function finishTurn() {
  const player = getCurrentPlayer();
  if (state.gameOver) return;

  if (player.pieces.every((piece) => piece.steps === 44)) {
    state.gameOver = true;
    turnHintEl.textContent = `${player.name} gewinnt diese Partie und erreicht als Erste oder Erster die Zielstation.`;
    addLog(`${player.name} gewinnt die Partie.`);
    render();
    return;
  }

  if (state.lastRollRaw === 6) {
    turnHintEl.textContent = `${player.name} hat eine 6 geworfen. Zusatzwurf!`;
    state.awaitingMoveSelection = false;
    state.movablePieceIds = [];
    state.selectedPieceId = null;
    render();
    return;
  }

  player.sixStreak = 0;
  state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
  state.turn += 1;
  state.awaitingMoveSelection = false;
  state.movablePieceIds = [];
  state.selectedPieceId = null;
  state.lastRollRaw = null;
  state.lastMovePoints = null;
  turnHintEl.textContent = `${getCurrentPlayer().name} ist am Zug.`;
  render();
}

function handleRoll() {
  if (state.gameOver || state.pendingCard || state.awaitingMoveSelection) return;

  const player = getCurrentPlayer();
  const raw = Math.floor(Math.random() * 6) + 1;
  const movePoints = raw === 6 ? 12 : raw;

  state.lastRollRaw = raw;
  state.lastMovePoints = movePoints;
  state.selectedPieceId = null;

  player.sixStreak = raw === 6 ? player.sixStreak + 1 : 0;

  if (player.sixStreak === 3) {
    player.pieces.forEach((piece) => {
      const pieceState = getPieceState(player, piece);
      if (pieceState.zone === 'track' && !SAFE_TRACKS.has(pieceState.absoluteIndex)) {
        piece.steps = -1;
      }
    });
    player.sixStreak = 0;
    addLog(`${player.name} würfelt dreimal 6 und verliert alle offenen Figuren ausser auf Bänken.`);
    state.awaitingMoveSelection = false;
    state.movablePieceIds = [];
    state.lastRollRaw = null;
    state.lastMovePoints = null;
    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    state.turn += 1;
    turnHintEl.textContent = 'Drei 6en in Folge: Strafregel ausgelöst, nächster Zug.';
    render();
    return;
  }

  const movable = getMovablePieceIds(state.currentPlayer, movePoints);
  state.movablePieceIds = movable;

  addLog(`${player.name} würfelt ${raw}${raw === 6 ? ' und zählt 12 Felder' : ''}.`);

  if (movable.length === 0) {
    state.awaitingMoveSelection = false;
    turnHintEl.textContent = raw === 6
      ? `${player.name} kann keine Figur ziehen, erhält aber wegen der 6 einen neuen Wurf.`
      : `${player.name} hat keinen legalen Zug.`;
    render();
    if (raw !== 6) finishTurn();
    return;
  }

  state.awaitingMoveSelection = true;
  turnHintEl.textContent = `Wähle eine leuchtende Figur für ${movePoints} Felder.`;
  render();
}

function handlePieceSelection(playerIndex, pieceId) {
  if (!state.awaitingMoveSelection || state.pendingCard || playerIndex !== state.currentPlayer) return;
  if (!state.movablePieceIds.includes(pieceId)) return;

  state.selectedPieceId = pieceId;
  movePiece(playerIndex, pieceId, state.lastMovePoints);

  const player = state.players[playerIndex];
  addLog(`${player.name} bewegt Figur ${pieceId.split('-')[1]} um ${state.lastMovePoints} Felder.`);

  state.awaitingMoveSelection = false;
  state.movablePieceIds = [];
  render();

  if (!state.pendingCard) finishTurn();
}

function openCardModal() {
  const pending = state.pendingCard;
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
    const rewardText = applyReward(pending.playerIndex, pending.pieceId, card.reward);
    cardFeedbackEl.textContent = `${card.explanation} ${rewardText}`.trim();
    cardContinueBtn.classList.remove('hidden');
    updateRecentCard(type, card.title, `${card.prompt} ${card.explanation}`, rewardText);
    return;
  }

  card.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.type = 'button';
    button.textContent = option;
    button.dataset.optionIndex = String(index);
    cardOptionsEl.appendChild(button);
  });
}

function resolveQuizAnswer(optionIndex) {
  const pending = state.pendingCard;
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
    rewardText = applyReward(pending.playerIndex, pending.pieceId, card.reward);
    state.players[pending.playerIndex].insights += 1;
  }

  cardFeedbackEl.textContent = `${correct ? 'Richtig.' : 'Noch nicht.'} ${card.explanation} ${correct ? rewardText : ''}`.trim();
  cardContinueBtn.classList.remove('hidden');
  updateRecentCard(
    pending.type,
    card.title,
    `${card.prompt} ${card.explanation}`,
    correct ? rewardText : 'Antwort ohne Bonus abgeschlossen.'
  );
  render();
}

function closeCardModal() {
  modalEl.classList.add('hidden');
  modalEl.setAttribute('aria-hidden', 'true');
  state.pendingCard = null;
  finishTurn();
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

function renderTurnPanel() {
  const player = getCurrentPlayer();
  currentPlayerChip.textContent = player.name;
  currentPlayerChip.dataset.tone = player.tone;
  diceRawEl.textContent = state.lastRollRaw ?? '-';
  diceMoveEl.textContent = state.lastMovePoints ?? '-';
  rollBtn.disabled = state.gameOver || state.awaitingMoveSelection || Boolean(state.pendingCard);
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
        if (meta.safe) cell.classList.add('safe');
        if (meta.special) cell.classList.add(`special-${meta.special}`);

        if (meta.safe) {
          const badge = document.createElement('div');
          badge.className = 'cell-badge';
          badge.textContent = 'B';
          cell.appendChild(badge);
        } else if (meta.special) {
          const badge = document.createElement('div');
          badge.className = 'cell-badge';
          badge.textContent = meta.special === 'text' ? 'T' : meta.special === 'deutung' ? 'D' : 'S';
          cell.appendChild(badge);
        }

        const occupants = getPiecesOnTrack(meta.index);
        if (occupants.length > 0) {
          const stack = document.createElement('div');
          stack.className = 'token-stack';
          occupants.forEach((entry) => {
            stack.appendChild(createTokenButton(entry.playerIndex, entry.piece));
          });
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

function createTokenButton(playerIndex, piece) {
  const player = state.players[playerIndex];
  const button = document.createElement('button');
  button.className = 'token';
  button.type = 'button';
  button.dataset.playerIndex = String(playerIndex);
  button.dataset.pieceId = piece.id;
  button.dataset.tone = player.tone;
  button.textContent = String(piece.pieceIndex + 1);

  const selectable = state.awaitingMoveSelection
    && playerIndex === state.currentPlayer
    && state.movablePieceIds.includes(piece.id);
  if (selectable) button.classList.add('selectable');
  if (!selectable) button.disabled = true;

  return button;
}

function render() {
  renderTurnPanel();
  renderPlayerList();
  renderBoard();
  renderLog();
  renderRecentCard();
}

function startNewGame() {
  state = createInitialState();
  state.players = setupPlayers(selectedPlayerCount);
  state.currentPlayer = 0;
  state.log = ['Neue Partie gestartet.'];
  turnHintEl.textContent = `${getCurrentPlayer().name} eröffnet die Partie.`;
  render();
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
rollBtn.addEventListener('click', handleRoll);

boardEl.addEventListener('click', (event) => {
  const token = event.target.closest('.token');
  if (!token) return;
  handlePieceSelection(Number(token.dataset.playerIndex), token.dataset.pieceId);
});

cardOptionsEl.addEventListener('click', (event) => {
  const button = event.target.closest('.option-btn');
  if (!button) return;
  resolveQuizAnswer(Number(button.dataset.optionIndex));
});

cardContinueBtn.addEventListener('click', closeCardModal);
modalEl.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
    if (state.pendingCard && state.pendingCard.type === 'schicksal') closeCardModal();
  }
});

renderPlayerInputs();
startNewGame();
