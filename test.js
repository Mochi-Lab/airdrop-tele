process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
var config = require('./config');
// replace the value below with the Telegram token you receive from @BotFather
var token = config.telegraf_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const img_url = 'https://res.cloudinary.com/dbfydlpwo/image/upload/v1595278068/Airdrop-Telegram-Bot_oyxox2.jpg';

// variables to send to db
var twitter_username = '';
var tele_username = '';
var tele_id = '';
var u_email = '';
var e_wallet = '';
var step = 0;

function firstMessage() {
  var finalResult;

  finalResult = '⚔️⚔️Welcome to Mochi Bounty bot!⚔️⚔️';
  finalResult += '\n';
  finalResult += '\n';
  finalResult += '1.📌Follow us on Twitter: https://twitter.com/MarketMochi';
  finalResult += '\n';
  finalResult += '2.📌Join our tele: https://t.me/mochi_market';
  finalResult += '\n';
  finalResult +=
    '3.📌Every week, we will post weekly tasks and bounties in our announcement channel and our medium page';
  finalResult += '\n';
  finalResult +=
    '4.📌For any special bounties (eg. Telegram stickers, Telegram staking calculator bot, or any other unique idea) please contact';
  finalResult += '\n';
  finalResult +=
    '5.⚠️⚠️ Please click on the buttons and input the required data and then click CONFIRM✅ at the end. Only ETH address is required to confirm.⚠️⚠️';

  return finalResult;
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot
    .sendPhoto(chatId, img_url, {
      caption: 'Welcome to Mochi Airdrop! 😍😍\nJoin Mochi Community on Telegram and earn Tokens\n \n',
    })
    .then(() => {
      var option = {
        reply_markup: {
          keyboard: [['Get your Mochi Airdrop! 🌱'], ['🗣 Invite', '💰 Balance']],
        },
      };
      var msg = firstMessage();
      bot.sendMessage(chatId, msg, option);
    });
});

// Options for the user to fill
// Step 1 -Option +1(901)591-3110
bot.on('message', async (msg) => {
  let stay = await bot.getChatMember(msg.chat.id, msg.from.id);
  console.log('stay', stay);
  var send_txt = msg.text;
  var step1_txt = 'Get your Mochi Airdrop! 🌱';
  if (send_txt.toString().indexOf(step1_txt) === 0) {
    tele_id = msg.from.id;
    var text = 'Join the chat';
    var keyboardStr = JSON.stringify({
      inline_keyboard: [[{ text: 'Join the chat 🦜', url: 'https://t.me/mochi_market' }]],
    });
    var keyboard = { reply_markup: JSON.parse(keyboardStr) };
    await bot.sendMessage(msg.chat.id, text, keyboard);
    var option = {
      reply_markup: {
        keyboard: [['Cancel ❌']],
      },
    };
    await bot.sendMessage(msg.chat.id, 'And let us know your username (with @): ', option);
  }

  if (send_txt.toString().charAt(0) === '@' && step === 0) {
    step = 1;
    tele_username = send_txt;
    var option = {
      reply_markup: {
        keyboard: [['Cancel ❌']],
      },
    };
    bot.sendMessage(msg.chat.id, 'Hello ' + send_txt + ', Please enter your Email Address: ', option);
  }

  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
  if (re.test(send_txt) && step === 1) {
    step = 2;
    u_email = send_txt;
    var text = 'Follow MochiF and let us know your Twitter account (with @): ';
    var keyboardStr = JSON.stringify({
      inline_keyboard: [
        [
          {
            text: 'Follow On Twitter @MarketMochi',
            url: 'https://twitter.com/',
          },
        ],
      ],
    });
    var keyboard = { reply_markup: JSON.parse(keyboardStr) };
    bot.sendMessage(msg.chat.id, text, keyboard);
    // var option = {
    //   reply_markup: {
    //     keyboard: [['Cancel ❌']]
    //   }
    // };
    // bot.sendMessage(
    //   msg.chat.id,
    //   'Your email address is: ' +
    //     send_txt +
    //     '.Now, let us know your ETH address (No exchange wallet!).Make sure that you have an ERC20 wallet (0x) 🔑: ',
    //   option
    // );
  }

  if (step === 2 && send_txt.toString().charAt(0) === '@') {
    twitter_username = send_txt;
    bot.sendMessage(
      msg.chat.id,
      'Now, let us know your ETH address (No exchange wallet!).Make sure that you have an ERC20 wallet (0x) 🔑: '
    );
    step = 3;
  }

  // var step7_txt = 'ETH address (No exchange wallet!)';
  // if (send_txt.toString().indexOf(step7_txt) === 0) {
  //   bot.sendMessage(msg.chat.id, 'Make sure that you have an ERC20 wallet (0x) 🔑');
  // }
  var re_eth = /^0x[a-fA-F0-9]{40}$/g;
  if (re_eth.test(send_txt) && step === 3) {
    e_wallet = send_txt;
    var text = makeMessage();
    bot.sendMessage(msg.chat.id, text + '\n Confirm❓', {
      reply_markup: {
        keyboard: [[{ text: 'Yes ✅' }], [{ text: 'Cancel ❌' }]],
        resize_keyboard: true,
      },
    });
  }
  var confirm = 'Yes ✅';
  if (send_txt.toString().indexOf(confirm) === 0) {
    console.log(twitter_username, tele_username, tele_id, e_wallet, u_email);
    step = 0;
    await bot.sendMessage(msg.chat.id, 'Good bye ✌️✌️', {
      reply_markup: {
        keyboard: [['Get your Mochi Airdrop! 🌱'], ['🗣 Invite', '💰 Balance']],
      },
    });
  }
  var cancel = 'Cancel ❌';
  if (send_txt.toString().indexOf(cancel) === 0) {
    step = 0;
    bot.sendMessage(msg.chat.id, 'Good bye ✌️✌️', {
      reply_markup: {
        keyboard: [['Get your Mochi Airdrop! 🌱'], ['🗣 Invite', '💰 Balance']],
      },
    });
  }
});

function makeMessage() {
  var finalResult;
  finalResult = '👤ID: ';
  finalResult += tele_id;
  finalResult += '\n';
  finalResult += '🔑ETH Address: ';
  finalResult += e_wallet;
  finalResult += '\n';
  finalResult += '🐦Twitter username: ';
  finalResult += twitter_username;
  // finalResult += '\n';
  // finalResult += '💰Referral link: https://t.me/StakdBounty_bot?start=';
  // finalResult += ctx.session.refNumber;
  // finalResult += '\n';
  // finalResult += '💵Number of referrals: ';
  // finalResult += ctx.session.count;
  // finalResult += '\n';
  // finalResult += '👥Referred by: ';
  // finalResult += ctx.session.refByName;

  return finalResult;
}

// Say Hello to bot
bot.on('message', (msg) => {
  var send_txt1 = msg.text;
  var send_msg = 'Hi';
  if (send_txt1.toString().indexOf(send_msg) === 0) {
    bot.sendMessage(
      msg.chat.id,
      'Hello I am smart bot from Mochi Market, start the task list by replying \n /start \n /project'
    );
  }
});

bot.on('message', (msg) => {
  var send_txt1 = msg.text;
  var send_msg = 'hi';
  if (send_txt1.toString().indexOf(send_msg) === 0) {
    bot.sendMessage(
      msg.chat.id,
      'Hello I am smart bot from Mochi Market, start the task list by replying \n /start \n /project'
    );
  }
});
// Information about project
bot.on('message', (msg) => {
  var send_txt2 = msg.text;
  var re = /project/i;
  if (re.test(send_txt2)) {
    var keyboardStr = JSON.stringify({
      inline_keyboard: [
        [
          {
            text: 'View Whitepaper',
            url: 'https://mochi.market/WhitePaper.pdfhttps://ubricoin.com/pdf/ubricoin-whitepaper.pdf',
          },
        ],
      ],
    });
    var keyboard = { reply_markup: JSON.parse(keyboardStr) };
    bot.sendMessage(
      msg.chat.id,
      'You can also have a look at our whitepaper to know more about our project.',
      keyboard
    );
  }
});
