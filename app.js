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
        'In einer Heilanstalt beziehungsweise Anstalt geistiger Umnachtung.',
        'Auf einem Schiff nach Übersee.',
        'Als Einsiedler im märkischen Forst.'
      ],
      correct: 1,
      explanation: 'Der Schluss rahmt Thiel als endgültig zerstörte Figur im Anstaltskontext.',
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
      title: 'Anstaltsende',
      prompt: 'Wie lässt sich das Ende in der Anstalt literarisch deuten?',
      options: [
        'Als glückliche Genesung und Wiedereingliederung.',
        'Als endgültige Pathologisierung einer von Milieu und Schuld zerstörten Figur.',
        'Als humorvolle Pointe ohne Tragweite.',
        'Als Beweis dafür, dass alles nur geträumt war.'
      ],
      correct: 1,
      explanation: 'Die Anstalt markiert keinen Ausweg, sondern die letzte Form des Zusammenbruchs.',
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

const boardAppEl = document.getElementById('boardApp');
const phoneAppEl = document.getElementById('phoneApp');
const pageNavButtonsEl = document.getElementById('pageNavButtons');
const boardEl = document.getElementById('board');
const playerInputsEl = document.getElementById('playerInputs');
const playerCountPicker = document.getElementById('playerCountPicker');
const gameModePickerEl = document.getElementById('gameModePicker');
const gameModeDescriptionEl = document.getElementById('gameModeDescription');
const newGameBtn = document.getElementById('newGameBtn');
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
const hostPanelTabsEl = document.getElementById('hostPanelTabs');

const phoneTitleEl = document.getElementById('phoneTitle');
const phoneStatusTextEl = document.getElementById('phoneStatusText');
const phoneConnectPanelEl = document.getElementById('phoneConnectPanel');
const phoneAnswerOutputEl = document.getElementById('phoneAnswerOutput');
const copyPhoneAnswerBtn = document.getElementById('copyPhoneAnswerBtn');
const phoneGamePanelEl = document.getElementById('phoneGamePanel');
const phonePlayerChipEl = document.getElementById('phonePlayerChip');
const phoneTurnHintEl = document.getElementById('phoneTurnHint');
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
    text: 'Zu Beginn legst du 2 bis 4 Spielende fest und öffnest die Ansicht gezielt über die Schnellnavigation. Für Unterricht und Präsentation ist dieser Einstieg jetzt klarer aufgebaut: Das Host-Brett bleibt öffentlich, die frühere rechte Leiste ist in eine Host-Konsole unter dem Spielfeld gewandert, und die privaten Handys werden per QR-Code verbunden.',
    notes: [
      'Schnellnavigation reduziert Scrollen',
      'Host-Konsole statt rechter Menüleiste',
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
      { label: 'Zug' },
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
      { title: 'Host-Konsole', text: 'Im Tab "Handys" erzeugt das Brett pro Person einen Einladungslink mit QR-Code und wartet anschliessend auf den Antwort-Code.' }
    ],
    hostRow: [
      { label: 'Tab "Spiel" aktiv', tone: 'gelb' },
      { label: 'Signalrot bereit', tone: 'rot' },
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
    text: 'Zu Beginn einer Kartenrunde zieht jede Person ihre DOG-inspirierten Aktionskarten. Über die Schnellnavigation kann die Präsentation nun direkt im Spielbereich bleiben: Das Publikum sieht am Host nur die Kerndaten der Runde, während die konkrete Kartenhand und ein Teil der offenen Infos auf die Handys ausgelagert sind.',
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
      { label: 'Zug', active: true },
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
      { label: 'Zug bei Signalrot', tone: 'rot' }
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
      { label: 'Zug' },
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
    text: 'Die geheime Karte wird am Handy gewählt, aber die Figur selbst ziehst du weiterhin auf dem zentralen Brett. Gerade in der neuen Fassung ist dieser Moment stärker hervorgehoben: Das Host-Brett arbeitet mit klareren Feldern, Badges und Markierungen, während Zusatzinfos platzsparend in der Host-Konsole unter dem Spielfeld liegen.',
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
      { label: 'Zug', active: true },
      { label: 'Spielstand' },
      { label: 'Letzte Karte' },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Host-Brett', text: 'Nach der Handy-Auswahl leuchten die möglichen Figuren auf, und Spezialfelder springen optisch stärker ins Auge.' },
      { title: 'Host-Konsole', text: 'Spielstand, letzte Karte und Protokoll bleiben unter dem Brett erreichbar, ohne dem Spielfeld Raum zu nehmen.' }
    ],
    hostRow: [
      { label: 'Startfeld', tone: 'rot' },
      { label: 'Literaturfeld in Reichweite', tone: 'gelb' },
      { label: 'Gegnerfigur bedroht', tone: 'blau' },
      { label: 'Markierung aktiv', tone: 'gruen' }
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
      { label: 'Zug' },
      { label: 'Spielstand' },
      { label: 'Letzte Karte', active: true },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Öffentliche Karte', text: 'Die Gruppe sieht die Frage und die Erklärung gemeinsam am Host.' },
      { title: 'Belohnung oder Blockade', text: 'Schutz, Erkenntnis oder Bonusfeld werden sofort sichtbar verbucht.' }
    ],
    hostRow: [
      { label: 'Textkarte', tone: 'gelb' },
      { label: 'Erklärung eingeblendet', tone: 'gruen' },
      { label: 'Bonus sichtbar', tone: 'rot' }
    ],
    phoneOne: {
      label: 'Signalrot',
      status: 'Die Spielfigur erreicht ein Literaturfeld.',
      cards: [
        { title: 'Textkarte', text: 'Warum heiratet Thiel nach Minnas Tod erneut? Ideal als kurzer Gesprächsimpuls.', kind: 'quiz' },
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
    text: 'Nach dem ausgespielten Zug geht die Runde zur nächsten Person weiter. Sobald alle Hände leer sind, wird neu ausgeteilt. Gewonnen hat, wer alle vier Figuren in die Zielstation bringt. Für eine Einführung fasst dieser letzte Schritt noch einmal den ganzen Zyklus zusammen: Navigation, QR-Kopplung, geheime Kartenwahl, öffentlicher Brettzug, Host-Konsole und literarische Auswertung.',
    notes: [
      'Rundenfolge 6-5-4-3-2-1 bleibt bestehen',
      'Neue Kartenrunde nach leerer Hand',
      'Spielstand kann aus der Host-Konsole oder vom Handy verfolgt werden',
      'Sieg mit vier Figuren im Ziel'
    ],
    hostTitle: 'Kompletter Spielzyklus',
    hostMetrics: [
      { label: 'Am Zug', value: 'Nächste Person' },
      { label: 'Runde', value: '5' },
      { label: 'Handys', value: '2 / 2' }
    ],
    hostTabs: [
      { label: 'Zug' },
      { label: 'Spielstand', active: true },
      { label: 'Letzte Karte' },
      { label: 'Protokoll' },
      { label: 'Handys' }
    ],
    hostBoxes: [
      { title: 'Rundenwechsel', text: 'Nächste Person wird aktiv, neue geheime Auswahl beginnt.' },
      { title: 'Siegbedingung', text: 'Vier eigene Figuren in der Zielstation beenden die Partie.' }
    ],
    hostRow: [
      { label: 'Neue Runde 5 Karten', tone: 'gelb' },
      { label: 'Zielstation 4/4', tone: 'rot' }
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
}

function renderGameModePicker() {
  if (!gameModePickerEl || !gameModeDescriptionEl) return;
  const mode = getModeConfig(selectedGameMode);
  [...gameModePickerEl.querySelectorAll('[data-mode]')].forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === selectedGameMode);
  });
  gameModeDescriptionEl.innerHTML = `<strong>${mode.title}</strong><p>${mode.description}</p>`;
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

    turnHintEl.textContent = state.phoneMode && isPhoneConnected(state.currentPlayer)
      ? `${player.name} wählt die geheime Aktionskarte auf dem Handy.`
      : `${player.name} wählt eine DOG-Aktionskarte.`;
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
  setHostPanel('zug');
  setBoardView('spiel');
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
    if (success) finishPlayedCard();
  }
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
    const rewardText = applyLiteratureRewardConsideringBlock(pending.playerIndex, pending.pieceId, card.reward, false);
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
    rewardText = applyLiteratureRewardConsideringBlock(pending.playerIndex, pending.pieceId, card.reward, true);
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

function renderHiddenHandMessage(player) {
  handAreaEl.innerHTML = '';
  const info = document.createElement('div');
  info.className = 'recent-card';
  info.innerHTML = `<h3>${player.hand.length} geheime Karten</h3><p>Diese Aktionshand ist nur auf ${player.name}s Handy sichtbar.</p>`;
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
    activeCardSummaryEl.textContent = state.phoneMode && isPhoneConnected(state.currentPlayer)
      ? 'Die geheime Aktionskarte wird auf dem Handy gewählt.'
      : 'Wähle eine spielbare Aktionskarte aus deiner Hand.';
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
        centerSub.textContent = `${state.players.reduce((sum, player) => sum + player.pieces.filter((piece) => piece.steps === 44).length, 0)} Figuren im Ziel · ${getModeConfig(state.modeKey).label}`;
        cell.append(centerTitle, centerSub);
      }

      boardEl.appendChild(cell);
    }
  }
}

function getConnectionDisplayName(playerIndex) {
  return state.players[playerIndex]?.name || getConfiguredName(playerIndex, PLAYER_PRESETS[playerIndex].defaultName);
}

function getBaseBoardUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function getQrCodeUrl(value) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(value)}`;
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

  if (hostPanelTabsEl) {
    [...hostPanelTabsEl.querySelectorAll('.host-panel-tab')].forEach((button) => {
      button.classList.toggle('active', button.dataset.panel === panel);
    });
  }

  ['zug', 'spielstand', 'letzte', 'protokoll', 'handys'].forEach((name) => {
    const pane = document.getElementById(`hostPane-${name}`);
    if (!pane) return;
    pane.classList.toggle('hidden', name !== panel);
  });
}

function encodeSignalPayload(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function decodeSignalPayload(value) {
  return JSON.parse(decodeURIComponent(escape(atob(value))));
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
  const offerCode = encodeSignalPayload(localDescription);
  const inviteLink = `${getBaseBoardUrl()}?screen=phone&player=${playerIndex}&offer=${encodeURIComponent(offerCode)}`;

  updateConnectionStatus(playerIndex, 'offer-ready', {
    pc,
    channel,
    offerCode,
    inviteLink
  });
}

async function applyPhoneAnswer(playerIndex, answerText) {
  const connection = hostConnections.get(playerIndex);
  if (!connection?.pc) return;

  const answer = decodeSignalPayload(answerText.trim());
  await connection.pc.setRemoteDescription(answer);
  updateConnectionStatus(playerIndex, 'awaiting-open', { answerDraft: answerText.trim() });
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
      <span>Das Brett erstellt pro Spielperson einen privaten Handy-Link.</span>
    </div>
    <div class="connect-step">
      <strong>2. QR scannen</strong>
      <span>Am einfachsten den QR-Code mit der Handy-Kamera öffnen oder den Link kopieren.</span>
    </div>
    <div class="connect-step">
      <strong>3. Antwort-Code zurück</strong>
      <span>Das Handy zeigt danach einen Antwort-Code, den du hier am Brett einfügst, damit die Verbindung live startet.</span>
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
        ? 'Handy geöffnet, warte auf Antwort'
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
        text: connection?.status === 'connected' ? 'Brett und Handy synchron' : hasAnswer ? 'Code liegt vor, Verbindung startet' : 'Antwort-Code fehlt noch',
        state: connection?.status === 'connected' ? 'done' : hasAnswer ? 'current' : 'pending'
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
    inviteBtn.textContent = connection?.inviteLink ? 'Einladung neu erzeugen' : 'Einladung erzeugen';
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
      applyBtn.textContent = 'Code übernehmen und verbinden';
      answerButtons.appendChild(applyBtn);
      left.appendChild(answerButtons);

      const qrBox = document.createElement('div');
      qrBox.className = 'qr-box';
      qrBox.innerHTML = `
        <img src="${getQrCodeUrl(connection.inviteLink)}" alt="QR-Code für ${getConnectionDisplayName(playerIndex)}" />
        <p>Mit der Handy-Kamera scannen oder alternativ den Link kopieren. Danach den Antwort-Code vom Handy wieder links einfügen.</p>
      `;

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

  if (payload.type === 'play-influence' && playerIndex === state.currentPlayer) {
    playInfluenceCard(playerIndex, payload.cardId, payload.targetPlayerIndex);
  }
}

function renderPhoneView() {
  if (appScreen !== 'phone') return;

  const view = phoneClient.view;
  if (!view) {
    phoneStatusTextEl.textContent = 'Warte auf die erste Synchronisation vom Brett.';
    phoneGamePanelEl.classList.add('hidden');
    return;
  }

  phoneGamePanelEl.classList.remove('hidden');
  phoneTitleEl.textContent = `${view.name} · geheime Karten`;
  phoneStatusTextEl.textContent = view.isCurrentTurn
    ? 'Du bist am Zug. Wähle deine geheime Aktions- oder Einflusskarte direkt hier.'
    : `${view.turnOwner} ist am Zug. Deine privaten Karten bleiben auf diesem Handy gespeichert.`;
  phonePlayerChipEl.textContent = view.name;
  phonePlayerChipEl.dataset.tone = view.tone;
  phoneTurnHintEl.textContent = view.turnHint;

  phoneHandAreaEl.innerHTML = '';
  view.hand.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'phone-action-card';
    button.dataset.cardId = card.uid;
    if (card.selected) button.classList.add('selected');
    button.disabled = !view.isCurrentTurn || !card.playable || view.gameOver;
    button.innerHTML = `<strong>${card.label}</strong><span>${card.summary}</span>`;
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
    button.innerHTML = `<strong>${card.label}</strong><span>${card.summary}</span>`;
    phoneInfluenceAreaEl.appendChild(button);
  });

  phoneActiveCardEl.className = view.activeCard ? 'recent-card' : 'recent-card empty';
  phoneActiveCardEl.innerHTML = view.activeCard
    ? `<h3>${view.activeCard.label}</h3><p>${view.activeCard.summary}</p>`
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
    phoneActionHintEl.textContent = 'Nach der Brettauswahl kannst du die Split-Höhe hier festlegen.';
    view.splitOptions.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-option-btn';
      button.dataset.optionId = option.id;
      button.textContent = option.label;
      phoneActionOptionsEl.appendChild(button);
    });
  } else {
    phoneActionHintEl.textContent = 'Wenn mehrere Varianten möglich sind, erscheinen sie hier.';
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

function renderDemoStep() {
  if (appScreen !== 'board' || !demoStepListEl) return;
  const step = DEMO_STEPS[demoStepIndex];

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
  }, 3800);
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
  renderTurnPanel();
  renderHostSummary();
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
  phoneClient.playerIndex = Number.isNaN(playerIndex) ? null : playerIndex;

  if (phoneClient.playerIndex === null || !offerCode) {
    phoneStatusTextEl.textContent = 'Diese private Handy-Ansicht braucht einen vollständigen Einladungslink oder QR-Code vom Brett.';
    phoneConnectPanelEl.classList.add('hidden');
    return;
  }

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

  const offer = decodeSignalPayload(offerCode);
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  await waitForIceComplete(pc);

  const localDescription = pc.localDescription?.toJSON?.() || pc.localDescription;
  phoneClient.answerCode = encodeSignalPayload(localDescription);
  phoneAnswerOutputEl.value = phoneClient.answerCode;
  phoneStatusTextEl.textContent = 'Jetzt diesen Code kopieren, am Brett einfügen und dort bestätigen. Danach verbindet sich dieses Handy automatisch.';
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

  hostPanelTabsEl?.addEventListener('click', (event) => {
    const button = event.target.closest('.host-panel-tab');
    if (!button) return;
    setHostPanel(button.dataset.panel);
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
  renderGameModePicker();
  setBoardView(currentBoardView);
  setHostPanel(currentHostPanel);
  renderConnectionList();
  initDemo();
  startNewGame();
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
