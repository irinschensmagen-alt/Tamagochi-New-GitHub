using System;

Console.OutputEncoding = System.Text.Encoding.UTF8;

// ==================================================
// ЭТАП 1. РОЖДЕНИЕ ТАМАГОЧИ
// ==================================================

Console.WriteLine("🐱 РОЖДЕНИЕ ТАМАГОЧИ");
Console.WriteLine();

Console.Write("Введите имя питомца: ");
string? petName = Console.ReadLine();

if (string.IsNullOrWhiteSpace(petName))
{
    petName = "Анфиса";
}

int health = 100;
int hunger = 20;
int mood = 80;
int energy = 100;
int coins = 0;
int experience = 0;
int level = 1;

Random random = new Random();

Console.WriteLine();
Console.WriteLine("✨ Питомец появился!");
ShowStats();

// ==================================================
// ЭТАП 2. ОСНОВНОЙ ИГРОВОЙ ЦИКЛ
// ==================================================

bool gameIsRunning = true;

while (gameIsRunning)
{
    Console.WriteLine();
    Console.WriteLine("======================================");
    Console.WriteLine("          МЕНЮ ТАМАГОЧИ");
    Console.WriteLine("======================================");
    Console.WriteLine("1. Покормить питомца");
    Console.WriteLine("2. Поиграть с питомцем");
    Console.WriteLine("3. Лечить питомца");
    Console.WriteLine("4. Робо-Кормушка Фудди");
    Console.WriteLine("5. Показать показатели");
    Console.WriteLine("6. Выйти из игры");
    Console.Write("Выбери действие: ");

    string? input = Console.ReadLine();

    if (!byte.TryParse(input, out byte option))
    {
        Console.WriteLine("Некорректный ввод! Нужно ввести число от 1 до 6.");
        continue;
    }

    // ==================================================
    // 1. ПОКОРМИТЬ
    // ==================================================

    if (option == 1)
    {
        Console.WriteLine();
        Console.WriteLine("Задание: Essen und Trinken");
        Console.WriteLine("Выбери правильное слово:");
        Console.WriteLine("Ich esse einen ...");

        string[] answers = { "Apfel", "Wasser", "Milch" };

        Shuffle(answers);
        ShowAnswers(answers);

        Console.Write("Ваш ответ: ");
        string? answer = Console.ReadLine();

        if (TryGetChosenAnswer(answer, answers, out string chosenAnswer))
        {
            if (chosenAnswer == "Apfel")
            {
                Console.WriteLine();
                Console.WriteLine("Правильно! Der Apfel — яблоко.");
                Console.WriteLine($"{petName} получает яблоко!");

                hunger -= 20;
                mood += 5;
                experience += 5;
                coins++;

                UpdateLevel();
                ClampStats();
                ShowStats();
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine("Неправильно.");
                Console.WriteLine("Правильный ответ: Apfel.");
                Console.WriteLine($"{petName} пока не удалось покормить.");
            }
        }
    }

    // ==================================================
    // 2. ПОИГРАТЬ
    // ==================================================

    else if (option == 2)
    {
        Console.WriteLine();
        Console.WriteLine("Задание: Hobbys und Freizeit");
        Console.WriteLine("Выбери правильную форму глагола:");
        Console.WriteLine("Anna ___ gern Fußball.");

        string[] answers = { "spiele", "spielt", "spielen" };

        Shuffle(answers);
        ShowAnswers(answers);

        Console.Write("Ваш ответ: ");
        string? answer = Console.ReadLine();

        if (TryGetChosenAnswer(answer, answers, out string chosenAnswer))
        {
            if (chosenAnswer == "spielt")
            {
                Console.WriteLine();
                Console.WriteLine("Правильно!");
                Console.WriteLine("Anna spielt gern Fußball.");
                Console.WriteLine($"{petName} с удовольствием играет!");

                mood += 10;
                energy -= 15;
                experience += 5;
                coins++;

                UpdateLevel();
                ClampStats();
                ShowStats();
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine("Неправильно.");
                Console.WriteLine("Правильный ответ: spielt.");
            }
        }
    }

    // ==================================================
    // 3. ЛЕЧИТЬ
    // ==================================================

    else if (option == 3)
    {
        Console.WriteLine();
        Console.WriteLine("Задание: Gesundheit");
        Console.WriteLine("Выбери правильный вариант:");
        Console.WriteLine($"{petName} hat Kopfschmerzen. Sie ist ...");

        string[] answers = { "krank", "lecker", "sportlich" };

        Shuffle(answers);
        ShowAnswers(answers);

        Console.Write("Ваш ответ: ");
        string? answer = Console.ReadLine();

        if (TryGetChosenAnswer(answer, answers, out string chosenAnswer))
        {
            if (chosenAnswer == "krank")
            {
                Console.WriteLine();
                Console.WriteLine("Правильно! krank — больной.");
                Console.WriteLine($"{petName} получает лекарство.");

                health += 10;
                mood += 5;
                experience += 5;
                coins++;

                UpdateLevel();
                ClampStats();
                ShowStats();
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine("Неправильно.");
                Console.WriteLine("Правильный ответ: krank.");
            }
        }
    }

    // ==================================================
    // 4. РОБО-КОРМУШКА ФУДДИ
    // ==================================================

    else if (option == 4)
    {
        PlayFooddy();
    }

    // ==================================================
    // 5. ПОКАЗАТЬ ПОКАЗАТЕЛИ
    // ==================================================

    else if (option == 5)
    {
        ShowStats();
    }

    // ==================================================
    // 6. ВЫЙТИ
    // ==================================================

    else if (option == 6)
    {
        Console.WriteLine();
        Console.WriteLine($"До свидания! {petName} будет ждать тебя.");
        gameIsRunning = false;
    }
    else
    {
        Console.WriteLine();
        Console.WriteLine("Такого действия нет! Выбери число от 1 до 6.");
    }
}


// ==================================================
// МЕТОД: РОБО-КОРМУШКА ФУДДИ
// ==================================================

void PlayFooddy()
{
    int food = 0;
    int maxFood = 6;
    int attempts = 0;

    Console.WriteLine();
    Console.WriteLine("======================================");
    Console.WriteLine("     РОБО-КОРМУШКА ФУДДИ");
    Console.WriteLine("======================================");
    Console.WriteLine();

    Console.WriteLine($"{petName} проголодалась!");
    Console.WriteLine("Но еду охраняет Робо-Кормушка Фудди.");
    Console.WriteLine();

    Console.WriteLine("Фудди:");
    Console.WriteLine("\"Я спрятала секретный код от 1 до 100!\"");
    Console.WriteLine($"\"Угадаешь код — получишь порцию еды для {petName}!\"");
    Console.WriteLine();

    Console.WriteLine("Я буду подсказывать:");
    Console.WriteLine("мой код БОЛЬШЕ или МЕНЬШЕ твоего числа.");
    Console.WriteLine();

    while (food < maxFood)
    {
        Console.WriteLine($"Сытость {petName}: {food} из {maxFood}");

        int secretNumber = random.Next(1, 101);
        bool guessed = false;

        Console.WriteLine();
        Console.WriteLine("Фудди:");
        Console.WriteLine("\"Бип-бип! Новый код уже спрятан!\"");
        Console.WriteLine("\"Попробуй угадать число от 1 до 100.\"");
        Console.WriteLine();

        while (!guessed)
        {
            Console.Write("Твой вариант: ");
            string? input = Console.ReadLine();

            if (!int.TryParse(input, out int playerNumber))
            {
                Console.WriteLine();
                Console.WriteLine("Фудди:");
                Console.WriteLine("\"Бип-бип! Мне нужно число от 1 до 100!\"");
                Console.WriteLine();
                continue;
            }

            if (playerNumber < 1 || playerNumber > 100)
            {
                Console.WriteLine();
                Console.WriteLine("Фудди:");
                Console.WriteLine("\"Бип-бип! Такого кода у меня быть не может!\"");
                Console.WriteLine("\"Введи число от 1 до 100.\"");
                Console.WriteLine();
                continue;
            }

            attempts++;

            if (playerNumber < secretNumber)
            {
                Console.WriteLine();
                Console.WriteLine("Фудди:");
                Console.WriteLine("\"Слишком мало! Мой код БОЛЬШЕ!\"");
                Console.WriteLine();
            }
            else if (playerNumber > secretNumber)
            {
                Console.WriteLine();
                Console.WriteLine("Фудди:");
                Console.WriteLine("\"Ого, перелёт! Мой код МЕНЬШЕ!\"");
                Console.WriteLine();
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine("Фудди:");
                Console.WriteLine("\"БИП-БИП-БИП! Код верный!\"");
                Console.WriteLine("\"Кормушка открыта!\"");
                Console.WriteLine();

                guessed = true;
                food++;

                Console.WriteLine($"{petName} получила порцию еды!");
                Console.WriteLine($"Сытость: {food} из {maxFood}");
                Console.WriteLine();

                if (food == 1)
                {
                    Console.WriteLine($"{petName} немного поела.");
                }
                else if (food == 2)
                {
                    Console.WriteLine($"{petName} поела ещё немного.");
                }
                else if (food == 3)
                {
                    Console.WriteLine($"{petName} уже наполовину сыта.");
                }
                else if (food == 4)
                {
                    Console.WriteLine($"{petName} довольно мурчит.");
                }
                else if (food == 5)
                {
                    Console.WriteLine($"{petName} почти полностью сыта!");
                }
                else if (food == 6)
                {
                    Console.WriteLine($"{petName} полностью сыта!");
                }

                Console.WriteLine();
            }
        }
    }

    // Награда за прохождение мини-игры
    hunger = 0;
    mood += 10;
    experience += 15;
    coins += 3;

    UpdateLevel();
    ClampStats();

    Console.WriteLine("ПОБЕДА!");
    Console.WriteLine();
    Console.WriteLine($"{petName} полностью сыта!");
    Console.WriteLine($"Сытость: {food} из {maxFood}");
    Console.WriteLine($"Всего попыток: {attempts}");
    Console.WriteLine();

    Console.WriteLine("Фудди:");
    Console.WriteLine("\"Отличная работа! Все мои коды разгаданы!\"");
    Console.WriteLine();

    Console.WriteLine($"Награда: +3 монеты, +15 опыта, +10 настроения.");
    ShowStats();
}


// ==================================================
// ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
// ==================================================

void ShowStats()
{
    Console.WriteLine();
    Console.WriteLine($"🐱 Имя питомца: {petName}");
    Console.WriteLine($"❤️ Здоровье: {health}");
    Console.WriteLine($"🍎 Голод: {hunger}");
    Console.WriteLine($"😊 Настроение: {mood}");
    Console.WriteLine($"⚡ Энергия: {energy}");
    Console.WriteLine($"💰 Монеты: {coins}");
    Console.WriteLine($"⭐ Опыт: {experience}");
    Console.WriteLine($"🏆 Уровень: {level}");
}

void Shuffle(string[] items)
{
    for (int i = items.Length - 1; i > 0; i--)
    {
        int randomIndex = random.Next(i + 1);

        string temp = items[i];
        items[i] = items[randomIndex];
        items[randomIndex] = temp;
    }
}

void ShowAnswers(string[] answers)
{
    Console.WriteLine();

    for (int i = 0; i < answers.Length; i++)
    {
        Console.WriteLine($"{i + 1}. {answers[i]}");
    }

    Console.WriteLine();
}

bool TryGetChosenAnswer(string? answer, string[] answers, out string chosenAnswer)
{
    chosenAnswer = "";

    if (!int.TryParse(answer, out int answerNumber))
    {
        Console.WriteLine("Некорректный ввод! Нужно ввести число от 1 до 3.");
        return false;
    }

    if (answerNumber < 1 || answerNumber > answers.Length)
    {
        Console.WriteLine("Нужно выбрать число от 1 до 3.");
        return false;
    }

    chosenAnswer = answers[answerNumber - 1];
    return true;
}

void ClampStats()
{
    health = Math.Clamp(health, 0, 100);
    hunger = Math.Clamp(hunger, 0, 100);
    mood = Math.Clamp(mood, 0, 100);
    energy = Math.Clamp(energy, 0, 100);
}

void UpdateLevel()
{
    level = experience / 20 + 1;
}
