const state = {
  petName: "Анфиса",
  health: 80,
  hunger: 60,
  mood: 70,
  energy: 90,
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
  {
    title: "AUFGABE 1",
    question: "___ Apfel",
    answers: ["der", "die", "das"],
    correct: "der",
    success: "Richtig! Der Apfel."
  },
  {
    title: "AUFGABE 2",
    question: "Was trinkt man?",
    answers: ["Wasser", "Brot", "Käse"],
    correct: "Wasser",
    success: "Richtig! Man trinkt Wasser."
  },
  {
    title: "AUFGABE 3",
    question: "Zum Frühstück esse ich Brot mit ...",
    answers: ["Käse", "Wasser", "Saft"],
    correct: "Käse",
    success: "Richtig! Brot mit Käse."
  },
  {
    title: "AUFGABE 4",
    question: "Möchtest du einen Tee?",
    answers: ["Ja, gern.", "Ich heiße Anna.", "Das ist mein Bruder."],
    correct: "Ja, gern.",
    success: "Richtig! Ja, gern."
  },
  {
    title: "AUFGABE 5",
    question: "Was passt nicht?",
    answers: ["die Banane", "der Apfel", "die Orange", "die Milch"],
    correct: "die Milch",
    success: "Richtig! Die Milch passt nicht."
  },
  {
    title: "AUFGABE 6",
    question: "Ich möchte eine Pizza ...",
    answers: ["bestellen", "trinken", "fahren"],
    correct: "bestellen",
    success: "Richtig! Ich möchte eine Pizza bestellen."
  }
];

const tasks = {
  play: {
    topic: "🎮 Hobbys und Freizeit",
    title: "Поиграй с Анфисой",
    question: "Anna ___ gern Fußball.",
    answers: ["spiele", "spielt", "spielen"],
    correct: "spielt",
    successText: "Richtig! Anna spielt gern Fußball."
  },

  heal: {
    topic: "💊 Gesundheit",
    title: "Помоги Анфисе выздороветь",
    question: "Anfisa hat Kopfschmerzen. Sie ist ...",
    answers: ["krank", "lecker", "sportlich"],
    correct: "krank",
    successText: "Richtig! Anfisa ist krank."
  }
};

const nameCard = document.getElementById("nameCard");
const gameArea = document.getElementById("gameArea");
const gameProgressPanel = document.getElementById("gameProgressPanel");
const welcomePanel = document.getElementById("welcomePanel");
const feedArea = document.getElementById("feedArea");
const taskArea = document.getElementById("taskArea");
const finishArea = document.getElementById("finishArea");

const startBtn = document.getElementById("startBtn");
const petNameInput = document.getElementById("petName");
const welcomeText = document.getElementById("welcomeText");

const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const taskStatus = document.getElementById("taskStatus");

const fooddyBox = document.getElementById("fooddyBox");
const germanBox = document.getElementById("germanBox");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");

let currentTask = null;

let secretNumber = 0;
let feedCount = 0;
let currentFeedTaskIndex = 0;
let attemptsThisRound = 0;
let codeSolved = false;

startBtn.addEventListener("click", startGame);

petNameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    startGame();
  }
});

document.querySelectorAll("[data-main-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.mainAction;

    if (!nameCard.hidden) {
      startGame();
    }

    openAction(action);
  });
});

guessBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    checkGuess();
  }
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
  taskArea.hidden = panel !== "task";
  finishArea.hidden = panel !== "finish";
}

function setActiveAction(action) {
  document.querySelectorAll(".action-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.mainAction === action
    );
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
  } else {
    showTask(action);
  }
}

function startFooddyRound() {
  codeSolved = false;
  attemptsThisRound = 0;
  secretNumber = Math.floor(Math.random() * 100) + 1;

  fooddyBox.hidden = false;
  germanBox.hidden = true;

  document.getElementById("roundNumber").textContent = currentFeedTaskIndex + 1;
  document.getElementById("attempts").textContent = attemptsThisRound;

  document.getElementById("fooddyMessage").textContent =
    `Фудди: «Бип-бип! Код №${currentFeedTaskIndex + 1} спрятан. Угадай число от 1 до 100!»`;

  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.focus();
}

function checkGuess() {
  if (codeSolved || progress.feed) {
    return;
  }

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

  const shuffled = shuffle([...task.answers]);

  shuffled.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkGermanFeedAnswer(task, answer);
    });

    box.appendChild(button);
  });
}

function checkGermanFeedAnswer(task, answer) {
  const box = document.getElementById("germanAnswers");
  const feedbackBox = document.getElementById("germanFeedback");

  if (answer === task.correct) {
    box.querySelectorAll("button").forEach(button => {
      button.disabled = true;
    });

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
      setTimeout(() => {
        startFooddyRound();
      }, 900);
    }
  } else {
    feedbackBox.textContent =
      "Leider falsch. Versuch es noch einmal.";

    feedbackBox.className = "feedback bad";
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

  document.getElementById("roundNumber").textContent = "6";
  guessInput.disabled = true;
  guessBtn.disabled = true;

  checkWholeGameFinished();
}

function updateFeedProgress() {
  const percent = Math.round((feedCount / 6) * 100);

  document.getElementById("feedCount").textContent = feedCount;
  document.getElementById("feedProgress").style.width = `${percent}%`;

  document.querySelectorAll("#feedDots span").forEach((dot, index) => {
    dot.classList.toggle("done", index < feedCount);
  });
}

function updateFeedStatus() {
  const badge = document.getElementById("feedStatus");

  badge.textContent = progress.feed ? "Выполнено" : "Не выполнено";
  badge.classList.toggle("done", progress.feed);
}

function showTask(action) {
  currentTask = action;
  openPanel("task");

  const task = tasks[action];
  const shuffledAnswers = shuffle([...task.answers]);

  document.getElementById("taskTopic").textContent = task.topic;
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskQuestion").textContent =
    action === "heal"
      ? `${state.petName} hat Kopfschmerzen. Sie ist ...`
      : task.question;

  feedback.textContent = "";
  feedback.className = "feedback";

  taskStatus.textContent = progress[action] ? "Выполнено" : "Не выполнено";
  taskStatus.classList.toggle("done", progress[action]);

  answersBox.innerHTML = "";

  shuffledAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => checkTaskAnswer(action, answer));

    answersBox.appendChild(button);
  });
}

function checkTaskAnswer(action, answer) {
  const task = tasks[action];

  if (answer === task.correct) {
    answersBox.querySelectorAll("button").forEach(button => {
      button.disabled = true;
    });

    feedback.textContent = task.successText;
    feedback.className = "feedback ok";

    if (!progress[action]) {
      completeTask(action);
    }
  } else {
    feedback.textContent =
      "Leider falsch. Versuch es noch einmal.";

    feedback.className = "feedback bad";
  }
}

function completeTask(action) {
  progress[action] = true;

  if (action === "play") {
    state.mood += 15;
    state.energy -= 15;
    state.coins += 1;
    state.experience += 10;
  }

  if (action === "heal") {
    state.health += 20;
    state.mood += 5;
    state.coins += 1;
    state.experience += 10;
  }

  updateLevel();
  clampStats();
  renderStats();
  updateGameProgress();

  taskStatus.textContent = "Выполнено";
  taskStatus.classList.add("done");

  checkWholeGameFinished();
}

function updateGameProgress() {
  const order = ["feed", "play", "heal"];
  const completed = order.filter(key => progress[key]).length;
  const percent = Math.round((completed / order.length) * 100);

  document.getElementById("gameProgressPercent").textContent = `${percent}%`;
  document.getElementById("gameProgressFill").style.width = `${percent}%`;

  const steps = document.querySelectorAll("#gameProgressSteps .step");

  steps.forEach((step, index) => {
    step.classList.toggle("done", progress[order[index]]);
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
  state.health = clamp(state.health, 0, 100);
  state.hunger = clamp(state.hunger, 0, 100);
  state.mood = clamp(state.mood, 0, 100);
  state.energy = clamp(state.energy, 0, 100);
}

function renderStats() {
  for (const key of [
    "health",
    "hunger",
    "mood",
    "energy",
    "coins",
    "experience",
    "level"
  ]) {
    document.getElementById(key).textContent = state[key];
  }
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [items[i], items[randomIndex]] = [items[randomIndex], items[i]];
  }

  return items;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
