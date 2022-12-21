import { arrMats, arrDaddyIssues, arrHuh, arrDimon } from './mat.js';
import fs from 'fs';
import TelegramBot from 'node-telegram-bot-api'

const capImg = `./img/kap.jpg`;
const smileImg = './img/smile.jpg'

const dimon = './audio/bumer-dimon.mp3'

const token = '5962346803:AAFXL-e_hp4vrYhxDP5a1GVMzOzRp2tVS3s'; 
const bot = new TelegramBot(token, { polling: true });



let rawdata = fs.readFileSync('names.json');
let hahaData = fs.readFileSync('haha.json');


let names = JSON.parse(rawdata);
let haha = JSON.parse(hahaData);


bot.onText(/\имя (.+)/, function (msg, match) {
  const userId = msg.chat.id;
  let text = match[1].trim();

  text = text[0].toUpperCase() + text.substring(1);
  

  if(+(names.length + 1) % 50 === 0) {
    bot.sendMessage(userId, 'Юбилей ёпта! Не дохуяли?!');
  } else if(+(names.length + 1) % 10 === 0) {
    bot.sendMessage(userId, 'Маленький юбилей, тоже праздник)');
  }

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


bot.on('message', (msg) => {
  const userName = msg.from.username;
  const userId = msg.chat.id;
  let text = msg.text;


  for (let i of arrDaddyIssues) {
    if (text.toLowerCase().includes(i)) {
      bot.sendMessage(userId, `Не называй меня ${i[0].toUpperCase() + i.substring(1)}, это попахивает Daddy issues!`);
    }
  }
  

  if (text.toLowerCase().includes('дед')) {
    bot.sendMessage(userId, `Не называй меня ${'Дед'}!`);
  }


  //counter ahahahahah

  for (let i of arrHuh) {
    if(text.toLowerCase().includes(i) ) {
      if(!haha[userName]) {
        haha[userName] = {
          count: 0,
          countMat: 0
        }
      }
      
      haha[userName].count = haha[userName].count + 1;
  
  
     let data = JSON.stringify(haha);
     fs.writeFileSync('haha.json', data);

     bot.sendPhoto(msg.chat.id, smileImg, {
      caption: `Разорвало ${haha[userName].count} раз!`
    });
     break;
    }
  }

  //end counter ahahahahah

  //counter mat
  for (let i of arrMats) {
    if(text.toLowerCase().includes(i) ) {
      if(!haha[userName]) {
        haha[userName] = {
          count: 0,
          countMat: 0
        }
      }
  
      haha[userName].countMat = haha[userName].countMat + 1;
  
  
     let data = JSON.stringify(haha);
     fs.writeFileSync('haha.json', data);

     bot.sendPhoto(msg.chat.id, capImg, {
       caption: `ругнулся ${haha[userName].countMat} раз!`
     });
     break;
    }
  }

  //end counter mat

  //dimoooon

  for (let i of arrDimon) {
    if(text.toLowerCase().includes(i) ) {
     bot.sendAudio(msg.chat.id, dimon);
     break;
    }
  }

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
