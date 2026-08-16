const state = {
  petName: "Анфиса",
  health: 70,
  hunger: 60,
  mood: 55,
  energy: 100,
  coins: 0,
  experience: 0,
  level: 1
};

const progress = { feed: false, play: false, heal: false };

const petImages = {
  egg: "assets/images/anfisa_egg.png",
  hatching: "assets/images/anfisa_hatching.png",
  baby: "assets/images/anfisa_baby.png",
  kitten: "assets/images/anfisa_kitten.png",
  growing: "assets/images/anfisa_growing.png",
  adult: "assets/images/anfisa_adult.png",
  eating: "assets/images/anfisa_eating.png",
  playing: "assets/images/anfisa_playing.png",
  sick: "assets/images/anfisa_sick.png",
  healing: "assets/images/anfisa_healing.png"
};

const growthStages = [
  { minLevel: 1, key: "baby", label: "Малышка" },
  { minLevel: 2, key: "kitten", label: "Котёнок" },
  { minLevel: 3, key: "growing", label: "Подрастает" },
  { minLevel: 4, key: "adult", label: "Взрослая" }
];

let previousRenderedState = null;
let previousLevel = 1;
let reactionTimer = null;

const germanFeedTasks = [
  { title:"AUFGABE 1", question:"___ Apfel", answers:["der","die","das"], correct:"der", success:"Richtig! Der Apfel." },
  { title:"AUFGABE 2", question:"Was trinkt man?", answers:["Wasser","Brot","Käse"], correct:"Wasser", success:"Richtig! Man trinkt Wasser." },
  { title:"AUFGABE 3", question:"Zum Frühstück esse ich Brot mit ...", answers:["Käse","Wasser","Saft"], correct:"Käse", success:"Richtig! Brot mit Käse." },
  { title:"AUFGABE 4", question:"Möchtest du einen Tee?", answers:["Ja, gern.","Ich heiße Anna.","Das ist mein Bruder."], correct:"Ja, gern.", success:"Richtig! Ja, gern." },
  { title:"AUFGABE 5", question:"Was passt nicht?", answers:["die Banane","der Apfel","die Orange","die Milch"], correct:"die Milch", success:"Richtig! Die Milch passt nicht." },
  { title:"AUFGABE 6", question:"Ich möchte eine Pizza ...", answers:["bestellen","trinken","fahren"], correct:"bestellen", success:"Richtig! Ich möchte eine Pizza bestellen." }
];

const playTasks = [
  { title:"AUFGABE 1", question:"Anna ___ gern Fußball.", answers:["spiele","spielt","spielen"], correct:"spielt", success:"Richtig! Anna spielt gern Fußball." },
  { title:"AUFGABE 2", question:"Was macht man in der Freizeit?", answers:["Musik hören","Fieber haben","Medizin nehmen"], correct:"Musik hören", success:"Richtig! Musik hören." },
  { title:"AUFGABE 3", question:"Wir ___ am Wochenende Tennis.", answers:["spielen","spielt","spielst"], correct:"spielen", success:"Richtig! Wir spielen am Wochenende Tennis." },
  { title:"AUFGABE 4", question:"Ich ___ gern Bücher.", answers:["lese","liest","lesen"], correct:"lese", success:"Richtig! Ich lese gern Bücher." },
  { title:"AUFGABE 5", question:"Was passt zu einem Hobby?", answers:["fotografieren","Kopfschmerzen","Tabletten"], correct:"fotografieren", success:"Richtig! Fotografieren ist ein Hobby." },
  { title:"AUFGABE 6", question:"Am Samstag ___ wir ins Kino.", answers:["gehen","geht","gehst"], correct:"gehen", success:"Richtig! Am Samstag gehen wir ins Kino." }
];

const healTasks = [
  { title:"AUFGABE 1", question:"Anfisa hat Kopfschmerzen. Sie ist ...", answers:["krank","lecker","sportlich"], correct:"krank", success:"Richtig! Anfisa ist krank." },
  { title:"AUFGABE 2", question:"Was hilft bei Krankheit?", answers:["Medizin","Fußball","Pizza"], correct:"Medizin", success:"Richtig! Medizin hilft." },
  { title:"AUFGABE 3", question:"Der Arzt sagt: Du sollst im Bett ...", answers:["bleiben","tanzen","fahren"], correct:"bleiben", success:"Richtig! Du sollst im Bett bleiben." },
  { title:"AUFGABE 4", question:"Ich habe Halsschmerzen. Ich trinke warmen ...", answers:["Tee","Ball","Schuh"], correct:"Tee", success:"Richtig! Ich trinke warmen Tee." },
  { title:"AUFGABE 5", question:"Bei Fieber soll man sich ...", answers:["ausruhen","beeilen","verabreden"], correct:"ausruhen", success:"Richtig! Man soll sich ausruhen." },
  { title:"AUFGABE 6", question:"Der Arzt untersucht den ...", answers:["Patienten","Kuchen","Fußball"], correct:"Patienten", success:"Richtig! Der Arzt untersucht den Patienten." }
];

const birthScreen = document.getElementById("birthScreen");
const gameShell = document.getElementById("gameShell");
const birthImage = document.getElementById("birthImage");
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
  showCurrentGrowth("Я выросла благодаря твоей заботе! ✨");
});

function startBirthSequence() {
  state.petName = petNameInput.value.trim() || "Анфиса";

  birthControls.hidden = true;
  birthContinueBtn.hidden = true;
  birthTitle.textContent = "Яйцо просыпается…";
  birthText.textContent = "Неоновый свет становится ярче. Смотри внимательно!";
  birthImage.src = petImages.egg;

  setTimeout(() => {
    birthImage.src = petImages.hatching;
    birthTitle.textContent = `${state.petName} родилась!`;
    birthText.textContent =
      "Вот она — новорождённая Анфиса! Рассмотри её и нажми кнопку, когда будешь готов продолжить.";
    birthContinueBtn.hidden = false;
  }, 1200);
}

function enterGameAfterBirth() {
  birthScreen.hidden = true;
  gameShell.hidden = false;

  document.getElementById("welcomeText").textContent =
    `${state.petName} родилась! Выполняй задания и заботься о питомце.`;

  renderStats();
  updateGameProgress();
  showCurrentGrowth(`Мяу! Я ${state.petName}. Позаботься обо мне!`);
}

function getGrowthStage() {
  let current = growthStages[0];
  growthStages.forEach(stage => {
    if (state.level >= stage.minLevel) current = stage;
  });
  return current;
}

function showCurrentGrowth(message = null) {
  const stage = getGrowthStage();
  setPetVisual(stage.key, stage.label, message || defaultGrowthSpeech(stage.key), false);
  miniPetImage.src = petImages[stage.key];
}

function defaultGrowthSpeech(key) {
  const lines = {
    baby: "Мяу! Я ещё совсем маленькая.",
    kitten: "Смотри, я уже подросла!",
    growing: "Я становлюсь всё взрослее!",
    adult: "Я выросла! Спасибо за твою заботу."
  };
  return lines[key];
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
      reactionLabel.textContent = "Спокойна";
    }, duration);
  } else {
    setTimeout(() => petSparkles.classList.remove("show"), 700);
    reactionLabel.textContent = "Спокойна";
  }
}

function showReaction(type) {
  const reactions = {
    eating: ["eating", "Ест", "Lecker! Мне очень вкусно!"],
    playing: ["playing", "Играет", "Das macht Spaß! Ещё раз!"],
    sick: ["sick", "Болеет", "Мне нездоровится… Помоги мне."],
    healing: ["healing", "Лучше!", "Mir geht es besser! Спасибо!"]
  };
  const [imageKey, label, speech] = reactions[type];
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
    showCurrentGrowth("Фудди хранит еду. Помоги мне получить порцию!");
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
    showCurrentGrowth(action === "play" ? "Поиграем? Я готова!" : "Спасибо, мне уже лучше!");
  }

  showSeriesTask(action);
}


function dispenseFooddyPortion() {
  fooddyDispenseLabel.textContent = "Фудди выдаёт порцию!";
  foodPellets.classList.remove("dispensing");
  void foodPellets.offsetWidth;
  foodPellets.classList.add("dispensing");

  setTimeout(() => {
    foodPellets.classList.remove("dispensing");
    fooddyDispenseLabel.textContent = "Порция выдана ✓";
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
    `Фудди: «Бип-бип! Код №${currentFeedTaskIndex + 1} спрятан. Угадай число от 1 до 100!»`;

  fooddyDispenseLabel.textContent = "Фудди готова";
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
      "Фудди: «Бип-бип! Введи целое число от 1 до 100.»";
    return;
  }

  attemptsThisRound++;
  document.getElementById("attempts").textContent = attemptsThisRound;

  if (value < secretNumber) {
    document.getElementById("fooddyMessage").textContent = "Фудди: «Слишком мало! Мой код БОЛЬШЕ!»";
  } else if (value > secretNumber) {
    document.getElementById("fooddyMessage").textContent = "Фудди: «Ого, перелёт! Мой код МЕНЬШЕ!»";
  } else {
    codeSolved = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    document.getElementById("fooddyMessage").textContent =
      "Фудди: «Super! Der Code stimmt. Jetzt löse die Aufgabe!»";
    showGermanFeedTask();
  }

  guessInput.value = "";
}

function showGermanFeedTask() {
  const task = germanFeedTasks[currentFeedTaskIndex];
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
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => checkGermanFeedAnswer(task, answer));
    box.appendChild(button);
  });
}

function checkGermanFeedAnswer(task, answer) {
  const feedbackBox = document.getElementById("germanFeedback");

  if (answer !== task.correct) {
    feedbackBox.textContent = "Leider falsch. Versuch es noch einmal.";
    feedbackBox.className = "feedback bad";
    return;
  }

  document.querySelectorAll("#germanAnswers button").forEach(b => b.disabled = true);
  feedbackBox.textContent = `${task.success} ${state.petName} получает порцию еды!`;
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

  // Сначала Фудди физически выдаёт порцию, затем Анфиса её ест.
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

  germanBox.hidden = true;
  fooddyBox.hidden = false;
  document.getElementById("fooddyMessage").textContent =
    `Geschafft! ${state.petName} hat alle 6 Portionen bekommen.`;

  guessInput.disabled = true;
  guessBtn.disabled = true;
  showCurrentGrowth("Я полностью сыта! Danke!");
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
  badge.textContent = progress.feed ? "Выполнено" : "Не выполнено";
  badge.classList.toggle("done", progress.feed);
}

/* ---------- ИГРА / ЛЕЧЕНИЕ ---------- */
function getSeriesTasks(action) {
  return action === "play" ? playTasks : healTasks;
}

function showSeriesTask(action) {
  const tasks = getSeriesTasks(action);
  const index = seriesIndex[action];

  document.getElementById("seriesTopic").textContent =
    action === "play" ? "🎮 Hobbys und Freizeit" : "💊 Gesundheit";

  document.getElementById("seriesTitle").textContent =
    action === "play" ? "Поиграй с Анфисой" : "Помоги Анфисе выздороветь";

  document.getElementById("seriesProgressLabel").textContent =
    action === "play" ? "Игровой прогресс" : "Прогресс лечения";

  const status = document.getElementById("seriesStatus");
  status.textContent = progress[action] ? "Выполнено" : "Не выполнено";
  status.classList.toggle("done", progress[action]);

  updateSeriesProgress(action);

  if (progress[action]) {
    document.getElementById("seriesTaskTitle").textContent = "Geschafft!";
    document.getElementById("seriesTaskNumber").textContent = "6";
    document.getElementById("seriesQuestion").textContent =
      action === "play" ? "Alle Aufgaben sind richtig gelöst." : "Anfisa ist wieder gesund.";
    document.getElementById("seriesAnswers").innerHTML = "";
    document.getElementById("seriesFeedback").textContent = "";
    return;
  }

  const task = tasks[index];
  document.getElementById("seriesTaskTitle").textContent = task.title;
  document.getElementById("seriesTaskNumber").textContent = index + 1;
  document.getElementById("seriesQuestion").textContent = task.question;
  document.getElementById("seriesFeedback").textContent = "";
  document.getElementById("seriesFeedback").className = "feedback";

  const answers = document.getElementById("seriesAnswers");
  answers.innerHTML = "";

  shuffle([...task.answers]).forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => checkSeriesAnswer(action, task, answer));
    answers.appendChild(button);
  });
}

function checkSeriesAnswer(action, task, answer) {
  const feedback = document.getElementById("seriesFeedback");

  if (answer !== task.correct) {
    feedback.textContent = "Leider falsch. Versuch es noch einmal.";
    feedback.className = "feedback bad";
    return;
  }

  document.querySelectorAll("#seriesAnswers button").forEach(b => b.disabled = true);
  feedback.textContent = task.success;
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

  if (seriesIndex[action] >= 6) {
    progress[action] = true;
    updateGameProgress();

    const status = document.getElementById("seriesStatus");
    status.textContent = "Выполнено";
    status.classList.add("done");

    if (action === "heal") {
      setTimeout(() => showCurrentGrowth("Я снова здорова! Vielen Dank!"), 1450);
    } else {
      setTimeout(() => showCurrentGrowth("Как здорово мы поиграли!"), 1450);
    }

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
  const completed = order.filter(k => progress[k]).length;
  const percent = Math.round((completed / 3) * 100);

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
      `${state.petName} сыта, здорова, счастлива и выросла благодаря твоей заботе!`;
    showCurrentGrowth("Я выросла! Спасибо, что заботился обо мне! 💛");
  }
}

function updateLevel() {
  const newLevel = Math.floor(state.experience / 30) + 1;
  state.level = newLevel;

  if (newLevel > previousLevel) {
    previousLevel = newLevel;
    setTimeout(() => {
      const stage = getGrowthStage();
      setPetVisual(stage.key, "Я выросла!", `Ура! Теперь я — ${stage.label.toLowerCase()}!`, true, 1800);
      miniPetImage.src = petImages[stage.key];
    }, 250);
  }
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
      setTimeout(() => card.classList.remove("changed"), 1150);
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
