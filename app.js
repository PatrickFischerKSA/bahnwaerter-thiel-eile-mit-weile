const GRID_SIZE = 13;
const START_INDICES = new Set([0, 10, 20, 30]);
const SPECIAL_SPACES = new Map([
  [2, {
    kind: 'text',
    place: 'Wärterhäuschen',
    icon: '🕯',
    fieldEffect: { kind: 'shield', amount: 1, text: 'Ortsbonus Wärterhäuschen: Du erhältst 1 Schutzmarke.' }
  }],
  [7, {
    kind: 'schicksal',
    place: 'Bahnübergang',
    icon: '🚧',
    fieldEffect: { kind: 'advance', amount: 1, text: 'Ortswirkung Bahnübergang: Deine Figur rückt 1 Feld vor.' }
  }],
  [12, {
    kind: 'deutung',
    place: 'Neu-Zittau',
    icon: '⛪',
    fieldEffect: { kind: 'insight', amount: 1, text: 'Ortsbonus Neu-Zittau: Du gewinnst 1 Erkenntnispunkt.' }
  }],
  [18, {
    kind: 'text',
    place: 'Acker an den Gleisen',
    icon: '🌾',
    fieldEffect: { kind: 'advance', amount: 1, text: 'Ortswirkung Acker: Deine Figur rückt 1 Feld vor.' }
  }],
  [23, {
    kind: 'schicksal',
    place: 'Bahndamm',
    icon: '🛤',
    fieldEffect: { kind: 'loseShield', amount: 1, text: 'Ortswirkung Bahndamm: Du verlierst 1 Schutzmarke, falls vorhanden.' }
  }],
  [28, {
    kind: 'deutung',
    place: 'Kiefernforst',
    icon: '🌲',
    fieldEffect: { kind: 'insight', amount: 1, text: 'Ortsbonus Kiefernforst: Du gewinnst 1 Erkenntnispunkt.' }
  }],
  [33, {
    kind: 'text',
    place: 'Barriere',
    icon: '🚦',
    fieldEffect: { kind: 'shield', amount: 1, text: 'Ortsbonus Barriere: Du erhältst 1 Schutzmarke.' }
  }],
  [38, {
    kind: 'schicksal',
    place: 'Schönschornstein',
    icon: '💨',
    fieldEffect: { kind: 'advance', amount: 1, text: 'Ortswirkung Schönschornstein: Deine Figur rückt 1 Feld vor.' }
  }]
]);
const SPECIAL_FIELDS = new Map([
  ...[...SPECIAL_SPACES.entries()].map(([index, meta]) => [index, meta.kind])
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
  { key: '1-11', label: '1 / 11', kind: 'choice', summary: 'Start, 1 oder 11', copies: 32 },
  { key: '13', label: '13', kind: 'choice', summary: 'Start oder 13', copies: 32 },
  { key: '4pm', label: '4 ±', kind: 'choice', summary: '4 vor oder zurück', copies: 32 },
  { key: '7', label: '7', kind: 'split', summary: '7 aufteilen', copies: 32 },
  { key: 'swap', label: 'Tausch', kind: 'swap', summary: 'Figuren tauschen', copies: 32 },
  { key: '2', label: '2', kind: 'move', steps: 2, summary: '2 vor', copies: 32 },
  { key: '3', label: '3', kind: 'move', steps: 3, summary: '3 vor', copies: 32 },
  { key: '5', label: '5', kind: 'move', steps: 5, summary: '5 vor', copies: 32 },
  { key: '6', label: '6', kind: 'move', steps: 6, summary: '6 vor', copies: 32 },
  { key: '8', label: '8', kind: 'move', steps: 8, summary: '8 vor', copies: 32 },
  { key: '9', label: '9', kind: 'move', steps: 9, summary: '9 vor', copies: 32 },
  { key: '10', label: '10', kind: 'move', steps: 10, summary: '10 vor', copies: 32 },
  { key: '12', label: '12', kind: 'move', steps: 12, summary: '12 vor', copies: 32 },
  { key: 'joker', label: '?', kind: 'joker', summary: 'beliebige Karte', copies: 24 }
];

const LITERATURE_CARDS = {
  text: [
    {
      title: 'Warum die zweite Ehe?',
      prompt: 'Welches Motiv nennt der Text als entscheidenden Grund dafür, dass Thiel nach Minnas Tod wieder heiratet?',
      options: [
        'Die Versorgung des schwächlichen Tobias verlangt nach einer neuen Haushalts- und Pflegeordnung.',
        'Der Bahndienst verbietet einem alleinstehenden Wärter ausdrücklich das Weiterarbeiten.',
        'Thiel will sich von Minnas Erinnerung möglichst rasch lösen.',
        'Lene bringt eine nennenswerte Mitgift in die Ehe ein.'
      ],
      correct: 0,
      explanation: 'Thiel begründet die zweite Heirat ausdrücklich mit Tobias, der ohne verlässliche Pflege nicht gut versorgt ist.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Minnas Tod',
      prompt: 'Welcher Zusammenhang aus Geburt, Verlust und Folgeschwäche ist für Minnas Tod und Tobias’ Zustand im Text zentral?',
      options: [
        'Minna stirbt im Wochenbett; Tobias überlebt, bleibt aber schwächlich und pflegebedürftig.',
        'Minna verunglückt am Übergang; Tobias wird daraufhin zu einem stillen Einzelkind.',
        'Minna erliegt einer Lungenkrankheit; Tobias wird danach von Lene gesund gepflegt.',
        'Minna stirbt auf dem Feld; Tobias ist bei ihrer Schwester in Sicherheit.'
      ],
      correct: 0,
      explanation: 'Minna stirbt im Wochenbett; Tobias überlebt, bleibt aber schwach und pflegebedürftig.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Die Bude als Kapelle',
      prompt: 'Welche Gegenstände und welche Funktion machen aus Thiels Wärterhäuschen einen fast sakralen Erinnerungsraum?',
      options: [
        'Foto, Bibel und Gesangbuch verdichten die Bude zu einer privaten Gedächtniskapelle für Minna.',
        'Werkzeuge, Laterne und Uniform verwandeln die Bude in ein reines Dienstarchiv.',
        'Kinderbett, Wäsche und Milchgeschirr machen die Bude zum Ausweichraum für Tobias.',
        'Karten, Pfeife und Branntwein öffnen die Bude für gesellige Bahnwärterabende.'
      ],
      correct: 0,
      explanation: 'Mit Foto, Bibel und Gesangbuch verwandelt Thiel die Bude in einen sakral aufgeladenen Erinnerungsraum.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Der abgelegene Posten',
      prompt: 'Welche Raumwirkung des Dienstorts ist für die psychische Anlage der Novelle besonders wichtig?',
      options: [
        'Lärm der Grossstadt und dauernde Menschenmengen zerstreuen Thiel permanent.',
        'Die Nähe zu einem Hafen macht den Bahndienst nebensächlich.',
        'Die isolierte Lage im märkischen Kiefernforst steigert Einsamkeit, Ritualisierung und innere Spannung.',
        'Ein militärisch geordneter Kasernenraum verhindert jede seelische Entgrenzung.'
      ],
      correct: 2,
      explanation: 'Der Text betont die Isolation des Postens im märkischen Kiefernforst als psychisch verstärkenden Raum.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Lene und Tobias',
      prompt: 'Welche Charakterisierung von Lenes Umgang mit Tobias trifft den Text am genauesten?',
      options: [
        'Mit fürsorglicher Geduld und stiller Zärtlichkeit.',
        'Sie behandelt ihn als Last, setzt ihn grob ein und zeigt wiederholt offene Härte statt Fürsorge.',
        'Als gleichberechtigtes Lieblingskind neben dem eigenen Kind.',
        'Sie schützt ihn vor Feldarbeit und entlastet Thiel im Geheimen.'
      ],
      correct: 1,
      explanation: 'Lene wendet sich von Tobias ab, nutzt ihn aus und setzt ihn Gewalt und Überforderung aus.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Die Katastrophe',
      prompt: 'Welche konkrete Alltagsszene an Arbeit und Bahndamm führt im Text unmittelbar zur Katastrophe?',
      options: [
        'Thiel vergisst die Barriere zu schliessen und bleibt in der Bude sitzen.',
        'Lene nimmt Tobias zum Kartoffelsetzen mit an die Gleise und lässt ihn dort in gefährlicher Nähe zur Bahn.',
        'Tobias flieht nach einem Kirchgang allein über den Bahndamm.',
        'Ein defektes Signal lockt Tobias nachts aus dem Bett auf die Strecke.'
      ],
      correct: 1,
      explanation: 'Lene besteht darauf, dass Tobias beim Feldstück an der Bahn bleibt; kurz darauf wird er vom Zug erfasst.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Der Dienstcharakter',
      prompt: 'Welche Beschreibung passt am besten zu Thiels Auftreten im Beruf, bevor seine Krise offen ausbricht?',
      options: [
        'Als unzuverlässiger Träumer, der Vorschriften nur locker nimmt.',
        'Als exakt, schweigsam und pflichtstrikt, fast pedantisch verlässlich.',
        'Als geselliger Wirtshausredner mit Hang zu Improvisation.',
        'Als ehrgeiziger Aufsteiger, der sich offen mit Vorgesetzten anlegt.'
      ],
      correct: 1,
      explanation: 'Thiel erscheint im Dienst lange als ausgesprochen exakt, ruhig und zuverlässig.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Sonntagsordnung',
      prompt: 'Welche Funktion haben Thiels regelmässige Sonntagsgänge nach Neu-Zittau im Gefüge der Novelle?',
      options: [
        'Sie markieren eine gesellige Flucht ins Wirtshausleben.',
        'Sie verbinden religiöse Pflicht mit Erinnerungspflege und innerer Selbstdisziplin.',
        'Sie dienen ausschliesslich dem Einkauf für Lenes Haushalt.',
        'Sie belegen, dass Thiel seinen Dienst vernachlässigt.'
      ],
      correct: 1,
      explanation: 'Die Gänge strukturieren Thiels Leben rituell und halten die Bindung an Minna wach.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Minnas Fortleben',
      prompt: 'In welcher Form bleibt Minna nach ihrem Tod im Text für Thiel besonders wirksam?',
      options: [
        'Als juristische Erbin, die den Haushalt finanziell bestimmt.',
        'Als vergeistigte Erinnerungs- und Gewissensfigur, die in Visionen zurückkehrt.',
        'Als ständig zitierte Dorftratschtante der Nachbarschaft.',
        'Als reale Stimme, die nur Tobias im Traum hört.'
      ],
      correct: 1,
      explanation: 'Minna bleibt als idealisierte innere Instanz gegenwärtig und kehrt in Visionen wieder.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Lenes Erscheinung',
      prompt: 'Welche Wirkung der Figur Lene stellt der Text besonders stark heraus?',
      options: [
        'Ihre feingliedrige, kränkliche Vergeistigung.',
        'Ihre robuste, sinnliche und handfeste Körperlichkeit.',
        'Ihre akademische Bildung und rhetorische Kultiviertheit.',
        'Ihre weltabgewandte asketische Strenge.'
      ],
      correct: 1,
      explanation: 'Lene wird als kraftvoll, derb und körpernah gezeichnet, bewusst im Kontrast zu Minna.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Das zweite Kind',
      prompt: 'Wie verändert die Geburt von Lenes Kind die Stellung von Tobias im Familiengefüge?',
      options: [
        'Tobias wird zum Mittelpunkt der Mutterliebe.',
        'Seine Randstellung verschärft sich, weil Lene das eigene Kind bevorzugt.',
        'Er wird zu Lenes offizieller Hilfe im Haus ernannt.',
        'Thiel gibt Tobias daraufhin dauerhaft in fremde Pflege.'
      ],
      correct: 1,
      explanation: 'Mit dem eigenen Kind nimmt Lenes Vernachlässigung und Härte gegenüber Tobias weiter zu.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Acker an den Gleisen',
      prompt: 'Warum ist die Feldarbeit direkt an der Bahnstrecke für die Handlung so folgenreich?',
      options: [
        'Weil dort Arbeit, Familienkonflikt und technische Gefahr unheilvoll zusammenfallen.',
        'Weil die Dorfgemeinschaft dort ihre Feste veranstaltet.',
        'Weil Thiel dort heimlich einen zweiten Posten übernimmt.',
        'Weil Minna dort ein verborgenes Testament hinterlässt.'
      ],
      correct: 0,
      explanation: 'Am Bahndamm verdichten sich Alltagsarbeit, Vernachlässigung und tödliche Gefahr in einem Raum.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Erzählbeginn',
      prompt: 'Welche Erzählhaltung prägt die Darstellung Thiels zu Beginn am stärksten?',
      options: [
        'Ein nüchtern beobachtender, fast protokollierender Zugriff.',
        'Eine rein subjektive Ich-Beichte Thiels.',
        'Eine komische Dorfposse aus Lenes Perspektive.',
        'Ein pathetischer Heldenepos-Ton.'
      ],
      correct: 0,
      explanation: 'Der Anfang wirkt distanziert und registrierend, fast wie eine Fallbeschreibung.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Körper und Sprache',
      prompt: 'Welche Ebene dominiert besonders in der Beschreibung Lenes?',
      options: [
        'Abstrakte Begriffe religiöser Innerlichkeit.',
        'Körperliche Präsenz, Arbeit, Materialität und derbe Direktheit.',
        'Juristische Fachsprache des Bahndienstes.',
        'Romantische Naturmetaphorik ohne soziale Schärfe.'
      ],
      correct: 1,
      explanation: 'Lenes Darstellung ist stark über Körper, Arbeit und handfeste Materialität geführt.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Tobias als Prüfstein',
      prompt: 'Welche Funktion erfüllt Tobias’ Schwächlichkeit bereits vor der Katastrophe?',
      options: [
        'Sie macht ihn zum unauffälligen Hintergrund ohne Deutungswert.',
        'Sie zwingt zur Pflege und legt dadurch Lenes Härte sowie Thiels Versäumnisse offen.',
        'Sie erklärt, warum er selbst zum Täter des Schlusses wird.',
        'Sie dient nur dazu, Minnas Schwester einzuführen.'
      ],
      correct: 1,
      explanation: 'Gerade Tobias’ Bedürftigkeit macht die moralische Belastungsprobe der Familie sichtbar.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Minnas Bild',
      prompt: 'Wie fungiert Minnas Bild im Wärterhäuschen für Thiel?',
      options: [
        'Als beliebiger Schmuck ohne innere Bedeutung.',
        'Als konkreter Erinnerungsanker, der Andacht, Schuld und Trost bündelt.',
        'Als Beweisstück in einem Dienstverfahren.',
        'Als Kinderspielzeug für Tobias.'
      ],
      correct: 1,
      explanation: 'Das Bild verdichtet Thiels Bindung an Minna zu einem beinahe kultischen Zentrum.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Vor der Kollision',
      prompt: 'Was geht Tobias’ Tod in der Alltagslogik des Textes unmittelbar voraus?',
      options: [
        'Eine leichtsinnige Dorfwette unter Bahnarbeitern.',
        'Eine Verkettung aus Überforderung, Lenes Härte und gefährlicher Nähe der Kinderarbeit zur Strecke.',
        'Ein nächtlicher Ausflug Tobias’ aus Abenteuerlust.',
        'Ein technischer Totalausfall der Signale ohne menschlichen Anteil.'
      ],
      correct: 1,
      explanation: 'Die Novelle zeigt keine abstrakte Zufallskatastrophe, sondern eine aus dem Alltag heraus vorbereitete Vernachlässigung.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Akustische Warnung',
      prompt: 'Welches akustische Motiv markiert im Text immer wieder die Nähe der Gefahr?',
      options: [
        'Das Kirchengeläut als einziges Leitsignal.',
        'Der Pfiff und das Heranrollen der Eisenbahn.',
        'Das Meeresrauschen des Hafens.',
        'Das Gelächter der Wirtshausgäste.'
      ],
      correct: 1,
      explanation: 'Pfiff, Rollen und Bahngeräusch bilden ein wiederkehrendes Drohmotiv.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Dienst und Anerkennung',
      prompt: 'Wie erscheint Thiel im Blick seines beruflichen Umfelds vor dem Zusammenbruch?',
      options: [
        'Als pflichtbewusster, anerkannter und in seiner Strenge etwas gefürchteter Bahnwärter.',
        'Als offenkundig unfähiger Sonderling kurz vor der Entlassung.',
        'Als jovialer Spassmacher, den niemand ernst nimmt.',
        'Als politischer Agitator der Bahnarbeiter.'
      ],
      correct: 0,
      explanation: 'Thiels Ruf stützt sich lange auf Zuverlässigkeit, Disziplin und stille Härte gegen sich selbst.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Kein sicherer Abstand',
      prompt: 'Was zeigt die räumliche Nähe von Wohnraum, Feldarbeit und Bahnlinie besonders deutlich?',
      options: [
        'Dass die Lebensbereiche sauber getrennt bleiben.',
        'Dass Privates, Arbeit und Gefahr in Thiels Welt kaum voneinander zu trennen sind.',
        'Dass der Bahndienst im Text nur dekorativer Hintergrund ist.',
        'Dass Tobias fern jeder Erwachsenenarbeit aufwächst.'
      ],
      correct: 1,
      explanation: 'Im Text greifen Familie, Arbeit und Technik fatal ineinander statt getrennt zu bleiben.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Beobachten statt Beichten',
      prompt: 'Woran erkennt man besonders gut, dass der Anfang keine intime Bekenntnisprosa ist?',
      options: [
        'An der sachlichen Fremdbeobachtung und dem sozialen Einordnen der Figur.',
        'An einem langen inneren Monolog in der Ich-Form.',
        'An Briefen Minnas aus dem Jenseits.',
        'An komischen Dialogen im Wirtshaus.'
      ],
      correct: 0,
      explanation: 'Die Novelle setzt zunächst auf Distanz und soziale Verortung statt auf unmittelbare Selbstrede.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Minna und Lene',
      prompt: 'Welcher Gegensatz wird zwischen Minna und Lene am deutlichsten aufgebaut?',
      options: [
        'Vergeistigung und Sanftheit auf der einen, Körperlichkeit und Härte auf der anderen Seite.',
        'Städtische Eleganz gegen ländliche Naivität.',
        'Gelehrsamkeit gegen völlige Sprachlosigkeit.',
        'Reichtum gegen extreme Armut.'
      ],
      correct: 0,
      explanation: 'Die beiden Frauenfiguren sind bewusst kontrastiv angelegt und prägen Thiels Spaltung.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Nach dem Unfall',
      prompt: 'Welche Erfahrung prägt Thiel nach Tobias’ Tod besonders stark?',
      options: [
        'Ein sofort geordneter Trost durch die Dorfgemeinschaft.',
        'Ein Schock, der sich rasch in Wahn, Schuld und Gewaltdrang verwandelt.',
        'Ein entschlossener Plan zur Flucht in die Grossstadt.',
        'Eine nüchterne gerichtliche Aussage ohne innere Folgen.'
      ],
      correct: 1,
      explanation: 'Der Verlust kippt nicht in Verarbeitung, sondern in psychische Entgrenzung.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Der Schlussort',
      prompt: 'Wo zeigt die Novelle Thiel nach der Gewalttat zuletzt?',
      options: [
        'Als geachteten Bahnwärter an alter Stelle.',
        'In der Charité.',
        'Auf einem Schiff nach Übersee.',
        'Als Einsiedler im märkischen Forst.'
      ],
      correct: 1,
      explanation: 'Der Schluss rahmt Thiel als endgültig zerstörte Figur im Kontext der Charité.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    }
  ],
  deutung: [
    {
      title: 'Innerer Riss',
      prompt: 'Welche innere Spaltung trägt Thiels Figur am präzisesten?',
      options: [
        'Pflichtethos und Besitzgier strukturieren ausschliesslich sein Innenleben.',
        'Die vergeistigte Bindung an Minna kollidiert mit seiner triebhaft-schuldhaften Bindung an Lene.',
        'Stadtleben und Landlust stehen als Lebensmodelle unvereinbar gegeneinander.',
        'Humor und Leichtsinn verdecken nur oberflächlich seinen Ernst.'
      ],
      correct: 1,
      explanation: 'Thiel schwankt zwischen vergeistigter Bindung an Minna und roher, schuldbehafteter Abhängigkeit von Lene.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Naturalistische Studie',
      prompt: 'Warum trifft die Formel „novellistische Studie“ den Text genauer als die Vorstellung einer blossen Schauererzählung?',
      options: [
        'Weil der Text Milieu, Arbeitswelt, Körperlichkeit und psychische Zerrüttung nahezu protokollartig beobachtet.',
        'Weil die Novelle fast ausschliesslich aus volkstümlichen Wundergeschichten besteht.',
        'Weil nur die Pointe am Ende zählt, nicht aber soziale oder psychische Voraussetzungen.',
        'Weil der Erzähler jede Figur idealisierend und ohne Härte darstellt.'
      ],
      correct: 0,
      explanation: 'Der Text wirkt stellenweise wie eine genaue Fall- und Milieustudie: Arbeit, Raum, Körper und Psyche greifen eng ineinander.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Bahn und Wald',
      prompt: 'Welche Deutung des Zusammenspiels von Bahn und Kiefernforst erfasst die Spannung des Textes am genauesten?',
      options: [
        'Die Natur wirkt rein idyllisch, während nur die Technik Gefahr erzeugt.',
        'Bahn und Wald bilden ein Spannungsfeld aus Ordnung, Isolation und Gefahr.',
        'Der Forst dient vor allem als romantischer Gegenraum ohne soziale Funktion.',
        'Die Bahn erscheint ausschliesslich als positives Fortschrittssymbol.'
      ],
      correct: 1,
      explanation: 'Der Forst isoliert, die Bahn beschleunigt und bedroht; zusammen verdichten sie Thiels Situation.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Vision und Wahn',
      prompt: 'Wie wirken Thiels religiöse Rituale und Visionen im Verlauf der Novelle zusammen?',
      options: [
        'Sie dienen bloss der Staffage und bleiben psychologisch folgenlos.',
        'Sie stabilisieren Thiel vollständig und verhindern den Zusammenbruch.',
        'Sie kompensieren Schuld, sakralisieren Minnas Erinnerung und vertiefen zugleich die innere Spaltung.',
        'Sie beweisen, dass der Text eine übernatürliche Geistergeschichte erzählt.'
      ],
      correct: 2,
      explanation: 'Die Rituale geben Thiel Halt, steigern aber zugleich seine Abspaltung und den späteren Wahn.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Tobias als Zentrum',
      prompt: 'Warum ist Tobias mehr als nur ein Opfer der Handlung, nämlich ein Zentrum der Gesamtdeutung?',
      options: [
        'Er markiert vor allem die gelungene Integration der Patchwork-Familie.',
        'An ihm bündeln sich Fürsorge, Gewalt, Schuld und moralisches Versagen.',
        'Er fungiert als souveräner Ich-Erzähler des Schlusses.',
        'Er löst den Konflikt zwischen Minna und Lene am Ende symbolisch auf.'
      ],
      correct: 1,
      explanation: 'Tobias macht die Brutalität im Familiengefüge sichtbar und wird zum Auslöser von Schuld, Wahn und Gewalt.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Ende der Kontrolle',
      prompt: 'Welche Aussage über Milieu, Psyche und Handlung kulminiert im Ende der Novelle?',
      options: [
        'Dass sich Thiels Krise durch vernünftige Selbstauskunft vollständig auflöst.',
        'Dass soziale und psychische Spannungen in totale Entgrenzung umschlagen.',
        'Dass die Dorfgemeinschaft als moralische Instanz rettend eingreift.',
        'Dass der Erzähler das Geschehen im Nachhinein als Missverständnis relativiert.'
      ],
      correct: 1,
      explanation: 'Nach Tobias’ Tod kippt Thiels mühsame Selbstkontrolle in Raserei, Mord und endgültigen Wahnsinn.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Beruf im Titel',
      prompt: 'Warum ist es deutungsträchtig, dass die Novelle nicht nach dem Mord, sondern nach Thiels Beruf benannt ist?',
      options: [
        'Weil der Titel die Tat vollständig verharmlost.',
        'Weil Beruf, Pflicht und soziale Rolle den Rahmen bilden, in dem die Katastrophe entsteht.',
        'Weil Hauptmann ursprünglich eine Eisenbahnwerbung schreiben wollte.',
        'Weil die Familie im Text keine Rolle spielt.'
      ],
      correct: 1,
      explanation: 'Der Titel rückt die Funktion im System und nicht nur die Sensation der Tat in den Vordergrund.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Determinierende Kräfte',
      prompt: 'Welche naturalistische Deutung beschreibt Thiels Zusammenbruch am treffendsten?',
      options: [
        'Er entspringt einzig einem freien Entschluss ohne Vorgeschichte.',
        'Er entsteht aus dem Zusammenspiel von Milieu, Körper, Arbeit, psychischem Druck und sozialer Konstellation.',
        'Er wird allein durch ein Wunder verursacht.',
        'Er ist bloss eine rhetorische Übertreibung des Erzählers.'
      ],
      correct: 1,
      explanation: 'Der Text zeigt keine isolierte Einzeltat, sondern ein dichtes Ursachengefüge.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Erzählerdistanz',
      prompt: 'Welche Wirkung hat die distanzierte Erzählweise im Blick auf Thiels Leid besonders stark?',
      options: [
        'Sie verniedlicht die Gewalt als harmloses Missverständnis.',
        'Sie verstärkt den Eindruck einer beobachteten Fallgeschichte statt einer sentimentalen Klage.',
        'Sie verwandelt den Text in eine reine Komödie.',
        'Sie macht alle sozialen Zusammenhänge unsichtbar.'
      ],
      correct: 1,
      explanation: 'Gerade die Nüchternheit schärft die Härte des Geschehens und die Studie des Falls.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Religion ohne Erlösung',
      prompt: 'Welche Deutung trifft Thiels Frömmigkeit im Gesamtverlauf am besten?',
      options: [
        'Sie führt ihn sicher zur moralischen Läuterung.',
        'Sie ist Kompensation und Ordnungsversuch, kann die Gewaltverhältnisse aber nicht erlösen.',
        'Sie spielt nur ironische Nebenrolle ohne Funktion.',
        'Sie hebt alle sozialen Unterschiede im Text auf.'
      ],
      correct: 1,
      explanation: 'Thiels Frömmigkeit stabilisiert punktuell, reicht aber nicht gegen die zerstörerischen Kräfte.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Lenes Funktion',
      prompt: 'Welche literarische Funktion erfüllt Lene über die Rolle der Antagonistin hinaus?',
      options: [
        'Sie verkörpert nur äusserliche Bosheit ohne sozialen Bezug.',
        'Sie bündelt Körperlichkeit, Herrschaft im Haushalt und den Druck des unmittelbaren Milieus.',
        'Sie eröffnet einen rein komischen Nebenplot.',
        'Sie dient als neutrale Vermittlerin zwischen Minna und Thiel.'
      ],
      correct: 1,
      explanation: 'Lene ist mehr als böse Gegenspielerin: Sie verdichtet eine ganze soziale und körperliche Sphäre.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Minnas Idealbild',
      prompt: 'Wie ist Minnas Nachwirkung deutungstheoretisch am treffendsten zu fassen?',
      options: [
        'Als bloss realistisches Erinnerungsfoto ohne Projektion.',
        'Als idealisierte Gegenwelt, in die Thiel Gewissen, Reinheit und Trost hineinprojiziert.',
        'Als satirische Karikatur bürgerlicher Frömmigkeit.',
        'Als rein ökonomische Haushaltskraft.'
      ],
      correct: 1,
      explanation: 'Minnas Bild ist stark idealisiert und trägt die Spaltung zwischen Geist und Körper mit.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Kein Fortschrittsjubel',
      prompt: 'Welche Aussage über die Eisenbahn passt am besten zur Novelle?',
      options: [
        'Sie erscheint als ungebrochener Fortschrittssegen.',
        'Sie verbindet technische Ordnung mit Beschleunigung, Zwang und tödlicher Gefahr.',
        'Sie bleibt bloss dekorativer Hintergrund ohne Einfluss.',
        'Sie wird als märchenhaftes Wunderwesen gefeiert.'
      ],
      correct: 1,
      explanation: 'Die Bahn steht nicht für naive Moderneuphorie, sondern für Ambivalenz und Gewalt.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Raumtriade',
      prompt: 'Welche Raumkonstellation trägt Thiels innere Krise besonders wirksam?',
      options: [
        'Marktplatz, Rathaus und Schule.',
        'Wärterhäuschen, Kiefernforst und Bahnlinie.',
        'Salon, Ballsaal und Oper.',
        'Gebirge, Gletscher und Passhöhe.'
      ],
      correct: 1,
      explanation: 'Die Triade aus Bude, Forst und Schiene verdichtet Arbeit, Isolation und Bedrohung.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Familie als Gewaltordnung',
      prompt: 'Warum ist die Familie im Text kein privater Schutzraum?',
      options: [
        'Weil sie als Ort von Vernachlässigung, Macht und Überforderung gezeichnet ist.',
        'Weil sie fast gar nicht dargestellt wird.',
        'Weil dort ausschliesslich idyllische Harmonie herrscht.',
        'Weil der Erzähler häusliche Szenen vermeidet.'
      ],
      correct: 0,
      explanation: 'Gerade die Familie zeigt sich als Raum sozialer Härte statt als Rückzugsmöglichkeit.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Akustische Dramaturgie',
      prompt: 'Welche Funktion hat das Geräusch der Bahn in der Novelle?',
      options: [
        'Es füllt nur zufällig die Kulisse.',
        'Es strukturiert Spannung und kündigt Gefahr körperlich-sinnlich an.',
        'Es dient allein humoristischen Effekten.',
        'Es ersetzt jede Charakterzeichnung.'
      ],
      correct: 1,
      explanation: 'Der Text arbeitet stark mit akustischer Vorankündigung und körperlicher Wahrnehmung.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Schuld der Passivität',
      prompt: 'Worin liegt Thiels Schuld vor dem finalen Ausbruch besonders deutlich?',
      options: [
        'Ausschliesslich in einem juristischen Signalverstoss.',
        'Auch darin, dass er Lenes Gewalt und Tobias’ Leid zu lange hinnimmt und nicht wirksam unterbricht.',
        'Nur darin, dass er zu wenig arbeitet.',
        'Darin, dass er Minna vergessen will.'
      ],
      correct: 1,
      explanation: 'Thiel ist nicht nur Opfer, sondern auch durch seine Passivität moralisch belastet.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Macht im Haushalt',
      prompt: 'Wie verschieben sich die Machtverhältnisse zwischen Thiel und Lene im häuslichen Alltag?',
      options: [
        'Thiel beherrscht den Haushalt souverän.',
        'Lene dominiert den Alltag faktisch, während Thiel sich innerlich entzieht und äusserlich nachgibt.',
        'Beide bleiben vollkommen gleichberechtigt.',
        'Minnas Familie führt den Haushalt von aussen.'
      ],
      correct: 1,
      explanation: 'Im Haus wirkt Lene als starke, durchsetzende Kraft, der Thiel nur begrenzt entgegentritt.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Novellenkern',
      prompt: 'Was macht den Stoff trotz seiner sozial-analytischen Anlage weiterhin novellistisch?',
      options: [
        'Die völlige Ereignislosigkeit.',
        'Die Konzentration auf einen folgenreichen Konflikt, leitmotivische Verdichtung und eine extreme Zuspitzung.',
        'Die breite Chronik mehrerer Generationen.',
        'Die ausschliessliche Form des Dramas.'
      ],
      correct: 1,
      explanation: 'Der Text verbindet Studiencharakter mit novellistischer Konzentration und Zuspitzung.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Trauma und Wahrnehmung',
      prompt: 'Wie verändert Tobias’ Tod Thiels Wahrnehmung im weiteren Verlauf?',
      options: [
        'Gar nicht; er bleibt durchgehend nüchtern und kontrolliert.',
        'Sie kippt von angespannter Selbstbeherrschung in halluzinatorische und wahnhafte Entgrenzung.',
        'Sie wird ausschliesslich komisch verzerrt.',
        'Sie endet in völliger sprachlicher Klarheit.'
      ],
      correct: 1,
      explanation: 'Nach dem Unfall verschiebt sich die Wahrnehmung in Vision, Zerrbild und Raserei.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Tobias als Schnittstelle',
      prompt: 'Warum ist Tobias auch strukturell die Verbindung zwischen Minnas und Lenes Sphäre?',
      options: [
        'Weil er beide Ehen als einziges gemeinsames Gespräch moderiert.',
        'Weil an ihm Vergangenheit, neue Familie, Pflegepflicht und Gewaltkonflikt zusammenlaufen.',
        'Weil er die Bahn beaufsichtigt.',
        'Weil er als Erzähler beide Frauen bewertet.'
      ],
      correct: 1,
      explanation: 'Tobias verbindet Erinnerung an Minna und die gegenwärtige Gewaltordnung mit Lene.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Pflicht als Selbstschutz',
      prompt: 'Welche Funktion hat Thiels strenges Pflichtethos vor dem Umschlag in Gewalt?',
      options: [
        'Es ist nur äussere Pose ohne innere Funktion.',
        'Es wirkt als fragile Form von Selbstdisziplin, die seine innere Zerrissenheit notdürftig zusammenhält.',
        'Es löst alle häuslichen Konflikte dauerhaft.',
        'Es trennt ihn vollständig von Minnas Erinnerung.'
      ],
      correct: 1,
      explanation: 'Dienstliche Ordnung gibt Thiel Halt, kann seine Krise aber letztlich nicht bannen.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Schluss in der Charité',
      prompt: 'Wie lässt sich das Ende in der Charité literarisch deuten?',
      options: [
        'Als glückliche Genesung und Wiedereingliederung.',
        'Als endgültige Pathologisierung einer von Milieu und Schuld zerstörten Figur.',
        'Als humorvolle Pointe ohne Tragweite.',
        'Als Beweis dafür, dass alles nur geträumt war.'
      ],
      correct: 1,
      explanation: 'Die Charité markiert keinen Ausweg, sondern die letzte Form des Zusammenbruchs.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Blick auf den Körper',
      prompt: 'Warum ist die Körperlichkeit in Hauptmanns Novelle mehr als blosses Detail?',
      options: [
        'Weil sie die soziale und psychische Verfassung sichtbar macht.',
        'Weil sie nur dem sensationshungrigen Schmuck dient.',
        'Weil körperliche Zustände im Text irrelevant bleiben.',
        'Weil nur geistige Prozesse erzählt werden.'
      ],
      correct: 0,
      explanation: 'Körper, Arbeit und Erschöpfung gehören im Naturalismus zum Erklärungssystem des Geschehens.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
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
    },
    {
      title: 'Kiefernrauschen',
      prompt: 'Der Forst scheint still, aber gerade die Stille verdichtet die Anspannung.',
      explanation: 'Natur beruhigt hier nicht einfach, sondern macht die innere Beklemmung hörbar.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Dienst nach Vorschrift',
      prompt: 'Jede Bewegung sitzt. Für einen Zug lang trägt dich reine Routine.',
      explanation: 'Thiels Pflichtethos wirkt kurzfristig als Schutzpanzer.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Bild der Toten',
      prompt: 'Minnas Bild liegt im Blickfeld. Erinnerung und Gewissen ziehen sich zusammen.',
      explanation: 'Die idealisierte Tote ordnet Thiels Innenraum für einen Moment.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Grober Befehl',
      prompt: 'Lenes Ton lässt keinen Widerspruch zu. Der häusliche Druck wächst.',
      explanation: 'Im Haushalt zeigt sich ihre Dominanz unmittelbar und körperlich.',
      reward: { kind: 'loseShield', amount: 1, text: 'Du verlierst 1 Schutzmarke, falls vorhanden.' }
    },
    {
      title: 'Schwüler Nachmittag',
      prompt: 'Hitze lastet auf Feld und Gleisen. Die Konzentration wird schwerer als sonst.',
      explanation: 'Naturalistische Milieufaktoren wirken als Belastung des Körpers mit.',
      reward: { kind: 'none', amount: 0, text: 'Kein Bonus in dieser Runde.' }
    },
    {
      title: 'Tobias im Schatten',
      prompt: 'Ein stiller Blick des Kindes erinnert daran, worum es moralisch eigentlich geht.',
      explanation: 'Tobias bündelt Fürsorgepflicht und Schuldfrage in der Runde.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Vorbeidröhnender Zug',
      prompt: 'Die Schienen vibrieren, lange bevor die Lok sichtbar wird.',
      explanation: 'Die Bahn kündigt Gefahr körperlich und akustisch an.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Ritual der Ordnung',
      prompt: 'Gebet, Gesangbuch, Stille: Für einen Atemzug scheint das Innere wieder sortiert.',
      explanation: 'Rituale stützen Thiel punktuell, ohne die Krise wirklich zu lösen.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Stumpfe Müdigkeit',
      prompt: 'Arbeit, Pflicht und Sorge machen jeden Entschluss träger.',
      explanation: 'Erschöpfung ist im Text keine Nebensache, sondern Handlungskraft.',
      reward: { kind: 'none', amount: 0, text: 'Kein Bonus in dieser Runde.' }
    },
    {
      title: 'Strenge Selbstzucht',
      prompt: 'Du hältst dich an die Form, obwohl im Innern längst Unruhe arbeitet.',
      explanation: 'Selbstdisziplin trägt Thiel lange durch den Alltag.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Zwischen Feld und Schiene',
      prompt: 'Privates und Berufliches geraten unheilvoll an denselben Ort.',
      explanation: 'Die Novelle lebt von genau dieser räumlichen Verdichtung.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Unruhiger Kirchweg',
      prompt: 'Der Weg nach Neu-Zittau schenkt Ordnung, aber keine wirkliche Erlösung.',
      explanation: 'Frömmigkeit beruhigt und verschärft zugleich die innere Spannung.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Hartes Alltagsregime',
      prompt: 'Niemand nennt es Gewalt, und doch frisst die Härte den Tag auf.',
      explanation: 'Gerade das Gewöhnliche trägt im Text das Katastrophische in sich.',
      reward: { kind: 'loseShield', amount: 1, text: 'Du verlierst 1 Schutzmarke, falls vorhanden.' }
    },
    {
      title: 'Forstgrenze',
      prompt: 'Am Rand des Waldes wirkt jeder Laut grösser und jeder Gedanke enger.',
      explanation: 'Der Raum verstärkt das Seelische, statt es zu entlasten.',
      reward: { kind: 'insight', amount: 1, text: 'Du gewinnst 1 Erkenntnispunkt.' }
    },
    {
      title: 'Zug um Zug',
      prompt: 'Der Takt der Bahn zwingt alles in ein schnelleres, härteres Mass.',
      explanation: 'Beschleunigung gehört zum Druck der modernen Arbeitswelt.',
      reward: { kind: 'advance', amount: 1, text: 'Deine Figur rückt 1 Feld vor.' }
    },
    {
      title: 'Lenes Vorrang',
      prompt: 'Im Haus setzt sich die stärkere Hand durch, nicht das bessere Argument.',
      explanation: 'Macht zeigt sich bei Lene als Alltagspraxis.',
      reward: { kind: 'loseShield', amount: 1, text: 'Du verlierst 1 Schutzmarke, falls vorhanden.' }
    },
    {
      title: 'Tote Ordnung',
      prompt: 'Der Gedanke an Minna stiftet Ruhe und zugleich unerreichbare Reinheit.',
      explanation: 'Minnas Erinnerung ist Schutzraum und Schmerzquelle zugleich.',
      reward: { kind: 'shield', amount: 1, text: 'Du erhältst 1 Schutzmarke.' }
    },
    {
      title: 'Kinderarbeit am Damm',
      prompt: 'Das scheinbar Gewöhnliche kippt einen Schritt zu nah an die Gefahr.',
      explanation: 'Die Katastrophe wächst aus banaler Überforderung heraus.',
      reward: { kind: 'none', amount: 0, text: 'Kein Bonus in dieser Runde.' }
    }
  ]
};

const query = new URLSearchParams(window.location.search);
const appScreen = query.get('screen') === 'phone' ? 'phone' : 'board';
const RTC_CONFIG = {
  iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
};
const MAX_INFLUENCE_HAND = 2;
const SIGNAL_BLOB_API = 'https://jsonblob.com/api/jsonBlob';
const SIGNAL_POLL_MS = 1600;
const GAME_MODES = {
  normal: {
    key: 'normal',
    label: 'Normal',
    title: 'Normalmodus',
    description: 'Vier Figuren müssen ins Ziel, der Kartenzyklus läuft 6-5-4-3-2-1.',
    targetFinishedPieces: 4,
    dealCycle: [6, 5, 4, 3, 2, 1]
  },
  kurz: {
    key: 'kurz',
    label: 'Kurz',
    title: 'Kurzmodus',
    description: 'Zwei Figuren müssen ins Ziel, der Kartenzyklus läuft 5-4-3.',
    targetFinishedPieces: 2,
    dealCycle: [5, 4, 3]
  }
};

function getModeConfig(modeKey) {
  return GAME_MODES[modeKey] || GAME_MODES.normal;
}

const INFLUENCE_LIBRARY = [
  {
    key: 'rueckenwind',
    label: 'Rückenwind',
    summary: 'Du erhältst sofort 1 Schutzmarke.',
    target: 'self',
    copies: 4,
    effect: { kind: 'gainShield', amount: 1 }
  },
  {
    key: 'lektuereschub',
    label: 'Lektüreschub',
    summary: 'Du erhältst sofort 1 Erkenntnispunkt.',
    target: 'self',
    copies: 4,
    effect: { kind: 'gainInsight', amount: 1 }
  },
  {
    key: 'reservelaterne',
    label: 'Reservelaterne',
    summary: 'Du ziehst sofort 1 zusätzliche Aktionskarte.',
    target: 'self',
    copies: 4,
    effect: { kind: 'drawAction', amount: 1 }
  },
  {
    key: 'signalstoerung',
    label: 'Signalstörung',
    summary: 'Eine gewählte Spielperson verliert 1 Schutzmarke.',
    target: 'opponent',
    copies: 4,
    effect: { kind: 'loseShield', amount: 1 }
  },
  {
    key: 'streckensperre',
    label: 'Streckensperre',
    summary: 'Eine gewählte Spielperson verliert zufällig 1 Aktionskarte.',
    target: 'opponent',
    copies: 4,
    effect: { kind: 'discardRandomAction', amount: 1 }
  },
  {
    key: 'schattenwurf',
    label: 'Schattenwurf',
    summary: 'Eine gewählte Spielperson erhält beim nächsten Literaturbonus nichts.',
    target: 'opponent',
    copies: 4,
    effect: { kind: 'blockLiterature', amount: 1 }
  }
];

const CARD_SHOWCASE = [
  { kind: 'action', title: '1 / 11', text: 'Start oder 1 oder 11 Felder', detail: 'Erst Karte wählen, dann entscheiden, was genau sie tun soll.' },
  { kind: 'action', title: '4 ±', text: '4 vor oder 4 zurück', detail: 'Nach dem Klick entscheidest du die Richtung.' },
  { kind: 'action', title: '7', text: '7 auf mehrere eigene Loks verteilen', detail: 'Die 7 wird Schritt für Schritt aufgeteilt.' },
  { kind: 'action', title: 'Tausch', text: 'Eigene Lok mit gegnerischer Lok tauschen', detail: 'Zuerst deine Lok, dann das Ziel wählen.' },
  { kind: 'influence', title: 'Rückenwind', text: 'Sofort 1 Schutzmarke', detail: 'Einflusskarten sind Zusatzkarten. Pro eigenem Zug höchstens eine.' },
  { kind: 'influence', title: 'Signalstörung', text: 'Eine Person verliert 1 Schutzmarke', detail: 'Negative Einflusskarten brauchen zuerst ein Ziel.' },
  { kind: 'text', title: 'Textkarte', text: 'Frage zum Inhalt', detail: 'Richtig beantwortet = Bonus und Erkenntnis.' },
  { kind: 'deutung', title: 'Deutungskarte', text: 'Frage zur Interpretation', detail: 'Hier zählen Figur, Motiv und Aussage.' },
  { kind: 'schicksal', title: 'Schicksalskarte', text: 'Soforteffekt ohne Quiz', detail: 'Diese Karte wirkt sofort und stoppt den Zug kurz.' }
];

const RULE_PRIMER = [
  {
    title: 'Muss man DOG kennen?',
    text: 'Nein. Du musst nur die Hinweise hier lesen. Das Spiel sagt dir bei jedem Schritt, was du anklicken darfst und was nicht.'
  },
  {
    title: 'Wer spielt wann?',
    text: 'Immer spielt nur die Person, deren Name bei "Am Zug" steht. Nur diese Person klickt. Alle anderen warten.'
  },
  {
    title: 'Welche Karte spielt man?',
    text: 'In deinem Zug spielst du genau 1 helle Aktionskarte. Optional darfst du zusätzlich höchstens 1 Einflusskarte spielen, wenn sie erlaubt ist.'
  },
  {
    title: 'Wie viele Felder geht eine Lok?',
    text: 'Die gewählte Karte bestimmt die Feldzahl: 2 = zwei Felder, 10 = zehn Felder, 13 = dreizehn Felder. Bei 4 ±, 1 / 11, Joker und 7 fragt das Spiel nach.'
  },
  {
    title: 'Wann darf eine Lok aus dem Depot?',
    text: 'Nur mit einer Startkarte: 1 / 11, 13 oder Joker als Start. Ohne Startkarte bleibt die Lok im Depot.'
  },
  {
    title: 'Wann geht eine Lok zurück?',
    text: 'Wenn eine gegnerische Lok auf deinem Feld landet und du keine Schutzmarke hast, muss deine Lok zurück ins Depot.'
  },
  {
    title: 'Was passiert ohne spielbare Karte?',
    text: 'Dann kannst du nichts wählen. Das Spiel legt deine Resthand automatisch ab und du wartest bis zur nächsten Kartenrunde.'
  }
];

const boardAppEl = document.getElementById('boardApp');
const phoneAppEl = document.getElementById('phoneApp');
const pageNavButtonsEl = document.getElementById('pageNavButtons');
const boardEl = document.getElementById('board');
const playerInputsEl = document.getElementById('playerInputs');
const playerCountPicker = document.getElementById('playerCountPicker');
const gameModePickerEl = document.getElementById('gameModePicker');
const gameModeDescriptionEl = document.getElementById('gameModeDescription');
const setupCoachSummaryEl = document.getElementById('setupCoachSummary');
const setupCoachStepsEl = document.getElementById('setupCoachSteps');
const setupAssistantNowEl = document.getElementById('setupAssistantNow');
const setupAssistantRulesEl = document.getElementById('setupAssistantRules');
const setupStepPathEl = document.getElementById('setupStepPath');
const setupRulePrimerEl = document.getElementById('setupRulePrimer');
const setupCardShowcaseEl = document.getElementById('setupCardShowcase');
const newGameBtn = document.getElementById('newGameBtn');
const openPhoneConnectBtn = document.getElementById('openPhoneConnectBtn');
const openGameBoardBtn = document.getElementById('openGameBoardBtn');
const phoneModeToggleEl = document.getElementById('phoneModeToggle');
const phoneControlPanelEl = document.getElementById('phoneControlPanel');
const connectionListEl = document.getElementById('connectionList');
const connectionCountEl = document.getElementById('connectionCount');
const currentPlayerChip = document.getElementById('currentPlayerChip');
const roundSizeEl = document.getElementById('roundSize');
const deckCountEl = document.getElementById('deckCount');
const handAreaEl = document.getElementById('handArea');
const phonePrivacyNoticeEl = document.getElementById('phonePrivacyNotice');
const activeCardSummaryEl = document.getElementById('activeCardSummary');
const actionOptionsEl = document.getElementById('actionOptions');
const turnHintEl = document.getElementById('turnHint');
const turnCoachSummaryEl = document.getElementById('turnCoachSummary');
const turnCoachStepsEl = document.getElementById('turnCoachSteps');
const turnAssistantNowEl = document.getElementById('turnAssistantNow');
const turnAssistantRulesEl = document.getElementById('turnAssistantRules');
const turnStepPathEl = document.getElementById('turnStepPath');
const turnCardLegendEl = document.getElementById('turnCardLegend');
const turnRulePrimerEl = document.getElementById('turnRulePrimer');
const jumpToTurnBtn = document.getElementById('jumpToTurnBtn');
const jumpToPhonesBtn = document.getElementById('jumpToPhonesBtn');
const playerListEl = document.getElementById('playerList');
const logListEl = document.getElementById('logList');
const recentCardEl = document.getElementById('recentCard');
const modalEl = document.getElementById('cardModal');
const cardTypeEl = document.getElementById('cardType');
const cardTitleEl = document.getElementById('cardTitle');
const cardPromptEl = document.getElementById('cardPrompt');
const cardAssistantEl = document.getElementById('cardAssistant');
const cardOptionsEl = document.getElementById('cardOptions');
const cardFeedbackEl = document.getElementById('cardFeedback');
const cardContinueBtn = document.getElementById('cardContinueBtn');
const demoStepListEl = document.getElementById('demoStepList');
const demoProgressEl = document.getElementById('demoProgress');
const demoEyebrowEl = document.getElementById('demoEyebrow');
const demoTitleEl = document.getElementById('demoTitle');
const demoTextEl = document.getElementById('demoText');
const demoNotesEl = document.getElementById('demoNotes');
const demoHostTitleEl = document.getElementById('demoHostTitle');
const demoHostCardEl = document.getElementById('demoHostCard');
const demoPhoneOneLabelEl = document.getElementById('demoPhoneOneLabel');
const demoPhoneOneEl = document.getElementById('demoPhoneOne');
const demoPhoneTwoLabelEl = document.getElementById('demoPhoneTwoLabel');
const demoPhoneTwoEl = document.getElementById('demoPhoneTwo');
const demoPrevBtn = document.getElementById('demoPrevBtn');
const demoPlayBtn = document.getElementById('demoPlayBtn');
const demoNextBtn = document.getElementById('demoNextBtn');

const phoneTitleEl = document.getElementById('phoneTitle');
const phoneStatusTextEl = document.getElementById('phoneStatusText');
const phoneConnectPanelEl = document.getElementById('phoneConnectPanel');
const phoneConnectIntroEl = phoneConnectPanelEl?.querySelector('.panel-head p');
const phoneAnswerOutputEl = document.getElementById('phoneAnswerOutput');
const copyPhoneAnswerBtn = document.getElementById('copyPhoneAnswerBtn');
const phoneGamePanelEl = document.getElementById('phoneGamePanel');
const phonePlayerChipEl = document.getElementById('phonePlayerChip');
const phoneTurnHintEl = document.getElementById('phoneTurnHint');
const phoneAssistantSummaryEl = document.getElementById('phoneAssistantSummary');
const phoneAssistantStepsEl = document.getElementById('phoneAssistantSteps');
const phoneStepPathEl = document.getElementById('phoneStepPath');
const phoneAssistantNowEl = document.getElementById('phoneAssistantNow');
const phoneAssistantRulesEl = document.getElementById('phoneAssistantRules');
const phoneCardLegendEl = document.getElementById('phoneCardLegend');
const phoneHandAreaEl = document.getElementById('phoneHandArea');
const phoneInfluenceAreaEl = document.getElementById('phoneInfluenceArea');
const phoneActiveCardEl = document.getElementById('phoneActiveCard');
const phoneActionHintEl = document.getElementById('phoneActionHint');
const phoneActionOptionsEl = document.getElementById('phoneActionOptions');
const phoneScoreListEl = document.getElementById('phoneScoreList');

let selectedPlayerCount = 2;
let selectedGameMode = 'normal';
let phoneModeEnabled = false;
let uniqueCardId = 0;
let state = createInitialState();
let demoStepIndex = 0;
let demoTimer = null;
let currentBoardView = 'start';
let currentHostPanel = 'zug';

const hostConnections = new Map();
const phoneClient = {
  pc: null,
  channel: null,
  playerIndex: null,
  answerCode: '',
  view: null,
  pendingInfluenceCardId: null
};

const DEMO_STEPS = [
  {
    kicker: 'Schritt 1',
    title: 'Partie vorbereiten, Schnellnavigation zeigen und Handys koppeln',
    text: 'Zu Beginn legst du 2 bis 4 Spielende fest und öffnest die Ansicht gezielt über die Schnellnavigation. Für Unterricht und Präsentation ist dieser Einstieg jetzt klarer aufgebaut: Das Host-Brett bleibt öffentlich, links sitzt eine kompakte Host-Konsole mit aufklappbaren Bereichen, und die privaten Handys werden per QR-Code verbunden.',
    notes: [
      'Schnellnavigation reduziert Scrollen',
      'Linke Host-Konsole mit Aufklapp-Bereichen',
      'QR-Code oder Link öffnet die private Handy-Ansicht',
      'Namen und Farben bleiben öffentlich'
    ],
    hostTitle: 'Öffentliche Startübersicht',
    hostMetrics: [
      { label: 'Am Zug', value: 'Noch offen' },
      { label: 'Runde', value: '6' },
      { label: 'Handys', value: '0 / 2' }
    ],
    hostTabs: [
      { label: 'Spielzug' },
      { label: 'Spielstand' },
      { label: 'Letzte Karte' },
      { label: 'Protokoll' },
      { label: 'Handys', active: true }
    ],
    hostProgress: [
      { title: '1. Einladung', text: 'QR und Link werden erzeugt', state: 'current' },
      { title: '2. Handy öffnen', text: 'Spielperson scannt den QR-Code', state: 'pending' },
      { title: '3. Live verbinden', text: 'Antwort-Code fehlt noch', state: 'pending' }
    ],
    hostBoxes: [
      { title: 'Host-Brett', text: 'Spielendenzahl wählen, Handy-Modus einschalten, dann über "Spiel" direkt in die Partie springen.' },
      { title: 'Host-Konsole', text: 'Im Bereich "Handys" erzeugt das Brett pro Person einen Einladungslink mit QR-Code und wartet anschliessend auf den Antwort-Code.' }
    ],
    hostRow: [
      { label: 'Ansicht "Spiel" aktiv', tone: 'gelb' },
      { label: '🚂 Signalrot bereit', tone: 'rot' },
      { label: 'QR bereit', tone: 'blau' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Noch keine Karten. Das Handy koppelt sich zuerst mit dem Brett.',
      cards: [
        { title: 'QR-Code scannen', text: 'Die Kopplung lässt sich zu Beginn einmal gemeinsam demonstrieren und bleibt danach privat.', kind: 'quiz' },
        { title: 'Antwort-Code', text: 'Danach wandert nur noch der Verbindungs-Code zurück ans Brett.', kind: 'buff' }
      ]
    },
    phoneTwo: {
      label: 'Nebelblau',
      status: 'Auch die zweite Person erhält per Link oder QR ihre eigene, geheime Ansicht.',
      cards: [
        { title: 'Privater Spielschirm', text: 'Nach der Kopplung erscheinen nur die eigenen Karten, Einflusskarten und Optionen.', kind: 'buff' },
        { title: 'Öffentliche Runde', text: 'Runde, Deck und letzte Karte erscheinen zusätzlich in kompakter Form auf dem Handy.', kind: 'quiz' }
      ]
    }
  },
  {
    kicker: 'Schritt 2',
    title: 'Aktionskarten bleiben geheim auf dem Handy',
    text: 'Zu Beginn einer Kartenrunde zieht jede Person ihre DOG-inspirierten Aktionskarten. Über die Schnellnavigation kann die Präsentation nun direkt im Spielbereich bleiben: Das Publikum sieht am Host nur die Kerndaten der Runde und die kleinen Dampflokomotiven auf dem Brett, während die konkrete Kartenhand und ein Teil der offenen Infos auf die Handys ausgelagert sind.',
    notes: [
      'Handkarten sind privat',
      'Das Brett zeigt nur Kartenanzahl und Zugperson',
      'Öffentliche Zusatzinfos erscheinen auch auf dem Handy',
      'Start, 4 ±, Tausch, 7 und Joker bleiben erhalten'
    ],
    hostTitle: 'Brett mit verdeckter Hand',
    hostMetrics: [
      { label: 'Am Zug', value: 'Signalrot' },
      { label: 'Runde', value: '6' },
      { label: 'Handys', value: '2 / 2' }
    ],
    hostTabs: [
      { label: 'Spielzug', active: true },
      { label: 'Spielstand' },
      { label: 'Letzte Karte' },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Am Zug', text: 'Signalrot ist dran. Das Brett meldet nur: geheime Aktionshand auf dem Handy.' },
      { title: 'Öffentliche Infos', text: 'Deckgrösse, Figurenstellung und Spielstand bleiben sichtbar.' }
    ],
    hostRow: [
      { label: 'Fokus auf Spiel', tone: 'gelb' },
      { label: '4 geheime Karten', tone: 'rot' },
      { label: '🚂 Zug bei Signalrot', tone: 'rot' }
    ],
    hostPlaces: [
      { label: '🕯 Wärterhäuschen' },
      { label: '🌾 Acker an den Gleisen' },
      { label: '🌲 Kiefernforst' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Nur dieses Handy sieht die Aktionshand.',
      cards: [
        { title: '1 / 11', text: 'Start oder 11 Felder vor', kind: 'buff' },
        { title: '7', text: 'Auf mehrere Figuren aufteilen', kind: 'quiz' },
        { title: 'Tausch', text: 'Eigene Figur mit gegnerischer tauschen', kind: 'impact' },
        { title: 'Öffentliche Runde', text: 'Runde 6 · Deck 104 · Signalrot ist am Zug', kind: 'quiz' }
      ]
    },
    phoneTwo: {
      label: 'Nebelblau',
      status: 'Nebelblau sieht nur die eigene Hand, nicht Signalrots Auswahl.',
      cards: [
        { title: '13', text: 'Start oder 13 Felder vor', kind: 'buff' },
        { title: '4 ±', text: '4 vor oder 4 zurück', kind: 'quiz' },
        { title: 'Öffentliche Runde', text: 'Auch wartende Spielende sehen auf dem Handy den offenen Spielstand kompakt mit.', kind: 'buff' }
      ]
    }
  },
  {
    kicker: 'Schritt 3',
    title: 'Einflusskarten greifen gezielt in die Partie ein',
    text: 'Zusätzlich zu den normalen Aktionskarten besitzt jede Person eine kleine geheime Einfluss-Hand. Diese Karten verbessern den eigenen Verlauf oder stören gezielt andere Spielende. Im Unterricht lässt sich daran sehr gut über Strategie, Fairness und Eingriffsmöglichkeiten sprechen.',
    notes: [
      'Positive Karten für dich selbst',
      'Negative Karten gegen andere',
      'Die Folgen erscheinen in Host-Konsole und Handy-Übersicht',
      'Nur eine Einflusskarte pro eigenem Zug'
    ],
    hostTitle: 'Brett sieht nur die Folgen',
    hostMetrics: [
      { label: 'Am Zug', value: 'Signalrot' },
      { label: 'Runde', value: '6' },
      { label: 'Handys', value: '2 / 2' }
    ],
    hostTabs: [
      { label: 'Spielzug' },
      { label: 'Spielstand' },
      { label: 'Letzte Karte' },
      { label: 'Protokoll', active: true },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Öffentlicher Effekt', text: 'Das Host-Brett protokolliert Schutzverlust, Zusatzkarte oder blockierten Literaturbonus.' },
      { title: 'Keine Kartenoffenlegung', text: 'Die konkrete Einflusskarte bleibt für die Gruppe unsichtbar, wenn du das möchtest.' }
    ],
    hostRow: [
      { label: 'Signalrot: +1 Schutz', tone: 'rot' },
      { label: 'Nebelblau: Literaturbonus blockiert', tone: 'blau' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Positive Karten geben dir Polster oder Nachschub.',
      cards: [
        { title: 'Rückenwind', text: 'Sofort 1 Schutzmarke', kind: 'buff' },
        { title: 'Reservelaterne', text: 'Ziehe 1 zusätzliche Aktionskarte', kind: 'buff' },
        { title: 'Öffentliche Runde', text: 'Die offenen Werte bleiben trotzdem auf dem Handy sichtbar.', kind: 'quiz' }
      ]
    },
    phoneTwo: {
      label: 'Nebelblau',
      status: 'Negative Karten treffen eine Zielperson direkt.',
      cards: [
        { title: 'Signalstörung', text: 'Eine Person verliert 1 Schutzmarke', kind: 'impact' },
        { title: 'Schattenwurf', text: 'Nächster Literaturbonus verfällt', kind: 'impact' }
      ]
    }
  },
  {
    kicker: 'Schritt 4',
    title: 'Die Bewegung läuft über das öffentliche, neu betonte Brett',
    text: 'Die geheime Karte wird am Handy gewählt, aber die Figur selbst ziehst du weiterhin auf dem zentralen Brett. Gerade in der neuen Fassung ist dieser Moment stärker hervorgehoben: Das Host-Brett arbeitet mit thematischen Ortsfeldern, Dampflokomotiven und einem klaren Schlussbild der Charité, während Zusatzinfos platzsparend in der linken Host-Konsole liegen.',
    notes: [
      'Kartenwahl privat',
      'Figurenbewegung öffentlich',
      'Das Brett markiert legal wählbare Figuren deutlicher',
      'Die Host-Konsole nimmt dem Spielfeld keine Breite mehr weg'
    ],
    hostTitle: 'Gemeinsamer Brettmoment',
    hostMetrics: [
      { label: 'Am Zug', value: 'Signalrot' },
      { label: 'Runde', value: '6' },
      { label: 'Handys', value: '2 / 2' }
    ],
    hostTabs: [
      { label: 'Spielzug', active: true },
      { label: 'Spielstand' },
      { label: 'Letzte Karte' },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Host-Brett', text: 'Nach der Handy-Auswahl leuchten die möglichen Dampflokomotiven auf, und Ortsfelder wie Wärterhäuschen, Bahnübergang oder Schönschornstein springen optisch ins Auge.' },
      { title: 'Host-Konsole', text: 'Spielstand, letzte Karte und Protokoll bleiben links erreichbar, ohne dem Spielfeld Raum zu nehmen.' }
    ],
    hostRow: [
      { label: '🚦 Startfeld', tone: 'rot' },
      { label: '🚂 Lok markiert', tone: 'gelb' },
      { label: '🛤 Bahndamm in Reichweite', tone: 'blau' },
      { label: 'Markierung aktiv', tone: 'gruen' }
    ],
    hostPlaces: [
      { label: '🚧 Bahnübergang' },
      { label: '💨 Schönschornstein' },
      { label: '🏥 Charité' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Das Handy bestätigt nur die gewählte Karte oder Variante.',
      cards: [
        { title: 'Aktive Karte: 1 / 11', text: 'Variante 11 vor ausgewählt', kind: 'quiz' }
      ]
    },
    phoneTwo: {
      label: 'Nebelblau',
      status: 'Die andere Person wartet und sieht nur den öffentlichen Brettzug.',
      cards: [
        { title: 'Warte auf Brettzug', text: 'Für das Publikum bleibt nur der sichtbare Brettschritt relevant.', kind: 'buff' }
      ]
    }
  },
  {
    kicker: 'Schritt 5',
    title: 'Literaturfelder unterbrechen den Zug mit einer inhaltlichen Karte',
    text: 'Landet eine Figur auf einem Text-, Deutungs- oder Schicksalsfeld, öffnet sich eine Literaturkarte. Genau hier wird das Spiel zur Unterrichtsform: Text- und Deutungskarten aktivieren Vorwissen, Gespräch und Interpretation direkt im Spielzug.',
    notes: [
      'Text- und Deutungskarten als Quiz',
      'Schicksalskarten sofort wirksam',
      'Ortsname und Ortswirkung werden mit angezeigt',
      'Letzte Karte bleibt in der Host-Konsole und auf den Handys sichtbar',
      'Richtige Antwort gibt Bonus'
    ],
    hostTitle: 'Literaturmoment im Zentrum',
    hostMetrics: [
      { label: 'Am Zug', value: 'Signalrot' },
      { label: 'Runde', value: '6' },
      { label: 'Handys', value: '2 / 2' }
    ],
    hostTabs: [
      { label: 'Spielzug' },
      { label: 'Spielstand' },
      { label: 'Letzte Karte', active: true },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Öffentliche Karte', text: 'Die Gruppe sieht die Frage, den Ortsnamen und die Erklärung gemeinsam am Host.' },
      { title: 'Belohnung oder Blockade', text: 'Schutz, Erkenntnis, Ortsbonus oder Bonusfeld werden sofort sichtbar verbucht.' }
    ],
    hostRow: [
      { label: '📖 Textkarte · Acker an den Gleisen', tone: 'gelb' },
      { label: 'Erklärung eingeblendet', tone: 'gruen' },
      { label: 'Bonus sichtbar', tone: 'rot' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Die Spielfigur erreicht ein Literaturfeld.',
      cards: [
        { title: 'Textkarte · Wärterhäuschen', text: 'Warum heiratet Thiel nach Minnas Tod erneut? Danach kommt zusätzlich der Ortsbonus des Feldes ins Spiel.', kind: 'quiz' },
        { title: 'Letzte Karte', text: 'Die zuletzt gelöste Literaturkarte bleibt auch auf dem Handy als offene Info sichtbar.', kind: 'buff' }
      ]
    },
    phoneTwo: {
      label: 'Nebelblau',
      status: 'Negative Einflusskarte kann den kommenden Bonus abschwächen.',
      cards: [
        { title: 'Schattenwurf aktiv', text: 'Nächster Literaturbonus wird aufgehoben', kind: 'impact' }
      ]
    }
  },
  {
    kicker: 'Schritt 6',
    title: 'So endet eine Runde und schliesslich die ganze Partie',
    text: 'Nach dem ausgespielten Zug geht die Runde zur nächsten Person weiter. Sobald alle Hände leer sind, wird neu ausgeteilt. Gewonnen hat, wer alle vier Figuren ins Schlussbild der Charité bringt. Für eine Einführung fasst dieser letzte Schritt noch einmal den ganzen Zyklus zusammen: Navigation, QR-Kopplung, geheime Kartenwahl, öffentlicher Brettzug, Host-Konsole und literarische Auswertung.',
    notes: [
      'Rundenfolge 6-5-4-3-2-1 bleibt bestehen',
      'Neue Kartenrunde nach leerer Hand',
      'Spielstand kann aus der Host-Konsole oder vom Handy verfolgt werden',
      'Sieg mit vier Figuren in der Charité'
    ],
    hostTitle: 'Kompletter Spielzyklus',
    hostMetrics: [
      { label: 'Am Zug', value: 'Nächste Person' },
      { label: 'Runde', value: '5' },
      { label: 'Handys', value: '2 / 2' }
    ],
    hostTabs: [
      { label: 'Spielzug' },
      { label: 'Spielstand', active: true },
      { label: 'Letzte Karte' },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Rundenwechsel', text: 'Nächste Person wird aktiv, neue geheime Auswahl beginnt.' },
      { title: 'Siegbedingung', text: 'Vier eigene Figuren im Schlussbild der Charité beenden die Partie.' }
    ],
    hostRow: [
      { label: 'Neue Runde 5 Karten', tone: 'gelb' },
      { label: '🏥 Charité 4/4', tone: 'rot' }
    ],
    hostPlaces: [
      { label: '🚂 alle Loks angekommen' },
      { label: '🏥 Schlussbild Charité' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Neue Kartenrunde beginnt automatisch.',
      cards: [
        { title: 'Neue Hand', text: 'Frische Aktions- und Einflusskarten für die nächste Unterrichtsphase', kind: 'buff' },
        { title: 'Öffentliche Runde', text: 'Auch die nächste Runde bleibt auf dem Handy mit offenen Werten nachvollziehbar.', kind: 'quiz' }
      ]
    },
    phoneTwo: {
      label: 'Nebelblau',
      status: 'Alle starten wieder mit verdeckten Optionen in den nächsten Zug.',
      cards: [
        { title: 'Geheimer Neustart', text: 'Jede Person plant wieder privat weiter', kind: 'quiz' }
      ]
    }
  }
];

const DEMO_ROUTE_STOPS = [
  { id: 'depot-rot', label: 'Depot', icon: '🚂', col: 1, row: 1 },
  { id: 'waerterhaus', label: 'Wärterh.', icon: '🕯', col: 2, row: 1 },
  { id: 'acker', label: 'Acker', icon: '🌾', col: 3, row: 1 },
  { id: 'bahnuebergang', label: 'Übergang', icon: '🚧', col: 4, row: 2 },
  { id: 'forst', label: 'Forst', icon: '🌲', col: 4, row: 3 },
  { id: 'charite', label: 'Charité', icon: '🏥', col: 3, row: 4 },
  { id: 'bahndamm', label: 'Bahndamm', icon: '🛤', col: 2, row: 4 },
  { id: 'schoenschornstein', label: 'Schönsch.', icon: '💨', col: 1, row: 3 },
  { id: 'neu-zittau', label: 'Neu-Zittau', icon: '⛪', col: 1, row: 2 }
];

function getDemoSceneForStep(stepIndex) {
  switch (stepIndex) {
    case 0:
      return {
        caption: 'Die Demo zeigt Host-Brett, Kartenbereich und beide Handys gleichzeitig.',
        activeStops: ['depot-rot', 'neu-zittau'],
        tokens: [
          { tone: 'rot', number: '1', at: 'depot-rot', moving: true },
          { tone: 'blau', number: '1', at: 'neu-zittau' }
        ],
        cards: [
          { kind: 'system', title: 'QR-Einladung', text: 'Signalrot scannt den Einladungslink.' },
          { kind: 'system', title: 'Verbindung', text: 'Beide Handys koppeln sich mit dem Host.' }
        ]
      };
    case 1:
      return {
        caption: 'Die Karten liegen privat auf den Handys, das Brett zeigt nur den öffentlichen Spielstand.',
        activeStops: ['waerterhaus', 'acker', 'forst'],
        tokens: [
          { tone: 'rot', number: '1', at: 'waerterhaus', moving: true },
          { tone: 'blau', number: '1', at: 'forst' }
        ],
        cards: [
          { kind: 'action', title: 'Geheime Aktionshand', text: '1/11, 7, Tausch und weitere Karten liegen nur auf dem Handy.' },
          { kind: 'system', title: 'Öffentlich sichtbar', text: 'Am Zug, Runde, Brett und Lokpositionen bleiben öffentlich.' }
        ]
      };
    case 2:
      return {
        caption: 'Einflusskarten verändern die Runde, ohne die ganze private Hand offenzulegen.',
        activeStops: ['acker', 'bahndamm'],
        tokens: [
          { tone: 'rot', number: '1', at: 'acker' },
          { tone: 'blau', number: '1', at: 'bahndamm', moving: true }
        ],
        cards: [
          { kind: 'impact', title: 'Rückenwind', text: 'Signalrot erhält 1 Schutzmarke.' },
          { kind: 'impact', title: 'Schattenwurf', text: 'Nebelblaus nächster Literaturbonus wird blockiert.' }
        ]
      };
    case 3:
      return {
        caption: 'Die Lok fährt öffentlich über das Brett, während die Kartenentscheidung privat bleibt.',
        activeStops: ['bahnuebergang', 'schoenschornstein', 'charite'],
        tokens: [
          { tone: 'rot', number: '1', at: 'bahnuebergang', moving: true },
          { tone: 'blau', number: '1', at: 'schoenschornstein' }
        ],
        cards: [
          { kind: 'action', title: 'Aktive Karte · 1 / 11', text: 'Variante 11 vor wurde auf dem Handy gewählt.' },
          { kind: 'system', title: 'Zugziel', text: 'Die markierte Dampflokomotive fährt Richtung Bahnübergang.' }
        ]
      };
    case 4:
      return {
        caption: 'Auf Literaturfeldern erscheinen Frage, Ort und Belohnung gleichzeitig im Host.',
        activeStops: ['waerterhaus', 'acker'],
        tokens: [
          { tone: 'rot', number: '1', at: 'waerterhaus', moving: true },
          { tone: 'blau', number: '1', at: 'forst' }
        ],
        cards: [
          { kind: 'literature', title: 'Textkarte · Wärterhäuschen', text: 'Die Gruppe sieht Frage, Erklärung und Lösung gemeinsam.' },
          { kind: 'reward', title: 'Ortsbonus', text: 'Wärterhäuschen: +1 Schutzmarke' }
        ]
      };
    case 5:
    default:
      return {
        caption: 'Am Ende wird der ganze Kreislauf sichtbar: neue Austeilrunde, Fortschritt und Sieg in der Charité.',
        activeStops: ['charite', 'schoenschornstein'],
        tokens: [
          { tone: 'rot', number: '4', at: 'charite', moving: true },
          { tone: 'blau', number: '2', at: 'schoenschornstein' }
        ],
        cards: [
          { kind: 'reward', title: 'Charité', text: 'Vier rote Dampflokomotiven erreichen das Schlussbild.' },
          { kind: 'system', title: 'Neue Runde', text: 'Danach beginnt die nächste Austeilrunde mit weniger Karten.' }
        ]
      };
  }
}

function createInitialState() {
  const mode = getModeConfig(selectedGameMode);
  return {
    modeKey: mode.key,
    targetFinishedPieces: mode.targetFinishedPieces,
    dealCycle: [...mode.dealCycle],
    dealCycleIndex: 0,
    players: [],
    currentPlayer: 0,
    currentRound: 0,
    activeDealSize: mode.dealCycle[0],
    deck: [],
    discard: [],
    influenceDeck: [],
    influenceDiscard: [],
    playableCardIds: [],
    selectedCardId: null,
    actionContext: null,
    pendingLiterature: null,
    recentCard: null,
    log: [],
    phoneMode: phoneModeEnabled,
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

function buildInfluenceDeck() {
  const deck = [];
  INFLUENCE_LIBRARY.forEach((template) => {
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

function drawActionCard() {
  if (state.deck.length === 0) {
    state.deck = shuffle(state.discard);
    state.discard = [];
  }
  return state.deck.pop() || null;
}

function drawInfluenceCard() {
  if (state.influenceDeck.length === 0) {
    state.influenceDeck = shuffle(state.influenceDiscard);
    state.influenceDiscard = [];
  }
  return state.influenceDeck.pop() || null;
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
    influenceUsedThisTurn: false,
    deckIndices: { text: 0, deutung: 0, schicksal: 0 },
    effects: { blockedLiteratureRewards: 0 },
    literatureDecks: {
      text: cloneLiteratureDeck('text'),
      deutung: cloneLiteratureDeck('deutung'),
      schicksal: cloneLiteratureDeck('schicksal')
    },
    hand: [],
    influenceHand: [],
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
  renderSetupCoach();
}

function renderGameModePicker() {
  if (!gameModePickerEl || !gameModeDescriptionEl) return;
  const mode = getModeConfig(selectedGameMode);
  [...gameModePickerEl.querySelectorAll('[data-mode]')].forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === selectedGameMode);
  });
  gameModeDescriptionEl.innerHTML = `<strong>${mode.title}</strong><p>${mode.description}</p>`;
  renderSetupCoach();
}

function buildCellMeta() {
  const meta = new Map();

  TRACK_COORDS.forEach((coord, index) => {
    const preset = PLAYER_PRESETS.find((entry) => entry.startIndex === index);
    const specialMeta = SPECIAL_SPACES.get(index) || null;
    meta.set(coordKey(coord.x, coord.y), {
      type: 'track',
      index,
      special: specialMeta?.kind || null,
      startTone: preset ? preset.tone : null,
      place: specialMeta?.place || null,
      fieldIcon: specialMeta?.icon || null,
      fieldEffect: specialMeta?.fieldEffect || null
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
  state.log = state.log.slice(0, 12);
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
  const fieldMeta = SPECIAL_SPACES.get(pieceState.absoluteIndex) || null;
  if (fieldMeta?.place) {
    addLog(`${player.name} landet bei ${fieldMeta.place}.`);
  }
  state.pendingLiterature = {
    playerIndex,
    pieceId,
    type,
    card,
    fieldMeta
  };
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
    addLog(`${player.name} bringt eine Figur ins Schlussbild der Charité.`);
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
  return state.players[playerIndex].pieces.filter((piece) => {
    const pieceState = getPieceState(state.players[playerIndex], piece);
    return pieceState.zone === 'track' && piece.steps !== 0;
  });
}

function getSwapTargets(playerIndex) {
  const result = [];
  state.players.forEach((player, otherIndex) => {
    if (otherIndex === playerIndex) return;
    player.pieces.forEach((piece) => {
      const pieceState = getPieceState(player, piece);
      if (pieceState.zone !== 'track' || piece.steps === 0) return;
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
  if (card.key === '1-11') {
    return [
      { label: 'Start', description: 'Figur aufs Startfeld', action: { kind: 'start' } },
      { label: '1 vor', description: 'Eine Figur 1 Feld vor', action: { kind: 'move', steps: 1 } },
      { label: '11 vor', description: 'Eine Figur 11 Felder vor', action: { kind: 'move', steps: 11 } }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  if (card.key === '13') {
    return [
      { label: 'Start', description: 'Figur aufs Startfeld', action: { kind: 'start' } },
      { label: '13 vor', description: 'Eine Figur 13 Felder vor', action: { kind: 'move', steps: 13 } }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  if (card.key === '4pm') {
    return [
      { label: '4 vor', description: 'Eine Figur 4 Felder vor', action: { kind: 'move', steps: 4 } },
      { label: '4 zurück', description: 'Eine Figur 4 Felder zurück', action: { kind: 'move', steps: -4 } }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  if (card.kind === 'joker') {
    return [
      { label: 'Joker: Start', description: 'wie Startkarte', action: { kind: 'start' } },
      { label: 'Joker: 1', description: '1 Feld vor', action: { kind: 'move', steps: 1 } },
      { label: 'Joker: 11', description: '11 Felder vor', action: { kind: 'move', steps: 11 } },
      { label: 'Joker: 13', description: '13 Felder vor', action: { kind: 'move', steps: 13 } },
      { label: 'Joker: 4 vor', description: '4 Felder vor', action: { kind: 'move', steps: 4 } },
      { label: 'Joker: 4 zurück', description: '4 Felder zurück', action: { kind: 'move', steps: -4 } },
      { label: 'Joker: 7', description: '7 aufteilen', action: { kind: 'split' } },
      { label: 'Joker: Tausch', description: 'Positionen tauschen', action: { kind: 'swap' } },
      { label: 'Joker: 12', description: '12 Felder vor', action: { kind: 'move', steps: 12 } }
    ].filter((option) => isVariantPlayable(playerIndex, option.action));
  }

  return [];
}

function isVariantPlayable(playerIndex, action) {
  const player = state.players[playerIndex];
  if (!player) return false;

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

function computePlayableCardIds(playerIndex) {
  const player = state.players[playerIndex];
  return player.hand
    .filter((card) => getResolvedVariantsForCard(playerIndex, card).length > 0)
    .map((card) => card.uid);
}

function refillInfluenceHands() {
  state.players.forEach((player) => {
    while (player.influenceHand.length < MAX_INFLUENCE_HAND) {
      const card = drawInfluenceCard();
      if (!card) break;
      player.influenceHand.push(card);
    }
  });
}

function dealNextRound() {
  const dealSize = state.dealCycle[state.dealCycleIndex];
  state.players.forEach((player) => {
    player.outForRound = false;
    player.hand = [];
    player.influenceUsedThisTurn = false;
  });

  for (let draw = 0; draw < dealSize; draw += 1) {
    state.players.forEach((player) => {
      const card = drawActionCard();
      if (card) player.hand.push(card);
    });
  }

  refillInfluenceHands();
  state.currentRound += 1;
  state.activeDealSize = dealSize;
  addLog(`Neue Kartenrunde ${state.currentRound}: ${dealSize} Aktionskarten pro Person.`);
  state.dealCycleIndex = (state.dealCycleIndex + 1) % state.dealCycle.length;
}

function getSelectedCard() {
  const player = getCurrentPlayer();
  return player ? player.hand.find((card) => card.uid === state.selectedCardId) || null : null;
}

function usesPhoneTurnControl(playerIndex = state.currentPlayer) {
  return state.phoneMode && isPhoneConnected(playerIndex);
}

function setTurnHintForCurrentPlayer(defaultText, phoneText = defaultText) {
  turnHintEl.textContent = usesPhoneTurnControl() ? phoneText : defaultText;
}

function renderAssistantSteps(target, steps) {
  if (!target) return;
  target.innerHTML = '';
  steps.forEach((step) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${step.title}</strong><span>${step.text}</span>`;
    target.appendChild(li);
  });
}

function renderAssistantFacts(target, items) {
  if (!target) return;
  target.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'assistant-fact';
    card.innerHTML = `<strong>${item.label}</strong><span>${item.text}</span>`;
    target.appendChild(card);
  });
}

function renderStepPath(target, steps) {
  if (!target) return;
  target.innerHTML = '';
  steps.forEach((step, index) => {
    const article = document.createElement('article');
    article.className = `step-path-card ${step.state || 'pending'}`;
    article.innerHTML = `
      <span class="step-path-index">${index + 1}</span>
      <div class="step-path-copy">
        <strong>${step.title}</strong>
        <span>${step.text}</span>
      </div>
    `;
    target.appendChild(article);
  });
}

function getCompactCardShowcase() {
  return [
    CARD_SHOWCASE[0],
    CARD_SHOWCASE[2],
    CARD_SHOWCASE[3],
    CARD_SHOWCASE[4],
    CARD_SHOWCASE[6],
    CARD_SHOWCASE[8]
  ];
}

function renderCardShowcase(target, cards) {
  if (!target) return;
  target.innerHTML = '';
  cards.forEach((card) => {
    const article = document.createElement('article');
    article.className = `legend-card ${card.kind}`;
    article.innerHTML = `
      <p class="legend-card-kicker">${card.kind === 'action'
        ? 'Aktionskarte'
        : card.kind === 'influence'
          ? 'Einflusskarte'
          : 'Literaturkarte'}</p>
      <strong>${card.title}</strong>
      <span>${card.text}</span>
      <small>${card.detail}</small>
    `;
    target.appendChild(article);
  });
}

function getRulePrimerCards() {
  const player = state.players?.[state.currentPlayer];
  return RULE_PRIMER.map((rule) => {
    if (rule.title === 'Wer spielt wann?' && player) {
      return {
        ...rule,
        text: `${player.name} ist gerade am Zug, wenn sein Name oben bei "Am Zug" steht. Grundsätzlich klickt immer nur die aktive Person.`
      };
    }
    if (rule.title === 'Welche Karte spielt man?' && player) {
      return {
        ...rule,
        text: `${player.name} wählt in seinem Zug genau 1 helle Aktionskarte. Eine Einflusskarte ist nur zusätzlich und nur dann erlaubt, wenn sie gerade spielbar ist.`
      };
    }
    return rule;
  });
}

function getSetupStepPath() {
  return [
    { title: 'Runde wählen', text: 'Personenzahl und Modus festlegen.', state: 'done' },
    { title: 'Namen prüfen', text: 'Kontrollieren, wer mitspielt.', state: 'done' },
    { title: 'Start klicken', text: 'Partie mit dem grossen Button starten.', state: 'current' },
    { title: phoneModeEnabled ? 'Handys verbinden' : 'Zum Brett gehen', text: phoneModeEnabled ? 'Danach die privaten Handy-Schirme koppeln.' : 'Danach direkt die erste Karte spielen.', state: 'pending' }
  ];
}

function getTurnStepPath() {
  const stage = state.actionContext?.stage || '';
  const path = [
    { title: 'Karte wählen', text: 'Eine helle Aktionskarte auswählen.', state: 'pending' },
    { title: 'Bedeutung klären', text: 'Nur bei Karten mit mehreren Möglichkeiten.', state: 'pending' },
    { title: 'Lok oder Ziel wählen', text: 'Passende Lok oder Zielperson anklicken.', state: 'pending' },
    { title: 'Zug ausführen', text: 'Bewegung, Tausch oder Effekt läuft.', state: 'pending' },
    { title: 'Literaturkarte lösen', text: 'Nur wenn ein Sonderfeld getroffen wurde.', state: 'pending' },
    { title: 'Nächste Person', text: 'Zug endet, nächste Person ist dran.', state: 'pending' }
  ];

  if (state.gameOver) {
    path.forEach((step) => { step.state = 'done'; });
    return path;
  }

  if (state.pendingLiterature) {
    path[0].state = 'done';
    path[1].state = 'done';
    path[2].state = 'done';
    path[3].state = 'done';
    path[4].state = 'current';
    return path;
  }

  if (!state.selectedCardId && !state.actionContext) {
    path[0].state = 'current';
    return path;
  }

  path[0].state = 'done';

  if (stage === 'choose-variant') {
    path[1].state = 'current';
    return path;
  }

  path[1].state = 'done';

  if (stage === 'pick-piece' || stage === 'pick-split-piece' || stage === 'pick-split-amount' || stage === 'pick-swap-source' || stage === 'pick-swap-target') {
    path[2].state = 'current';
    return path;
  }

  if (state.selectedCardId) {
    path[2].state = 'done';
    path[3].state = 'current';
    return path;
  }

  return path;
}

function getPhoneStepPath(view) {
  const path = [
    { title: 'Karte wählen', text: 'Eine helle Karte auf dem Handy antippen.', state: 'pending' },
    { title: 'Bedeutung klären', text: 'Falls die Karte mehrere Möglichkeiten hat.', state: 'pending' },
    { title: 'Lok oder Ziel wählen', text: 'Lok oder Zielperson auf dem Handy auswählen.', state: 'pending' },
    { title: 'Zug läuft', text: 'Das Spiel verarbeitet den Schritt.', state: 'pending' },
    { title: 'Literaturkarte', text: 'Nur bei einem Sonderfeld.', state: 'pending' },
    { title: 'Warten / nächste Person', text: 'Nach dem Zug ist die nächste Person dran.', state: 'pending' }
  ];

  if (!view) {
    path[0].title = 'Link öffnen';
    path[0].text = 'Persönlichen Link oder QR-Code öffnen.';
    path[0].state = 'current';
    path[1].title = 'Antwort senden';
    path[1].text = 'Antwort-Code ans Brett geben.';
    path[2].title = 'Verbindung steht';
    path[2].text = 'Erst dann erscheinen deine Karten.';
    return path.slice(0, 3);
  }

  if (!view.isCurrentTurn) {
    path[5].state = 'current';
    return path;
  }

  const hasCardChoice = view.hand.some((card) => card.playable) || view.influenceHand.some((card) => card.usable);
  if (hasCardChoice) {
    path[0].state = 'current';
  }

  if (view.actionOptions.length > 0 || view.splitOptions.length > 0) {
    path[0].state = 'done';
    path[1].state = 'current';
  }

  if (view.pieceChoices.length > 0 || phoneClient.pendingInfluenceCardId) {
    path[0].state = 'done';
    path[1].state = 'done';
    path[2].state = 'current';
  }

  if (view.activeCard && view.pieceChoices.length === 0 && view.actionOptions.length === 0 && view.splitOptions.length === 0 && !phoneClient.pendingInfluenceCardId) {
    path[0].state = 'done';
    path[1].state = 'done';
    path[2].state = 'done';
    path[3].state = 'current';
  }

  return path;
}

function renderRulePrimer(target, rules) {
  if (!target) return;
  target.innerHTML = '';
  rules.forEach((rule) => {
    const article = document.createElement('article');
    article.className = 'rule-primer-card';
    article.innerHTML = `<strong>${rule.title}</strong><span>${rule.text}</span>`;
    target.appendChild(article);
  });
}

function getActionCardGuide(card) {
  if (!card) return 'Wähle zuerst eine helle Karte. Danach sagt dir der Assistent sofort, was kommt.';
  switch (card.label) {
    case '1 / 11':
      return 'Diese Karte ist eine Startkarte. Nach dem Klick entscheidest du: Start, 1 Feld oder 11 Felder.';
    case '13':
      return 'Mit dieser Karte startest du eine Lok aus dem Depot oder ziehst 13 Felder.';
    case '4 ±':
      return 'Mit dieser Karte wählst du erst nach dem Klick: 4 vor oder 4 zurück.';
    case '7':
      return 'Die 7 wird nicht auf einmal gespielt. Du verteilst sie Schritt für Schritt auf eigene Loks.';
    case 'Tausch':
      return 'Beim Tausch klickst du zuerst deine Lok und danach die gegnerische Lok.';
    case '?':
      return 'Der Joker kopiert eine wichtige Karte. Nach dem Klick musst du zuerst festlegen, was er heute sein soll.';
    default:
      return `Mit ${card.label} ziehst du danach genau ${card.label} Felder mit einer eigenen Lok.`;
  }
}

function getActionCardStatusText(card, playable) {
  if (playable) {
    return `Jetzt spielbar. ${getActionCardGuide(card)}`;
  }
  return 'Gerade gesperrt. Diese Karte passt in diesem Moment nicht zu einer legalen Lok oder einem erlaubten Zug.';
}

function getInfluenceCardGuide(card) {
  switch (card.label) {
    case 'Rückenwind':
      return 'Gibt dir sofort Schutz. Du brauchst kein Ziel.';
    case 'Lektüreschub':
      return 'Gibt dir sofort 1 Erkenntnispunkt.';
    case 'Reservelaterne':
      return 'Zieht dir sofort 1 zusätzliche Aktionskarte.';
    case 'Signalstörung':
      return 'Danach musst du eine Zielperson auswählen.';
    case 'Streckensperre':
      return 'Danach wählst du eine Zielperson. Sie verliert zufällig eine Aktionskarte.';
    case 'Schattenwurf':
      return 'Danach wählst du eine Zielperson. Ihr nächster Literaturbonus verfällt.';
    default:
      return card.summary;
  }
}

function getCurrentBoardActionDetails(viaPhone) {
  if (!state.players.length) {
    return {
      next: 'Wähle oben Spielendezahl, Modus und Namen. Danach auf "Partie jetzt starten" tippen.',
      after: 'Sofort danach beginnt Runde 1.',
      rule: 'Vor dem Start klickt noch niemand auf Karten oder Lokomotiven.'
    };
  }

  const player = getCurrentPlayer();
  const deviceText = viaPhone ? `auf ${player.name}s Handy` : 'am Brett';

  if (state.pendingLiterature) {
    return {
      next: `${player.name} liest jetzt die offene Literaturkarte ${deviceText} und tippt genau eine Antwort an.`,
      after: 'Danach zeigt das Spiel sofort, ob es einen Bonus gibt.',
      rule: 'Bei Text- und Deutungskarten gibt nur die aktive Person die Antwort. Schicksalskarten wirken sofort.'
    };
  }

  if (!state.selectedCardId && !state.actionContext) {
    return {
      next: viaPhone
        ? `${player.name} tippt jetzt auf dem Handy genau eine helle Aktionskarte oder eine erlaubte Einflusskarte an.`
        : `${player.name} tippt jetzt im Bereich Handkarten genau eine helle Karte an.`,
      after: 'Danach erscheinen Varianten, markierte Loks oder Zielpersonen.',
      rule: 'Helle Karten sind spielbar. Ausgegraute Karten darfst du in diesem Zug nicht benutzen.'
    };
  }

  if (state.actionContext?.stage === 'choose-variant') {
    return {
      next: viaPhone
        ? `${player.name} tippt jetzt auf dem Handy genau eine Kartenvariante an.`
        : `${player.name} tippt jetzt unter "Mögliche Aktionen" genau eine Variante an.`,
      after: 'Erst danach darf eine Lok oder eine Zielperson gewählt werden.',
      rule: 'Bei 1/11, 13, 4 ± oder Joker muss zuerst die Bedeutung der Karte festgelegt werden.'
    };
  }

  if (state.actionContext?.stage === 'pick-piece') {
    return {
      next: viaPhone
        ? `${player.name} tippt jetzt auf dem Handy genau eine erlaubte Lok an.`
        : `${player.name} tippt jetzt auf dem Brett genau eine markierte Lok an.`,
      after: 'Wenn die Lok auf einem Literaturfeld landet, öffnet sich sofort eine Karte.',
      rule: state.actionContext.actionKind === 'start'
        ? 'Startkarten holen eine Lok aus dem Depot auf das Startfeld.'
        : 'Nur markierte Loks dürfen mit der gewählten Karte bewegt werden.'
    };
  }

  if (state.actionContext?.stage === 'pick-split-piece') {
    return {
      next: `${player.name} wählt jetzt die nächste Lok für einen Teil der 7.`,
      after: 'Danach fragt das Spiel sofort nach der Feldzahl für diese Lok.',
      rule: 'Die 7 darf auf mehrere eigene Loks aufgeteilt werden. Gegnerische Loks sind tabu.'
    };
  }

  if (state.actionContext?.stage === 'pick-split-amount') {
    return {
      next: `${player.name} tippt jetzt die genaue Feldzahl für die gewählte Lok an.`,
      after: 'Wenn noch Rest bleibt, folgt sofort die nächste Lok.',
      rule: `Gerade bleiben noch ${state.actionContext.remaining} Felder der 7 zu verteilen.`
    };
  }

  if (state.actionContext?.stage === 'pick-swap-source') {
    return {
      next: `${player.name} wählt jetzt zuerst die eigene Tauschlok.`,
      after: 'Erst danach darf die gegnerische Ziellok gewählt werden.',
      rule: 'Ein Tausch braucht immer zwei Klicks: zuerst eigene Lok, dann gegnerische Lok.'
    };
  }

  if (state.actionContext?.stage === 'pick-swap-target') {
    return {
      next: `${player.name} wählt jetzt die gegnerische Ziellok für den Tausch.`,
      after: 'Nach diesem Klick wird der Tausch sofort ausgeführt.',
      rule: 'Nur gegnerische, legal markierte Loks sind als Tauschziel erlaubt.'
    };
  }

  return {
    next: `${player.name} liest den Hinweis und führt genau den nächsten Schritt aus.`,
    after: 'Nach jedem Klick aktualisiert der Assistent die Anweisung.',
    rule: 'Immer nur einen Klick machen und danach neu lesen.'
  };
}

function describeTurnAssistantFacts() {
  const player = getCurrentPlayer();
  if (!player) return { callout: [], rules: [] };
  const viaPhone = usesPhoneTurnControl();
  const details = getCurrentBoardActionDetails(viaPhone);
  return {
    callout: [
      { label: 'Wer klickt jetzt?', text: `${player.name} ist am Zug. Alle anderen warten.` },
      { label: 'Nächster Klick', text: details.next },
      { label: 'Danach', text: details.after }
    ],
    rules: [
      { label: 'Wichtig', text: details.rule },
      { label: 'Merke dir', text: viaPhone ? 'Im Handy-Modus werden Karten, Varianten und Lokwahl privat auf dem Handy gesteuert.' : 'Am Brett-Modus werden Karte und Lok direkt hier am gemeinsamen Bildschirm gewählt.' },
      { label: 'Stopp-Regel', text: 'Nach jedem einzelnen Klick kurz anhalten und den neuen Hinweis lesen, nicht mehrfach antippen.' }
    ]
  };
}

function describeSetupAssistantFacts() {
  return {
    callout: [
      { label: 'Wer startet?', text: 'Eine Person bedient zuerst das gemeinsame Brett und gibt das Startsignal.' },
      { label: 'Erster Klick', text: phoneModeEnabled ? 'Partie starten, danach sofort die Handy-Verbindungen öffnen.' : 'Partie starten, danach direkt zum Spielbrett wechseln.' },
      { label: 'Was sehen alle?', text: 'Die Beispielkarten unten zeigen schon vor dem Start, welche Kartentypen im Spiel vorkommen.' }
    ],
    rules: [
      { label: 'Grundregel 1', text: 'In jedem Zug spielt genau eine Person genau eine Aktionskarte.' },
      { label: 'Grundregel 2', text: 'Nur die Person am Zug klickt. Alle anderen schauen zu oder warten auf ihr Handy.' },
      { label: 'Grundregel 3', text: 'Wenn eine Lok auf einem Literaturfeld landet, stoppt der Zug kurz für eine Karte.' }
    ]
  };
}

function describePhoneAssistantFacts(view) {
  if (!view) {
    return {
      callout: [
        { label: 'Was jetzt?', text: 'Zuerst den persönlichen Link oder QR-Code vom Brett öffnen.' },
        { label: 'Dann', text: 'Den Antwort-Code zurück ans Brett geben oder die automatische Verbindung abwarten.' },
        { label: 'Ergebnis', text: 'Erst danach erscheinen hier deine privaten Karten.' }
      ],
      rules: [
        { label: 'Wichtig', text: 'Dieses Handy gehört immer genau einer Spielperson.' },
        { label: 'Privat', text: 'Aktionskarten und Einflusskarten bleiben nur hier sichtbar.' },
        { label: 'Noch nicht tippen', text: 'Vor der Verbindung bringt Tippen noch nichts.' }
      ]
    };
  }

  if (!view.isCurrentTurn) {
    return {
      callout: [
        { label: 'Wer klickt jetzt?', text: `${view.turnOwner} ist am Zug. Du wartest.` },
        { label: 'Was du tust', text: 'Nichts drücken und dein Handy privat halten.' },
        { label: 'Wann du wieder dran bist', text: 'Sobald dein Name oben erscheint, darfst du wieder tippen.' }
      ],
      rules: [
        { label: 'Wichtig', text: 'Nicht aus Neugier Karten antippen, wenn du nicht am Zug bist.' },
        { label: 'Privat', text: 'Deine Karten bleiben nur auf deinem Handy sichtbar.' },
        { label: 'Vorbereitung', text: 'Du kannst in Ruhe deine Karten lesen, aber noch nichts auslösen.' }
      ]
    };
  }

  const assistant = describePhoneAssistant(view);
  return {
    callout: [
      { label: 'Wer klickt jetzt?', text: 'Du bist am Zug.' },
      { label: 'Nächster Klick', text: assistant.steps[0]?.text || 'Lies den nächsten Hinweis.' },
      { label: 'Danach', text: assistant.steps[1]?.text || 'Danach erscheint sofort der nächste Schritt.' }
    ],
    rules: [
      { label: 'Wichtig', text: 'Immer nur einmal tippen und kurz warten, bis der nächste Schritt erscheint.' },
      { label: 'Helle Karten', text: 'Helle Karten sind spielbar. Ausgegraute Karten gehen jetzt nicht.' },
      { label: 'Merke dir', text: 'Wenn eine Karte mehrere Bedeutungen hat, fragt dich das Handy danach automatisch weiter.' }
    ]
  };
}

function getSetupCoachData() {
  const modeLabel = getModeConfig(selectedGameMode).label;
  const summary = phoneModeEnabled
    ? `Handy-Modus aktiv: Starte jetzt die Partie und verbinde danach die ${selectedPlayerCount} Handy-Schirme nacheinander.`
    : `Brett-Modus aktiv: Starte jetzt die Partie und spiele danach direkt am gemeinsamen Brett.`;

  const steps = [
    {
      title: '1. Runde festlegen',
      text: `${selectedPlayerCount} Spielende, Modus ${modeLabel}.`
    },
    {
      title: '2. Namen prüfen',
      text: 'Kontrolliere kurz alle Namen, damit später klar ist, wer wann am Zug ist.'
    },
    phoneModeEnabled
      ? {
        title: '3. Startsignal geben',
        text: 'Tippe auf "Partie jetzt starten". Danach führt dich der Assistent direkt zu den Handy-Verbindungen.'
      }
      : {
        title: '3. Startsignal geben',
        text: 'Tippe auf "Partie jetzt starten". Danach beginnt die Runde direkt am Brett.'
      }
  ];

  return { summary, steps };
}

function describeTurnCoach() {
  if (!state.players.length) {
    return {
      summary: 'Lege zuerst eine Partie an.',
      steps: [
        { title: 'Vorbereitung öffnen', text: 'Lege Spielendenzahl, Modus und Namen fest.' },
        { title: 'Partie starten', text: 'Gib das Startsignal mit dem grossen Startbutton.' }
      ]
    };
  }

  if (state.gameOver) {
    const winner = getCurrentPlayer();
    return {
      summary: `${winner?.name || 'Eine Spielperson'} hat gewonnen.`,
      steps: [
        { title: 'Partie beenden', text: 'Lass das Endbild kurz stehen und besprecht die Runde.' },
        { title: 'Neu starten', text: 'Für eine neue Runde wieder zur Vorbereitung wechseln.' }
      ]
    };
  }

  const player = getCurrentPlayer();
  const viaPhone = usesPhoneTurnControl();
  const locationText = viaPhone ? `auf dem Handy von ${player.name}` : 'am Brett';

  if (state.pendingLiterature) {
    return {
      summary: `Jetzt löst ${player.name} ${locationText} eine Literaturkarte.`,
      steps: [
        { title: 'Karte lesen', text: 'Lest die Karte laut oder still vollständig.' },
        { title: 'Antwort wählen', text: 'Tippt genau eine Antwort an und wartet auf das Feedback.' },
        { title: 'Weiter', text: 'Schliesst danach die Karte und spielt erst dann weiter.' }
      ]
    };
  }

  if (!state.selectedCardId && !state.actionContext) {
    return {
      summary: `Jetzt spielt ${player.name} ${locationText}. Alle anderen warten.`,
      steps: [
        { title: 'Karte wählen', text: viaPhone ? 'Wähle auf dem Handy genau eine spielbare Aktions- oder Einflusskarte.' : 'Wähle am Brett genau eine spielbare Aktionskarte.' },
        { title: 'Nur die aktive Person spielt', text: 'Nur die Person am Zug drückt jetzt etwas. Alle anderen schauen zu.' },
        { title: 'Auf leuchtende Hinweise achten', text: 'Sobald eine Folgeentscheidung nötig ist, zeigt dir der Assistent den nächsten Schritt.' }
      ]
    };
  }

  if (state.actionContext?.stage === 'choose-variant') {
    return {
      summary: `${player.name} muss entscheiden, wie die gewählte Karte gespielt wird.`,
      steps: [
        { title: 'Variante lesen', text: 'Lies beide Möglichkeiten kurz fertig.' },
        { title: 'Eine Variante wählen', text: viaPhone ? 'Tippe die passende Kartenvariante auf dem Handy an.' : 'Tippe die passende Kartenvariante im Host-Bereich an.' },
        { title: 'Danach weiterführen', text: 'Erst nach dieser Wahl erscheint die passende Lok- oder Zielauswahl.' }
      ]
    };
  }

  if (state.actionContext?.stage === 'pick-piece') {
    const moveText = state.actionContext.actionKind === 'start'
      ? 'Wähle eine Lok aus dem Depot.'
      : 'Wähle die Lok, die gezogen werden soll.';
    return {
      summary: `${player.name} muss jetzt genau eine Lok festlegen.`,
      steps: [
        { title: 'Passende Lok suchen', text: moveText },
        { title: 'Nur markierte Loks verwenden', text: 'Spiele nur mit den Loks, die als legal angezeigt oder auswählbar sind.' },
        { title: 'Auswahl bestätigen', text: viaPhone ? 'Tippe die Lok direkt auf dem Handy an.' : 'Tippe die Lok direkt auf dem Brett an.' }
      ]
    };
  }

  if (state.actionContext?.stage === 'pick-split-piece') {
    return {
      summary: `${player.name} verteilt die 7 jetzt schrittweise.`,
      steps: [
        { title: 'Erste Lok wählen', text: 'Wähle eine eigene Lok, die einen Teil der 7 ziehen soll.' },
        { title: 'Teilzug festlegen', text: 'Danach legst du fest, wie viele Felder diese Lok zieht.' },
        { title: 'Rest verteilen', text: 'Wiederhole das, bis alle 7 Felder verteilt sind.' }
      ]
    };
  }

  if (state.actionContext?.stage === 'pick-split-amount') {
    return {
      summary: `${player.name} legt jetzt die genaue Feldzahl für die gewählte Lok fest.`,
      steps: [
        { title: 'Menge wählen', text: 'Tippe die Anzahl Felder an, die diese Lok jetzt ziehen soll.' },
        { title: 'Rest prüfen', text: 'Der Assistent zeigt danach sofort, wie viele Felder noch übrig bleiben.' },
        { title: 'Weiter verteilen', text: 'Wenn noch Rest bleibt, wählst du die nächste Lok.' }
      ]
    };
  }

  if (state.actionContext?.stage === 'pick-swap-source') {
    return {
      summary: `${player.name} startet gerade einen Tauschzug.`,
      steps: [
        { title: 'Eigene Lok wählen', text: 'Wähle zuerst deine eigene Lok als Ausgangspunkt.' },
        { title: 'Gegnerisches Ziel', text: 'Danach zeigt der Assistent die gegnerischen Tauschziele.' },
        { title: 'Erst dann tauschen', text: 'Der Tausch passiert erst nach der zweiten Auswahl.' }
      ]
    };
  }

  if (state.actionContext?.stage === 'pick-swap-target') {
    return {
      summary: `${player.name} muss jetzt das gegnerische Tauschziel wählen.`,
      steps: [
        { title: 'Gegnerische Lok wählen', text: 'Tippe genau eine gegnerische Lok als Ziel an.' },
        { title: 'Tausch auslösen', text: 'Nach dieser Auswahl wird der Tausch sofort durchgeführt.' },
        { title: 'Danach warten', text: 'Anschliessend folgt automatisch der nächste Spielschritt oder eine Literaturkarte.' }
      ]
    };
  }

  return {
    summary: `Jetzt spielt ${player.name} ${locationText}.`,
    steps: [
      { title: 'Hinweis lesen', text: turnHintEl.textContent || 'Lies den aktuellen Hinweis genau.' },
      { title: 'Genau einen Schritt ausführen', text: 'Führe nur den Schritt aus, den der Assistent gerade verlangt.' },
      { title: 'Dann neu orientieren', text: 'Nach jedem Klick erscheint der nächste klare Auftrag.' }
    ]
  };
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

function isLiteratureRewardBlocked(player) {
  return player.effects.blockedLiteratureRewards > 0;
}

function applyRawReward(playerIndex, pieceId, reward) {
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

function applyLiteratureRewardConsideringBlock(playerIndex, pieceId, reward, includeQuizInsight = false) {
  const player = state.players[playerIndex];
  if (isLiteratureRewardBlocked(player)) {
    player.effects.blockedLiteratureRewards -= 1;
    return 'Der Literaturbonus wurde durch Schattenwurf blockiert.';
  }

  const rewardText = applyRawReward(playerIndex, pieceId, reward);
  if (includeQuizInsight) {
    player.insights += 1;
  }
  return rewardText;
}

function getInfluenceTargetOptions(playerIndex) {
  return state.players
    .map((player, index) => (index === playerIndex
      ? null
      : {
        playerIndex: index,
        name: player.name,
        tone: player.tone
      }))
    .filter(Boolean);
}

function canUseInfluenceCard(playerIndex, card) {
  if (!card) return false;
  if (state.gameOver || state.pendingLiterature) return false;
  if (playerIndex !== state.currentPlayer) return false;
  const player = state.players[playerIndex];
  if (!player || player.influenceUsedThisTurn) return false;
  if (state.selectedCardId || state.actionContext) return false;
  if (card.target === 'opponent') {
    return getInfluenceTargetOptions(playerIndex).length > 0;
  }
  return true;
}

function removeInfluenceCard(playerIndex, cardId) {
  const player = state.players[playerIndex];
  const index = player.influenceHand.findIndex((card) => card.uid === cardId);
  if (index < 0) return null;
  const [card] = player.influenceHand.splice(index, 1);
  state.influenceDiscard.push(card);
  return card;
}

function applyInfluenceEffect(actorIndex, card, targetPlayerIndex) {
  const actor = state.players[actorIndex];
  const target = typeof targetPlayerIndex === 'number' ? state.players[targetPlayerIndex] : null;

  if (card.effect.kind === 'gainShield') {
    actor.shields += card.effect.amount;
    return `${actor.name} erhält ${card.effect.amount} Schutzmarke.`;
  }

  if (card.effect.kind === 'gainInsight') {
    actor.insights += card.effect.amount;
    return `${actor.name} erhält ${card.effect.amount} Erkenntnispunkt.`;
  }

  if (card.effect.kind === 'drawAction') {
    const drawn = drawActionCard();
    if (drawn) {
      actor.hand.push(drawn);
      return `${actor.name} zieht 1 zusätzliche Aktionskarte.`;
    }
    return 'Kein Aktionsnachschub mehr im Deck verfügbar.';
  }

  if (!target) return 'Kein gültiges Ziel ausgewählt.';

  if (card.effect.kind === 'loseShield') {
    const before = target.shields;
    target.shields = Math.max(0, target.shields - card.effect.amount);
    return before > target.shields
      ? `${target.name} verliert 1 Schutzmarke.`
      : `${target.name} hatte keine Schutzmarke mehr.`;
  }

  if (card.effect.kind === 'discardRandomAction') {
    if (target.hand.length === 0) {
      return `${target.name} hatte keine Aktionskarte zum Abwerfen.`;
    }
    const randomIndex = Math.floor(Math.random() * target.hand.length);
    const [discarded] = target.hand.splice(randomIndex, 1);
    state.discard.push(discarded);
    if (targetPlayerIndex === state.currentPlayer && state.selectedCardId === discarded.uid) {
      clearActionSelection();
    }
    return `${target.name} verliert zufällig ${discarded.label}.`;
  }

  if (card.effect.kind === 'blockLiterature') {
    target.effects.blockedLiteratureRewards += card.effect.amount;
    return `${target.name}s nächster Literaturbonus wird blockiert.`;
  }

  return 'Keine Wirkung ausgelöst.';
}

function playInfluenceCard(playerIndex, cardId, targetPlayerIndex = null) {
  const player = state.players[playerIndex];
  const card = player ? player.influenceHand.find((entry) => entry.uid === cardId) : null;
  if (!canUseInfluenceCard(playerIndex, card)) return false;
  if (card.target === 'opponent' && typeof targetPlayerIndex !== 'number') return false;

  const removedCard = removeInfluenceCard(playerIndex, cardId);
  if (!removedCard) return false;

  const resultText = applyInfluenceEffect(playerIndex, removedCard, targetPlayerIndex);
  player.influenceUsedThisTurn = true;
  addLog(`${player.name} spielt Einflusskarte ${removedCard.label}. ${resultText}`);

  if (playerIndex === state.currentPlayer) {
    state.playableCardIds = computePlayableCardIds(playerIndex);
  }

  render();
  return true;
}

function finishPlayedCard() {
  const player = getCurrentPlayer();
  const playedCard = getSelectedCard();
  const won = player.pieces.filter((piece) => piece.steps === 44).length >= state.targetFinishedPieces;
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
    player.influenceUsedThisTurn = false;

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

    setTurnHintForCurrentPlayer(
      `${player.name} tippt jetzt auf genau eine helle Aktionskarte.`,
      `${player.name} tippt jetzt auf dem Handy auf genau eine helle Aktionskarte.`
    );
    render();
    return;
  }

  render();
}

function startNewGame() {
  uniqueCardId = 0;
  state = createInitialState();
  state.phoneMode = phoneModeEnabled;
  state.players = setupPlayers(selectedPlayerCount);
  state.deck = buildActionDeck();
  state.influenceDeck = buildInfluenceDeck();
  state.log = [`Neue Partie gestartet (${getModeConfig(selectedGameMode).label}).`];
  dealNextRound();
  state.currentPlayer = 0;
  setHostPanel(phoneModeEnabled ? 'handys' : 'zug');
  setBoardView('spiel');
  ensureTurnReady();
}

function selectCard(cardId) {
  if (state.gameOver || state.pendingLiterature) return;
  if (!state.playableCardIds.includes(cardId)) return;

  if (state.selectedCardId === cardId) {
    clearActionSelection();
    setTurnHintForCurrentPlayer(
      `${getCurrentPlayer().name} tippt jetzt wieder auf genau eine helle Aktionskarte.`,
      `${getCurrentPlayer().name} tippt jetzt wieder auf dem Handy auf genau eine helle Aktionskarte.`
    );
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
    setTurnHintForCurrentPlayer(
      `Entscheide jetzt genau, was ${card.label} bedeuten soll.`,
      `Entscheide jetzt auf dem Handy genau, was ${card.label} bedeuten soll.`
    );
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
    setTurnHintForCurrentPlayer(
      `Tippe jetzt genau die Lok an, die ${action.steps > 0 ? `${action.steps} Felder vor` : `${Math.abs(action.steps)} Felder zurück`} gehen soll.`,
      `Tippe jetzt auf dem Handy genau die Lok an, die ${action.steps > 0 ? `${action.steps} Felder vor` : `${Math.abs(action.steps)} Felder zurück`} gehen soll.`
    );
  } else if (action.kind === 'start') {
    state.actionContext = {
      stage: 'pick-piece',
      actionKind: 'start'
    };
    setTurnHintForCurrentPlayer(
      'Tippe jetzt eine Lok aus dem Depot an. Sie kommt aufs Startfeld.',
      'Tippe jetzt auf dem Handy eine Lok aus dem Depot an. Sie kommt aufs Startfeld.'
    );
  } else if (action.kind === 'split') {
    state.actionContext = {
      stage: 'pick-split-piece',
      actionKind: 'split',
      remaining: 7,
      pendingPieceId: null
    };
    setTurnHintForCurrentPlayer(
      'Verteile die 7 jetzt Schritt für Schritt auf eine oder mehrere eigene Loks.',
      'Verteile die 7 jetzt auf dem Handy Schritt für Schritt auf eine oder mehrere eigene Loks.'
    );
  } else if (action.kind === 'swap') {
    state.actionContext = {
      stage: 'pick-swap-source',
      actionKind: 'swap',
      sourcePieceId: null
    };
    setTurnHintForCurrentPlayer(
      'Tippe zuerst deine eigene Tauschlok an.',
      'Tippe auf dem Handy zuerst deine eigene Tauschlok an.'
    );
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
    setTurnHintForCurrentPlayer(
      `Es bleiben noch ${remaining} Felder der 7. Wähle jetzt die nächste passende Lok.`,
      `Es bleiben noch ${remaining} Felder der 7. Wähle jetzt auf dem Handy die nächste passende Lok.`
    );
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
      if (enterPiece(playerIndex, pieceId)) finishPlayedCard();
      return;
    }

    if (state.actionContext.actionKind === 'move') {
      if (movePieceByAmount(playerIndex, pieceId, state.actionContext.steps, true)) finishPlayedCard();
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
    setTurnHintForCurrentPlayer(
      `Wie viele Felder soll diese Lok jetzt ziehen? Tippe genau eine Zahl an.`,
      `Wie viele Felder soll diese Lok jetzt ziehen? Tippe auf dem Handy genau eine Zahl an.`
    );
    render();
    return;
  }

  if (state.actionContext.stage === 'pick-swap-source') {
    state.actionContext = {
      ...state.actionContext,
      stage: 'pick-swap-target',
      sourcePieceId: pieceId
    };
    setTurnHintForCurrentPlayer(
      'Tippe jetzt die gegnerische Lok an, mit der getauscht werden soll.',
      'Tippe jetzt auf dem Handy die gegnerische Lok an, mit der getauscht werden soll.'
    );
    render();
    return;
  }

  if (state.actionContext.stage === 'pick-swap-target') {
    const success = executeSwap(state.currentPlayer, state.actionContext.sourcePieceId, playerIndex, pieceId);
    if (success) finishPlayedCard();
  }
}

function openLiteratureModal() {
  const pending = state.pendingLiterature;
  if (!pending) return;

  const { card, type, fieldMeta } = pending;
  modalEl.classList.remove('hidden');
  modalEl.setAttribute('aria-hidden', 'false');
  const typeLabel = type === 'text' ? 'Textkarte' : type === 'deutung' ? 'Deutungskarte' : 'Schicksalskarte';
  cardTypeEl.textContent = fieldMeta?.place ? `${typeLabel} · ${fieldMeta.place}` : typeLabel;
  cardTitleEl.textContent = card.title;
  cardPromptEl.textContent = card.prompt;
  if (cardAssistantEl) {
    cardAssistantEl.innerHTML = type === 'schicksal'
      ? '<strong>So läuft diese Karte ab</strong><span>Diese Schicksalskarte wirkt sofort. Lest kurz die Erklärung und tippt dann auf "Weiter".</span>'
      : '<strong>So läuft diese Karte ab</strong><span>Nur die aktive Person beantwortet jetzt die Frage. Erst lesen, dann genau eine Antwort antippen, dann das Feedback abwarten.</span>';
  }
  cardOptionsEl.innerHTML = '';
  cardFeedbackEl.textContent = '';
  cardContinueBtn.classList.add('hidden');

  if (type === 'schicksal') {
    const rewardText = applyLiteratureRewardConsideringBlock(pending.playerIndex, pending.pieceId, card.reward, false);
    const fieldEffectText = applyFieldEffect(pending.playerIndex, pending.pieceId, fieldMeta);
    cardFeedbackEl.textContent = joinTexts(card.explanation, rewardText, fieldEffectText);
    updateRecentCard(type, card.title, joinTexts(card.prompt, card.explanation), joinTexts(rewardText, fieldEffectText), fieldMeta?.place);
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

  const { card, fieldMeta } = pending;
  const correct = optionIndex === card.correct;
  const buttons = [...cardOptionsEl.querySelectorAll('.option-btn')];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === card.correct) button.classList.add('correct');
    if (index === optionIndex && index !== card.correct) button.classList.add('incorrect');
  });

  let rewardText = 'Kein Bonus.';
  let fieldEffectText = '';
  if (correct) {
    rewardText = applyLiteratureRewardConsideringBlock(pending.playerIndex, pending.pieceId, card.reward, true);
    fieldEffectText = applyFieldEffect(pending.playerIndex, pending.pieceId, fieldMeta);
  }

  cardFeedbackEl.textContent = joinTexts(
    correct ? 'Richtig.' : 'Noch nicht.',
    card.explanation,
    correct ? rewardText : '',
    correct ? fieldEffectText : ''
  );
  if (cardAssistantEl) {
    cardAssistantEl.innerHTML = correct
      ? '<strong>Antwort abgeschlossen</strong><span>Gut. Lies kurz das Feedback und tippe dann auf "Weiter". Danach geht der Zug automatisch weiter.</span>'
      : '<strong>Antwort abgeschlossen</strong><span>Lies kurz die Auflösung und tippe dann auf "Weiter". Erst danach geht das Spiel weiter.</span>';
  }
  updateRecentCard(
    pending.type,
    card.title,
    joinTexts(card.prompt, card.explanation),
    correct ? joinTexts(rewardText, fieldEffectText) : 'Antwort ohne Bonus abgeschlossen.',
    fieldMeta?.place
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

function updateRecentCard(type, title, body, rewardText, location = '') {
  state.recentCard = {
    type,
    title,
    body,
    rewardText,
    location
  };
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
  const typeLabel = state.recentCard.type === 'text'
    ? 'Text'
    : state.recentCard.type === 'deutung'
      ? 'Deutung'
      : 'Schicksal';
  kicker.textContent = state.recentCard.location ? `${typeLabel} · ${state.recentCard.location}` : typeLabel;

  const title = document.createElement('h3');
  title.textContent = state.recentCard.title;

  const body = document.createElement('p');
  body.textContent = state.recentCard.body;

  const reward = document.createElement('p');
  reward.textContent = state.recentCard.rewardText;

  recentCardEl.append(kicker, title, body, reward);
}

function renderPlayerSummaryInto(container) {
  container.innerHTML = '';
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
      `Einfluss ${player.influenceHand.length}`,
      `Unterwegs ${active}`,
      `Im Ziel ${finished}/${state.targetFinishedPieces}`,
      `Schutz ${player.shields}`,
      `Erkenntnis ${player.insights}`
    ].forEach((label) => {
      const pill = document.createElement('span');
      pill.className = 'meta-pill';
      pill.textContent = label;
      meta.appendChild(pill);
    });

    card.append(header, meta);
    container.appendChild(card);
  });
}

function renderPlayerList() {
  renderPlayerSummaryInto(playerListEl);
}

function renderHostSummary() {
  const connectedCount = state.players.filter((_, index) => isPhoneConnected(index)).length;
  const targetCount = state.players.length || selectedPlayerCount;
  connectionCountEl.textContent = phoneModeEnabled ? `${connectedCount} / ${targetCount}` : 'aus';
}

function renderSetupCoach() {
  const { summary, steps } = getSetupCoachData();
  if (setupCoachSummaryEl) {
    setupCoachSummaryEl.textContent = summary;
  }
  renderStepPath(setupStepPathEl, getSetupStepPath());
  renderAssistantSteps(setupCoachStepsEl, steps);
  const facts = describeSetupAssistantFacts();
  renderAssistantFacts(setupAssistantNowEl, facts.callout);
  renderAssistantFacts(setupAssistantRulesEl, facts.rules);
  renderRulePrimer(setupRulePrimerEl, getRulePrimerCards());
  renderCardShowcase(setupCardShowcaseEl, CARD_SHOWCASE);
  if (newGameBtn) {
    newGameBtn.textContent = phoneModeEnabled ? 'Partie starten und Handys verbinden' : 'Partie jetzt starten';
  }
  if (openPhoneConnectBtn) {
    openPhoneConnectBtn.hidden = !phoneModeEnabled;
  }
}

function renderTurnCoach() {
  const { summary, steps } = describeTurnCoach();
  if (turnCoachSummaryEl) {
    turnCoachSummaryEl.textContent = summary;
  }
  renderStepPath(turnStepPathEl, getTurnStepPath());
  renderAssistantSteps(turnCoachStepsEl, steps);
  const facts = describeTurnAssistantFacts();
  renderAssistantFacts(turnAssistantNowEl, facts.callout);
  renderAssistantFacts(turnAssistantRulesEl, facts.rules);
  renderCardShowcase(turnCardLegendEl, getCompactCardShowcase());
  renderRulePrimer(turnRulePrimerEl, getRulePrimerCards());
  if (jumpToPhonesBtn) {
    jumpToPhonesBtn.hidden = !phoneModeEnabled;
  }
}

function renderLog() {
  logListEl.innerHTML = '';
  state.log.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    logListEl.appendChild(li);
  });
}

function isPhoneConnected(playerIndex) {
  const connection = hostConnections.get(playerIndex);
  return connection?.status === 'connected' && connection.channel?.readyState === 'open';
}

function getPieceLocationLabel(playerIndex, piece) {
  const player = state.players[playerIndex];
  const pieceState = getPieceState(player, piece);
  if (pieceState.zone === 'home') return 'im Depot';
  if (pieceState.zone === 'finish') return 'in der Charité';
  if (pieceState.zone === 'lane') return `auf der Zielspur ${pieceState.laneIndex + 1}`;

  const place = SPECIAL_SPACES.get(pieceState.absoluteIndex)?.place;
  return place ? `bei ${place}` : `auf der Strecke ${piece.steps + 1}`;
}

function buildPhonePieceChoices(playerIndex) {
  if (playerIndex !== state.currentPlayer || !state.actionContext) return [];

  const player = state.players[playerIndex];
  const describePiece = (piece, details) => ({
    playerIndex,
    pieceId: piece.id,
    label: `🚂 Lok ${piece.pieceIndex + 1}`,
    description: details
  });

  if (state.actionContext.stage === 'pick-piece') {
    return player.pieces
      .filter((piece) => isTokenSelectable(playerIndex, piece))
      .map((piece) => describePiece(
        piece,
        state.actionContext.actionKind === 'start'
          ? `${getPieceLocationLabel(playerIndex, piece)}; aufs Startsignal setzen`
          : `${getPieceLocationLabel(playerIndex, piece)}; ${state.actionContext.steps > 0 ? `${state.actionContext.steps} vor` : `${Math.abs(state.actionContext.steps)} zurück`}`
      ));
  }

  if (state.actionContext.stage === 'pick-split-piece') {
    return player.pieces
      .filter((piece) => isTokenSelectable(playerIndex, piece))
      .map((piece) => {
        const legalAmounts = getLegalSplitAmounts(playerIndex, piece.id, state.actionContext.remaining);
        return describePiece(piece, `${getPieceLocationLabel(playerIndex, piece)}; möglich: ${legalAmounts.join(', ')}`);
      });
  }

  if (state.actionContext.stage === 'pick-swap-source') {
    return getSwapSources(playerIndex)
      .filter((piece) => isTokenSelectable(playerIndex, piece))
      .map((piece) => describePiece(piece, `${getPieceLocationLabel(playerIndex, piece)}; als eigene Tauschlok`));
  }

  if (state.actionContext.stage === 'pick-swap-target') {
    return getSwapTargets(playerIndex)
      .filter(({ playerIndex: targetPlayerIndex, piece }) => isTokenSelectable(targetPlayerIndex, piece))
      .map(({ playerIndex: targetPlayerIndex, piece }) => ({
        playerIndex: targetPlayerIndex,
        pieceId: piece.id,
        label: `${state.players[targetPlayerIndex].name} · 🚂 Lok ${piece.pieceIndex + 1}`,
        description: getPieceLocationLabel(targetPlayerIndex, piece)
      }));
  }

  return [];
}

function renderHiddenHandMessage(player) {
  handAreaEl.innerHTML = '';
  const info = document.createElement('div');
  info.className = 'recent-card';
  info.innerHTML = `<h3>${player.hand.length} geheime Karten auf dem Handy</h3><p>Auf dem Brett siehst du diese Karten absichtlich nicht. ${player.name} hat sie nur auf dem eigenen Handy vor sich und klickt sie dort an.</p>`;
  handAreaEl.appendChild(info);
}

function renderHand() {
  const player = getCurrentPlayer();
  handAreaEl.innerHTML = '';

  if (state.phoneMode && isPhoneConnected(state.currentPlayer)) {
    renderHiddenHandMessage(player);
    phonePrivacyNoticeEl.classList.remove('hidden');
    return;
  }

  phonePrivacyNoticeEl.classList.add('hidden');
  const playableSet = new Set(state.playableCardIds);

  player.hand.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hand-card';
    button.dataset.cardId = card.uid;
    const playable = playableSet.has(card.uid);
    if (!playable) button.classList.add('disabled');
    if (state.selectedCardId === card.uid) button.classList.add('selected');

    const kicker = document.createElement('em');
    kicker.className = `card-state ${playable ? 'available' : 'blocked'}`;
    kicker.textContent = playable ? 'Jetzt spielbar' : 'Gerade gesperrt';
    const title = document.createElement('strong');
    title.textContent = card.label;
    const summary = document.createElement('span');
    summary.textContent = card.summary;
    const detail = document.createElement('small');
    detail.textContent = getActionCardStatusText(card, playable);
    button.append(kicker, title, summary, detail);
    handAreaEl.appendChild(button);
  });
}

function renderActiveCard() {
  if (usesPhoneTurnControl()) {
    activeCardSummaryEl.className = 'recent-card';
    activeCardSummaryEl.innerHTML = '<h3>Vollsteuerungsmodus</h3><p>Aktionskarte, Varianten, Lokwahl und Zielauswahl laufen vollständig auf dem Handy.</p>';
    return;
  }

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
  const detail = document.createElement('p');
  detail.textContent = getActionCardGuide(selectedCard);
  activeCardSummaryEl.append(title, body, detail);
}

function renderActionOptions() {
  actionOptionsEl.innerHTML = '';
  if (!state.actionContext) return;

  if (usesPhoneTurnControl()) {
    const note = document.createElement('p');
    note.className = 'action-panel-note';
    note.textContent = 'Im Vollsteuerungsmodus werden Varianten, Lokwahl und Zusatzschritte direkt auf dem Handy bestätigt.';
    actionOptionsEl.appendChild(note);
    return;
  }

  if (state.actionContext.stage === 'choose-variant') {
    state.actionContext.options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-option-btn';
      button.dataset.optionId = option.label;
      button.textContent = `${option.label} · ${option.description || 'Option'}`;
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
  button.setAttribute('aria-label', `${player.name} Dampflokomotive ${piece.pieceIndex + 1}`);

  const icon = document.createElement('span');
  icon.className = 'token-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '🚂';

  const marker = document.createElement('span');
  marker.className = 'token-marker';
  marker.textContent = String(piece.pieceIndex + 1);

  button.append(icon, marker);

  if (isTokenSelectable(playerIndex, piece)) {
    button.classList.add('selectable');
    if (usesPhoneTurnControl()) {
      button.classList.add('remote-selectable');
      button.disabled = true;
    }
  } else {
    button.disabled = true;
  }

  return button;
}

function getTrackSymbol(meta) {
  if (meta.startTone) {
    return { icon: '🚦', label: 'Startsignal', kind: 'start' };
  }
  if (meta.special === 'text') {
    return { icon: meta.fieldIcon || '📖', label: meta.place || 'Textkarte', kind: 'text' };
  }
  if (meta.special === 'deutung') {
    return { icon: meta.fieldIcon || '👁', label: meta.place || 'Deutungskarte', kind: 'deutung' };
  }
  if (meta.special === 'schicksal') {
    return { icon: meta.fieldIcon || '⚡', label: meta.place || 'Schicksalskarte', kind: 'schicksal' };
  }
  return null;
}

function joinTexts(...parts) {
  return parts.filter(Boolean).join(' ');
}

function applyFieldEffect(playerIndex, pieceId, fieldMeta) {
  if (!fieldMeta?.fieldEffect) return '';
  return applyRawReward(playerIndex, pieceId, fieldMeta.fieldEffect);
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

        const symbolMeta = getTrackSymbol(meta);
        if (symbolMeta) {
          cell.title = symbolMeta.label;
          const symbol = document.createElement('div');
          symbol.className = `cell-symbol symbol-${symbolMeta.kind}`;
          symbol.setAttribute('aria-hidden', 'true');

          const icon = document.createElement('span');
          icon.className = 'cell-symbol-icon';
          icon.textContent = symbolMeta.icon;

          const label = document.createElement('span');
          label.className = 'cell-symbol-label';
          label.textContent = symbolMeta.label;

          symbol.append(icon, label);
          cell.appendChild(symbol);
        }

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
        cell.classList.add('center', 'center-anchor');
      }

      boardEl.appendChild(cell);
    }
  }

  const centerEmblem = document.createElement('div');
  centerEmblem.className = 'board-center-emblem';

  const centerKicker = document.createElement('div');
  centerKicker.className = 'board-center-kicker';
  centerKicker.textContent = 'Schlussbild';

  const centerPlace = document.createElement('div');
  centerPlace.className = 'board-center-place';
  centerPlace.textContent = 'Charité';

  const centerSub = document.createElement('div');
  centerSub.className = 'board-center-sub';
  centerSub.textContent = `${state.players.reduce((sum, player) => sum + player.pieces.filter((piece) => piece.steps === 44).length, 0)} Figuren angekommen`;

  centerEmblem.append(centerKicker, centerPlace, centerSub);
  boardEl.appendChild(centerEmblem);
}

function getConnectionDisplayName(playerIndex) {
  return state.players[playerIndex]?.name || getConfiguredName(playerIndex, PLAYER_PRESETS[playerIndex].defaultName);
}

function getBaseBoardUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function getQrCodeUrl(value) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(value)}`;
}

function formatSessionCode(value) {
  return value.match(/.{1,4}/g)?.join('-') || value;
}

function setBoardView(view) {
  currentBoardView = view;
  if (boardAppEl) boardAppEl.dataset.view = view;
  const sections = [...document.querySelectorAll('.app-section')];
  sections.forEach((section) => {
    const name = section.dataset.section;
    const visible = view === 'alles' || view === name || (view === 'spiel' && name === 'spiel');
    section.classList.toggle('section-hidden', !visible);
  });

  if (pageNavButtonsEl) {
    [...pageNavButtonsEl.querySelectorAll('.page-nav-btn')].forEach((button) => {
      button.classList.toggle('active', button.dataset.view === view);
    });
  }
}

function setHostPanel(panel) {
  currentHostPanel = panel;

  ['zug', 'spielstand', 'letzte', 'protokoll', 'handys'].forEach((name) => {
    const section = document.getElementById(`hostSection-${name}`);
    if (!section) return;
    section.open = name === panel;
  });
}

function openPhoneConnectionsView() {
  setBoardView('spiel');
  setHostPanel('handys');
  phoneControlPanelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openCurrentTurnView() {
  setBoardView('spiel');
  setHostPanel('zug');
  document.getElementById('hostSection-zug')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, offset + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64ToBytes(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4 || 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function compressSignalBytes(bytes) {
  if (typeof CompressionStream === 'undefined') return bytes;
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  await writer.write(bytes);
  await writer.close();
  const buffer = await new Response(stream.readable).arrayBuffer();
  return new Uint8Array(buffer);
}

async function decompressSignalBytes(bytes) {
  if (typeof DecompressionStream === 'undefined') return bytes;
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  await writer.write(bytes);
  await writer.close();
  const buffer = await new Response(stream.readable).arrayBuffer();
  return new Uint8Array(buffer);
}

async function encodeSignalPayload(value) {
  const rawBytes = new TextEncoder().encode(JSON.stringify(value));
  const compressedBytes = await compressSignalBytes(rawBytes);
  const useCompressed = compressedBytes.length + 8 < rawBytes.length;
  return `${useCompressed ? 'c' : 'u'}:${bytesToBase64(useCompressed ? compressedBytes : rawBytes)}`;
}

async function decodeSignalPayload(value) {
  const [mode, payload] = value.split(':', 2);
  const bytes = base64ToBytes(payload || '');
  const decodedBytes = mode === 'c' ? await decompressSignalBytes(bytes) : bytes;
  return JSON.parse(new TextDecoder().decode(decodedBytes));
}

async function createSignalSession(payload) {
  const response = await fetch(SIGNAL_BLOB_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Signalspeicher antwortet mit ${response.status}`);
  }

  const location = response.headers.get('Location')
    || response.headers.get('location')
    || response.headers.get('X-JsonBlob')
    || response.headers.get('x-jsonblob');

  if (!location) {
    throw new Error('Keine Sitzungsadresse vom Signalspeicher erhalten.');
  }

  const sessionId = location.split('/').filter(Boolean).pop();
  if (!sessionId) {
    throw new Error('Sitzungscode konnte nicht gelesen werden.');
  }

  return sessionId;
}

async function fetchSignalSession(sessionId) {
  const response = await fetch(`${SIGNAL_BLOB_API}/${sessionId}`, {
    headers: { Accept: 'application/json' }
  });
  if (!response.ok) {
    throw new Error(`Sitzung ${sessionId} konnte nicht geladen werden (${response.status}).`);
  }
  return response.json();
}

async function updateSignalSession(sessionId, payload) {
  const response = await fetch(`${SIGNAL_BLOB_API}/${sessionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Sitzung ${sessionId} konnte nicht aktualisiert werden (${response.status}).`);
  }
}

function waitForIceComplete(pc) {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();

  return new Promise((resolve) => {
    function handleChange() {
      if (pc.iceGatheringState === 'complete') {
        pc.removeEventListener('icegatheringstatechange', handleChange);
        resolve();
      }
    }
    pc.addEventListener('icegatheringstatechange', handleChange);
  });
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }
  return false;
}

function closeHostConnection(playerIndex) {
  const existing = hostConnections.get(playerIndex);
  if (!existing) return;
  if (existing.pollTimer) window.clearInterval(existing.pollTimer);
  existing.channel?.close();
  existing.pc?.close();
  hostConnections.delete(playerIndex);
}

function updateConnectionStatus(playerIndex, status, extra = {}) {
  const entry = hostConnections.get(playerIndex) || { playerIndex };
  Object.assign(entry, extra, { status });
  hostConnections.set(playerIndex, entry);
  renderConnectionList();
}

function createHostChannelHandlers(playerIndex, channel) {
  channel.addEventListener('open', () => {
    updateConnectionStatus(playerIndex, 'connected', { channel });
    syncPhoneForPlayer(playerIndex);
    render();
  });

  channel.addEventListener('close', () => {
    updateConnectionStatus(playerIndex, 'closed', { channel: null });
    render();
  });

  channel.addEventListener('message', (event) => {
    handlePhoneMessage(playerIndex, event.data);
  });
}

async function applyRemoteAnswerDescription(playerIndex, answerDescription, extra = {}) {
  const connection = hostConnections.get(playerIndex);
  if (!connection?.pc || connection.answerApplied) return;
  await connection.pc.setRemoteDescription(answerDescription);
  updateConnectionStatus(playerIndex, 'awaiting-open', {
    ...extra,
    answerApplied: true
  });
}

function startSignalPolling(playerIndex) {
  const connection = hostConnections.get(playerIndex);
  if (!connection?.sessionId || connection.pollTimer) return;

  const pollTimer = window.setInterval(async () => {
    const current = hostConnections.get(playerIndex);
    if (!current?.sessionId) {
      window.clearInterval(pollTimer);
      return;
    }

    if (current.status === 'connected' || current.answerApplied) {
      window.clearInterval(pollTimer);
      updateConnectionStatus(playerIndex, current.status, { pollTimer: null });
      return;
    }

    try {
      const session = await fetchSignalSession(current.sessionId);
      if (session.answer) {
        window.clearInterval(pollTimer);
        await applyRemoteAnswerDescription(playerIndex, session.answer, {
          sessionData: session,
          pollTimer: null
        });
      }
    } catch (error) {
      addLog(`Sitzungscode für ${getConnectionDisplayName(playerIndex)} konnte nicht geprüft werden: ${error.message}`);
      window.clearInterval(pollTimer);
      updateConnectionStatus(playerIndex, 'offer-ready', { pollTimer: null });
    }
  }, SIGNAL_POLL_MS);

  updateConnectionStatus(playerIndex, connection.status, { pollTimer });
}

async function createPhoneInvite(playerIndex) {
  closeHostConnection(playerIndex);
  const pc = new RTCPeerConnection(RTC_CONFIG);
  const channel = pc.createDataChannel('bahnwaerter-thiel');

  createHostChannelHandlers(playerIndex, channel);
  updateConnectionStatus(playerIndex, 'building', { pc, channel, inviteLink: '', answerDraft: '' });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await waitForIceComplete(pc);

  const localDescription = pc.localDescription?.toJSON?.() || pc.localDescription;
  try {
    const sessionPayload = {
      kind: 'bahnwaerter-thiel-pairing',
      version: 1,
      createdAt: new Date().toISOString(),
      playerIndex,
      offer: localDescription,
      answer: null
    };
    const sessionId = await createSignalSession(sessionPayload);
    const inviteLink = `${getBaseBoardUrl()}?screen=phone&player=${playerIndex}&session=${encodeURIComponent(sessionId)}`;

    updateConnectionStatus(playerIndex, 'offer-ready', {
      pc,
      channel,
      pairingMode: 'session',
      sessionId,
      sessionCode: formatSessionCode(sessionId),
      sessionData: sessionPayload,
      inviteLink,
      answerDraft: ''
    });
    startSignalPolling(playerIndex);
  } catch (error) {
    const offerCode = await encodeSignalPayload(localDescription);
    const inviteLink = `${getBaseBoardUrl()}?screen=phone&player=${playerIndex}&offer=${encodeURIComponent(offerCode)}`;

    updateConnectionStatus(playerIndex, 'offer-ready', {
      pc,
      channel,
      pairingMode: 'manual',
      offerCode,
      inviteLink,
      sessionError: error.message
    });
  }
}

async function applyPhoneAnswer(playerIndex, answerText) {
  const connection = hostConnections.get(playerIndex);
  if (!connection?.pc) return;

  const answer = await decodeSignalPayload(answerText.trim());
  await applyRemoteAnswerDescription(playerIndex, answer, { answerDraft: answerText.trim() });
}

function buildPhoneView(playerIndex) {
  const player = state.players[playerIndex];
  const current = getCurrentPlayer();
  const selectedCard = playerIndex === state.currentPlayer ? getSelectedCard() : null;
  return {
    playerIndex,
    name: player.name,
    tone: player.tone,
    isCurrentTurn: playerIndex === state.currentPlayer,
    privateControlActive: usesPhoneTurnControl(playerIndex),
    gameOver: state.gameOver,
    turnOwner: current?.name || '',
    turnHint: turnHintEl.textContent,
    playableCardIds: playerIndex === state.currentPlayer ? state.playableCardIds : [],
    hand: player.hand.map((card) => ({
      uid: card.uid,
      label: card.label,
      summary: card.summary,
      selected: state.selectedCardId === card.uid,
      playable: state.playableCardIds.includes(card.uid)
    })),
    influenceHand: player.influenceHand.map((card) => ({
      uid: card.uid,
      label: card.label,
      summary: card.summary,
      target: card.target,
      usable: canUseInfluenceCard(playerIndex, card)
    })),
    canUseInfluence: !player.influenceUsedThisTurn,
    actionOptions: state.actionContext?.stage === 'choose-variant' && playerIndex === state.currentPlayer
      ? state.actionContext.options.map((option) => ({
        id: option.label,
        label: option.label,
        description: option.description || ''
      }))
      : [],
    splitOptions: state.actionContext?.stage === 'pick-split-amount' && playerIndex === state.currentPlayer
      ? state.actionContext.legalAmounts.map((amount) => ({
        id: String(amount),
        label: `${amount} Feld${amount === 1 ? '' : 'er'}`
      }))
      : [],
    pieceChoices: buildPhonePieceChoices(playerIndex),
    roundSize: state.activeDealSize,
    deckCount: state.deck.length,
    modeLabel: getModeConfig(state.modeKey).label,
    targetFinishedPieces: state.targetFinishedPieces,
    activeCard: selectedCard
      ? { label: selectedCard.label, summary: selectedCard.summary }
      : null,
    recentCard: state.recentCard
      ? {
        title: state.recentCard.title,
        rewardText: state.recentCard.rewardText
      }
      : null,
    influenceTargets: getInfluenceTargetOptions(playerIndex),
    publicPlayers: state.players.map((entry, index) => ({
      name: entry.name,
      tone: entry.tone,
      current: index === state.currentPlayer,
      handCount: entry.hand.length,
      influenceCount: entry.influenceHand.length,
      finishedCount: entry.pieces.filter((piece) => piece.steps === 44).length,
      shields: entry.shields,
      insights: entry.insights
    }))
  };
}

function sendToPhone(playerIndex, payload) {
  const connection = hostConnections.get(playerIndex);
  if (!connection?.channel || connection.channel.readyState !== 'open') return;
  connection.channel.send(JSON.stringify(payload));
}

function syncPhoneForPlayer(playerIndex) {
  if (appScreen !== 'board' || !state.players[playerIndex]) return;
  sendToPhone(playerIndex, {
    type: 'sync',
    view: buildPhoneView(playerIndex)
  });
}

function syncAllPhones() {
  if (appScreen !== 'board') return;
  state.players.forEach((_, index) => syncPhoneForPlayer(index));
}

function renderConnectionList() {
  if (appScreen !== 'board') return;
  connectionListEl.innerHTML = '';

  if (!phoneModeEnabled) {
    const info = document.createElement('div');
    info.className = 'setup-note-card';
    info.innerHTML = '<strong>Handy-Modus aus</strong><p>Aktiviere den Handy-Modus in der Vorbereitung, damit der Verbindungsassistent pro Spielperson QR-Code, Link und Antwort-Code anzeigen kann.</p>';
    connectionListEl.appendChild(info);
    return;
  }

  const explainer = document.createElement('div');
  explainer.className = 'connect-explainer';
  explainer.innerHTML = `
    <div class="connect-step">
      <strong>1. Einladung erzeugen</strong>
      <span>Das Brett erstellt pro Spielperson einen privaten Handy-Link oder einen Sitzungs-Code.</span>
    </div>
    <div class="connect-step">
      <strong>2. QR scannen</strong>
      <span>Am einfachsten den QR-Code mit der Handy-Kamera öffnen oder den Link kopieren.</span>
    </div>
    <div class="connect-step">
      <strong>3. Verbindung abschliessen</strong>
      <span>Im Sitzungsmodus verbindet sich das Brett automatisch. Nur im Rückfall-Modus musst du den Antwort-Code noch manuell einfügen.</span>
    </div>
  `;
  connectionListEl.appendChild(explainer);

  PLAYER_PRESETS.slice(0, selectedPlayerCount).forEach((preset, playerIndex) => {
    const connection = hostConnections.get(playerIndex);
    const card = document.createElement('div');
    card.className = 'connection-card';

    const header = document.createElement('div');
    header.className = 'connection-card-header';

    const name = document.createElement('div');
    name.innerHTML = `<strong>${getConnectionDisplayName(playerIndex)}</strong><div class="mini-label">Handy ${playerIndex + 1}</div>`;

    const status = document.createElement('div');
    status.className = 'connection-status';
    status.dataset.state = connection?.status || 'idle';
    status.textContent = connection?.status === 'connected'
      ? 'Verbunden'
      : connection?.status === 'awaiting-open'
        ? connection?.answerApplied
          ? 'Antwort übernommen'
          : 'Handy geöffnet, warte auf Antwort'
        : connection?.status === 'offer-ready'
          ? 'Bereit zum Scannen'
          : connection?.status === 'building'
            ? 'Erzeuge QR-Link'
            : connection?.status === 'closed'
              ? 'Verbindung geschlossen'
              : 'Noch nicht verbunden';

    header.append(name, status);
    card.appendChild(header);

    const hasInvite = Boolean(connection?.inviteLink);
    const hasAnswer = Boolean(connection?.answerDraft);
    const progress = [
      {
        title: '1. Einladung',
        text: hasInvite ? 'Link und QR-Code bereit' : 'Noch nicht erzeugt',
        state: hasInvite ? 'done' : connection?.status === 'building' ? 'current' : 'pending'
      },
      {
        title: '2. Handy öffnen',
        text: hasAnswer || connection?.status === 'connected' ? 'Auf dem Handy bestätigt' : hasInvite ? 'Link scannen oder öffnen' : 'Warte auf Einladung',
        state: hasAnswer || connection?.status === 'connected' ? 'done' : hasInvite ? 'current' : 'pending'
      },
      {
        title: '3. Live verbinden',
        text: connection?.status === 'connected'
          ? 'Brett und Handy synchron'
          : connection?.pairingMode === 'session'
            ? 'Host wartet auf automatische Antwort'
            : hasAnswer
              ? 'Code liegt vor, Verbindung startet'
              : 'Antwort-Code fehlt noch',
        state: connection?.status === 'connected'
          ? 'done'
          : connection?.pairingMode === 'session' || hasAnswer
            ? 'current'
            : 'pending'
      }
    ];

    const progressRow = document.createElement('div');
    progressRow.className = 'connection-progress';
    progress.forEach((step) => {
      const item = document.createElement('div');
      item.className = `connection-progress-card ${step.state}`;
      item.innerHTML = `<strong>${step.title}</strong><span>${step.text}</span>`;
      progressRow.appendChild(item);
    });
    card.appendChild(progressRow);

    const buttons = document.createElement('div');
    buttons.className = 'button-row';

    const inviteBtn = document.createElement('button');
    inviteBtn.type = 'button';
    inviteBtn.className = 'primary-btn';
    inviteBtn.dataset.action = 'create-invite';
    inviteBtn.dataset.playerIndex = String(playerIndex);
    inviteBtn.textContent = connection?.inviteLink ? 'Handy-Link neu erzeugen' : '1. Handy-Link erzeugen';
    buttons.appendChild(inviteBtn);

    if (connection?.inviteLink) {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'count-btn';
      copyBtn.dataset.action = 'copy-link';
      copyBtn.dataset.playerIndex = String(playerIndex);
      copyBtn.textContent = 'Link kopieren';
      buttons.appendChild(copyBtn);
    }

    card.appendChild(buttons);

    if (connection?.inviteLink) {
      const grid = document.createElement('div');
      grid.className = 'connection-grid';

      const left = document.createElement('div');
      if (connection.pairingMode === 'manual' && connection.sessionError) {
        const fallbackField = document.createElement('div');
        fallbackField.className = 'signal-field';
        fallbackField.innerHTML = '<label>Rückfall-Modus</label>';
        const fallbackNote = document.createElement('div');
        fallbackNote.className = 'session-auto-note';
        fallbackNote.textContent = `Kurzer Sitzungs-Code war gerade nicht verfügbar. Deshalb läuft diese Einladung über den längeren Antwort-Code. Ursache: ${connection.sessionError}`;
        fallbackField.appendChild(fallbackNote);
        left.appendChild(fallbackField);
      }

      if (connection.pairingMode === 'session' && connection.sessionCode) {
        const sessionField = document.createElement('div');
        sessionField.className = 'signal-field';
        sessionField.innerHTML = '<label>Sitzungs-Code</label>';
        const sessionCodeCard = document.createElement('div');
        sessionCodeCard.className = 'session-code-card';
        sessionCodeCard.textContent = connection.sessionCode;
        sessionField.appendChild(sessionCodeCard);
        left.appendChild(sessionField);
      }

      const inviteField = document.createElement('div');
      inviteField.className = 'signal-field';
      inviteField.innerHTML = '<label>1. Diesen Link am Handy öffnen</label>';
      const textarea = document.createElement('textarea');
      textarea.className = 'signal-textarea';
      textarea.rows = 5;
      textarea.readOnly = true;
      textarea.value = connection.inviteLink;
      inviteField.appendChild(textarea);
      left.appendChild(inviteField);

      if (connection.pairingMode === 'manual') {
        const answerField = document.createElement('div');
        answerField.className = 'signal-field';
        answerField.innerHTML = '<label>3. Antwort-Code vom Handy hier einfügen</label>';
        const input = document.createElement('textarea');
        input.className = 'signal-textarea';
        input.rows = 5;
        input.value = connection.answerDraft || '';
        input.dataset.role = 'answer-input';
        input.dataset.playerIndex = String(playerIndex);
        answerField.appendChild(input);
        left.appendChild(answerField);

        const answerButtons = document.createElement('div');
        answerButtons.className = 'button-row';
        const applyBtn = document.createElement('button');
        applyBtn.type = 'button';
        applyBtn.className = 'count-btn';
        applyBtn.dataset.action = 'apply-answer';
        applyBtn.dataset.playerIndex = String(playerIndex);
        applyBtn.textContent = '3. Code übernehmen und verbinden';
        answerButtons.appendChild(applyBtn);
        left.appendChild(answerButtons);
      } else {
        const autoField = document.createElement('div');
        autoField.className = 'signal-field';
        autoField.innerHTML = '<label>3. Automatische Antwort</label>';
        const autoCard = document.createElement('div');
        autoCard.className = 'session-auto-note';
        autoCard.textContent = 'Kein manuelles Einfügen nötig. Das Handy überträgt die Antwort direkt an das Brett.';
        autoField.appendChild(autoCard);
        left.appendChild(autoField);
      }

      const qrBox = document.createElement('div');
      qrBox.className = 'qr-box';
      const qrImage = document.createElement('img');
      qrImage.src = getQrCodeUrl(connection.inviteLink);
      qrImage.alt = `QR-Code für ${getConnectionDisplayName(playerIndex)}`;
      qrImage.addEventListener('error', () => {
        qrImage.hidden = true;
        qrBox.classList.add('qr-box-fallback');
        qrHint.textContent = 'QR-Code konnte nicht geladen werden. Nutze stattdessen den Link links und öffne ihn direkt auf dem Handy.';
      });

      const qrHint = document.createElement('p');
      qrHint.textContent = connection.pairingMode === 'session'
        ? 'Mit der Handy-Kamera scannen oder alternativ den Link kopieren. Die Antwort läuft danach automatisch zurück ans Brett.'
        : 'Mit der Handy-Kamera scannen oder alternativ den Link kopieren. Danach den Antwort-Code vom Handy wieder links einfügen.';

      qrBox.append(qrImage, qrHint);

      grid.append(left, qrBox);
      card.appendChild(grid);
    }

    connectionListEl.appendChild(card);
  });
}

function handlePhoneMessage(playerIndex, rawData) {
  let payload;
  try {
    payload = JSON.parse(rawData);
  } catch {
    return;
  }

  if (!state.players[playerIndex]) return;
  if (payload.type === 'select-card' && playerIndex === state.currentPlayer) {
    selectCard(payload.cardId);
  }

  if (payload.type === 'select-option' && playerIndex === state.currentPlayer) {
    handleActionOption(payload.optionId);
  }

  if (payload.type === 'select-token' && playerIndex === state.currentPlayer) {
    handleTokenSelection(Number(payload.playerIndex), payload.pieceId);
  }

  if (payload.type === 'play-influence' && playerIndex === state.currentPlayer) {
    playInfluenceCard(playerIndex, payload.cardId, payload.targetPlayerIndex);
  }
}

function describePhoneAssistant(view) {
  if (!view) {
    return {
      summary: 'Noch keine Verbindung zum Brett.',
      steps: [
        { title: 'Link öffnen', text: 'Öffne den Einladungslink oder scanne den QR-Code vom Brett.' },
        { title: 'Code zurückgeben', text: 'Kopiere den Antwort-Code zurück an das Brett.' },
        { title: 'Warten', text: 'Sobald die Verbindung steht, erscheinen hier deine privaten Karten.' }
      ]
    };
  }

  if (view.gameOver) {
    return {
      summary: 'Die Partie ist beendet.',
      steps: [
        { title: 'Endstand ansehen', text: 'Lies kurz den Schlussstand im öffentlichen Bereich.' },
        { title: 'Handy beiseitelegen', text: 'Für eine neue Runde brauchst du erst wieder einen neuen Start.' }
      ]
    };
  }

  if (!view.isCurrentTurn) {
    return {
      summary: `${view.turnOwner} ist jetzt am Zug. Du wartest.`,
      steps: [
        { title: 'Nichts drücken', text: 'Tippe jetzt keine Karten an. Deine Runde kommt später.' },
        { title: 'Karten privat halten', text: 'Zeige dein Handy nicht offen in die Gruppe.' },
        { title: 'Auf deinen Namen achten', text: 'Sobald dein Name oben steht, darfst du spielen.' }
      ]
    };
  }

  if (phoneClient.pendingInfluenceCardId) {
    return {
      summary: 'Du musst jetzt die Zielperson für deine Einflusskarte festlegen.',
      steps: [
        { title: 'Ziel auswählen', text: 'Tippe genau eine Zielperson an.' },
        { title: 'Nicht doppelt tippen', text: 'Warte kurz, bis die Auswahl verarbeitet ist.' },
        { title: 'Dann weiter', text: 'Der nächste Schritt erscheint automatisch.' }
      ]
    };
  }

  if (view.pieceChoices.length > 0) {
    return {
      summary: 'Du bist dran und musst jetzt eine Lok auswählen.',
      steps: [
        { title: 'Lok lesen', text: 'Prüfe kurz die Beschreibung unter jeder Lok.' },
        { title: 'Passende Lok antippen', text: 'Wähle genau die Lok, die jetzt ziehen oder starten soll.' },
        { title: 'Auf den nächsten Auftrag warten', text: 'Nach dem Tipp erscheint sofort der nächste Schritt.' }
      ]
    };
  }

  if (view.actionOptions.length > 0) {
    return {
      summary: 'Du musst jetzt die passende Kartenvariante wählen.',
      steps: [
        { title: 'Varianten vergleichen', text: 'Lies die beiden Optionen kurz ganz.' },
        { title: 'Eine Option wählen', text: 'Tippe genau eine Variante an.' },
        { title: 'Dann weiter', text: 'Danach führt dich das Handy direkt zur nächsten Auswahl.' }
      ]
    };
  }

  if (view.splitOptions.length > 0) {
    return {
      summary: 'Du verteilst gerade die 7.',
      steps: [
        { title: 'Feldzahl wählen', text: 'Tippe die Anzahl Felder für die aktuelle Lok an.' },
        { title: 'Rest beachten', text: 'Schau danach, wie viele Felder noch übrig bleiben.' },
        { title: 'Wiederholen', text: 'Falls nötig, wählst du danach die nächste Lok.' }
      ]
    };
  }

  const hasPlayableAction = view.hand.some((card) => card.playable);
  const hasUsableInfluence = view.influenceHand.some((card) => card.usable);

  if (hasPlayableAction || hasUsableInfluence) {
    return {
      summary: 'Du bist am Zug. Wähle jetzt genau eine Karte.',
      steps: [
        { title: 'Karte wählen', text: 'Tippe eine spielbare Aktionskarte oder Einflusskarte an.' },
        { title: 'Nur ein Schritt nach dem anderen', text: 'Wähle nicht mehrere Karten hintereinander.' },
        { title: 'Assistent lesen', text: 'Nach jedem Klick sagt dir das Handy sofort, was als Nächstes kommt.' }
      ]
    };
  }

  return {
    summary: 'Du bist am Zug. Lies den Hinweis oben und folge dem nächsten Schritt.',
    steps: [
      { title: 'Hinweis lesen', text: view.turnHint || 'Lies die aktuelle Anweisung oben.' },
      { title: 'Nur aktuelle Auswahl treffen', text: 'Führe nur den einen Schritt aus, der gerade angezeigt wird.' },
      { title: 'Dann stoppen', text: 'Warte nach jedem Tipp auf die nächste sichtbare Anweisung.' }
    ]
  };
}

function renderPhoneView() {
  if (appScreen !== 'phone') return;

  const view = phoneClient.view;
  renderCardShowcase(phoneCardLegendEl, getCompactCardShowcase());
  if (!view) {
    phoneStatusTextEl.textContent = 'Warte auf die erste Synchronisation vom Brett.';
    phoneGamePanelEl.classList.add('hidden');
    renderStepPath(phoneStepPathEl, getPhoneStepPath(null));
    if (phoneAssistantSummaryEl) phoneAssistantSummaryEl.textContent = 'Noch keine Verbindung zum Brett.';
    const assistant = describePhoneAssistant(null);
    renderAssistantSteps(phoneAssistantStepsEl, assistant.steps);
    const facts = describePhoneAssistantFacts(null);
    renderAssistantFacts(phoneAssistantNowEl, facts.callout);
    renderAssistantFacts(phoneAssistantRulesEl, facts.rules);
    return;
  }

  phoneGamePanelEl.classList.remove('hidden');
  phoneTitleEl.textContent = `${view.name} · geheime Karten`;
  phoneStatusTextEl.textContent = view.isCurrentTurn
    ? view.privateControlActive
      ? 'Du bist am Zug. Im Vollsteuerungsmodus steuerst du Karte, Lokwahl und Zusatzschritte komplett hier.'
      : 'Du bist am Zug. Wähle deine geheime Aktions- oder Einflusskarte direkt hier.'
    : `${view.turnOwner} ist am Zug. Deine privaten Karten bleiben auf diesem Handy gespeichert.`;
  phonePlayerChipEl.textContent = view.name;
  phonePlayerChipEl.dataset.tone = view.tone;
  phoneTurnHintEl.textContent = view.turnHint;
  const assistant = describePhoneAssistant(view);
  if (phoneAssistantSummaryEl) {
    phoneAssistantSummaryEl.textContent = assistant.summary;
  }
  renderStepPath(phoneStepPathEl, getPhoneStepPath(view));
  renderAssistantSteps(phoneAssistantStepsEl, assistant.steps);
  const facts = describePhoneAssistantFacts(view);
  renderAssistantFacts(phoneAssistantNowEl, facts.callout);
  renderAssistantFacts(phoneAssistantRulesEl, facts.rules);

  phoneHandAreaEl.innerHTML = '';
  view.hand.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'phone-action-card';
    button.dataset.cardId = card.uid;
    if (card.selected) button.classList.add('selected');
    button.disabled = !view.isCurrentTurn || !card.playable || view.gameOver;
    button.innerHTML = `
      <em class="card-state ${view.isCurrentTurn && card.playable && !view.gameOver ? 'available' : 'blocked'}">${view.isCurrentTurn && card.playable && !view.gameOver ? 'Jetzt spielbar' : 'Warten'}</em>
      <strong>${card.label}</strong>
      <span>${card.summary}</span>
      <small>${getActionCardStatusText(card, view.isCurrentTurn && card.playable && !view.gameOver)}</small>
    `;
    phoneHandAreaEl.appendChild(button);
  });

  phoneInfluenceAreaEl.innerHTML = '';
  view.influenceHand.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'phone-influence-card';
    button.dataset.cardId = card.uid;
    button.dataset.target = card.target;
    button.disabled = !card.usable || view.gameOver;
    if (phoneClient.pendingInfluenceCardId === card.uid) button.classList.add('selected');
    button.innerHTML = `
      <em class="card-state ${card.usable && !view.gameOver ? 'available' : 'blocked'}">${card.usable && !view.gameOver ? 'Jetzt spielbar' : 'Warten'}</em>
      <strong>${card.label}</strong>
      <span>${card.summary}</span>
      <small>${getInfluenceCardGuide(card)}</small>
    `;
    phoneInfluenceAreaEl.appendChild(button);
  });

  phoneActiveCardEl.className = view.activeCard || view.privateControlActive ? 'recent-card' : 'recent-card empty';
  phoneActiveCardEl.innerHTML = view.activeCard
    ? `<h3>${view.activeCard.label}</h3><p>${view.activeCard.summary}</p>`
    : view.privateControlActive
      ? '<h3>Vollsteuerungsmodus</h3><p>Dieses Handy steuert die komplette verdeckte Zugfolge.</p>'
      : 'Noch keine Karte gewählt.';

  phoneActionOptionsEl.innerHTML = '';
  if (phoneClient.pendingInfluenceCardId) {
    phoneActionHintEl.textContent = 'Wähle jetzt die Zielperson für diese Einflusskarte.';
    const targetWrap = document.createElement('div');
    targetWrap.className = 'phone-choice-targets';
    view.influenceTargets.forEach((target) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'phone-choice-chip';
      button.dataset.targetPlayerIndex = String(target.playerIndex);
      button.textContent = target.name;
      targetWrap.appendChild(button);
    });
    phoneActionOptionsEl.appendChild(targetWrap);
  } else if (view.pieceChoices.length > 0) {
    phoneActionHintEl.textContent = 'Wähle jetzt die passende Lok direkt auf diesem Handy.';
    const pieceWrap = document.createElement('div');
    pieceWrap.className = 'phone-piece-grid';
    view.pieceChoices.forEach((choice) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'phone-piece-card';
      button.dataset.playerIndex = String(choice.playerIndex);
      button.dataset.pieceId = choice.pieceId;
      button.innerHTML = `<strong>${choice.label}</strong><span>${choice.description}</span>`;
      pieceWrap.appendChild(button);
    });
    phoneActionOptionsEl.appendChild(pieceWrap);
  } else if (view.actionOptions.length > 0) {
    phoneActionHintEl.textContent = 'Diese Kartenvariante kannst du direkt auf dem Handy festlegen.';
    view.actionOptions.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-option-btn';
      button.dataset.optionId = option.id;
      button.textContent = `${option.label} · ${option.description}`;
      phoneActionOptionsEl.appendChild(button);
    });
  } else if (view.splitOptions.length > 0) {
    phoneActionHintEl.textContent = 'Verteile jetzt die restlichen Felder der 7 direkt auf dem Handy.';
    view.splitOptions.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-option-btn';
      button.dataset.optionId = option.id;
      button.textContent = option.label;
      phoneActionOptionsEl.appendChild(button);
    });
  } else {
    phoneActionHintEl.textContent = view.privateControlActive
      ? 'Mehrdeutige Karten, Lokwahl und Zusatzschritte erscheinen hier, sobald du sie brauchst.'
      : 'Wenn mehrere Varianten möglich sind, erscheinen sie hier.';
  }

  phoneScoreListEl.innerHTML = '';
  const summary = document.createElement('div');
  summary.className = 'recent-card';
  summary.innerHTML = `
    <h3>Öffentliche Runde</h3>
    <p>${view.modeLabel} · Runde ${view.roundSize} · Deck ${view.deckCount} Karten · ${view.turnOwner} ist am Zug.</p>
    <p>${view.recentCard ? `Letzte Karte: ${view.recentCard.title} · ${view.recentCard.rewardText}` : 'Noch keine Literaturkarte aufgedeckt.'}</p>
  `;
  phoneScoreListEl.appendChild(summary);

  view.publicPlayers.forEach((player) => {
    const card = document.createElement('div');
    card.className = `player-card${player.current ? ' current' : ''}`;
    card.innerHTML = `
      <div class="player-card-header">
        <div class="player-card-name">${player.name}</div>
        <span class="player-chip" data-tone="${player.tone}">${player.tone.toUpperCase()}</span>
      </div>
      <div class="player-card-meta">
        <span class="meta-pill">Hand ${player.handCount}</span>
        <span class="meta-pill">Einfluss ${player.influenceCount}</span>
        <span class="meta-pill">Ziel ${player.finishedCount}/${view.targetFinishedPieces}</span>
        <span class="meta-pill">Schutz ${player.shields}</span>
        <span class="meta-pill">Erkenntnis ${player.insights}</span>
      </div>
    `;
    phoneScoreListEl.appendChild(card);
  });
}

function stopDemoPlayback() {
  if (demoTimer) {
    window.clearInterval(demoTimer);
    demoTimer = null;
  }
  if (demoPlayBtn) {
    demoPlayBtn.textContent = 'Demo abspielen';
  }
}

function renderDemoPhone(targetEl, data) {
  if (!targetEl || !data) return;
  targetEl.innerHTML = '';

  const status = document.createElement('div');
  status.className = 'demo-phone-status';
  status.textContent = data.status;
  targetEl.appendChild(status);

  data.cards.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.className = `demo-phone-card ${card.kind || ''}`.trim();
    cardEl.innerHTML = `<strong>${card.title}</strong><span>${card.text}</span>`;
    targetEl.appendChild(cardEl);
  });
}

function renderDemoScene(targetEl, scene) {
  if (!targetEl || !scene) return;

  const stage = document.createElement('section');
  stage.className = 'demo-live-stage';

  const boardWrap = document.createElement('div');
  boardWrap.className = 'demo-route-wrap';

  const board = document.createElement('div');
  board.className = 'demo-route-board';

  DEMO_ROUTE_STOPS.forEach((stop) => {
    const stopEl = document.createElement('div');
    stopEl.className = `demo-route-stop${scene.activeStops?.includes(stop.id) ? ' active' : ''}`;
    stopEl.style.gridColumn = String(stop.col);
    stopEl.style.gridRow = String(stop.row);
    stopEl.innerHTML = `<span class="demo-route-icon">${stop.icon}</span><span class="demo-route-label">${stop.label}</span>`;

    scene.tokens
      .filter((token) => token.at === stop.id)
      .forEach((token) => {
        const tokenEl = document.createElement('span');
        tokenEl.className = `demo-route-token${token.moving ? ' moving' : ''}`;
        tokenEl.dataset.tone = token.tone;
        tokenEl.innerHTML = `<span class="demo-route-token-icon">🚂</span><span class="demo-route-token-no">${token.number}</span>`;
        stopEl.appendChild(tokenEl);
      });

    board.appendChild(stopEl);
  });

  const caption = document.createElement('p');
  caption.className = 'demo-live-caption';
  caption.textContent = scene.caption;

  boardWrap.append(board, caption);

  const cardRack = document.createElement('div');
  cardRack.className = 'demo-card-rack';
  scene.cards.forEach((card) => {
    const cardEl = document.createElement('article');
    cardEl.className = `demo-stage-card ${card.kind || 'system'}`.trim();
    cardEl.innerHTML = `<strong>${card.title}</strong><span>${card.text}</span>`;
    cardRack.appendChild(cardEl);
  });

  stage.append(boardWrap, cardRack);
  targetEl.appendChild(stage);
}

function renderDemoStep() {
  if (appScreen !== 'board' || !demoStepListEl) return;
  const step = DEMO_STEPS[demoStepIndex];
  const scene = getDemoSceneForStep(demoStepIndex);

  demoStepListEl.innerHTML = '';
  DEMO_STEPS.forEach((entry, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `demo-step-btn${index === demoStepIndex ? ' active' : ''}`;
    button.dataset.demoStep = String(index);
    button.innerHTML = `<strong>${entry.kicker}</strong><span>${entry.title}</span>`;
    demoStepListEl.appendChild(button);
  });

  demoEyebrowEl.textContent = step.kicker;
  demoTitleEl.textContent = step.title;
  demoTextEl.textContent = step.text;
  demoHostTitleEl.textContent = step.hostTitle;

  demoNotesEl.innerHTML = '';
  step.notes.forEach((note) => {
    const pill = document.createElement('span');
    pill.className = 'demo-note';
    pill.textContent = note;
    demoNotesEl.appendChild(pill);
  });

  demoHostCardEl.innerHTML = '';
  const strip = document.createElement('div');
  strip.className = 'demo-board-strip';

  if (step.hostMetrics?.length) {
    const metrics = document.createElement('div');
    metrics.className = 'demo-host-metrics';
    step.hostMetrics.forEach((entry) => {
      const card = document.createElement('div');
      card.className = 'demo-host-metric';
      card.innerHTML = `<span>${entry.label}</span><strong>${entry.value}</strong>`;
      metrics.appendChild(card);
    });
    strip.appendChild(metrics);
  }

  if (step.hostTabs?.length) {
    const tabs = document.createElement('div');
    tabs.className = 'demo-host-tabs';
    step.hostTabs.forEach((entry) => {
      const tab = document.createElement('span');
      tab.className = `demo-host-tab${entry.active ? ' active' : ''}`;
      tab.textContent = entry.label;
      tabs.appendChild(tab);
    });
    strip.appendChild(tabs);
  }

  if (step.hostRow?.length) {
    const row = document.createElement('div');
    row.className = 'demo-board-row';
    step.hostRow.forEach((chipData) => {
      const chip = document.createElement('span');
      chip.className = 'demo-chip';
      if (chipData.tone) chip.dataset.tone = chipData.tone;
      chip.textContent = chipData.label;
      row.appendChild(chip);
    });
    strip.appendChild(row);
  }

  if (step.hostPlaces?.length) {
    const places = document.createElement('div');
    places.className = 'demo-board-row';
    step.hostPlaces.forEach((entry) => {
      const pill = document.createElement('span');
      pill.className = 'demo-card-pill';
      pill.textContent = entry.label;
      places.appendChild(pill);
    });
    strip.appendChild(places);
  }

  renderDemoScene(strip, scene);

  if (step.hostProgress?.length) {
    const progress = document.createElement('div');
    progress.className = 'demo-connection-progress';
    step.hostProgress.forEach((entry) => {
      const card = document.createElement('div');
      card.className = `demo-connection-card ${entry.state || 'pending'}`;
      card.innerHTML = `<strong>${entry.title}</strong><span>${entry.text}</span>`;
      progress.appendChild(card);
    });
    strip.appendChild(progress);
  }

  step.hostBoxes.forEach((box) => {
    const boxEl = document.createElement('article');
    boxEl.className = 'demo-stage-box';
    boxEl.innerHTML = `<h4>${box.title}</h4><p>${box.text}</p>`;
    strip.appendChild(boxEl);
  });
  demoHostCardEl.appendChild(strip);

  demoPhoneOneLabelEl.textContent = step.phoneOne.label;
  demoPhoneTwoLabelEl.textContent = step.phoneTwo.label;
  renderDemoPhone(demoPhoneOneEl, step.phoneOne);
  renderDemoPhone(demoPhoneTwoEl, step.phoneTwo);

  demoProgressEl.className = 'recent-card';
  demoProgressEl.innerHTML = `
    <div class="demo-progress-grid">
      <strong>${demoStepIndex + 1} / ${DEMO_STEPS.length}</strong>
      <span>${step.title}</span>
      <span>${demoTimer ? 'Demo läuft automatisch weiter.' : 'Du kannst frei vor- und zurückspringen.'}</span>
    </div>
  `;

  demoPrevBtn.disabled = demoStepIndex === 0;
  demoNextBtn.disabled = demoStepIndex === DEMO_STEPS.length - 1;
}

function setDemoStep(nextIndex) {
  if (nextIndex < 0 || nextIndex >= DEMO_STEPS.length) return;
  demoStepIndex = nextIndex;
  renderDemoStep();
}

function toggleDemoPlayback() {
  if (demoTimer) {
    stopDemoPlayback();
    renderDemoStep();
    return;
  }

  demoPlayBtn.textContent = 'Demo stoppen';
  demoTimer = window.setInterval(() => {
    if (demoStepIndex >= DEMO_STEPS.length - 1) {
      stopDemoPlayback();
      renderDemoStep();
      return;
    }
    demoStepIndex += 1;
    renderDemoStep();
  }, 4600);
  renderDemoStep();
}

function initDemo() {
  if (appScreen !== 'board' || !demoStepListEl) return;

  demoStepListEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-demo-step]');
    if (!button) return;
    stopDemoPlayback();
    setDemoStep(Number(button.dataset.demoStep));
  });

  demoPrevBtn.addEventListener('click', () => {
    stopDemoPlayback();
    setDemoStep(demoStepIndex - 1);
  });

  demoNextBtn.addEventListener('click', () => {
    stopDemoPlayback();
    setDemoStep(demoStepIndex + 1);
  });

  demoPlayBtn.addEventListener('click', () => {
    toggleDemoPlayback();
  });

  renderDemoStep();
}

function render() {
  if (appScreen !== 'board') return;
  renderSetupCoach();
  renderTurnPanel();
  renderHostSummary();
  renderTurnCoach();
  renderPlayerList();
  renderBoard();
  renderLog();
  renderRecentCard();
  renderConnectionList();
  syncAllPhones();
}

function handleBoardConnectionClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const playerIndex = Number(button.dataset.playerIndex);
  if (button.dataset.action === 'create-invite') {
    createPhoneInvite(playerIndex).catch((error) => {
      updateConnectionStatus(playerIndex, 'closed');
      addLog(`Handy-Verbindung für ${getConnectionDisplayName(playerIndex)} fehlgeschlagen: ${error.message}`);
      render();
    });
  }

  if (button.dataset.action === 'copy-link') {
    const connection = hostConnections.get(playerIndex);
    if (!connection?.inviteLink) return;
    copyText(connection.inviteLink);
  }

  if (button.dataset.action === 'apply-answer') {
    const input = connectionListEl.querySelector(`[data-role="answer-input"][data-player-index="${playerIndex}"]`);
    if (!(input instanceof HTMLTextAreaElement) || !input.value.trim()) return;
    applyPhoneAnswer(playerIndex, input.value).catch((error) => {
      addLog(`Antwort-Code für ${getConnectionDisplayName(playerIndex)} konnte nicht übernommen werden: ${error.message}`);
      render();
    });
  }
}

async function initPhoneClient() {
  boardAppEl.classList.add('hidden');
  phoneAppEl.classList.remove('hidden');

  const playerIndex = Number(query.get('player'));
  const offerCode = query.get('offer');
  const sessionId = query.get('session');
  phoneClient.playerIndex = Number.isNaN(playerIndex) ? null : playerIndex;

  if (phoneClient.playerIndex === null || (!offerCode && !sessionId)) {
    phoneStatusTextEl.textContent = 'Diese private Handy-Ansicht braucht einen vollständigen Einladungslink oder QR-Code vom Brett.';
    if (phoneConnectIntroEl) {
      phoneConnectIntroEl.textContent = 'Öffne diese Handy-Ansicht nur über den Link oder QR-Code direkt vom Brett. Erst damit weiss das Spiel, zu wem dieses Handy gehört.';
    }
    phoneAnswerOutputEl.value = 'Noch kein persönlicher Link vom Brett geöffnet.';
    copyPhoneAnswerBtn.hidden = true;
    phoneConnectPanelEl.classList.remove('hidden');
    return;
  }

  if (phoneConnectIntroEl) {
    phoneConnectIntroEl.textContent = sessionId
      ? '1. QR-Code oder Link vom Brett öffnen. 2. Dieses Handy sendet seine Antwort automatisch zurück. 3. Danach öffnet sich die Live-Verbindung von selbst.'
      : '1. Link oder QR-Code vom Brett auf diesem Handy öffnen. 2. Den hier angezeigten Antwort-Code kopieren. 3. Den Code zurück am Brett einfügen.';
  }
  copyPhoneAnswerBtn.hidden = false;

  const pc = new RTCPeerConnection(RTC_CONFIG);
  phoneClient.pc = pc;

  pc.addEventListener('datachannel', (event) => {
    const channel = event.channel;
    phoneClient.channel = channel;
    channel.addEventListener('open', () => {
      phoneConnectPanelEl.classList.add('hidden');
      phoneGamePanelEl.classList.remove('hidden');
      phoneStatusTextEl.textContent = 'Verbindung steht. Deine geheimen Karten und Entscheidungen werden jetzt live mit dem Brett abgeglichen.';
    });
    channel.addEventListener('message', (messageEvent) => {
      let payload;
      try {
        payload = JSON.parse(messageEvent.data);
      } catch {
        return;
      }
      if (payload.type === 'sync') {
        phoneClient.view = payload.view;
        renderPhoneView();
      }
    });
  });

  const offer = sessionId
    ? (await fetchSignalSession(sessionId)).offer
    : await decodeSignalPayload(offerCode);
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  await waitForIceComplete(pc);

  const localDescription = pc.localDescription?.toJSON?.() || pc.localDescription;
  if (sessionId) {
    const sessionData = await fetchSignalSession(sessionId);
    sessionData.answer = localDescription;
    sessionData.answerAt = new Date().toISOString();
    await updateSignalSession(sessionId, sessionData);
    phoneClient.answerCode = '';
    phoneAnswerOutputEl.value = 'Automatisch an das Brett gesendet.';
    copyPhoneAnswerBtn.hidden = true;
    phoneStatusTextEl.textContent = 'Antwort wurde an das Brett gesendet. Die Verbindung öffnet sich automatisch, sobald der Host sie übernimmt.';
  } else {
    phoneClient.answerCode = await encodeSignalPayload(localDescription);
    phoneAnswerOutputEl.value = phoneClient.answerCode;
    copyPhoneAnswerBtn.hidden = false;
    phoneStatusTextEl.textContent = 'Jetzt diesen Code kopieren, am Brett einfügen und dort bestätigen. Danach verbindet sich dieses Handy automatisch.';
  }
}

function sendPhoneMessage(payload) {
  if (!phoneClient.channel || phoneClient.channel.readyState !== 'open') return;
  phoneClient.channel.send(JSON.stringify(payload));
}

function initBoardApp() {
  boardAppEl.classList.remove('hidden');
  phoneAppEl.classList.add('hidden');

  pageNavButtonsEl?.addEventListener('click', (event) => {
    const button = event.target.closest('.page-nav-btn');
    if (!button) return;
    stopDemoPlayback();
    setBoardView(button.dataset.view);
  });

  [...document.querySelectorAll('.host-disclosure')].forEach((section) => {
    section.addEventListener('toggle', () => {
      if (!(section instanceof HTMLDetailsElement) || !section.open) return;
      const panel = section.dataset.panel;
      if (!panel) return;
      currentHostPanel = panel;
      [...document.querySelectorAll('.host-disclosure')].forEach((other) => {
        if (other !== section && other instanceof HTMLDetailsElement) {
          other.open = false;
        }
      });
    });
  });

  playerCountPicker.addEventListener('click', (event) => {
    const button = event.target.closest('.count-btn');
    if (!button) return;
    selectedPlayerCount = Number(button.dataset.count);
    [...playerCountPicker.querySelectorAll('.count-btn')].forEach((entry) => {
      entry.classList.toggle('active', entry === button);
    });
    renderPlayerInputs();
    renderConnectionList();
    renderSetupCoach();
  });

  gameModePickerEl?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-mode]');
    if (!button) return;
    selectedGameMode = button.dataset.mode;
    renderGameModePicker();
  });

  phoneModeToggleEl.addEventListener('change', () => {
    phoneModeEnabled = phoneModeToggleEl.checked;
    state.phoneMode = phoneModeEnabled;
    render();
  });

  connectionListEl.addEventListener('click', handleBoardConnectionClick);

  newGameBtn.addEventListener('click', startNewGame);
  openPhoneConnectBtn?.addEventListener('click', openPhoneConnectionsView);
  openGameBoardBtn?.addEventListener('click', openCurrentTurnView);
  jumpToTurnBtn?.addEventListener('click', openCurrentTurnView);
  jumpToPhonesBtn?.addEventListener('click', openPhoneConnectionsView);

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
    if (usesPhoneTurnControl()) return;
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
  renderGameModePicker();
  setBoardView(currentBoardView);
  setHostPanel(currentHostPanel);
  renderConnectionList();
  initDemo();
  startNewGame();
  setBoardView('start');
}

function initPhoneApp() {
  phoneAppEl.classList.remove('hidden');
  boardAppEl.classList.add('hidden');

  copyPhoneAnswerBtn.addEventListener('click', () => {
    if (phoneClient.answerCode) {
      copyText(phoneClient.answerCode);
    }
  });

  phoneHandAreaEl.addEventListener('click', (event) => {
    const button = event.target.closest('.phone-action-card');
    if (!button) return;
    phoneClient.pendingInfluenceCardId = null;
    renderPhoneView();
    sendPhoneMessage({ type: 'select-card', cardId: button.dataset.cardId });
  });

  phoneInfluenceAreaEl.addEventListener('click', (event) => {
    const button = event.target.closest('.phone-influence-card');
    if (!button || button.disabled) return;
    if (button.dataset.target === 'self') {
      phoneClient.pendingInfluenceCardId = null;
      renderPhoneView();
      sendPhoneMessage({ type: 'play-influence', cardId: button.dataset.cardId });
      return;
    }
    phoneClient.pendingInfluenceCardId = button.dataset.cardId;
    renderPhoneView();
  });

  phoneActionOptionsEl.addEventListener('click', (event) => {
    const optionButton = event.target.closest('.action-option-btn');
    if (optionButton) {
      sendPhoneMessage({ type: 'select-option', optionId: optionButton.dataset.optionId });
      return;
    }

    const targetButton = event.target.closest('.phone-choice-chip');
    if (targetButton && phoneClient.pendingInfluenceCardId) {
      sendPhoneMessage({
        type: 'play-influence',
        cardId: phoneClient.pendingInfluenceCardId,
        targetPlayerIndex: Number(targetButton.dataset.targetPlayerIndex)
      });
      phoneClient.pendingInfluenceCardId = null;
      renderPhoneView();
      return;
    }

    const pieceButton = event.target.closest('.phone-piece-card');
    if (pieceButton) {
      sendPhoneMessage({
        type: 'select-token',
        playerIndex: Number(pieceButton.dataset.playerIndex),
        pieceId: pieceButton.dataset.pieceId
      });
    }
  });

  initPhoneClient().catch((error) => {
    phoneStatusTextEl.textContent = `Handy-Verbindung fehlgeschlagen: ${error.message}`;
  });
}

if (appScreen === 'phone') {
  initPhoneApp();
} else {
  initBoardApp();
}
