// import namesJSON from names.json;

const TelegramBot = require('node-telegram-bot-api'); 

const token = '5962346803:AAFXL-e_hp4vrYhxDP5a1GVMzOzRp2tVS3s'; 
const bot = new TelegramBot(token, { polling: true });


const fs = require('fs');
let rawdata = fs.readFileSync('names.json');


let names = JSON.parse(rawdata);

bot.onText(/\имя (.+)/, function (msg, match) {
  const userId = msg.chat.id;
  let text = match[1].trim();

  text = text[0].toUpperCase() + text.substring(1);

  if (names.includes(text)) {
    bot.sendMessage(userId, 'Это уже было шалунишка!');
  } else {
    names.push(text);

    bot.sendMessage(userId, `Уже ${names.length} штук! ${text}`);

    let data = JSON.stringify(names);
    fs.writeFileSync('names.json', data);
  }
});

bot.onText(/\удали/, function (msg, match) {
  const userId = msg.chat.id;

    names.pop()
    
    bot.sendMessage(userId, `Удалил последний, осталось ${names.length} штук!`);

    let data = JSON.stringify(names);
    fs.writeFileSync('names.json', data);
});


bot.onText(/\покажи/, function (msg, match) {
  const userId = msg.chat.id;
  const responce = names.join('\n');

  bot.sendMessage(userId, `${responce}`);
});


bot.onText(/\старт/, function (msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'имя \nпокажи \nудали')
});

