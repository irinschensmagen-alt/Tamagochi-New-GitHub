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

const tasks = {
  play: {
    topic: "🎮 Hobbys und Freizeit",
    title: "Поиграй с Анфисой",
    question: "Anna ___ gern Fußball.",
    answers: ["spiele", "spielt", "spielen"],
    correct: "spielt",
    successText: "Richtig! Anna spielt gern Fußball. Анфиса с удовольствием играет!"
  },

  heal: {
    topic: "💊 Gesundheit",
    title: "Помоги Анфисе выздороветь",
    question: "Anfisa hat Kopfschmerzen. Sie ist ...",
    answers: ["krank", "lecker", "sportlich"],
    correct: "krank",
    successText: "Richtig! Anfisa ist krank. Анфиса получает лекарство."
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

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartFooddy = document.getElementById("restartFooddy");

let currentTask = null;

let secretNumber = 0;
let fooddyFood = 0;
let attempts = 0;
let fooddyFinished = false;

startBtn.addEventListener("click", startGame);

petNameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    startGame();
  }
});

document.querySelectorAll("[data-main-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.mainAction;

    if (nameCard.hidden === false) {
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

restartFooddy.addEventListener("click", startFooddy);

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

    if (!fooddyFinished) {
      startFooddy();
    }

    updateFeedStatus();
  } else {
    showTask(action);
  }
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

  answersBox.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });

  if (answer === task.correct) {
    feedback.textContent = task.successText;
    feedback.className = "feedback ok";

    if (!progress[action]) {
      completeTask(action);
    }
  } else {
    feedback.textContent =
      action === "play"
        ? "Leider falsch. Richtig ist: spielt."
        : "Leider falsch. Richtig ist: krank.";

    feedback.className = "feedback bad";
  }
}

function completeTask(action) {
  progress[action] = true;

  if (action === "play") {
    state.mood += 15;
    state.energy -= 15;
    reward(1, 10);
  }

  if (action === "heal") {
    state.health += 20;
    state.mood += 5;
    reward(1, 10);
  }

  clampStats();
  renderStats();
  updateGameProgress();

  taskStatus.textContent = "Выполнено";
  taskStatus.classList.add("done");

  checkWholeGameFinished();
}

function startFooddy() {
  fooddyFood = 0;
  attempts = 0;
  fooddyFinished = false;

  guessInput.disabled = false;
  guessBtn.disabled = false;
  restartFooddy.hidden = true;
  guessInput.value = "";

  makeNewSecret();
  updateFooddyProgress();

  document.getElementById("fooddyMessage").textContent =
    "Фудди: «Бип-бип! Я спрятала код от 1 до 100. Попробуй угадать!»";

  guessInput.focus();
}

function makeNewSecret() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
  if (fooddyFinished) {
    return;
  }

  const value = Number(guessInput.value);

  if (!Number.isInteger(value) || value < 1 || value > 100) {
    document.getElementById("fooddyMessage").textContent =
      "Фудди: «Бип-бип! Введи целое число от 1 до 100.»";
    return;
  }

  attempts++;
  document.getElementById("attempts").textContent = attempts;

  if (value < secretNumber) {
    document.getElementById("fooddyMessage").textContent =
      "Фудди: «Слишком мало! Мой код БОЛЬШЕ!»";
  } else if (value > secretNumber) {
    document.getElementById("fooddyMessage").textContent =
      "Фудди: «Ого, перелёт! Мой код МЕНЬШЕ!»";
  } else {
    fooddyFood++;
    updateFooddyProgress();

    if (fooddyFood < 6) {
      document.getElementById("fooddyMessage").textContent =
        `Фудди: «Код верный! ${state.petName} получает порцию еды. Новый код уже спрятан!»`;

      makeNewSecret();
    } else {
      finishFooddy();
    }
  }

  guessInput.value = "";
  guessInput.focus();
}

function finishFooddy() {
  fooddyFinished = true;

  state.hunger = 0;
  state.mood += 10;

  reward(2, 15);

  progress.feed = true;

  clampStats();
  renderStats();
  updateFeedStatus();
  updateGameProgress();

  document.getElementById("fooddyMessage").textContent =
    `ПОБЕДА! ${state.petName} получила все 6 порций и полностью сыта. Награда: +2 монеты, +15 опыта, +10 настроения.`;

  guessInput.disabled = true;
  guessBtn.disabled = true;
  restartFooddy.hidden = false;

  checkWholeGameFinished();
}

function updateFooddyProgress() {
  const percent = Math.round((fooddyFood / 6) * 100);

  document.getElementById("fooddyFood").textContent = fooddyFood;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("fooddyPercent").textContent = `${percent}%`;
  document.getElementById("fooddyProgress").style.width = `${percent}%`;

  document.querySelectorAll("#fooddyDots span").forEach((dot, index) => {
    dot.classList.toggle("done", index < fooddyFood);
  });
}

function updateFeedStatus() {
  const badge = document.getElementById("feedStatus");

  badge.textContent = progress.feed ? "Выполнено" : "Не выполнено";
  badge.classList.toggle("done", progress.feed);
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

function reward(coins, experience) {
  state.coins += coins;
  state.experience += experience;
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

    [items[i], items[randomIndex]] =
      [items[randomIndex], items[i]];
  }

  return items;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
