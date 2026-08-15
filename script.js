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

const progress = {
  feed: false,
  play: false,
  heal: false
};

const germanFeedTasks = [
  { title:"AUFGABE 1", question:"___ Apfel", answers:["der","die","das"], correct:"der", success:"Richtig! Der Apfel." },
  { title:"AUFGABE 2", question:"Was trinkt man?", answers:["Wasser","Brot","Käse"], correct:"Wasser", success:"Richtig! Man trinkt Wasser." },
  { title:"AUFGABE 3", question:"Zum Frühstück esse ich Brot mit ...", answers:["Käse","Wasser","Saft"], correct:"Käse", success:"Richtig! Brot mit Käse." },
  { title:"AUFGABE 4", question:"Möchtest du einen Tee?", answers:["Ja, gern.","Ich heiße Anna.","Das ist mein Bruder."], correct:"Ja, gern.", success:"Richtig! Ja, gern." },
  { title:"AUFGABE 5", question:"Was passt nicht?", answers:["die Banane","der Apfel","die Orange","die Milch"], correct:"die Milch", success:"Richtig! Die Milch passt nicht." },
  { title:"AUFGABE 6", question:"Ich möchte eine Pizza ...", answers:["bestellen","trinken","fahren"], correct:"bestellen", success:"Richtig! Ich möchte eine Pizza bestellen." }
];

const playTasks = [
  {
    title:"AUFGABE 1",
    question:"Anna ___ gern Fußball.",
    answers:["spiele","spielt","spielen"],
    correct:"spielt",
    success:"Richtig! Anna spielt gern Fußball."
  },
  {
    title:"AUFGABE 2",
    question:"Was macht man in der Freizeit?",
    answers:["Musik hören","Fieber haben","Medizin nehmen"],
    correct:"Musik hören",
    success:"Richtig! Musik hören."
  },
  {
    title:"AUFGABE 3",
    question:"Wir ___ am Wochenende Tennis.",
    answers:["spielen","spielt","spielst"],
    correct:"spielen",
    success:"Richtig! Wir spielen am Wochenende Tennis."
  }
];

const healTasks = [
  {
    title:"AUFGABE 1",
    question:"Anfisa hat Kopfschmerzen. Sie ist ...",
    answers:["krank","lecker","sportlich"],
    correct:"krank",
    success:"Richtig! Anfisa ist krank."
  },
  {
    title:"AUFGABE 2",
    question:"Was hilft bei Krankheit?",
    answers:["Medizin","Fußball","Pizza"],
    correct:"Medizin",
    success:"Richtig! Medizin hilft."
  },
  {
    title:"AUFGABE 3",
    question:"Der Arzt sagt: Du sollst im Bett ...",
    answers:["bleiben","tanzen","fahren"],
    correct:"bleiben",
    success:"Richtig! Du sollst im Bett bleiben."
  }
];

const nameCard = document.getElementById("nameCard");
const gameArea = document.getElementById("gameArea");
const gameProgressPanel = document.getElementById("gameProgressPanel");
const welcomePanel = document.getElementById("welcomePanel");
const feedArea = document.getElementById("feedArea");
const seriesArea = document.getElementById("seriesArea");
const finishArea = document.getElementById("finishArea");

const startBtn = document.getElementById("startBtn");
const petNameInput = document.getElementById("petName");
const welcomeText = document.getElementById("welcomeText");

const fooddyBox = document.getElementById("fooddyBox");
const germanBox = document.getElementById("germanBox");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");

let secretNumber = 0;
let feedCount = 0;
let currentFeedTaskIndex = 0;
let attemptsThisRound = 0;
let codeSolved = false;

let currentSeries = null;
let seriesIndex = { play: 0, heal: 0 };

startBtn.addEventListener("click", startGame);

petNameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") startGame();
});

document.querySelectorAll("[data-main-action]").forEach(button => {
  button.addEventListener("click", () => {
    if (!nameCard.hidden) startGame();
    openAction(button.dataset.mainAction);
  });
});

guessBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkGuess();
});

document.getElementById("continueBtn").addEventListener("click", () => {
  openPanel("welcome");
});

function startGame() {
  state.petName = petNameInput.value.trim() || "Анфиса";

  welcomeText.textContent =
    `${state.petName} появилась! Выполняй задания и заботься о питомце.`;

  nameCard.hidden = true;
  gameArea.hidden = false;
  gameProgressPanel.hidden = false;

  renderStats();
  updateGameProgress();
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

    if (!progress.feed && feedCount === 0 && currentFeedTaskIndex === 0 && !codeSolved) {
      startFooddyRound();
    }

    updateFeedStatus();
    updateFeedProgress();
    return;
  }

  currentSeries = action;
  openPanel("series");
  showSeriesTask(action);
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
    document.getElementById("fooddyMessage").textContent =
      "Фудди: «Слишком мало! Мой код БОЛЬШЕ!»";
  } else if (value > secretNumber) {
    document.getElementById("fooddyMessage").textContent =
      "Фудди: «Ого, перелёт! Мой код МЕНЬШЕ!»";
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

  feedbackBox.textContent =
    `${task.success} ${state.petName} получает порцию еды!`;
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

  if (feedCount >= 6) {
    finishFeedBlock();
  } else {
    setTimeout(startFooddyRound, 900);
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
    document.getElementById("seriesTaskNumber").textContent = "3";
    document.getElementById("seriesQuestion").textContent =
      action === "play"
        ? "Alle Aufgaben sind richtig gelöst."
        : "Anfisa ist wieder gesund.";

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
    state.mood += 10;
    state.energy -= 10;
    state.coins += 1;
    state.experience += 5;
  } else {
    state.health += 10;
    state.mood += 3;
    state.coins += 1;
    state.experience += 5;
  }

  seriesIndex[action]++;

  updateLevel();
  clampStats();
  renderStats();
  updateSeriesProgress(action);

  if (seriesIndex[action] >= 3) {
    progress[action] = true;

    if (action === "heal") {
      state.health = 100;
    }

    clampStats();
    renderStats();
    updateGameProgress();

    const status = document.getElementById("seriesStatus");
    status.textContent = "Выполнено";
    status.classList.add("done");

    checkWholeGameFinished();

    setTimeout(() => showSeriesTask(action), 700);
  } else {
    setTimeout(() => showSeriesTask(action), 700);
  }
}

function updateSeriesProgress(action) {
  const count = seriesIndex[action];
  const percent = Math.round((count / 3) * 100);

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
      `${state.petName} сыта, здорова и в хорошем настроении. Все три блока заботы успешно пройдены!`;
  }
}

function updateLevel() {
  state.level = Math.floor(state.experience / 25) + 1;
}

function clampStats() {
  state.health = clamp(state.health,0,100);
  state.hunger = clamp(state.hunger,0,100);
  state.mood = clamp(state.mood,0,100);
  state.energy = clamp(state.energy,0,100);
}

function renderStats() {
  ["health","hunger","mood","energy","coins","experience","level"].forEach(key => {
    document.getElementById(key).textContent = state[key];
  });
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i],items[j]] = [items[j],items[i]];
  }
  return items;
}

function clamp(value,min,max) {
  return Math.min(max,Math.max(min,value));
}
