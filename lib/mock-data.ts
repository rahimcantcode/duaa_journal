import { trustedHajjVideoLinks } from "@/lib/data/hajj-video-links";

export type DuaaEntry = {
  id: string;
  title: string;
  text: string;
  date: string;
};

export type JournalCategory = {
  id: string;
  title: string;
  description: string;
  countLabel: string;
  accent: "sage" | "pink" | "blue";
  quote: string;
  entries: DuaaEntry[];
};

export type HajjStep = {
  id: string;
  title: string;
  moment: string;
  shortSummary: string;
  quickPoints: string[];
  whatItIs: string;
  whyItMatters: string;
  whatToDo: string[];
  reminders: string[];
  commonMistakes: string[];
  calmNote: string;
  learnMoreUrl: string;
};

export const journalCategories: JournalCategory[] = [
  {
    id: "family",
    title: "For My Family",
    description: "Tender prayers for protection, softness, and nearness.",
    countLabel: "3 entries",
    accent: "sage",
    quote: "Keep our home full of mercy and gentle understanding.",
    entries: [
      {
        id: "family-1",
        title: "For ease in our home",
        text: "Ya Allah, place ease between us, soften our speech, and let our home be a place of sakinah.",
        date: "Tonight",
      },
      {
        id: "family-2",
        title: "For my parents",
        text: "Grant my parents good health, light in their days, and reward for every unseen sacrifice.",
        date: "Yesterday",
      },
      {
        id: "family-3",
        title: "For future generations",
        text: "Make the faith steady in our family line and keep our hearts attached to what is pleasing to You.",
        date: "This week",
      },
    ],
  },
  {
    id: "hajj",
    title: "For My Hajj",
    description: "Intentions for acceptance, guidance, and a heart prepared for the journey.",
    countLabel: "2 entries",
    accent: "pink",
    quote: "Let every step toward Hajj be written with acceptance.",
    entries: [
      {
        id: "hajj-1",
        title: "For acceptance",
        text: "Ya Allah, accept my longing for Hajj and make the journey inward and outward one of sincerity.",
        date: "Today",
      },
      {
        id: "hajj-2",
        title: "For preparedness",
        text: "Open the way financially, spiritually, and emotionally, and let me arrive there in gratitude.",
        date: "Earlier this week",
      },
    ],
  },
  {
    id: "future",
    title: "For Our Future",
    description: "Quiet hopes for what is still unfolding.",
    countLabel: "2 entries",
    accent: "blue",
    quote: "Place barakah in what is written ahead of us.",
    entries: [
      {
        id: "future-1",
        title: "For what is written",
        text: "Guide us to what is best, even when we cannot yet see how it will arrive.",
        date: "This morning",
      },
      {
        id: "future-2",
        title: "For a life with barakah",
        text: "Make our future full of useful work, gentle companionship, and contentment.",
        date: "Last week",
      },
    ],
  },
  {
    id: "peace",
    title: "For Peace & Clarity",
    description: "Breath-like reflections for a quieter heart.",
    countLabel: "3 entries",
    accent: "sage",
    quote: "Settle what feels restless, and bring clarity where I feel unsure.",
    entries: [
      {
        id: "peace-1",
        title: "For mental quiet",
        text: "Protect my mind from spiraling thoughts and return me gently to trust.",
        date: "After Fajr",
      },
      {
        id: "peace-2",
        title: "For clarity in decisions",
        text: "If something is good for me, make it easy and calm. If not, turn my heart away with peace.",
        date: "Yesterday",
      },
      {
        id: "peace-3",
        title: "For emotional steadiness",
        text: "Let my heart rest in remembrance and let peace return little by little.",
        date: "Recently",
      },
    ],
  },
  {
    id: "forgiveness",
    title: "For Forgiveness",
    description: "Private prayers of return, healing, and mercy.",
    countLabel: "2 entries",
    accent: "pink",
    quote: "Meet my repentance with mercy wider than my mistakes.",
    entries: [
      {
        id: "forgiveness-1",
        title: "For mercy",
        text: "Forgive what I have carried with shame, and let me turn back to You with hope.",
        date: "Tonight",
      },
      {
        id: "forgiveness-2",
        title: "For a softer heart",
        text: "Cleanse my heart from resentment, pride, and what distances me from You.",
        date: "A few days ago",
      },
    ],
  },
];

export const hajjSteps: HajjStep[] = [
  {
    id: "ihram",
    title: "Ihram",
    moment: "Entering the state",
    shortSummary: "Begin the journey with intention, simplicity, and a clear state of worship.",
    quickPoints: ["Make your intention calmly", "Wear the required garments", "Keep talbiyah on your tongue"],
    whatItIs: "Ihram is the sacred state you enter before beginning Hajj rites. It changes how you carry yourself, what you wear, and what you avoid.",
    whyItMatters: "It marks a visible and inward turning toward Allah. You begin leaving behind ordinary distractions and enter the pilgrimage with humility.",
    whatToDo: [
      "Prepare before the miqat with ghusl if possible and the clothing of ihram.",
      "Pray if it is a prayer time, then make your intention for Hajj.",
      "Begin reciting the talbiyah and continue regularly as you travel.",
    ],
    reminders: [
      "Keep your words gentle and your movements unhurried.",
      "Check what is restricted in ihram before you start so you do not feel anxious later.",
      "Stay hydrated and keep your essentials easy to reach.",
    ],
    commonMistakes: [
      "Crossing the miqat without entering ihram.",
      "Treating ihram as only a clothing change instead of a state of worship.",
      "Forgetting practical basics like sandals, pins, or a small pouch for documents.",
    ],
    calmNote: "Start with steadiness, not pressure. A calm beginning helps the rest of the journey feel grounded.",
    learnMoreUrl: trustedHajjVideoLinks.ihram,
  },
  {
    id: "tawaf",
    title: "Tawaf",
    moment: "Around the Kaaba",
    shortSummary: "Circle the Kaaba with remembrance, presence, and a heart turned toward what is sacred.",
    quickPoints: ["Seven circuits", "Begin at the Black Stone line", "Stay gentle in the crowd"],
    whatItIs: "Tawaf is the act of circling the Kaaba seven times in worship. It is one of the most emotionally powerful parts of the pilgrimage.",
    whyItMatters: "It brings the heart into a rhythm of remembrance and devotion. The movement itself becomes a form of surrender and focus.",
    whatToDo: [
      "Begin each circuit from the line of the Black Stone as best you can.",
      "Walk seven full rounds while making duaa, dhikr, or reciting Qur'an.",
      "After completing tawaf, pray two rak'ahs if the area and timing make that manageable.",
    ],
    reminders: [
      "Do not rush to touch the Black Stone if it causes harm or crowding.",
      "Keep your belongings secure and your group plan simple.",
      "Use short duaas you already know so your focus stays soft and steady.",
    ],
    commonMistakes: [
      "Losing count and continuing in confusion without pausing to reset calmly.",
      "Pushing through crowds for a closer position.",
      "Thinking you need special Arabic wording for every circuit.",
    ],
    calmNote: "The point is devotion, not perfection. A peaceful tawaf is better than a frantic one.",
    learnMoreUrl: trustedHajjVideoLinks.tawaf,
  },
  {
    id: "sai",
    title: "Sa'i",
    moment: "Between Safa and Marwah",
    shortSummary: "Walk the path of Hajar with trust, effort, and quiet reliance on Allah.",
    quickPoints: ["Begin at Safa", "Complete seven lengths", "Carry your duaa through the walk"],
    whatItIs: "Sa'i is the walking between Safa and Marwah, remembering Hajar's perseverance and trust in Allah while seeking relief.",
    whyItMatters: "It teaches that dependence on Allah and human effort live together. You walk, ask, and trust all at once.",
    whatToDo: [
      "Start at Safa, face the qiblah, and make dhikr or duaa.",
      "Walk to Marwah, then continue until seven lengths are completed.",
      "Keep a manageable pace and use the green-lit section appropriately if you are able.",
    ],
    reminders: [
      "Comfortable footwear matters more than speed.",
      "A small note on your phone can help you track your count.",
      "Pause briefly if you need to settle your breath rather than pushing through fatigue.",
    ],
    commonMistakes: [
      "Losing track of the number of lengths.",
      "Treating the walk like a rush instead of a reflective act.",
      "Starting from the wrong hill and getting confused midway.",
    ],
    calmNote: "This step honors patient effort. Let it remind you that sincere striving is itself beloved.",
    learnMoreUrl: trustedHajjVideoLinks.sai,
  },
  {
    id: "mina",
    title: "Mina",
    moment: "Days of staying",
    shortSummary: "A gentle pause in the journey for prayer, rest, and practical readiness.",
    quickPoints: ["Settle your space", "Keep prayers and essentials organized", "Protect your energy"],
    whatItIs: "Mina is where pilgrims stay during key days of Hajj. It can feel crowded and physically tiring, but it is also a place of preparation.",
    whyItMatters: "Its value is in patience, presence, and preserving your strength for the major rites ahead.",
    whatToDo: [
      "Set up your place in a simple and organized way as soon as you arrive.",
      "Keep your prayer times, hydration, and group communication steady.",
      "Rest intentionally so you can meet the coming days with more ease.",
    ],
    reminders: [
      "Pack light and keep one small bag for immediate needs.",
      "Know where your group point and tent section are.",
      "Keep slippers, water, and phone power close by.",
    ],
    commonMistakes: [
      "Using up energy on unnecessary movement between tents or camps.",
      "Neglecting rest because the environment feels busy.",
      "Misplacing essentials in the crowd and then feeling panicked.",
    ],
    calmNote: "Not every sacred moment feels dramatic. Sometimes worship looks like patience, order, and small acts of care.",
    learnMoreUrl: trustedHajjVideoLinks.mina,
  },
  {
    id: "arafat",
    title: "Arafat",
    moment: "The heart of Hajj",
    shortSummary: "The day of standing, asking, hoping, and turning back to Allah with sincerity.",
    quickPoints: ["Protect your energy early", "Make a personal duaa list", "Stay focused after Dhuhr"],
    whatItIs: "Arafat is the central day of Hajj. Pilgrims gather, stand, ask, and fill the day with remembrance and duaa.",
    whyItMatters: "This is one of the most important and spiritually expansive moments of the pilgrimage. It is a day of mercy, repentance, and hope.",
    whatToDo: [
      "After the combined prayers, give yourself long stretches of uninterrupted duaa.",
      "Alternate between spoken duaa, silent reflection, Qur'an, and dhikr if that helps your focus.",
      "Keep asking sincerely for both this life and the next, and for others too.",
    ],
    reminders: [
      "Prepare a duaa list beforehand so your heart is not scrambling.",
      "Use shade, water, and rest wisely to preserve presence.",
      "Do not compare your experience to anyone else's tears or intensity.",
    ],
    commonMistakes: [
      "Letting the day drift into distraction, conversation, or logistics.",
      "Waiting for a perfect emotional state before making duaa.",
      "Forgetting practical self-care until exhaustion takes over.",
    ],
    calmNote: "Come as you are. A sincere, tired, hopeful heart is still a heart turned toward Allah.",
    learnMoreUrl: trustedHajjVideoLinks.arafat,
  },
  {
    id: "muzdalifah",
    title: "Muzdalifah",
    moment: "After sunset",
    shortSummary: "A quieter night of gathering, resting, and preparing for what comes next.",
    quickPoints: ["Pray after arriving", "Collect pebbles simply", "Rest when you can"],
    whatItIs: "Muzdalifah is where pilgrims spend the night after leaving Arafat. It is a practical and spiritually quiet transition point in the journey.",
    whyItMatters: "It teaches simplicity and trust in the middle of physical fatigue. You gather what you need and keep moving with steadiness.",
    whatToDo: [
      "Arrive, pray as required, and settle without overcomplicating the night.",
      "Collect a reasonable number of small pebbles for the stoning rites.",
      "Use whatever rest is available to regain your energy.",
    ],
    reminders: [
      "Keep a small pouch ready for the pebbles.",
      "Layer clothing if the night air may feel cold.",
      "Stay close to your group plan when moving out in the morning.",
    ],
    commonMistakes: [
      "Spending too much time collecting perfect pebbles.",
      "Ignoring the need for rest because the space feels temporary.",
      "Separating from the group without a clear meeting point.",
    ],
    calmNote: "This step is quieter by design. Let the simplicity of it soften you rather than unsettle you.",
    learnMoreUrl: trustedHajjVideoLinks.muzdalifah,
  },
  {
    id: "jamarat",
    title: "Jamarat",
    moment: "Stoning the pillars",
    shortSummary: "A focused act of rejecting distraction, temptation, and what pulls you away from obedience.",
    quickPoints: ["Move with your group plan", "Throw calmly", "Safety comes first"],
    whatItIs: "Jamarat is the symbolic stoning of the pillars, remembering Ibrahim's rejection of Shaytan and recommitting yourself to obedience.",
    whyItMatters: "It is a visible act of resistance against what clouds the heart. The rite is simple, but its meaning is deep.",
    whatToDo: [
      "Follow your group's timing and route, especially in crowded periods.",
      "Throw the required pebbles one by one with intention and calm.",
      "Keep moving safely once you finish rather than stopping in the main flow.",
    ],
    reminders: [
      "Stay aware of crowd movement and do not stop abruptly.",
      "Keep your pebbles accessible before you enter the area.",
      "Short intention and presence matter more than dramatic gestures.",
    ],
    commonMistakes: [
      "Treating the rite aggressively or emotionally in a way that affects safety.",
      "Stopping in crowded lanes to reorganize or recount.",
      "Entering without knowing your timing and route first.",
    ],
    calmNote: "The strength of this step is in steady intention, not force.",
    learnMoreUrl: trustedHajjVideoLinks.jamarat,
  },
  {
    id: "qurbani",
    title: "Qurbani",
    moment: "Offering",
    shortSummary: "A remembrance of surrender, devotion, and generosity connected to the legacy of Ibrahim.",
    quickPoints: ["Confirm your arrangement", "Know when it is complete", "Keep the meaning close"],
    whatItIs: "Qurbani is the sacrificial offering connected to the story of Ibrahim and submission to Allah's command.",
    whyItMatters: "It symbolizes willingness to surrender what is beloved for the sake of Allah and connects worship to generosity.",
    whatToDo: [
      "Confirm your qurbani arrangement through your provider or group.",
      "Make sure you know when it has been completed if that affects your next steps.",
      "Keep the act rooted in gratitude rather than treating it as a mere transaction.",
    ],
    reminders: [
      "Save confirmation details somewhere easy to access.",
      "Ask your group organizer in advance how updates will be shared.",
      "Let this step remind you of submission, not just scheduling.",
    ],
    commonMistakes: [
      "Not confirming whether the arrangement was properly made.",
      "Feeling disconnected from the meaning because the process is delegated.",
      "Leaving the logistics until the last minute.",
    ],
    calmNote: "Even when someone else handles the logistics, your intention and reflection still matter deeply.",
    learnMoreUrl: trustedHajjVideoLinks.qurbani,
  },
  {
    id: "final-tawaf",
    title: "Final Tawaf",
    moment: "Farewell",
    shortSummary: "A closing act of gratitude before leaving with the hope that the journey remains within you.",
    quickPoints: ["Keep it unhurried", "Leave with gratitude", "Protect the softness you gained"],
    whatItIs: "Final Tawaf is the farewell circling of the Kaaba before departing Makkah, a quiet closing to a profound journey.",
    whyItMatters: "It gathers the pilgrimage into one final act of devotion and leaves the heart with a sense of gratitude and longing.",
    whatToDo: [
      "Complete the farewell tawaf with presence and gentleness.",
      "Use the time for gratitude, repentance, and asking for acceptance.",
      "Leave Makkah consciously, carrying lessons rather than rushing into the next task.",
    ],
    reminders: [
      "Give yourself extra time so the farewell does not feel pressured.",
      "Keep your luggage and departure logistics organized beforehand.",
      "Ask Allah to preserve the benefit of the journey after you return home.",
    ],
    commonMistakes: [
      "Letting travel stress overpower the spiritual close of the pilgrimage.",
      "Treating the farewell as only a formality.",
      "Leaving all packing and transport details to the very last moment.",
    ],
    calmNote: "A beautiful ending is not about intensity. It is about leaving with gratitude, humility, and a heart that stays turned toward Allah.",
    learnMoreUrl: trustedHajjVideoLinks.finalTawaf,
  },
];

export const landingPreviewCards = [
  {
    label: "Journal",
    title: "A private place for what she wants to carry",
    description: "A gentle space for family, the future, and the prayers she wants to keep close.",
  },
  {
    label: "Guide",
    title: "A calm companion for the steps ahead",
    description: "Gentle guidance for the rites of Hajj, kept clear, quiet, and close at hand.",
  },
];
