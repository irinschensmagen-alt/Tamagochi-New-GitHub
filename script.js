const state = {
  petName: "",
  health: 70,
  hunger: 60,
  mood: 55,
  energy: 100,
  coins: 0,
  experience: 0,
  level: 1
};

const progress = { feed: false, play: false, heal: false };

const performance = {
  perfectRun: true,
  frustratedEnding: false,
  totalWrong: 0,
  totalCorrect: 0,
  mistakes: {
    feed: Array(6).fill(0),
    play: Array(6).fill(0),
    heal: Array(6).fill(0)
  }
};

let currentLanguage = "de";

function isFemaleRussianName(name = "") {
  const n = name.trim().toLowerCase();
  if (!n) return true;
  const maleExceptions = ["никита","илья","кузьма","фома","лука","савва","данила","миша","паша","саша","женя"];
  if (maleExceptions.includes(n)) return false;
  return /[ая]$/.test(n);
}

const i18n = {
  de: {
    demoLabel: "",
    namePlaceholder: "Name des Tamagotchis",
    nameRequired: "Bitte gib deinem Tamagotchi zuerst einen Namen.",
    levelLabel: "🏆 Stufe",
    overallProgressLabel: "Gesamtfortschritt",
    careTitle: "Für dein Tamagotchi sorgen",
    stepFeedLabel: "🍎 Füttern",
    stepPlayLabel: "🎮 Spielen",
    stepHealLabel: "💊 Heilen",
    healthLabel: "Gesundheit",
    hungerLabel: "Hunger",
    moodLabel: "Stimmung",
    energyLabel: "Energie",
    coinsLabel: "Münzen",
    experienceLabel: "Erfahrung",
    feedButton: "🍎 Füttern",
    playButton: "🎮 Spielen",
    healButton: "💊 Heilen",
    welcomeActionTitle: "Wähle eine Aktion",
    welcomeActionText: "Wähle eine Aktion für dein Tamagotchi.",
    feedTitle: "Füttern",
    feedTopic: "🍎 Essen und Trinken",
    seriesLanguageLabel: "🇩🇪 Deutsch",
    playAgainBtn: "Spielen",
    endGameBtn: "Spiel beenden",
    earlyEndBtn: "Spiel beenden",
    satietyLabel: "Sättigung",
    fooddyStepLabel: "🤖 Schritt 1. Robo-Futterautomat Fooddy",
    fooddyTitle: "Errate den Geheimcode",
    roundLabel: "Zugangscode",
    attemptsLabel: "Gültige Versuche:",
    deStepLabel: "🇩🇪 Schritt 2. Deutsch",
    portionLabel: "Portion",
    taskNumberLabel: "Aufgabe",
    finishTitle: "Geschafft!",
    startBtn: "Das Ei wecken",
    birthContinueBtn: "Weiter",
    birthTitleEgg: "Kosmisches Ei",
    birthTextEgg: "Da ist jemand drin … Gib deinem Tamagotchi einen Namen.",
    birthTitleWake: "Das Ei wacht auf …",
    birthTextWake: "Das Neonlicht wird heller. Schau genau hin!",
    birthBorn: name => `${name} ist geboren!`,
    birthBornText: name => `Da ist sie – die neugeborene ${name}! Schau sie dir in Ruhe an und klicke weiter, wenn du bereit bist.`,
    welcomeText: name => `${name} ist geboren! Löse Aufgaben und kümmere dich um dein Tamagotchi.`,
    statusDone: "Erledigt",
    statusNotDone: "Nicht erledigt",
    calm: "",
    fooddyReady: "Fooddy ist bereit",
    fooddyZoomHint: "🔍 Vergrößern",
    fooddyModalLabel: "Nachricht von Fooddy",
    closeLabel: "Schließen",
    fooddyDispensing: "Fooddy gibt eine Portion aus!",
    fooddyDispensed: "Portion ausgegeben ✓",
    codePrompt: () => `Fooddy: „Piep-piep! Errate einmal den Zugangscode von 1 bis 100. Danach öffnet sich die Futterstation für alle 6 Aufgaben!“`,
    invalidNumber: "Fooddy: „Piep-piep! Gib eine ganze Zahl von 1 bis 100 ein.“",
    tooLow: "Fooddy: „Zu klein! Mein Code ist GRÖSSER!“",
    tooHigh: "Fooddy: „Zu groß! Mein Code ist KLEINER!“",
    codeCorrect: "Fooddy: „Super! Der Code stimmt. Jetzt löse die Aufgabe!“",
    wrong: "Leider falsch. Versuch es noch einmal.",
    correctPortion: name => `${name} bekommt eine Portion Futter!`,
    hungerChanged: value => `Richtig! Fooddy gibt eine Portion aus. Hunger: ${value}.`,
    fullyFed: "Ich bin satt! Danke!",
    feedComplete: name => `Geschafft! ${name} hat alle 6 Portionen bekommen.`,
    playTopic: "🎮 Hobbys und Freizeit",
    healTopic: "💊 Gesundheit",
    playTitle: "Spielen",
    healTitle: "Heilen",
    playProgress: "Spielfortschritt",
    healProgress: "Heilungsfortschritt",
    finishText: name => `${name} ist satt, gesund, glücklich und dank deiner Fürsorge gewachsen!`,
    continueBtn: "Tamagotchi ansehen"
  },

  ru: {
    demoLabel: "",
    namePlaceholder: "Имя Тамагочи",
    nameRequired: "Сначала введи имя своего Тамагочи.",
    levelLabel: "🏆 Уровень",
    overallProgressLabel: "Общий прогресс",
    careTitle: "Забота о Тамагочи",
    stepFeedLabel: "🍎 Еда",
    stepPlayLabel: "🎮 Игра",
    stepHealLabel: "💊 Лечение",
    healthLabel: "Здоровье",
    hungerLabel: "Голод",
    moodLabel: "Настроение",
    energyLabel: "Энергия",
    coinsLabel: "Монеты",
    experienceLabel: "Опыт",
    feedButton: "🍎 Покормить",
    playButton: "🎮 Поиграть",
    healButton: "💊 Лечить",
    welcomeActionTitle: "Выбери действие",
    welcomeActionText: "Выбери действие для своего Тамагочи.",
    feedTitle: "Кормление",
    feedTopic: "🍎 Еда и напитки",
    seriesLanguageLabel: "🇷🇺 Русский",
    playAgainBtn: "Играть",
    endGameBtn: "Завершить игру",
    earlyEndBtn: "Завершить игру",
    satietyLabel: "Сытость",
    fooddyStepLabel: "🤖 Шаг 1. Робо-Кормушка Фудди",
    fooddyTitle: "Угадай секретный код",
    roundLabel: "Код доступа",
    attemptsLabel: "Допустимых попыток:",
    deStepLabel: "🇷🇺 Шаг 2. Задание",
    portionLabel: "Порция",
    taskNumberLabel: "Задание",
    finishTitle: "Готово!",
    startBtn: "Разбудить яйцо",
    birthContinueBtn: "Дальше",
    birthTitleEgg: "Космическое яйцо",
    birthTextEgg: "Внутри кто-то есть… Дай будущему Тамагочи имя.",
    birthTitleWake: "Яйцо просыпается…",
    birthTextWake: "Неоновый свет становится ярче. Смотри внимательно!",
    birthBorn: name => `Тамагочи ${name} ${isFemaleRussianName(name) ? "родилась" : "родился"}!`,
    birthBornText: name => `Вот твой Тамагочи — ${name}! Рассмотри питомца и нажми кнопку, когда будешь готов продолжить.`,
    welcomeText: name => `Тамагочи ${name} уже с тобой! Выполняй задания и заботься о питомце.`,
    statusDone: "Выполнено",
    statusNotDone: "Не выполнено",
    calm: "",
    fooddyReady: "Фудди готова",
    fooddyZoomHint: "🔍 Увеличить",
    fooddyModalLabel: "Сообщение Фудди",
    closeLabel: "Закрыть",
    fooddyDispensing: "Фудди выдаёт порцию!",
    fooddyDispensed: "Порция выдана ✓",
    codePrompt: () => `Фудди: «Бип-бип! Один раз угадай код доступа от 1 до 100. После этого кормушка откроется для всех 6 заданий!»`,
    invalidNumber: "Фудди: «Бип-бип! Введи целое число от 1 до 100.»",
    tooLow: "Фудди: «Слишком мало! Мой код БОЛЬШЕ!»",
    tooHigh: "Фудди: «Слишком много! Мой код МЕНЬШЕ!»",
    codeCorrect: "Фудди: «Отлично! Код верный. Теперь выполни задание!»",
    wrong: "Неправильно. Попробуй ещё раз.",
    correctPortion: name => `Выдана порция корма!`,
    hungerChanged: value => `Правильно! Фудди выдаёт порцию. Голод: ${value}.`,
    fullyFed: "Голод утолён! Спасибо!",
    feedComplete: name => `Готово! Все 6 порций выданы.`,
    playTopic: "🎮 Игры и досуг",
    healTopic: "💊 Здоровье",
    playTitle: "Игра",
    healTitle: "Лечение",
    playProgress: "Прогресс игры",
    healProgress: "Прогресс лечения",
    finishText: name => `Все задания выполнены! Тамагочи ${name} вырос благодаря твоей заботе!`,
    continueBtn: "Посмотреть на Тамагочи"
  }
};

const localizedTasks = {
  de: {
    feed: [
      {title:"AUFGABE 1", question:"___ Apfel", answers:["der","die","das"], correct:"der", success:"Richtig! Der Apfel."},
      {title:"AUFGABE 2", question:"Was trinkt man?", answers:["Wasser","Brot","Käse"], correct:"Wasser", success:"Richtig! Man trinkt Wasser."},
      {title:"AUFGABE 3", question:"Zum Frühstück esse ich Brot mit ...", answers:["Käse","Wasser","Saft"], correct:"Käse", success:"Richtig! Brot mit Käse."},
      {title:"AUFGABE 4", question:"Möchtest du einen Tee?", answers:["Ja, gern.","Ich bin zwölf Jahre alt.","Das ist mein Bruder."], correct:"Ja, gern.", success:"Richtig! Ja, gern."},
      {title:"AUFGABE 5", question:"Was passt nicht?", answers:["die Banane","der Apfel","die Orange","die Milch"], correct:"die Milch", success:"Richtig! Die Milch passt nicht."},
      {title:"AUFGABE 6", question:"Ich möchte eine Pizza ...", answers:["bestellen","trinken","fahren"], correct:"bestellen", success:"Richtig! Ich möchte eine Pizza bestellen."}
    ],
    play: [
      {title:"AUFGABE 1", question:"Sie ___ gern Fußball.", answers:["spiele","spielt","spielen"], correct:"spielt", success:"Richtig! Sie spielt gern Fußball."},
      {title:"AUFGABE 2", question:"Was macht man in der Freizeit?", answers:["Musik hören","Fieber haben","Medizin nehmen"], correct:"Musik hören", success:"Richtig! Musik hören."},
      {title:"AUFGABE 3", question:"Wir ___ am Wochenende Tennis.", answers:["spielen","spielt","spielst"], correct:"spielen", success:"Richtig! Wir spielen am Wochenende Tennis."},
      {title:"AUFGABE 4", question:"Ich ___ gern Bücher.", answers:["lese","liest","lesen"], correct:"lese", success:"Richtig! Ich lese gern Bücher."},
      {title:"AUFGABE 5", question:"Was passt zu einem Hobby?", answers:["fotografieren","Kopfschmerzen","Tabletten"], correct:"fotografieren", success:"Richtig! Fotografieren ist ein Hobby."},
      {title:"AUFGABE 6", question:"Am Samstag ___ wir ins Kino.", answers:["gehen","geht","gehst"], correct:"gehen", success:"Richtig! Am Samstag gehen wir ins Kino."}
    ],
    heal: [
      {title:"AUFGABE 1", question:"{name} hat Kopfschmerzen. Sie ist ...", answers:["krank","lecker","sportlich"], correct:"krank", success:"Richtig! {name} ist krank."},
      {title:"AUFGABE 2", question:"Was hilft bei Krankheit?", answers:["Medizin","Fußball","Pizza"], correct:"Medizin", success:"Richtig! Medizin hilft."},
      {title:"AUFGABE 3", question:"Der Arzt sagt: Du sollst im Bett ...", answers:["bleiben","tanzen","fahren"], correct:"bleiben", success:"Richtig! Du sollst im Bett bleiben."},
      {title:"AUFGABE 4", question:"Ich habe Halsschmerzen. Ich trinke warmen ...", answers:["Tee","Ball","Schuh"], correct:"Tee", success:"Richtig! Ich trinke warmen Tee."},
      {title:"AUFGABE 5", question:"Womit misst man die Temperatur?", answers:["mit dem Thermometer","mit dem Ball","mit dem Buch"], correct:"mit dem Thermometer", success:"Richtig! Die Temperatur misst man mit dem Thermometer."},
      {title:"AUFGABE 6", question:"Was hört die Tierärztin mit dem Stethoskop ab?", answers:["die Atmung","den Kuchen","den Fußball"], correct:"die Atmung", success:"Richtig! Die Tierärztin hört die Atmung ab."}
    ]
  },

  ru: {
    feed: [
      {title:"ЗАДАНИЕ 1", question:"Какой продукт является фруктом?", answers:["яблоко","вода","сыр"], correct:"яблоко", success:"Правильно! Яблоко — фрукт."},
      {title:"ЗАДАНИЕ 2", question:"Что обычно пьют?", answers:["воду","хлеб","сыр"], correct:"воду", success:"Правильно! Пьют воду."},
      {title:"ЗАДАНИЕ 3", question:"Что можно положить на хлеб?", answers:["сыр","воду","сок"], correct:"сыр", success:"Правильно! Хлеб с сыром."},
      {title:"ЗАДАНИЕ 4", question:"Что ответить на предложение чая?", answers:["Да, с удовольствием.","Мне двенадцать лет.","Это мой брат."], correct:"Да, с удовольствием.", success:"Правильно!"},
      {title:"ЗАДАНИЕ 5", question:"Что лишнее?", answers:["банан","яблоко","апельсин","молоко"], correct:"молоко", success:"Правильно! Молоко — не фрукт."},
      {title:"ЗАДАНИЕ 6", question:"Что можно сделать с пиццей?", answers:["заказать","выпить","поехать"], correct:"заказать", success:"Правильно! Пиццу можно заказать."}
    ],
    play: [
      {title:"ЗАДАНИЕ 1", question:"Что относится к активному отдыху?", answers:["футбол","лекарство","температура"], correct:"футбол", success:"Правильно! Футбол — активная игра."},
      {title:"ЗАДАНИЕ 2", question:"Что можно делать в свободное время?", answers:["слушать музыку","болеть","принимать лекарство"], correct:"слушать музыку", success:"Правильно!"},
      {title:"ЗАДАНИЕ 3", question:"Во что играют ракеткой и мячом?", answers:["теннис","шахматы","лото"], correct:"теннис", success:"Правильно! Это теннис."},
      {title:"ЗАДАНИЕ 4", question:"Что можно читать?", answers:["книги","мяч","лекарство"], correct:"книги", success:"Правильно! Читают книги."},
      {title:"ЗАДАНИЕ 5", question:"Что является хобби?", answers:["фотографировать","болеть","лечиться"], correct:"фотографировать", success:"Правильно! Фотография может быть хобби."},
      {title:"ЗАДАНИЕ 6", question:"Куда можно пойти смотреть фильм?", answers:["в кино","в аптеку","к врачу"], correct:"в кино", success:"Правильно! Фильм смотрят в кино."}
    ],
    heal: [
      {title:"ЗАДАНИЕ 1", question:"У {name_gen} болит голова. Тамагочи ...", answers:["болеет","вкусный","спортивный"], correct:"болеет", success:"Правильно! Тамагочи болеет."},
      {title:"ЗАДАНИЕ 2", question:"Что помогает при болезни?", answers:["лекарство","футбол","пицца"], correct:"лекарство", success:"Правильно! Лекарство помогает."},
      {title:"ЗАДАНИЕ 3", question:"Что советуют делать при болезни?", answers:["отдыхать","танцевать","бегать"], correct:"отдыхать", success:"Правильно! Нужно отдыхать."},
      {title:"ЗАДАНИЕ 4", question:"Что можно пить при больном горле?", answers:["тёплый чай","мяч","ботинок"], correct:"тёплый чай", success:"Правильно!"},
      {title:"ЗАДАНИЕ 5", question:"Чем измеряют температуру?", answers:["градусником","мячом","книгой"], correct:"градусником", success:"Правильно! Температуру измеряют градусником."},
      {title:"ЗАДАНИЕ 6", question:"Что ветеринар слушает стетоскопом?", answers:["дыхание","торт","футбольный мяч"], correct:"дыхание", success:"Правильно! Ветеринар слушает дыхание пациента."}
    ]
  }
};


const petImages = {
  egg: "assets/images/tamagotchi_egg.png",
  hatching: "assets/images/tamagotchi_hatching.png",
  baby: "assets/images/tamagotchi_baby.png",
  kitten: "assets/images/tamagotchi_kitten.png",
  growing: "assets/images/tamagotchi_growing.png",
  adult: "assets/images/tamagotchi_adult.png",
  eating: "assets/images/tamagotchi_eating.png",
  playing: "assets/images/tamagotchi_playing.png",
  sick: "assets/images/tamagotchi_sick.png",
  healing: "assets/images/tamagotchi_healing.png"
};

const taskSceneImages = {
  feed: [
    "assets/images/tasks/feed_01_fruit.png",
    "assets/images/tasks/feed_02_water.png",
    "assets/images/tasks/feed_03_bread_cheese.png",
    "assets/images/tasks/feed_04_tea.png",
    "assets/images/tasks/feed_05_fruits.png",
    "assets/images/tasks/feed_06_order_food.png"
  ],
  play: [
    "assets/images/tasks/play_01_ball.png",
    "assets/images/tasks/play_02_music.png",
    "assets/images/tasks/play_03_tennis.png",
    "assets/images/tasks/play_04_read.png",
    "assets/images/tasks/play_05_camera.png",
    "assets/images/tasks/play_06_cinema.png"
  ],
  heal: [
    "assets/images/tasks/heal_01_headache.png",
    "assets/images/tasks/heal_02_medicine.png",
    "assets/images/tasks/heal_03_rest.png",
    "assets/images/tasks/heal_04_tea.png",
    "assets/images/tasks/heal_05_fever.png",
    "assets/images/tasks/heal_06_doctor.png"
  ]
};

const growthStages = [
  { key: "baby", de: "Baby", ru: "Младенец" },
  { key: "growing", de: "Jungtier", ru: "Подросток" },
  { key: "adult", de: "Erwachsen", ru: "Взрослая" },
  { key: "adult", de: "Erwachsen", ru: "Взрослая" }
];

let previousRenderedState = null;
let previousLevel = 1;
let reactionTimer = null;

function getFeedTasks() {
  return localizedTasks[currentLanguage].feed;
}

function getPlayTasks() {
  return localizedTasks[currentLanguage].play;
}

function getHealTasks() {
  return localizedTasks[currentLanguage].heal;
}

function declineRuName(name, gramCase = "nom") {
  const original = String(name || "").trim();
  if (!original || gramCase === "nom") return original;

  // Латиница, цифры и составные необычные имена оставляем без изменения.
  if (!/^[А-ЯЁа-яё-]+$/.test(original)) return original;

  const parts = original.split("-");
  return parts.map(part => declineRuNamePart(part, gramCase)).join("-");
}

function declineRuNamePart(name, gramCase) {
  if (!name) return name;
  const lower = name.toLowerCase();
  const last = lower.slice(-1);
  const prev = lower.slice(-2, -1);
  const preserveCase = ending => {
    const stem = name.slice(0, -1);
    return stem + ending;
  };

  // Наиболее частые несклоняемые окончания.
  if (["о","е","э","и","ы","у","ю"].includes(last)) return name;

  if (lower.endsWith("ия")) {
    const stem = name.slice(0, -2);
    return {gen: stem + "ии", dat: stem + "ии", acc: stem + "ию", ins: stem + "ией", prep: stem + "ии"}[gramCase] || name;
  }

  if (last === "а") {
    const yi = ["г","к","х","ж","ч","ш","щ"].includes(prev) ? "и" : "ы";
    return {gen: preserveCase(yi), dat: preserveCase("е"), acc: preserveCase("у"), ins: preserveCase("ой"), prep: preserveCase("е")}[gramCase] || name;
  }
  if (last === "я") {
    return {gen: preserveCase("и"), dat: preserveCase("е"), acc: preserveCase("ю"), ins: preserveCase("ей"), prep: preserveCase("е")}[gramCase] || name;
  }
  if (last === "й") {
    return {gen: preserveCase("я"), dat: preserveCase("ю"), acc: preserveCase("я"), ins: preserveCase("ем"), prep: preserveCase("е")}[gramCase] || name;
  }
  if (last === "ь") {
    return {gen: preserveCase("я"), dat: preserveCase("ю"), acc: preserveCase("я"), ins: preserveCase("ем"), prep: preserveCase("е")}[gramCase] || name;
  }
  if (/[бвгджзклмнпрстфхцчшщ]$/.test(lower)) {
    return {gen: name + "а", dat: name + "у", acc: name + "а", ins: name + "ом", prep: name + "е"}[gramCase] || name;
  }
  return name;
}

function ruName(gramCase = "nom") {
  return declineRuName(state.petName, gramCase);
}

function withPetName(text) {
  return String(text)
    .replaceAll("{name_gen}", ruName("gen"))
    .replaceAll("{name_dat}", ruName("dat"))
    .replaceAll("{name_acc}", ruName("acc"))
    .replaceAll("{name_ins}", ruName("ins"))
    .replaceAll("{name_prep}", ruName("prep"))
    .replaceAll("{name}", state.petName);
}

function getCareTitle() {
  return currentLanguage === "de" ? `Für ${state.petName} sorgen` : `Забота о ${ruName("prep")}`;
}

function getWelcomeIntro() {
  return currentLanguage === "de"
    ? `Füttere ${state.petName}, spiele mit ihr oder hilf ihr, wieder gesund zu werden.`
    : `Покорми ${ruName("acc")}, поиграй с ${ruName("ins")} или помоги ${ruName("dat")} выздороветь.`;
}


const birthScreen = document.getElementById("birthScreen");
const languageButtons = document.querySelectorAll(".lang-btn");
const gameShell = document.getElementById("gameShell");
const birthImage = document.getElementById("birthImage");
const birthVisual = document.getElementById("birthVisual");
const eggCracks = document.getElementById("eggCracks");
const shellShards = document.getElementById("shellShards");
const birthTitle = document.getElementById("birthTitle");
const birthText = document.getElementById("birthText");
const birthControls = document.getElementById("birthControls");
const petNameInput = document.getElementById("petName");
const startBtn = document.getElementById("startBtn");
const birthContinueBtn = document.getElementById("birthContinueBtn");

const petImage = document.getElementById("petImage");
const petPicture = document.querySelector(".pet-picture");
const miniPetImage = document.getElementById("miniPetImage");
const petSpeech = document.getElementById("petSpeech");
const growthLabel = document.getElementById("growthLabel");
const reactionLabel = document.getElementById("reactionLabel");
const petSparkles = document.getElementById("petSparkles");

let petActionBadge = document.querySelector(".pet-action-badge");
if (!petActionBadge && petPicture) {
  petActionBadge = document.createElement("div");
  petActionBadge.className = "pet-action-badge";
  petActionBadge.hidden = true;
  petPicture.appendChild(petActionBadge);
}

function setPetActionBadge(icon = "", label = "") {
  if (!petActionBadge) return;
  if (!icon) {
    petActionBadge.hidden = true;
    petActionBadge.textContent = "";
    petActionBadge.removeAttribute("aria-label");
    return;
  }
  petActionBadge.hidden = false;
  petActionBadge.textContent = icon;
  if (label) petActionBadge.setAttribute("aria-label", label);
}

const welcomePanel = document.getElementById("welcomePanel");
const feedArea = document.getElementById("feedArea");
const seriesArea = document.getElementById("seriesArea");
const finishArea = document.getElementById("finishArea");
const fooddyBox = document.getElementById("fooddyBox");
const germanBox = document.getElementById("germanBox");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const foodPellets = document.getElementById("foodPellets");
const fooddyDispenseLabel = document.getElementById("fooddyDispenseLabel");
const fooddyZoomTrigger = document.getElementById("fooddyZoomTrigger");
const fooddyZoomHint = document.getElementById("fooddyZoomHint");
const fooddyModal = document.getElementById("fooddyModal");
const fooddyModalClose = document.getElementById("fooddyModalClose");
const fooddyModalMessage = document.getElementById("fooddyModalMessage");
const fooddyModalLabel = document.getElementById("fooddyModalLabel");
const petCloseupModal = document.getElementById("petCloseupModal");
const petCloseupClose = document.getElementById("petCloseupClose");
const petCloseupImage = document.getElementById("petCloseupImage");
const petCloseupTitle = document.getElementById("petCloseupTitle");
const petCloseupText = document.getElementById("petCloseupText");

let secretNumber = 0;
let feedCount = 0;
let currentFeedTaskIndex = 0;
let attemptsThisRound = 0;
let codeSolved = false;
let currentSeries = null;
let seriesIndex = { play: 0, heal: 0 };

const endingAudio = {
  happy: new Audio("assets/audio/happy_purr.mp3"),
  sad: new Audio("assets/audio/sad_meow.mp3")
};
Object.values(endingAudio).forEach(audio => {
  audio.preload = "auto";
});

const bgMusic = document.getElementById("bgMusic");
const victoryFanfare = document.getElementById("victoryFanfare");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicVolume = document.getElementById("musicVolume");
const musicLabel = document.getElementById("musicLabel");
const rewardStars = document.getElementById("rewardStars");
const rewardCount = document.getElementById("rewardCount");
const encouragementToast = document.getElementById("encouragementToast");
let musicPlaying = false;
let earnedStars = 0;

function initRewards() {
  if (!rewardStars) return;
  rewardStars.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const star = document.createElement("span");
    star.className = "reward-star";
    star.textContent = "★";
    rewardStars.appendChild(star);
  }
  updateRewardShelf();
}

function updateRewardShelf() {
  if (rewardCount) rewardCount.textContent = `${earnedStars}/18`;
  if (!rewardStars) return;
  [...rewardStars.children].forEach((star, i) => star.classList.toggle("earned", i < earnedStars));
}

function awardGoldenStar() {
  if (earnedStars >= 18) return;
  const shelf = document.getElementById("rewardShelf");
  if (shelf) {
    const flying = document.createElement("div");
    flying.className = "flying-star";
    flying.textContent = "★";
    document.body.appendChild(flying);
    const target = shelf.getBoundingClientRect();
    flying.style.setProperty("--star-x", `${target.left + target.width/2 - window.innerWidth/2}px`);
    flying.style.setProperty("--star-y", `${target.top + target.height/2 - window.innerHeight/2}px`);
    setTimeout(() => flying.remove(), 950);
  }
  setTimeout(() => { earnedStars++; updateRewardShelf(); }, 650);
}

function showEncouragement() {
  if (!encouragementToast) return;
  const words = currentLanguage === "de" ? ["Bravo!", "Richtig!", "Super!"] : ["Молодец!", "Верно!", "Отлично!"];
  encouragementToast.textContent = words[Math.floor(Math.random() * words.length)];
  encouragementToast.hidden = false;
  encouragementToast.classList.remove("show");
  void encouragementToast.offsetWidth;
  encouragementToast.classList.add("show");
  setTimeout(() => { encouragementToast.classList.remove("show"); encouragementToast.hidden = true; }, 1150);
}

function toggleMusic() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    const p = bgMusic.play();
    if (p && p.catch) p.catch(() => {});
  } else {
    bgMusic.pause();
  }
  musicPlaying = !bgMusic.paused;
  if (musicToggleBtn) musicToggleBtn.textContent = musicPlaying ? "Ⅱ" : "▶";
}

if (musicToggleBtn) musicToggleBtn.addEventListener("click", toggleMusic);
if (musicVolume && bgMusic) {
  bgMusic.volume = Number(musicVolume.value);
  musicVolume.addEventListener("input", () => { bgMusic.volume = Number(musicVolume.value); });
}
if (bgMusic) {
  bgMusic.addEventListener("play", () => { musicPlaying = true; if (musicToggleBtn) musicToggleBtn.textContent = "Ⅱ"; });
  bgMusic.addEventListener("pause", () => { musicPlaying = false; if (musicToggleBtn) musicToggleBtn.textContent = "▶"; });
}
initRewards();

languageButtons.forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

startBtn.addEventListener("click", startBirthSequence);
birthContinueBtn.addEventListener("click", enterGameAfterBirth);
petNameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") startBirthSequence();
});

document.querySelectorAll("[data-main-action]").forEach(button => {
  button.addEventListener("click", () => openAction(button.dataset.mainAction));
});

guessBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkGuess();
});

function openFooddyModal() {
  fooddyModalMessage.textContent = document.getElementById("fooddyMessage").textContent;
  fooddyModal.hidden = false;
  document.body.classList.add("modal-open");
  fooddyModalClose.focus();
}

function closeFooddyModal() {
  fooddyModal.hidden = true;
  document.body.classList.remove("modal-open");
  fooddyZoomTrigger.focus();
}

fooddyZoomTrigger.addEventListener("click", openFooddyModal);
fooddyModalClose.addEventListener("click", closeFooddyModal);
document.querySelectorAll("[data-close-fooddy-modal]").forEach(el => el.addEventListener("click", closeFooddyModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !fooddyModal.hidden) closeFooddyModal();
});

document.getElementById("continueBtn").addEventListener("click", () => {
  if (victoryFanfare && !document.querySelector(".pet-picture.final-sleep")) {
    victoryFanfare.currentTime = 0;
    victoryFanfare.volume = 0.7;
    const p = victoryFanfare.play();
    if (p && p.catch) p.catch(() => {});
  }
  showPetCloseup();
});

function markTaskMistake(action, index) {
  if (!performance.mistakes[action] || performance.mistakes[action][index] == null) return;
  performance.perfectRun = false;
  performance.mistakes[action][index] += 1;
  performance.totalWrong += 1;
}

function markTaskCorrect() {
  performance.totalCorrect += 1;
  awardGoldenStar();
  showEncouragement();
}

function getErrorRate() {
  const attempts = performance.totalWrong + performance.totalCorrect;
  return attempts ? performance.totalWrong / attempts : 0;
}

function stopEndingAudio() {
  Object.values(endingAudio).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function playEndingAudio(mode) {
  stopEndingAudio();
  const audio = endingAudio[mode];
  if (!audio) return;
  const p = audio.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function setEndingVisual(mode = null) {
  if (!petPicture) return;
  petPicture.classList.remove("final-happy", "final-sad", "final-sleep");
  if (mode === "happy") petPicture.classList.add("final-happy");
  if (mode === "sad") petPicture.classList.add("final-sad");
  if (mode === "sleep") petPicture.classList.add("final-sleep");
}

const playAgainBtn = document.getElementById("playAgainBtn");
const endGameBtn = document.getElementById("endGameBtn");
const earlyEndBtn = document.getElementById("earlyEndBtn");

if (playAgainBtn) playAgainBtn.addEventListener("click", restartGame);
if (endGameBtn) endGameBtn.addEventListener("click", endGame);
if (earlyEndBtn) earlyEndBtn.addEventListener("click", endGameEarly);

function resetGameState() {
  Object.assign(state, { health: 70, hunger: 60, mood: 55, energy: 100, coins: 0, experience: 0, level: 1 });
  progress.feed = false;
  progress.play = false;
  progress.heal = false;
  feedCount = 0;
  currentFeedTaskIndex = 0;
  attemptsThisRound = 0;
  codeSolved = false;
  currentSeries = null;
  seriesIndex = { play: 0, heal: 0 };
  performance.perfectRun = true;
  performance.frustratedEnding = false;
  performance.totalWrong = 0;
  performance.totalCorrect = 0;
  performance.mistakes.feed.fill(0);
  performance.mistakes.play.fill(0);
  performance.mistakes.heal.fill(0);
  stopEndingAudio();
  setEndingVisual(null);
  previousRenderedState = null;
  previousLevel = 1;
}

function restartGame() {
  resetGameState();
  renderStats();
  updateGameProgress();
  updateFeedProgress();
  updateFeedStatus();
  showCurrentGrowth();
  openAction("feed");
}

function endGameEarly() {
  if (progress.feed && progress.play && progress.heal) {
    checkWholeGameFinished();
    return;
  }

  stopEndingAudio();
  openPanel("finish");

  document.getElementById("finishTitle").textContent =
    currentLanguage === "de" ? "Spiel beendet" : "Игра завершена";

  document.getElementById("finishText").textContent =
    currentLanguage === "de"
      ? "Du hast das Spiel vorzeitig beendet. Dein Tamagotchi miaut traurig und schläft wieder in seinem Ei ein."
      : "Ты завершил игру раньше времени. Тамагочи жалобно мяукает и снова засыпает в своём яйце.";

  setEndingVisual("sleep");
  setPetVisual(
    "egg",
    currentLanguage === "de" ? "Schläft" : "Спит",
    currentLanguage === "de"
      ? "Miau... Zzz... Ich warte auf dich im Ei."
      : "Мяу... З-з-з... Я буду ждать тебя в яйце.",
    false
  );
  miniPetImage.src = petImages.egg;
  playEndingAudio("sad");
}

function endGame() {
  resetGameState();
  gameShell.hidden = true;
  birthScreen.hidden = false;
  birthControls.hidden = false;
  birthContinueBtn.hidden = true;
  petNameInput.value = "";
  state.petName = "";
  birthImage.src = petImages.egg;
  if (birthVisual) birthVisual.className = "birth-visual";
  setLanguage(currentLanguage);
}

function setLanguage(lang) {
  currentLanguage = lang;

  document.documentElement.lang = lang;

  languageButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  const t = i18n[lang];
  petNameInput.placeholder = t.namePlaceholder;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("demoLabel", t.demoLabel);
  setText("levelLabel", t.levelLabel);
  setText("overallProgressLabel", t.overallProgressLabel);
  setText("careTitle", getCareTitle());
  setText("stepFeedLabel", t.stepFeedLabel);
  setText("stepPlayLabel", t.stepPlayLabel);
  setText("stepHealLabel", t.stepHealLabel);
  setText("healthLabel", t.healthLabel);
  setText("hungerLabel", t.hungerLabel);
  setText("moodLabel", t.moodLabel);
  setText("energyLabel", t.energyLabel);
  setText("coinsLabel", t.coinsLabel);
  setText("experienceLabel", t.experienceLabel);
  setText("feedButton", t.feedButton);
  setText("playButton", t.playButton);
  setText("healButton", t.healButton);
  setText("welcomeActionTitle", t.welcomeActionTitle);
  setText("welcomeActionText", getWelcomeIntro());
  setText("feedTitle", currentLanguage === "de" ? `Füttere ${state.petName}` : `Покорми ${ruName("acc")}`);
  setText("feedTopic", t.feedTopic);
  setText("seriesLanguageLabel", t.seriesLanguageLabel);
  setText("playAgainBtn", t.playAgainBtn);
  setText("endGameBtn", t.endGameBtn);
  setText("earlyEndBtn", t.earlyEndBtn);
  setText("satietyLabel", t.satietyLabel);
  setText("fooddyStepLabel", t.fooddyStepLabel);
  setText("fooddyTitle", t.fooddyTitle);
  setText("fooddyZoomHint", t.fooddyZoomHint);
  setText("fooddyModalLabel", t.fooddyModalLabel);
  if (fooddyZoomTrigger) fooddyZoomTrigger.setAttribute("aria-label", t.fooddyZoomHint.replace("🔍 ", ""));
  if (fooddyModalClose) fooddyModalClose.setAttribute("aria-label", t.closeLabel);
  setText("roundLabel", t.roundLabel);
  setText("attemptsLabel", t.attemptsLabel);
  setText("deStepLabel", t.deStepLabel);
  setText("portionLabel", t.portionLabel);
  setText("taskNumberLabel", t.taskNumberLabel);
  setText("finishTitle", t.finishTitle);

  startBtn.textContent = t.startBtn;
  birthContinueBtn.textContent = state.petName
    ? (currentLanguage === "de" ? `${state.petName} kennenlernen` : `Познакомиться с ${ruName("ins")}`)
    : (currentLanguage === "de" ? "Weiter" : "Дальше");
  document.getElementById("continueBtn").textContent = state.petName
    ? (currentLanguage === "de" ? `${state.petName} ansehen` : `Посмотреть на ${ruName("acc")}`)
    : t.continueBtn;
  if (musicLabel) musicLabel.textContent = currentLanguage === "de" ? "Musik" : "Музыка";
  if (musicVolume) musicVolume.setAttribute("aria-label", currentLanguage === "de" ? "Lautstärke" : "Громкость");

  if (!birthControls.hidden) {
    birthTitle.textContent = t.birthTitleEgg;
    birthText.textContent = t.birthTextEgg;
  }

  if (!gameShell.hidden) {
    document.getElementById("welcomeText").textContent = t.welcomeText(state.petName);
    document.getElementById("careTitle").textContent = getCareTitle();
    document.getElementById("welcomeActionText").textContent = getWelcomeIntro();
    updateGrowthChip();
    updateFeedStatus();
    updateGameProgress();

    if (!feedArea.hidden) {
      if (progress.feed) {
        showFeedCompletedPanel();
      } else if (!germanBox.hidden && currentFeedTaskIndex < 6) {
        showGermanFeedTask();
      } else if (!fooddyBox.hidden && !progress.feed) {
        document.getElementById("fooddyMessage").textContent = t.codePrompt();
      }
    }

    if (!seriesArea.hidden && currentSeries) {
      showSeriesTask(currentSeries);
    }

    showCurrentGrowth();
  }
}

function startBirthSequence() {
  const chosenName = petNameInput.value.trim();
  const t = i18n[currentLanguage];

  if (birthVisual) {
    birthVisual.className = "birth-visual";
  }

  if (!chosenName) {
    birthText.textContent = t.nameRequired;
    petNameInput.focus();
    petNameInput.classList.remove("name-error");
    void petNameInput.offsetWidth;
    petNameInput.classList.add("name-error");
    setTimeout(() => petNameInput.classList.remove("name-error"), 800);
    return;
  }

  state.petName = chosenName;
  birthControls.hidden = true;
  birthContinueBtn.hidden = true;
  if (birthVisual) birthVisual.className = "birth-visual egg-awake";
  birthImage.src = petImages.egg;
  birthTitle.textContent = t.birthTitleWake;
  birthText.textContent = t.birthTextWake;

  // 1. Яйцо оживает и начинает трескаться.
  setTimeout(() => {
    if (birthVisual) birthVisual.classList.add("cracking");
    birthTitle.textContent = currentLanguage === "de" ? "Das Ei bekommt Risse …" : "На яйце появляются трещинки…";
    birthText.textContent = currentLanguage === "de" ? "Da bewegt sich etwas!" : "Внутри кто-то двигается!";
  }, 900);

  // 2. Скорлупа раскалывается на отдельные кусочки.
  setTimeout(() => {
    if (birthVisual) {
      birthVisual.classList.remove("cracking");
      birthVisual.classList.add("burst");
    }
    birthImage.src = petImages.hatching;
    birthTitle.textContent = currentLanguage === "de" ? "Es schlüpft!" : "Он вылупляется!";
    birthText.textContent = currentLanguage === "de" ? "Die Schale springt auseinander …" : "Скорлупа разлетается на кусочки…";
  }, 1900);

  // 3. Новорождённый остаётся на экране, пока ребёнок сам не продолжит.
  setTimeout(() => {
    if (birthVisual) {
      birthVisual.classList.remove("burst");
      birthVisual.classList.add("born");
    }
    birthTitle.textContent = t.birthBorn(state.petName);
    birthText.textContent = t.birthBornText(state.petName);
    birthContinueBtn.textContent = currentLanguage === "de" ? `${state.petName} kennenlernen` : `Познакомиться с ${ruName("ins")}`;
    birthContinueBtn.hidden = false;
  }, 3100);
}

function enterGameAfterBirth() {
  birthScreen.hidden = true;
  gameShell.hidden = false;

  document.getElementById("welcomeText").textContent =
    i18n[currentLanguage].welcomeText(state.petName);
  document.getElementById("careTitle").textContent = getCareTitle();
  document.getElementById("welcomeActionText").textContent = getWelcomeIntro();

  renderStats();
  updateGameProgress();
  updateFeedProgress();
  updateFeedStatus();
  showCurrentGrowth(
    currentLanguage === "de"
      ? `Miau! Ich bin ${state.petName}. Kümmere dich um mich!`
      : `Мяу! Я ${state.petName}. Позаботься обо мне!`
  );

  // Сразу открываем первое задание, чтобы ребёнок сразу видел, что делать дальше.
  openAction("feed");
}

function getCompletedBlocksCount() {
  return [progress.feed, progress.play, progress.heal].filter(Boolean).length;
}

function getCurrentStage() {
  return growthStages[Math.min(getCompletedBlocksCount(), growthStages.length - 1)];
}

function getStageLabelForLanguage(stage) {
  if (!stage) return "";
  if (currentLanguage === "ru" && stage.key === "adult") return isFemaleRussianName(state.petName) ? "Взрослая" : "Взрослый";
  return stage[currentLanguage];
}

function updateGrowthChip() {
  const stage = getCurrentStage();
  if (growthLabel && stage) growthLabel.textContent = getStageLabelForLanguage(stage);
}

function getGrowthStage() {
  const completedBlocks = getCompletedBlocksCount();
  return growthStages[Math.min(completedBlocks, growthStages.length - 1)];
}

function getBlockName(action) {
  const names = {
    de: { feed: "Füttern", play: "Spielen", heal: "Heilen" },
    ru: { feed: "Еда", play: "Игра", heal: "Лечение" }
  };
  return names[currentLanguage][action];
}

function showBlockGrowth(action) {
  setEndingVisual(null);
  petPicture.classList.remove("task-scene");
  const stage = getGrowthStage();
  const blockName = getBlockName(action);

  const message = currentLanguage === "de"
    ? `Geschafft! Der Block „${blockName}“ ist mit 6 von 6 Aufgaben abgeschlossen. Neuer Status für ${state.petName}: ${stage.de}.`
    : `Ура! Блок «${blockName}» пройден: 6 из 6 заданий. Новый статус для ${ruName("gen")}: ${getStageLabelForLanguage(stage)}.`;

  setPetVisual(
    stage.key,
    "",
    message,
    false
  );
  miniPetImage.src = petImages[stage.key];
}

function showCurrentGrowth(message = null) {
  setEndingVisual(null);
  petPicture.classList.remove("task-scene");
  setPetActionBadge("");
  const stage = getGrowthStage();
  setPetVisual(stage.key, "", message || defaultGrowthSpeech(stage.key), false);
  miniPetImage.src = petImages[stage.key];
}

function defaultGrowthSpeech(key) {
  const lines = {
    de: {
      baby: "Miau! Ich bin noch ganz klein.",
      kitten: "Schau, ich bin schon gewachsen!",
      growing: "Ich werde immer größer!",
      adult: "Ich bin groß geworden! Danke für deine Fürsorge."
    },
    ru: {
      baby: "Мяу! Я ещё совсем маленькая.",
      kitten: "Смотри, я уже подросла!",
      growing: "Я становлюсь всё взрослее!",
      adult: "Я выросла! Спасибо за твою заботу."
    }
  };

  return lines[currentLanguage][key];
}

function setPetVisual(key, reaction, speech, temporary = true, duration = 1400) {
  clearTimeout(reactionTimer);

  const stage = getCurrentStage();
  updateGrowthChip();

  petImage.src = petImages[key];
  reactionLabel.hidden = !reaction;
  reactionLabel.textContent = reaction || "";
  petSpeech.textContent = speech;
  petImage.classList.remove("pop");
  void petImage.offsetWidth;
  petImage.classList.add("pop");
  petSparkles.classList.add("show");

  if (temporary) {
    reactionTimer = setTimeout(() => {
      petSparkles.classList.remove("show");
      petImage.classList.remove("pop");
      setPetActionBadge("");
      showCurrentGrowth();
    }, duration);
  } else {
    setTimeout(() => petSparkles.classList.remove("show"), 700);
    if (!reaction) {
      reactionLabel.hidden = true;
      reactionLabel.textContent = "";
    }
  }
}


function showReaction(type) {
  const reactions = {
    de: {
      eating: ["eating", "Frisst", "Lecker! Das schmeckt mir!", "🍽️"],
      playing: ["playing", "Spielt", "Das macht Spaß! Noch einmal!", "⚽"],
      sick: ["sick", "Krank", "Mir geht es nicht gut … Hilf mir bitte.", "🤒"],
      healing: ["healing", "Besser!", "Mir geht es besser! Danke!", "💊"]
    },
    ru: {
      eating: ["eating", "Ест", "Вкусно! Мне очень нравится!", "🍽️"],
      playing: ["playing", "Играет", "Как весело! Ещё раз!", "⚽"],
      sick: ["sick", "Болеет", "Мне нездоровится… Помоги мне.", "🤒"],
      healing: ["healing", "Лучше!", "Мне уже лучше! Спасибо!", "💊"]
    }
  };

  const [imageKey, label, speech] = reactions[currentLanguage][type];
  setPetActionBadge("");
  setPetVisual(imageKey, label, speech, true);
}

function showTaskReaction(action, taskIndex) {
  const taskReactions = {
    de: {
      play: [
        ["Spielt Fußball", "Toll! Ich kicke den Ball!"],
        ["Hört Musik", "La-la! Ich höre Musik."],
        ["Spielt Tennis", "Schau mal, ich spiele Tennis!"],
        ["Liest", "Ich lese jetzt ein spannendes Buch!"],
        ["Fotografiert", "Klick-klick! Ich fotografiere!"],
        ["Im Kino", "Ich schaue einen Film!"]
      ],
      heal: [
        ["Kopfschmerzen", "Mein Kopf tut weh …"],
        ["Nimmt Medizin", "Die Medizin hilft mir."],
        ["Ruht sich aus", "Ich bleibe im Bett und ruhe mich aus."],
        ["Trinkt Tee", "Warmer Tee tut gut."],
        ["Misst Temperatur", "Meine Temperatur wird mit dem Thermometer gemessen."],
        ["Beim Tierarzt", "Die Tierärztin hört meine Atmung mit dem Stethoskop ab."]
      ]
    },
    ru: {
      play: [
        ["Играет в футбол", "Ура! Я гоняю мяч!"],
        ["Слушает музыку", "Ла-ла! Я слушаю музыку."],
        ["Играет в теннис", "Смотри, я играю в теннис!"],
        ["Читает книгу", "Я читаю интересную книгу!"],
        ["Фотографирует", "Щёлк-щёлк! Я фотографирую!"],
        ["Смотрит фильм", "Я смотрю фильм!"]
      ],
      heal: [
        ["Голова болит", "Ой, у меня болит голова…"],
        ["Принимает лекарство", "Лекарство помогает мне."],
        ["Отдыхает", "Я отдыхаю в кроватке."],
        ["Пьёт чай", "Тёплый чай меня согревает."],
        ["Измеряет температуру", "Мне измеряют температуру градусником."],
        ["У ветеринара", "Ветеринар слушает моё дыхание стетоскопом."]
      ]
    }
  };

  const entry = taskReactions[currentLanguage]?.[action]?.[taskIndex];
  const imagePath = taskSceneImages[action]?.[taskIndex];
  if (!entry || !imagePath) {
    showCurrentGrowth();
    return;
  }

  clearTimeout(reactionTimer);
  const [label, speech] = entry;
  updateGrowthChip();
  setPetActionBadge("");
  petPicture.classList.add("task-scene");
  petImage.src = imagePath;
  reactionLabel.hidden = false;
  reactionLabel.textContent = label;
  petSpeech.textContent = speech;
  petImage.classList.remove("pop");
  void petImage.offsetWidth;
  petImage.classList.add("pop");
  petSparkles.classList.add("show");

  reactionTimer = setTimeout(() => {
    petSparkles.classList.remove("show");
    petImage.classList.remove("pop");
    showCurrentGrowth();
  }, 1900);
}

function showFeedTaskReaction(taskIndex) {
  const imagePath = taskSceneImages.feed[taskIndex];
  if (!imagePath) {
    showReaction("eating");
    return;
  }

  const lines = currentLanguage === "de"
    ? [
        ["Obst", "Lecker! Obst ist eine gute Wahl."],
        ["Trinkt Wasser", "Schluck, schluck! Wasser tut gut."],
        ["Frühstück", "Brot mit Käse schmeckt mir!"],
        ["Trinkt Tee", "Ja, gern! Ein warmer Tee."],
        ["Milch", "Milch ist kein Obst. Jetzt weiß ich es!"],
        ["Bestellt Essen", "Die Bestellung ist da. Guten Appetit!"]
      ]
    : [
        ["Фрукты", "Вкусно! Фрукты — хороший выбор."],
        ["Пьёт воду", "Хлюп-хлюп! Вода очень нужна."],
        ["Завтракает", "Хлеб с сыром — вкусно!"],
        ["Пьёт чай", "Да, с удовольствием! Тёплый чай."],
        ["Молоко", "Молоко — не фрукт. Теперь я это знаю!"],
        ["Получает заказ", "Заказ готов. Приятного аппетита!"]
      ];

  clearTimeout(reactionTimer);
  const [label, speech] = lines[taskIndex];
  updateGrowthChip();
  setPetActionBadge("");
  petPicture.classList.add("task-scene");
  petImage.src = imagePath;
  reactionLabel.hidden = false;
  reactionLabel.textContent = label;
  petSpeech.textContent = speech;
  petImage.classList.remove("pop");
  void petImage.offsetWidth;
  petImage.classList.add("pop");
  petSparkles.classList.add("show");

  reactionTimer = setTimeout(() => {
    petSparkles.classList.remove("show");
    petImage.classList.remove("pop");
    showCurrentGrowth();
  }, 1900);
}

function showPetCloseup() {
  stopEndingAudio();
  const stage = getCurrentStage();
  petCloseupImage.src = petImages[stage.key];
  petCloseupTitle.textContent = currentLanguage === "de"
    ? `${state.petName} ganz nah`
    : `${state.petName} крупным планом`;
  petCloseupText.textContent = currentLanguage === "de"
    ? "Mrrr... Ich schnurre zufrieden und freue mich, dich zu sehen!"
    : "Мурр... Я довольно мурлычу и рада тебя видеть!";
  petCloseupClose.setAttribute("aria-label", currentLanguage === "de" ? "Schließen" : "Закрыть");
  petCloseupModal.hidden = false;
  document.body.classList.add("modal-open");
  playEndingAudio("happy");
  petCloseupClose.focus();
}

function closePetCloseup() {
  if (!petCloseupModal || petCloseupModal.hidden) return;
  petCloseupModal.hidden = true;
  document.body.classList.remove("modal-open");
  stopEndingAudio();
}

if (petCloseupClose) petCloseupClose.addEventListener("click", closePetCloseup);
document.querySelectorAll("[data-close-pet-closeup]").forEach(el => el.addEventListener("click", closePetCloseup));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && petCloseupModal && !petCloseupModal.hidden) closePetCloseup();
});

function openPanel(panel) {
  welcomePanel.hidden = panel !== "welcome";
  feedArea.hidden = panel !== "feed";
  seriesArea.hidden = panel !== "series";
  finishArea.hidden = panel !== "finish";
}

function setActiveAction(action) {
  document.querySelectorAll(".action-btn").forEach(button => {
    button.classList.toggle("active", button.dataset.mainAction === action);
  });
}

function openAction(action) {
  stopEndingAudio();
  setEndingVisual(null);
  setActiveAction(action);

  if (action === "feed") {
    openPanel("feed");
    showCurrentGrowth(
      currentLanguage === "de"
        ? "Fooddy bewacht das Futter. Hilf mir, eine Portion zu bekommen!"
        : `Фудди хранит еду. Помоги ${ruName("dat")} получить порцию!`
    );
    if (progress.feed) {
      showFeedCompletedPanel();
    } else if (feedCount === 0 && currentFeedTaskIndex === 0 && !codeSolved) {
      startFooddyRound();
    }
    updateFeedStatus();
    updateFeedProgress();
    return;
  }

  currentSeries = action;
  openPanel("series");

  if (action === "heal" && !progress.heal) {
    showReaction("sick");
  } else {
    showCurrentGrowth(
      action === "play"
        ? (currentLanguage === "de" ? "Spielen wir? Ich bin bereit!" : "Поиграем? Я готова!")
        : (currentLanguage === "de" ? "Danke, mir geht es schon besser!" : "Спасибо, мне уже лучше!")
    );
  }

  showSeriesTask(action);
}


function dispenseFooddyPortion() {
  fooddyDispenseLabel.textContent = i18n[currentLanguage].fooddyDispensing;
  foodPellets.classList.remove("dispensing");
  void foodPellets.offsetWidth;
  foodPellets.classList.add("dispensing");

  setTimeout(() => {
    foodPellets.classList.remove("dispensing");
    fooddyDispenseLabel.textContent = i18n[currentLanguage].fooddyDispensed;
  }, 1000);
}

/* ---------- ЕДА ---------- */
function startFooddyRound() {
  codeSolved = false;
  attemptsThisRound = 0;
  secretNumber = Math.floor(Math.random() * 100) + 1;

  fooddyBox.hidden = false;
  germanBox.hidden = true;

  document.getElementById("roundNumber").textContent = 1;
  document.getElementById("attempts").textContent = 0;
  document.getElementById("fooddyMessage").textContent =
    i18n[currentLanguage].codePrompt();

  fooddyDispenseLabel.textContent = i18n[currentLanguage].fooddyReady;
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.focus();
}

function checkGuess() {
  if (codeSolved || progress.feed) return;

  const value = Number(guessInput.value);

  if (!Number.isInteger(value) || value < 1 || value > 100) {
    document.getElementById("fooddyMessage").textContent =
      i18n[currentLanguage].invalidNumber;
    return;
  }

  attemptsThisRound++;
  document.getElementById("attempts").textContent = attemptsThisRound;

  if (value < secretNumber) {
    document.getElementById("fooddyMessage").textContent = i18n[currentLanguage].tooLow;
  } else if (value > secretNumber) {
    document.getElementById("fooddyMessage").textContent = i18n[currentLanguage].tooHigh;
  } else {
    codeSolved = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    document.getElementById("fooddyMessage").textContent =
      i18n[currentLanguage].codeCorrect;
    showGermanFeedTask();
  }

  guessInput.value = "";
}

function showGermanFeedTask() {
  const task = getFeedTasks()[currentFeedTaskIndex];
  fooddyBox.hidden = true;
  germanBox.hidden = false;

  document.getElementById("germanTaskTitle").textContent = task.title;
  document.getElementById("portionNumber").textContent = currentFeedTaskIndex + 1;
  document.getElementById("germanQuestion").textContent = task.question;
  document.getElementById("germanFeedback").textContent = "";
  document.getElementById("germanFeedback").className = "feedback";

  const box = document.getElementById("germanAnswers");
  box.innerHTML = "";

  shuffle([...task.answers]).forEach(answer => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.disabled = false;
    button.addEventListener("click", () => checkGermanFeedAnswer(task, answer, button));
    box.appendChild(button);
  });
}

function checkGermanFeedAnswer(task, answer, clickedButton) {
  const feedbackBox = document.getElementById("germanFeedback");

  if (answer !== task.correct) {
    markTaskMistake("feed", currentFeedTaskIndex);
    feedbackBox.textContent = i18n[currentLanguage].wrong;
    feedbackBox.className = "feedback bad";

    clickedButton.classList.remove("wrong-answer");
    void clickedButton.offsetWidth;
    clickedButton.classList.add("wrong-answer");

    setTimeout(() => {
      clickedButton.classList.remove("wrong-answer");
    }, 700);

    return;
  }

  document.querySelectorAll("#germanAnswers button").forEach(b => b.disabled = true);
  feedbackBox.textContent = `${task.success} ${i18n[currentLanguage].correctPortion(state.petName)}`;
  feedbackBox.className = "feedback ok";

  const completedFeedTaskIndex = currentFeedTaskIndex;
  markTaskCorrect();
  feedCount++;
  currentFeedTaskIndex++;

  state.hunger -= 10;
  state.mood += 2;
  state.coins += 1;
  state.experience += 5;

  updateLevel();
  clampStats();
  renderStats();
  updateFeedProgress();
  updateGameProgress();

  // Голод изменился только сейчас — после правильного немецкого ответа.
  petSpeech.textContent = i18n[currentLanguage].hungerChanged(state.hunger);

  // Сначала Фудди физически выдаёт порцию, затем питомец её ест.
  dispenseFooddyPortion();

  setTimeout(() => {
    showFeedTaskReaction(completedFeedTaskIndex);
  }, 650);

  if (feedCount >= 6) {
    setTimeout(finishFeedBlock, 1700);
  } else {
    // Код доступа угадывается только один раз. После первой разблокировки
    // ребёнок выполняет оставшиеся задания подряд и за каждое получает порцию.
    setTimeout(showGermanFeedTask, 1700);
  }
}

function showFeedCompletedPanel() {
  fooddyBox.hidden = true;
  germanBox.hidden = false;
  document.getElementById("germanTaskTitle").textContent = currentLanguage === "de" ? "GESCHAFFT!" : "ГОТОВО!";
  document.getElementById("portionNumber").textContent = "6";
  document.getElementById("germanQuestion").textContent = i18n[currentLanguage].feedComplete(state.petName);
  document.getElementById("germanAnswers").innerHTML = "";
  document.getElementById("germanFeedback").textContent = currentLanguage === "de"
    ? "Der Fütterungsblock ist abgeschlossen. Als Nächstes leuchtet Spielen grün auf."
    : "Блок кормления завершён. Следующим зелёным подсвечен блок «Поиграть».";
  document.getElementById("germanFeedback").className = "feedback ok";
}

function finishFeedBlock() {
  progress.feed = true;
  state.hunger = 0;
  state.mood += 5;

  clampStats();
  renderStats();
  updateFeedStatus();
  updateGameProgress();
  updateLevel();

  guessInput.disabled = true;
  guessBtn.disabled = true;
  showFeedCompletedPanel();
  showBlockGrowth("feed");
  checkWholeGameFinished();
}

function updateFeedProgress() {
  const percent = Math.round((feedCount / 6) * 100);
  document.getElementById("feedCount").textContent = feedCount;
  document.getElementById("feedProgress").style.width = `${percent}%`;
  document.querySelectorAll("#feedDots span").forEach((dot, i) => {
    dot.classList.toggle("done", i < feedCount);
  });
}

function updateFeedStatus() {
  const badge = document.getElementById("feedStatus");
  badge.textContent = progress.feed ? i18n[currentLanguage].statusDone : i18n[currentLanguage].statusNotDone;
  badge.classList.toggle("done", progress.feed);
}

/* ---------- ИГРА / ЛЕЧЕНИЕ ---------- */
function getSeriesTasks(action) {
  return action === "play" ? getPlayTasks() : getHealTasks();
}

function showSeriesTask(action) {
  const tasks = getSeriesTasks(action);
  const index = seriesIndex[action];

  const t = i18n[currentLanguage];

  document.getElementById("seriesTopic").textContent =
    action === "play" ? t.playTopic : t.healTopic;

  document.getElementById("seriesTitle").textContent =
    action === "play"
      ? (currentLanguage === "de" ? `Spiele mit ${state.petName}` : `Поиграй с ${ruName("ins")}`)
      : (currentLanguage === "de" ? `Hilf ${state.petName}, wieder gesund zu werden` : `Помоги ${ruName("dat")} выздороветь`);

  document.getElementById("seriesProgressLabel").textContent =
    action === "play" ? t.playProgress : t.healProgress;

  const status = document.getElementById("seriesStatus");
  status.textContent = progress[action] ? i18n[currentLanguage].statusDone : i18n[currentLanguage].statusNotDone;
  status.classList.toggle("done", progress[action]);

  updateSeriesProgress(action);

  if (progress[action]) {
    document.getElementById("seriesTaskTitle").textContent = currentLanguage === "de" ? "GESCHAFFT!" : "ГОТОВО!";
    document.getElementById("seriesTaskNumber").textContent = "6";
    document.getElementById("seriesQuestion").textContent =
      action === "play"
        ? (currentLanguage === "de" ? "Alle Aufgaben sind richtig gelöst." : "Все задания выполнены правильно.")
        : (currentLanguage === "de" ? `${state.petName} ist wieder gesund.` : `Здоровье восстановлено.`);
    document.getElementById("seriesAnswers").innerHTML = "";
    document.getElementById("seriesFeedback").textContent = "";
    return;
  }

  const task = tasks[index];
  document.getElementById("seriesTaskTitle").textContent = task.title;
  document.getElementById("seriesTaskNumber").textContent = index + 1;
  document.getElementById("seriesQuestion").textContent = withPetName(task.question);
  document.getElementById("seriesFeedback").textContent = "";
  document.getElementById("seriesFeedback").className = "feedback";

  const answers = document.getElementById("seriesAnswers");
  answers.innerHTML = "";

  shuffle([...task.answers]).forEach(answer => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.disabled = false;
    button.addEventListener("click", () => checkSeriesAnswer(action, task, answer, button));
    answers.appendChild(button);
  });
}

function checkSeriesAnswer(action, task, answer, clickedButton) {
  const feedback = document.getElementById("seriesFeedback");

  if (answer !== task.correct) {
    markTaskMistake(action, seriesIndex[action]);
    feedback.textContent = i18n[currentLanguage].wrong;
    feedback.className = "feedback bad";

    clickedButton.classList.remove("wrong-answer");
    void clickedButton.offsetWidth;
    clickedButton.classList.add("wrong-answer");

    setTimeout(() => {
      clickedButton.classList.remove("wrong-answer");
    }, 700);

    return;
  }

  document.querySelectorAll("#seriesAnswers button").forEach(b => b.disabled = true);
  feedback.textContent = withPetName(task.success);
  feedback.className = "feedback ok";

  markTaskCorrect();

  if (action === "play") {
    state.mood += 5;
    state.energy -= 5;
    state.coins += 1;
    state.experience += 5;
  } else {
    state.health += 5;
    state.mood += 2;
    state.coins += 1;
    state.experience += 5;
  }

  showTaskReaction(action, seriesIndex[action]);
  seriesIndex[action]++;
  updateLevel();
  clampStats();
  renderStats();
  updateSeriesProgress(action);
  updateGameProgress();

  if (seriesIndex[action] >= 6) {
    progress[action] = true;
    updateGameProgress();
    updateLevel();

    const status = document.getElementById("seriesStatus");
    status.textContent = i18n[currentLanguage].statusDone;
    status.classList.add("done");

    setTimeout(() => showBlockGrowth(action), 450);

    checkWholeGameFinished();
    setTimeout(() => showSeriesTask(action), 1500);
  } else {
    setTimeout(() => {
      showSeriesTask(action);
    }, 1700);
  }
}

function updateSeriesProgress(action) {
  const count = seriesIndex[action];
  const percent = Math.round((count / 6) * 100);
  document.getElementById("seriesCount").textContent = count;
  document.getElementById("seriesProgress").style.width = `${percent}%`;
  document.querySelectorAll("#seriesDots span").forEach((dot, i) => {
    dot.classList.toggle("done", i < count);
  });
}

/* ---------- ОБЩЕЕ ---------- */
function updateActionFlow() {
  const order = ["feed", "play", "heal"];
  const nextAction = !progress.feed ? "feed" : !progress.play ? "play" : !progress.heal ? "heal" : null;

  document.querySelectorAll(".action-btn").forEach(button => {
    const action = button.dataset.mainAction;
    button.classList.toggle("done-block", !!progress[action]);
    button.classList.toggle("next-action", nextAction === action && !progress[action]);
  });

  document.querySelectorAll("#gameProgressSteps .step").forEach((step, i) => {
    const action = order[i];
    step.classList.toggle("done", progress[action]);
    step.classList.toggle("next-action", nextAction === action && !progress[action]);
  });
}

function updateGameProgress() {
  const totalTasks = 18;
  const completedTasks = Math.min(totalTasks, Math.floor(state.experience / 5));
  const percent = Math.round((completedTasks / totalTasks) * 100);

  const percentNode = document.getElementById("gameProgressPercent");
  const fillNode = document.getElementById("gameProgressFill");
  if (percentNode) percentNode.textContent = `${percent}%`;
  if (fillNode) {
    fillNode.style.width = `${percent}%`;
    fillNode.setAttribute("aria-valuenow", String(percent));
  }

  updateActionFlow();
}

function checkWholeGameFinished() {
  if (progress.feed && progress.play && progress.heal) {
    openPanel("finish");

    const errorRate = getErrorRate();
    const sleepyEnding = errorRate >= 0.5;

    if (sleepyEnding) {
      const percent = Math.round(errorRate * 100);
      document.getElementById("finishText").textContent = currentLanguage === "de"
        ? `Fehlerquote: ${percent} %. Dein Tamagotchi ist müde und schläft wieder im Ei ein.`
        : `Ошибок: ${percent}%. Тамагочи устал и снова засыпает в яйце.`;
      setEndingVisual("sleep");
      setPetVisual(
        "egg",
        currentLanguage === "de" ? "Schläft" : "Спит",
        currentLanguage === "de" ? "Zzz... Wir versuchen es später noch einmal." : "З-з-з... Попробуем ещё раз позже.",
        false
      );
      playEndingAudio("sad");
      return;
    }

    document.getElementById("finishText").textContent =
      i18n[currentLanguage].finishText(state.petName);
    setEndingVisual("happy");
    setPetVisual(
      "adult",
      currentLanguage === "de" ? "Schnurrt" : "Мурлычет",
      currentLanguage === "de"
        ? "Mrrr... Ich strecke dir zufrieden meine Pfote entgegen!"
        : "Мурр... Я довольно тяну к тебе лапку!",
      false
    );
    playEndingAudio("happy");
  }
}

function updateLevel() {
  const newLevel = getCompletedBlocksCount() + 1;
  state.level = newLevel;
  previousLevel = newLevel;
  renderStats();
}

function clampStats() {
  state.health = clamp(state.health,0,100);
  state.hunger = clamp(state.hunger,0,100);
  state.mood = clamp(state.mood,0,100);
  state.energy = clamp(state.energy,0,100);
}

function renderStats() {
  const keys = ["health","hunger","mood","energy","coins","experience"];

  keys.forEach(key => {
    const element = document.getElementById(key);
    const card = document.querySelector(`[data-stat="${key}"]`);
    const value = state[key];

    element.textContent = value;

    if (card && previousRenderedState && previousRenderedState[key] !== value) {
      card.classList.remove("changed");
      void card.offsetWidth;
      card.classList.add("changed");
      setTimeout(() => card.classList.remove("changed"), 2500);
    }
  });

  document.getElementById("level").textContent = state.level;
  updateGrowthChip();

  previousRenderedState = {
    health: state.health,
    hunger: state.hunger,
    mood: state.mood,
    energy: state.energy,
    coins: state.coins,
    experience: state.experience,
    level: state.level
  };
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function clamp(value,min,max) {
  return Math.min(max,Math.max(min,value));
}

setLanguage("de");


// Если сообщение Fooddy меняется, в увеличенном окне показывается тот же полный текст.
const fooddyMessageNode = document.getElementById("fooddyMessage");
if (fooddyMessageNode && fooddyModalMessage) {
  const syncFooddyModal = () => { fooddyModalMessage.textContent = fooddyMessageNode.textContent; };
  new MutationObserver(syncFooddyModal).observe(fooddyMessageNode, { childList: true, characterData: true, subtree: true });
  syncFooddyModal();
}
