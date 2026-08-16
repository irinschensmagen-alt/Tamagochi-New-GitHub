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

let currentLanguage = "de";

const i18n = {
  de: {
    demoLabel: "",
    namePlaceholder: "Name des Tamagotchis",
    nameRequired: "Bitte gib deinem Tamagotchi zuerst einen Namen.",
    levelLabel: "🏆 Level",
    overallProgressLabel: "Gesamtfortschritt",
    careTitle: "Für dein Tamagotchi sorgen",
    stepFeedLabel: "🍎 Füttern",
    stepPlayLabel: "🎮 Spielen",
    stepHealLabel: "💊 Gesundheit",
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
    satietyLabel: "Sättigung",
    fooddyStepLabel: "🤖 Schritt 1. Robo-Futterautomat Fooddy",
    fooddyTitle: "Errate den Geheimcode",
    roundLabel: "Runde",
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
    calm: "Ruhig",
    fooddyReady: "Fooddy ist bereit",
    fooddyDispensing: "Fooddy gibt eine Portion aus!",
    fooddyDispensed: "Portion ausgegeben ✓",
    codePrompt: n => `Fooddy: „Piep-piep! Code Nr. ${n} ist versteckt. Errate eine Zahl von 1 bis 100!“`,
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
    stepHealLabel: "💊 Здоровье",
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
    satietyLabel: "Сытость",
    fooddyStepLabel: "🤖 Шаг 1. Робо-Кормушка Фудди",
    fooddyTitle: "Угадай секретный код",
    roundLabel: "Раунд",
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
    birthBorn: name => `${name} родилась!`,
    birthBornText: name => `Вот она — новорождённая ${name}! Рассмотри её и нажми кнопку, когда будешь готов продолжить.`,
    welcomeText: name => `${name} родилась! Выполняй задания и заботься о питомце.`,
    statusDone: "Выполнено",
    statusNotDone: "Не выполнено",
    calm: "Спокойна",
    fooddyReady: "Фудди готова",
    fooddyDispensing: "Фудди выдаёт порцию!",
    fooddyDispensed: "Порция выдана ✓",
    codePrompt: n => `Фудди: «Бип-бип! Код №${n} спрятан. Угадай число от 1 до 100!»`,
    invalidNumber: "Фудди: «Бип-бип! Введи целое число от 1 до 100.»",
    tooLow: "Фудди: «Слишком мало! Мой код БОЛЬШЕ!»",
    tooHigh: "Фудди: «Слишком много! Мой код МЕНЬШЕ!»",
    codeCorrect: "Фудди: «Отлично! Код верный. Теперь выполни задание!»",
    wrong: "Неправильно. Попробуй ещё раз.",
    correctPortion: name => `${name} получает порцию корма!`,
    hungerChanged: value => `Правильно! Фудди выдаёт порцию. Голод: ${value}.`,
    fullyFed: "Я сыта! Спасибо!",
    feedComplete: name => `Готово! ${name} получила все 6 порций.`,
    playTopic: "🎮 Игры и досуг",
    healTopic: "💊 Здоровье",
    playTitle: "Игра",
    healTitle: "Лечение",
    playProgress: "Прогресс игры",
    healProgress: "Прогресс лечения",
    finishText: name => `${name} сыта, здорова, счастлива и выросла благодаря твоей заботе!`,
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
      {title:"AUFGABE 5", question:"Bei Fieber soll man sich ...", answers:["ausruhen","beeilen","verabreden"], correct:"ausruhen", success:"Richtig! Man soll sich ausruhen."},
      {title:"AUFGABE 6", question:"Der Arzt untersucht den ...", answers:["Patienten","Kuchen","Fußball"], correct:"Patienten", success:"Richtig! Der Arzt untersucht den Patienten."}
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
      {title:"ЗАДАНИЕ 1", question:"У {name} болит голова. Она ...", answers:["болеет","вкусная","спортивная"], correct:"болеет", success:"Правильно! {name} болеет."},
      {title:"ЗАДАНИЕ 2", question:"Что помогает при болезни?", answers:["лекарство","футбол","пицца"], correct:"лекарство", success:"Правильно! Лекарство помогает."},
      {title:"ЗАДАНИЕ 3", question:"Что советуют делать при болезни?", answers:["отдыхать","танцевать","бегать"], correct:"отдыхать", success:"Правильно! Нужно отдыхать."},
      {title:"ЗАДАНИЕ 4", question:"Что можно пить при больном горле?", answers:["тёплый чай","мяч","ботинок"], correct:"тёплый чай", success:"Правильно!"},
      {title:"ЗАДАНИЕ 5", question:"Что делать при высокой температуре?", answers:["отдыхать","торопиться","играть весь день"], correct:"отдыхать", success:"Правильно! Нужно отдыхать."},
      {title:"ЗАДАНИЕ 6", question:"Кого осматривает врач?", answers:["пациента","торт","футбольный мяч"], correct:"пациента", success:"Правильно! Врач осматривает пациента."}
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

const growthStages = [
  { minLevel: 1, key: "baby", de: "Baby", ru: "Малыш" },
  { minLevel: 2, key: "kitten", de: "Kätzchen", ru: "Котёнок" },
  { minLevel: 3, key: "growing", de: "Jungtier", ru: "Подросток" },
  { minLevel: 4, key: "adult", de: "Erwachsen", ru: "Взрослый" }
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

function withPetName(text) {
  return String(text).replaceAll("{name}", state.petName);
}

function getCareTitle() {
  return currentLanguage === "de" ? `Für ${state.petName} sorgen` : `Забота о ${state.petName}`;
}

function getWelcomeIntro() {
  return currentLanguage === "de"
    ? `Füttere ${state.petName}, spiele mit ihr oder hilf ihr, wieder gesund zu werden.`
    : `Покорми ${state.petName}, поиграй с ней или помоги ей выздороветь.`;
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
const miniPetImage = document.getElementById("miniPetImage");
const petSpeech = document.getElementById("petSpeech");
const growthLabel = document.getElementById("growthLabel");
const reactionLabel = document.getElementById("reactionLabel");
const petSparkles = document.getElementById("petSparkles");

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

let secretNumber = 0;
let feedCount = 0;
let currentFeedTaskIndex = 0;
let attemptsThisRound = 0;
let codeSolved = false;
let currentSeries = null;
let seriesIndex = { play: 0, heal: 0 };

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

document.getElementById("continueBtn").addEventListener("click", () => {
  openPanel("welcome");
  showCurrentGrowth(currentLanguage === "de" ? "Ich bin dank deiner Fürsorge gewachsen! ✨" : "Я выросла благодаря твоей заботе! ✨");
});


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
  setText("feedTitle", currentLanguage === "de" ? `Füttere ${state.petName}` : `Покорми ${state.petName}`);
  setText("satietyLabel", t.satietyLabel);
  setText("fooddyStepLabel", t.fooddyStepLabel);
  setText("fooddyTitle", t.fooddyTitle);
  setText("roundLabel", t.roundLabel);
  setText("attemptsLabel", t.attemptsLabel);
  setText("deStepLabel", t.deStepLabel);
  setText("portionLabel", t.portionLabel);
  setText("taskNumberLabel", t.taskNumberLabel);
  setText("finishTitle", t.finishTitle);

  startBtn.textContent = t.startBtn;
  birthContinueBtn.textContent = state.petName
    ? (currentLanguage === "de" ? `${state.petName} kennenlernen` : `Познакомиться с ${state.petName}`)
    : (currentLanguage === "de" ? "Weiter" : "Дальше");
  document.getElementById("continueBtn").textContent = state.petName
    ? (currentLanguage === "de" ? `${state.petName} ansehen` : `Посмотреть на ${state.petName}`)
    : t.continueBtn;

  if (!birthControls.hidden) {
    birthTitle.textContent = t.birthTitleEgg;
    birthText.textContent = t.birthTextEgg;
  }

  if (!gameShell.hidden) {
    document.getElementById("welcomeText").textContent = t.welcomeText(state.petName);
    document.getElementById("careTitle").textContent = getCareTitle();
    document.getElementById("welcomeActionText").textContent = getWelcomeIntro();
    reactionLabel.textContent = t.calm;
    updateFeedStatus();
    updateGameProgress();

    if (!feedArea.hidden) {
      if (!germanBox.hidden && currentFeedTaskIndex < 6) {
        showGermanFeedTask();
      } else if (!fooddyBox.hidden && !progress.feed) {
        document.getElementById("fooddyMessage").textContent =
          t.codePrompt(currentFeedTaskIndex + 1);
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
    birthContinueBtn.textContent = currentLanguage === "de" ? `${state.petName} kennenlernen` : `Познакомиться с ${state.petName}`;
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
  const stage = getGrowthStage();
  const blockName = getBlockName(action);

  const message = currentLanguage === "de"
    ? `Geschafft! Der Block „${blockName}“ ist mit 6 von 6 Aufgaben abgeschlossen. ${state.petName} ist gewachsen! Neuer Status: ${stage.de}.`
    : `Ура! Блок «${blockName}» пройден: 6 из 6 заданий. ${state.petName} вырос! Новый статус: ${stage.ru}.`;

  setPetVisual(
    stage.key,
    currentLanguage === "de" ? `Neuer Status: ${stage.de}` : `Новый статус: ${stage.ru}`,
    message,
    false
  );
  miniPetImage.src = petImages[stage.key];
}

function showCurrentGrowth(message = null) {
  const stage = getGrowthStage();
  setPetVisual(stage.key, stage[currentLanguage], message || defaultGrowthSpeech(stage.key), false);
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

  petImage.src = petImages[key];
  reactionLabel.textContent = reaction;
  petSpeech.textContent = speech;
  petImage.classList.remove("pop");
  void petImage.offsetWidth;
  petImage.classList.add("pop");
  petSparkles.classList.add("show");

  if (temporary) {
    reactionTimer = setTimeout(() => {
      petSparkles.classList.remove("show");
      petImage.classList.remove("pop");
      showCurrentGrowth();
      reactionLabel.textContent = i18n[currentLanguage].calm;
    }, duration);
  } else {
    setTimeout(() => petSparkles.classList.remove("show"), 700);
    reactionLabel.textContent = i18n[currentLanguage].calm;
  }
}

function showReaction(type) {
  const reactions = {
    de: {
      eating: ["eating", "Frisst", "Lecker! Das schmeckt mir!"],
      playing: ["playing", "Spielt", "Das macht Spaß! Noch einmal!"],
      sick: ["sick", "Krank", "Mir geht es nicht gut … Hilf mir bitte."],
      healing: ["healing", "Besser!", "Mir geht es besser! Danke!"]
    },
    ru: {
      eating: ["eating", "Ест", "Вкусно! Мне очень нравится!"],
      playing: ["playing", "Играет", "Как весело! Ещё раз!"],
      sick: ["sick", "Болеет", "Мне нездоровится… Помоги мне."],
      healing: ["healing", "Лучше!", "Мне уже лучше! Спасибо!"]
    }
  };

  const [imageKey, label, speech] = reactions[currentLanguage][type];
  setPetVisual(imageKey, label, speech, true);
}

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
  setActiveAction(action);

  if (action === "feed") {
    openPanel("feed");
    showCurrentGrowth(
      currentLanguage === "de"
        ? "Fooddy bewacht das Futter. Hilf mir, eine Portion zu bekommen!"
        : "Фудди хранит еду. Помоги мне получить порцию!"
    );
    if (!progress.feed && feedCount === 0 && currentFeedTaskIndex === 0 && !codeSolved) {
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

  document.getElementById("roundNumber").textContent = currentFeedTaskIndex + 1;
  document.getElementById("attempts").textContent = 0;
  document.getElementById("fooddyMessage").textContent =
    i18n[currentLanguage].codePrompt(currentFeedTaskIndex + 1);

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
    showReaction("eating");
  }, 650);

  if (feedCount >= 6) {
    setTimeout(finishFeedBlock, 1700);
  } else {
    setTimeout(startFooddyRound, 2100);
  }
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

  germanBox.hidden = true;
  fooddyBox.hidden = false;
  document.getElementById("fooddyMessage").textContent =
    i18n[currentLanguage].feedComplete(state.petName);

  guessInput.disabled = true;
  guessBtn.disabled = true;
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
      ? (currentLanguage === "de" ? `Spiele mit ${state.petName}` : `Поиграй с ${state.petName}`)
      : (currentLanguage === "de" ? `Hilf ${state.petName}, wieder gesund zu werden` : `Помоги ${state.petName} выздороветь`);

  document.getElementById("seriesProgressLabel").textContent =
    action === "play" ? t.playProgress : t.healProgress;

  const status = document.getElementById("seriesStatus");
  status.textContent = progress[action] ? i18n[currentLanguage].statusDone : i18n[currentLanguage].statusNotDone;
  status.classList.toggle("done", progress[action]);

  updateSeriesProgress(action);

  if (progress[action]) {
    document.getElementById("seriesTaskTitle").textContent = "Geschafft!";
    document.getElementById("seriesTaskNumber").textContent = "6";
    document.getElementById("seriesQuestion").textContent =
      action === "play"
        ? (currentLanguage === "de" ? "Alle Aufgaben sind richtig gelöst." : "Все задания выполнены правильно.")
        : (currentLanguage === "de" ? `${state.petName} ist wieder gesund.` : `${state.petName} снова здорова.`);
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

  if (action === "play") {
    state.mood += 5;
    state.energy -= 5;
    state.coins += 1;
    state.experience += 5;
    showReaction("playing");
  } else {
    state.health += 5;
    state.mood += 2;
    state.coins += 1;
    state.experience += 5;
    showReaction("healing");
  }

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
      if (action === "heal") showReaction("sick");
      showSeriesTask(action);
    }, 1500);
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
function updateGameProgress() {
  const order = ["feed","play","heal"];
  const completedTasks = feedCount + seriesIndex.play + seriesIndex.heal;
  const totalTasks = 18;
  const percent = Math.round((completedTasks / totalTasks) * 100);

  document.getElementById("gameProgressPercent").textContent = `${percent}%`;
  document.getElementById("gameProgressFill").style.width = `${percent}%`;

  document.querySelectorAll("#gameProgressSteps .step").forEach((step, i) => {
    step.classList.toggle("done", progress[order[i]]);
  });
}

function checkWholeGameFinished() {
  if (progress.feed && progress.play && progress.heal) {
    openPanel("finish");
    document.getElementById("finishText").textContent =
      i18n[currentLanguage].finishText(state.petName);
    showCurrentGrowth(currentLanguage === "de" ? `Ich bin gewachsen! Danke, dass du dich um mich gekümmert hast! 💛` : `Я выросла! Спасибо, что заботилась обо мне! 💛`);
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
