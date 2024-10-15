const TelegramBot = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");

const token = "7008552736:AAHqTTa1aBtc4njCZ636S7HxiJMLNtQuLog";

const bot = new TelegramBot(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
    bot.sendMessage(chatId, "Угайдай число от 0 до 9");
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Отгадай число", gameOptions);
};



const start = async () => {
  bot.setMyCommands([
    { command: "/start", description: "Start bot" },
    { command: "/help", description: "Help bot" },
    { command: "/game", description: "Game bot" },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    const text = msg.text;

    if (text === "/start") {
      return bot.sendMessage(chatId, "Welcome to my bot virka");
    }

    if (text === "/help") {
      return bot.sendMessage(chatId, "I can help you");
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, "I don't understand");
  });

  bot.on("callback_query", async (msg) => {

      const chatId = msg.message.chat.id;
      const randomNumber = chats[chatId];
      const data = msg.data;
      if (data === "/again") {
        return startGame(chatId);
      }
    if (data == randomNumber) {
      return bot.sendMessage(chatId, `Ты угадал ${data}`);
    } else {
      return bot.sendMessage(chatId, `Ты не угадал ${data} бот загадал ${randomNumber} `, againOptions);
    }
  });
};

start();
