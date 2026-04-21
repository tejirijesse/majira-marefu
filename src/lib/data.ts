// Majira Marefu — content layer.
// In production this would come from Sanity CMS. Kept flat and editable here
// while the CMS is not wired yet.

export type TierSlug = 'mwanzo' | 'pwani' | 'safari' | 'marefu';

export interface Tier {
  slug: TierSlug;
  name: string;
  translation: string;
  roman: string;
  tagline: string;
  nights: number;
  priceUSD: number;
  capacity: number;
  window: string;
  heroImage: string;
  images: { src: string; alt: string; caption: string }[];
  narrative: string[]; // paragraphs
  inclusions: string;
  notIncluded: string;
  ctaType: 'reserve' | 'apply';
}

export const TIERS: Record<TierSlug, Tier> = {
  mwanzo: {
    slug: 'mwanzo',
    name: 'Mwanzo',
    translation: 'The beginning',
    roman: 'Journey I',
    tagline:
      'Seven nights between Nairobi and the Mara. A gentle entry into the season — highlands, grasslands, one long dinner under the acacia.',
    nights: 7,
    priceUSD: 4500,
    capacity: 16,
    window: 'August 22–29, 2027',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=2000&q=80',
        alt: 'Coffee and morning light in Karen.',
        caption: 'Karen, the first morning',
      },
      {
        src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80',
        alt: 'Acacia trees at dusk in the Mara.',
        caption: 'Mara, day four',
      },
    ],
    narrative: [
      'The first journey is the shortest, and for most guests, the one that ends too soon. Mwanzo means the beginning, and it is deliberately that — an entry into the season that does not ask too much of you on arrival.',
      'You land in Nairobi on a Sunday evening. You are collected, driven slowly home through Karen, and put to bed in a room that smells of coffee and old wood. There is no welcome event. There is no briefing. There is a note on your pillow with the time breakfast is served, and that is all you are asked to remember.',
      'Three nights in Nairobi. Walks through Karura forest in the morning. An afternoon at the Nairobi National Museum with a historian who treats it as a private conversation. A welcome dinner on the fourth night under jacaranda — the first time you meet everyone at once, and the last time it will feel like that many people.',
      'Then we move. A charter flight into the Mara, four nights at a small tented camp on a conservancy our team has worked with for a decade. Game drives at dawn and dusk. Long, idle afternoons. One sundowner, no more, so that the silence has a chance to land.',
    ],
    inclusions:
      'All accommodation in Nairobi and the Mara, transfers by road and air, every meal on property, a welcome dinner and two guided excursions in Nairobi, and daily game drives in the Mara with a private guide. Drinks are included on property. A conservancy fee is built into the price. A pre-arrival call with the director the week before you travel.',
    notIncluded: 'Flights to Nairobi, travel insurance (required), and anything the spirit of the moment prompts you to buy along the way.',
    ctaType: 'reserve',
  },
  pwani: {
    slug: 'pwani',
    name: 'Pwani',
    translation: 'The coast',
    roman: 'Journey II',
    tagline:
      'Twelve nights along the old swahili coast — Lamu, Shela, the northern reefs, and a long sail down to Zanzibar.',
    nights: 12,
    priceUSD: 9800,
    capacity: 20,
    window: 'August 29 – September 10, 2027',
    heroImage: 'https://images.unsplash.com/photo-1589182337358-2cb63099350c?auto=format&fit=crop&w=2400&q=80',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=2000&q=80',
        alt: 'Turquoise water and dhow.',
        caption: 'Pate channel, morning sail',
      },
      {
        src: 'https://images.unsplash.com/photo-1565007548041-a4caac3d2100?auto=format&fit=crop&w=2000&q=80',
        alt: 'Carved swahili door in Stone Town.',
        caption: 'Stone Town, a door',
      },
    ],
    narrative: [
      'Pwani is the coast — not just any coast, but the one that has been a coast for a thousand years. Stone houses, carved doors, the call to prayer at five in the afternoon, a language soft at the edges from all the ships that passed through it.',
      'You arrive into Lamu on a short flight from Nairobi. A dhow meets you at the jetty. The captain is Juma, and over the next twelve nights you will be on his boat more than you expected and he will be funnier than his face suggests.',
      'Six nights in a house in Shela with a pool that stays in shadow until noon. Mornings are for the beach at Manda Toto, for walking into Lamu town on the sand road, for a breakfast that takes two hours. Afternoons are for sleeping with the shutters half-closed. Evenings are for the swahili table, where Salma cooks.',
      "Then we move south. A long day's sail to the reefs at Kilifi. Two nights at a small house above the creek. A final four nights in Zanzibar, divided between Stone Town and a quiet bay on the east coast, where the closing dinner is held at low tide, on the sand, with every hand from the journey in attendance.",
    ],
    inclusions:
      'All accommodation across Lamu, Kilifi, and Zanzibar, all domestic transfers by air and sea, a private dhow at your disposal for the twelve nights, every meal on property, a daily boatman and guide, and one open excursion in each location — a reef dive, a spice farm walk, a dinner in a private home, whatever your week calls for. Drinks on property are included.',
    notIncluded: 'International flights, travel insurance (required), and anything you cannot help buying in Stone Town, which is most things.',
    ctaType: 'reserve',
  },
  safari: {
    slug: 'safari',
    name: 'Safari',
    translation: 'The voyage',
    roman: 'Journey III',
    tagline:
      'Eighteen nights. The full arc — highlands, grasslands, coast, islands. The journey most guests end up wishing they had taken.',
    nights: 18,
    priceUSD: 16500,
    capacity: 16,
    window: 'August 22 – September 10, 2027',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=2000&q=80',
        alt: 'Highland coffee at dawn.',
        caption: 'Nairobi, the morning you leave for the Mara',
      },
      {
        src: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=2000&q=80',
        alt: 'Evening on the Zanzibar coast.',
        caption: 'Zanzibar, the closing week',
      },
    ],
    narrative: [
      'Safari — the word the world borrowed — once simply meant a journey. Not a holiday. Not an excursion. A moving. A crossing from one place to another, with intent.',
      'This is the journey that carries you from savannah to sea. You begin in Nairobi with the Mwanzo guests, move with them into the Mara for four nights of grasslands, and then continue when they return home — down to the coast, out onto the dhow, all the way to Zanzibar for the closing week. Eighteen nights. The shape the season was first drawn at.',
      'Three nights in Nairobi. Four in the Mara. Six in Lamu — split between the house in Shela and a quiet night on the water. Two in Kilifi, which is a short stop that many guests remember as the centre of the journey. Three closing nights in Zanzibar, ending at the long table on the sand.',
      'The Safari is the arc most guests wish, in retrospect, they had taken instead of a shorter journey. It gives the season the length it needs to become something more than a trip — a stretch of time long enough to change the pace you read at, the pace you eat at, the pace you reply to messages at.',
    ],
    inclusions:
      'All accommodation across Nairobi, the Mara, Lamu, Kilifi, and Zanzibar. All internal flights and transfers. A private dhow for the coastal week. Daily game drives with a private guide in the Mara. Every meal on property, drinks included. Two guided excursions in each location. A mid-journey rest day on which nothing whatsoever is planned. A pre-arrival call with the director.',
    notIncluded:
      'International flights to Nairobi and out of Zanzibar, travel insurance (required), and the few small things — a book from the Lamu bookseller, a kanga from Stone Town — that most guests quietly carry home.',
    ctaType: 'reserve',
  },
  marefu: {
    slug: 'marefu',
    name: 'Marefu',
    translation: 'The long one',
    roman: 'Journey IV',
    tagline:
      'Thirty nights. Twelve seats. The season held at its intended length — with the additional stretches, the smaller rooms, and the parts nobody else sees.',
    nights: 30,
    priceUSD: 25000,
    capacity: 12,
    window: 'August 22 – September 21, 2027',
    heroImage: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=2400&q=80',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?auto=format&fit=crop&w=2000&q=80',
        alt: 'Quiet farm table at dusk.',
        caption: 'Pemba, the writing week',
      },
      {
        src: 'https://images.unsplash.com/photo-1565007548041-a4caac3d2100?auto=format&fit=crop&w=2000&q=80',
        alt: 'Carved door in Stone Town.',
        caption: 'Stone Town, the private house',
      },
    ],
    narrative: [
      'The word marefu means the long ones. The long days, the long seasons, the long friendships. This is the journey for which the whole chapter is named, and it is the one we run for twelve guests only. It is by application.',
      'It contains everything in the Safari arc, and then continues — twelve more nights divided between Pemba, a writing week on a farm outside Stone Town, and a small closing gathering at a private house in Shela that is never on the itinerary.',
      'The twelve guests on Marefu have the run of the whole season. You join the short-journey guests when it suits you and step back when it does not. You have a room kept for you at each location for the full thirty nights. You have a pre-journey dinner in your home city with the director, wherever you live. You have an interview afterwards, for our quiet archive. And if the season works the way we think it will, you have a place on the next one without applying again.',
      'The additional stretches are not decorative. The Pemba days are for rest. The writing week is for a small correspondence with Amani, our poet in residence, on whatever the journey has surfaced. The closing gathering is quiet. We do not photograph it.',
    ],
    inclusions:
      'Everything in the Safari journey, plus the twelve additional nights across Pemba, the writing farm, and Shela. A private driver and guide for the full thirty days. A pre-journey dinner in your home city. All meals, all transfers, all drinks on property. A one-hour interview three months after you return home, held wherever you prefer. First right of refusal on the 2028 season.',
    notIncluded: 'International flights, travel insurance (required), and the slow loss of whatever you thought urgent before you arrived.',
    ctaType: 'apply',
  },
};

export const TIER_ORDER: TierSlug[] = ['mwanzo', 'pwani', 'safari', 'marefu'];

// ——— Arc stops ———
export interface ArcStop {
  idx: string;
  name: string;
  category: string;
  short: string;
  long: string[];
  image: string;
}

export const ARC_STOPS: ArcStop[] = [
  {
    idx: 'Stop I',
    name: 'Nairobi',
    category: 'Highlands',
    short: 'Three nights at altitude. The beginning of every journey. Coffee on the verandah, long walks through Karura, a welcome dinner under jacaranda where nobody has to perform.',
    long: [
      "We begin in Nairobi because it is where most journeys begin, and because the altitude resets you faster than you think. You arrive on a Sunday. You sleep. You do not need to be anywhere for twelve hours.",
      'The first morning is coffee in the garden — single estate, roasted by a friend in Karen — and a slow walk through Karura forest. Lunch is in town at a table the whole journey shares. The afternoon belongs to you. The welcome dinner is on night three, under jacaranda, and nobody is asked to introduce themselves formally. You will remember the names anyway.',
      'We leave for the Mara on the fourth morning. It is a short flight. You take very little with you.',
    ],
    image: 'https://images.unsplash.com/photo-1571406252267-b6e4a90d1c89?auto=format&fit=crop&w=2400&q=80',
  },
  {
    idx: 'Stop II',
    name: 'Mara',
    category: 'The grasslands',
    short: 'Five nights in the grasslands during the tail of the great migration. Tented camp, private guides, nights around the fire with stories that do not belong on the internet.',
    long: [
      'Four to five nights on a conservancy our team has worked with for a decade. A tented camp for sixteen guests, never more. Two game drives a day — one at dawn, one at dusk — with private guides who grew up on this land.',
      "The middle afternoon of each day is unstructured. Some guests read. Some nap. Some ride out in a small group to see a particular tree a particular guide has been wanting to show them. There is no photography workshop. There is no cocktail hour. There is a fire, and people gather around it when it gets cold, and that is enough.",
      'We fly back through Nairobi on the way to the coast. You do not notice the journey.',
    ],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80',
  },
  {
    idx: 'Stop III',
    name: 'Lamu',
    category: 'The coast',
    short: "Twelve nights along the old coast. Dhow sailing, the swahili table, afternoons in which nothing is scheduled. A long walk through Shela. Bats at dusk.",
    long: [
      'Six nights in a house in Shela. Six more split between the reefs at Kilifi and a quiet stretch of the Zanzibar coast. The dhow is our captain Juma, who has been sailing these waters his entire life and will teach anyone who asks how to read the wind off the sail.',
      "Mornings are for the beach at Manda Toto, or for a walk through Lamu town on the sand road, or for a breakfast that takes two hours. The afternoons are for sleeping with the shutters half-closed. The evenings are for the swahili table, where Salma cooks, and no one gets up until the mosquitoes do.",
      'This is the part of the journey most people remember most clearly, and the part we had to add the most beds to, because the first year everyone asked to stay longer.',
    ],
    image: 'https://images.unsplash.com/photo-1589182337358-2cb63099350c?auto=format&fit=crop&w=2400&q=80',
  },
  {
    idx: 'Stop IV',
    name: 'Zanzibar',
    category: 'The islands',
    short: "Ten nights in the spice islands. Stone Town at its quietest hour. A long table on the sand. The closing dinner — and, if you've earned it, a short postscript on Pemba.",
    long: [
      "Four nights in Zanzibar for the short journeys, ten for the long. Stone Town at its quietest hour — a Wednesday morning, before the cruise ships — with our historian Zuberi, who walks slowly and knows every corner. A spice farm visit if you want it, no pressure if you don't.",
      'The east coast for the rest of the week. A house on a bay. The closing dinner is on the sand, at low tide, every hand from the journey at the table. It runs long. The bioluminescence is optional but usually unavoidable.',
      'For the Marefu guests, a short crossing to Pemba for a final week of rest, writing, and a private closing gathering we do not photograph.',
    ],
    image: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?auto=format&fit=crop&w=2400&q=80',
  },
];

// ——— The Hand (people) ———
export interface Person {
  name: string;
  role: string;
  shortBio: string;
  longBio: string[];
  portrait: string;
}

export const PEOPLE: Person[] = [
  {
    name: 'Wanjiru',
    role: 'Host · Nairobi',
    shortBio: 'Runs the house in Karen. Decides when the day starts. Has strong opinions about coffee and softer ones about everything else.',
    longBio: [
      'Wanjiru grew up in Nyeri and moved to Nairobi when she was twenty. The house in Karen has been a version of itself for twelve years, and a version where paying guests stayed for the last five.',
      'She believes the first twenty-four hours of any journey set the temperature for what follows, and she runs those hours like a conductor. By the second morning, no one is on a schedule anymore.',
    ],
    portrait: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Lemayian',
    role: 'Guide · Mara',
    shortBio: 'Born in the grasslands. Can read the wind and read a room with roughly equal skill. Leads the Mara week.',
    longBio: [
      'Lemayian is a third-generation Maasai guide, born in a boma within sight of the conservancy where we camp. He is quiet on the first drive and rarely quiet after that. He carries a pair of old binoculars and a notebook full of bird sightings that go back nineteen years.',
      "He does not like to talk about what he knows. He shows it, by stopping the vehicle at exactly the right moment, for a lion you did not see and cannot believe you missed.",
    ],
    portrait: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Salma',
    role: 'Chef · Lamu',
    shortBio: 'Cooks the swahili table. Will not let you leave hungry. Will not let you into the kitchen, either.',
    longBio: [
      "Salma's grandmother taught her to cook, and her grandmother's grandmother taught her grandmother. The swahili table is a lineage of recipes more than it is a menu. She will not write them down. She says if you learn the recipe from the paper you will make it like the paper.",
      'Every guest leaves with one dish they did not know they needed, and several they will try to replicate at home.',
    ],
    portrait: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Juma',
    role: 'Captain · Lamu–Zanzibar',
    shortBio: 'Fourth-generation dhow sailor. Reads the monsoons. Silent at the right times and funny at the wrong ones.',
    longBio: [
      'Juma has sailed the coast between Lamu and Zanzibar almost continuously for thirty-two years. His family built dhows for the three generations before that. He can read a wind change before it arrives and generally will not tell you he did.',
      "He is the quiet centre of the coastal week. If you ask him a question about navigation he will answer in a single sentence. If you ask him about his family he will talk for an hour.",
    ],
    portrait: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Amani',
    role: 'Writer in residence',
    shortBio: 'Poet, essayist, quiet presence. Hosts the evening readings. Does not assign homework.',
    longBio: [
      'Amani is the season\'s writer in residence and a published poet in three languages. She hosts two readings per journey, one open and one closed, and is available for conversation by prior arrangement.',
      'For Marefu guests, Amani conducts a small written correspondence over the thirty days, three letters in total, on whatever the journey has begun to surface. It is not a workshop. It is not optional, either — but most guests find it the best part.',
    ],
    portrait: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Zuberi',
    role: 'Historian · Zanzibar',
    shortBio: 'Knows every corner of Stone Town and the story behind each one. Walks slowly, on purpose.',
    longBio: [
      "Zuberi is a historian at the university and has been our Stone Town guide since the first journey. He walks slowly because he wants you to notice the carved doors, and because he wants you to ask about them.",
      "He is particularly good on the less-visited parts of the Swahili Coast's history — the ones that do not flatter anyone, and therefore do not get told as often.",
    ],
    portrait: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Naserian',
    role: 'Conservation · Mara',
    shortBio: 'Runs the rangeland project. Will take the serious-minded on a morning patrol. Will answer hard questions plainly.',
    longBio: [
      'Naserian leads a community rangeland project on the conservancy we work with. She is one of a generation of women who are now running what their grandfathers ran — and she is candid about the compromises it involves.',
      "If you want to know how conservation tourism actually funds conservation, and what it does not, she is the person to ask. She will not give you the glossy version.",
    ],
    portrait: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Aziza',
    role: 'Steward · Zanzibar',
    shortBio: 'Keeps the island week together. Knows where the good coconut water is. Will not tell you.',
    longBio: [
      'Aziza runs the Zanzibar week with a light, unshowy hand. She is the person who notices when a guest has been quiet at three consecutive dinners, and the person who will suggest a private lunch with two people she thinks they would like.',
      "Her coconut water source is legendary and permanently classified.",
    ],
    portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Kofi',
    role: 'Director of the season',
    shortBio: 'Plans the arc, then steps aside. Believes the best seasons are the ones guests barely notice are planned.',
    longBio: [
      "Kofi is the director of Majira Marefu. He planned the first arc for seven friends, and then for fourteen, and then — this year, for the first time — for forty.",
      "He believes the best seasons are the ones that feel, in the moment, as if they were not planned at all. He spends most of a journey quietly removing things.",
    ],
    portrait: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&w=900&q=80',
  },
];

// ——— Apply questions ———
export interface ApplyQuestion {
  key: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  prompt: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  minWords?: number;
}

export const APPLY_QUESTIONS: ApplyQuestion[] = [
  { key: 'name', type: 'text', prompt: 'Your name, as you would like us to use it.', required: true },
  {
    key: 'email',
    type: 'email',
    prompt: 'Where we can write back.',
    hint: 'Add a phone number on the next screen if you prefer that.',
    required: true,
  },
  { key: 'phone', type: 'tel', prompt: 'A phone number (optional).', placeholder: '+254 …' },
  {
    key: 'home',
    type: 'textarea',
    prompt: 'Where do you live, and how long have you lived there?',
    required: true,
    rows: 3,
  },
  {
    key: 'work',
    type: 'textarea',
    prompt: 'What do you do with most of your days at the moment?',
    hint: 'Paid work, unpaid work, craft, care. Whatever "doing" has meant for you recently.',
    required: true,
    rows: 4,
  },
  {
    key: 'connection',
    type: 'textarea',
    prompt: 'What is your relationship to East Africa?',
    hint: 'Home. Lineage. Longing. Curiosity. None of the above. Any answer is welcome.',
    required: true,
    rows: 4,
  },
  {
    key: 'time_off',
    type: 'textarea',
    prompt: 'When did you last take more than two weeks off from work in a row?',
    required: true,
    rows: 3,
  },
  {
    key: 'season',
    type: 'textarea',
    prompt: 'Tell us about a season you remember well.',
    hint: 'A stretch of time in your life — weeks or months — that felt like it had its own weather. What made it one.',
    required: true,
    rows: 6,
    minWords: 30,
  },
  {
    key: 'companion',
    type: 'textarea',
    prompt: 'Who, if anyone, would you travel with?',
    hint: 'Partner, friend, sibling, no one. We do not hold seats in pairs, but we try.',
    rows: 3,
  },
  {
    key: 'care',
    type: 'textarea',
    prompt: 'Anything we should know about how you eat, move, or rest?',
    hint: 'Dietary notes, mobility, sleep, anything at all. Candor here makes the month better.',
    rows: 4,
  },
  {
    key: 'hope',
    type: 'textarea',
    prompt: 'What are you quietly hoping this month gives you?',
    required: true,
    rows: 5,
    minWords: 20,
  },
  {
    key: 'give',
    type: 'textarea',
    prompt: 'And what do you think you might give the table, in return?',
    hint: 'Not a pitch. Just what you tend to bring into a room full of people you are about to spend thirty nights with.',
    required: true,
    rows: 5,
    minWords: 20,
  },
  {
    key: 'long_season',
    type: 'textarea',
    prompt: 'What does a long season mean to you?',
    hint: 'The always-last question. Answer it in whatever shape you like.',
    required: true,
    rows: 6,
    minWords: 30,
  },
];

export const PRICE_WORDS = (n: number): string => {
  const map: Record<number, string> = {
    4500: 'four thousand five hundred',
    9800: 'nine thousand eight hundred',
    16500: 'sixteen thousand five hundred',
    25000: 'twenty-five thousand',
  };
  return map[n] ?? `$${n.toLocaleString('en-US')}`;
};
