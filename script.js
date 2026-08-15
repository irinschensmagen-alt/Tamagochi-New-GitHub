const state = {
  petName: "Анфиса",
  health: 100,
  hunger: 20,
  mood: 80,
  energy: 100,
  coins: 0,
  experience: 0,
  level: 1
};

const globalProgress = {
  feed: false,
  play: false,
  heal: false,
  fooddy: false
};

const tasks = {
  feed: {
    topic: "Essen und Trinken",
    title: "Выбери правильное слово",
    question: "Ich esse einen ...",
    answers: ["Apfel", "Wasser", "Milch"],
    correct: "Apfel",
    success() {
      state.hunger -= 20;
      state.mood += 5;
      reward(1, 5);
      markProgress("feed");
      return `Правильно! Der Apfel — яблоко. ${state.petName} получает яблоко!`;
    },
    fail: "Неправильно. Правильный ответ: Apfel."
  },

  play: {
    topic: "Hobbys und Freizeit",
    title: "Выбери правильную форму глагола",
    question: "Anna ___ gern Fußball.",
    answers: ["spiele", "spielt", "spielen"],
    correct: "spielt",
    success() {
      state.mood += 10;
      state.energy -= 15;
      reward(1, 5);
      markProgress("play");
      return `Правильно! Anna spielt gern Fußball. ${state.petName} с удовольствием играет!`;
    },
    fail: "Неправильно. Правильный ответ: spielt."
  },

  heal: {
    topic: "Gesundheit",
    title: "Выбери правильный вариант",
    question: "",
    answers: ["krank", "lecker", "sportlich"],
    correct: "krank",
    success() {
      state.health += 10;
      state.mood += 5;
      reward(1, 5);
      markProgress("heal");
      return `Правильно! krank — больной. ${state.petName} получает лекарство.`;
    },
    fail: "Неправильно. Правильный ответ: krank."
  }
};

const nameCard = document.getElementById("nameCard");
const gameArea = document.getElementById("gameArea");
const welcomePanel = document.getElementById("welcomePanel");
const taskArea = document.getElementById("taskArea");
const fooddyArea = document.getElementById("fooddyArea");

const startBtn = document.getElementById("startBtn");
const petNameInput = document.getElementById("petName");
const welcomeText = document.getElementById("welcomeText");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const fooddyBtn = document.getElementById("fooddyBtn");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartFooddy = document.getElementById("restartFooddy");

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

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => showTask(button.dataset.action));
});

fooddyBtn.addEventListener("click", startFooddy);
guessBtn.addEventListener("click", checkGuess);
restartFooddy.addEventListener("click", startFooddy);

document.querySelectorAll("[data-progress-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.progressAction;

    if (gameArea.hidden) {
      state.petName = petNameInput.value.trim() || "Анфиса";
      welcomeText.textContent =
        `${state.petName} появилась! Выполняй задания и заботься о питомце.`;
      nameCard.hidden = true;
      gameArea.hidden = false;
      renderStats();
      updateGameProgress();
    }

    if (action === "fooddy") {
      startFooddy();
    } else {
      showTask(action);
    }
  });
});

guessInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

function startGame() {
  state.petName = petNameInput.value.trim() || "Анфиса";

  welcomeText.textContent =
    `${state.petName} появилась! Выполняй задания и заботься о питомце.`;

  nameCard.hidden = true;
  gameArea.hidden = false;

  renderStats();
  updateGameProgress();
}

function openPanel(panel) {
  welcomePanel.hidden = panel !== "welcome";
  taskArea.hidden = panel !== "task";
  fooddyArea.hidden = panel !== "fooddy";
}

function showTask(action) {
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
  answersBox.innerHTML = "";

  shuffledAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => checkAnswer(task, answer));

    answersBox.appendChild(button);
  });
}

function checkAnswer(task, answer) {
  answersBox.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });

  if (answer === task.correct) {
    feedback.textContent = task.success();
    feedback.className = "feedback ok";

    clampStats();
    renderStats();
  } else {
    feedback.textContent = task.fail;
    feedback.className = "feedback bad";
  }
}

function startFooddy() {
  openPanel("fooddy");

  fooddyFood = 0;
  attempts = 0;
  fooddyFinished = false;

  updateFooddyProgress();

  document.getElementById("fooddyMessage").textContent =
    "Фудди: «Бип-бип! Я спрятала код от 1 до 100. Попробуй угадать!»";

  restartFooddy.hidden = true;
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.value = "";

  makeNewSecret();
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

  reward(3, 15);
  markProgress("fooddy");

  clampStats();
  renderStats();

  document.getElementById("fooddyMessage").textContent =
    `ПОБЕДА! ${state.petName} полностью сыта. Всего попыток: ${attempts}. Награда: +3 монеты, +15 опыта, +10 настроения.`;

  guessInput.disabled = true;
  guessBtn.disabled = true;
  restartFooddy.hidden = false;
}

function updateFooddyProgress() {
  const percent = Math.round((fooddyFood / 6) * 100);

  document.getElementById("fooddyFood").textContent = fooddyFood;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("fooddyProgress").style.width = `${percent}%`;

  const dots = document.querySelectorAll("#progressDots span");

  dots.forEach((dot, index) => {
    dot.classList.toggle("done", index < fooddyFood);
  });
}

function markProgress(key) {
  if (!globalProgress[key]) {
    globalProgress[key] = true;
    updateGameProgress();
  }
}

function updateGameProgress() {
  const order = ["feed", "play", "heal", "fooddy"];
  const completed = order.filter(key => globalProgress[key]).length;
  const percent = Math.round((completed / order.length) * 100);

  document.getElementById("gameProgressPercent").textContent = `${percent}%`;
  document.getElementById("gameProgressFill").style.width = `${percent}%`;

  const steps = document.querySelectorAll("#gameProgressSteps .step");

  steps.forEach((step, index) => {
    step.classList.toggle("done", index < completed);
  });
}

function reward(coins, experience) {
  state.coins += coins;
  state.experience += experience;
  state.level = Math.floor(state.experience / 20) + 1;
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
