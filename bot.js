const { Telegraf } = require('telegraf');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const fetch = require('node-fetch');

let userInfo = {}
const bot = new Telegraf('7330337683:AAFnumZOjfUMzSk4ZxNokueGmb6YnvR4ktE'); // Replace with your bot token
app.use('/public', express.static(path.join(__dirname, 'public')));

bot.start((ctx) => {
  const userID = ctx.from.id;
  const userName = ctx.from.username;
  const args = ctx.message.text.split(" ");

  let referralId = null;
  if (args.length > 1) {
    referralId = args[1];
    console.log(`Referral ID: ${referralId}`);
  }

  getWebhookInfo('7330337683:AAFnumZOjfUMzSk4ZxNokueGmb6YnvR4ktE')
  setBotDescription('About Farmix\n\nFarmix is the first Mine & Earn platform platform from Farmix Capital. This project marks the start of our expansion to TON League.\n\nApp Benefits for Users:\n🔹 Participation: Become an investor via our Farmix mining platform\n🔹 Profit: Purchase mining power with TRX, BNB, or TON tokens to generate income\n🔹 Community: We aim to build a multilingual, global community of investors\n\nWith time we will expand our ecosystem with new TG apps, providing you with earning & entertainment opportunities.')
  const imagePath = path.join(__dirname, 'public', 'images', 'photo.jpg');
  ctx.replyWithPhoto({ source: fs.createReadStream(imagePath) }, {
    caption: '⛏️ Welcome to Farmix!⛏️\n' +
      'Farmix – pioneering Mine & Earn platform by Farmix Capital!\n\n' +
      '✨ Why Farmix?\n- Earn with/without investments \n' +
      '- Purchase mining power with TRX, BNB, or TON tokens to generate 5% daily income\n' +
      '- Enhance your skills & get new secrets of earning 🤫 in our Multilingual community \n' +
      '🔥 Benefits for newcomers: no fees, earn 10% via referring friends\n' +
      '🎁 FREE 150 TH/s bonus for registration\n\n' +
      '👇 Tap Start App - get into financial freedom!',
    reply_markup: {
      inline_keyboard: [[{ text: 'Open React App', web_app: { url: `https://refgetaway.net?userID=${userID}&userName=${userName}&referral_id=${referralId}` } }]],
    },
  });
});

// Endpoint to get the stored user ID
app.get('/api/userid', (req, res) => {
  console.log(userInfo)
  res.json(userInfo);
});


bot.launch();

// Webhook setup
app.use(bot.webhookCallback('/telegram'));
bot.telegram.setWebhook('https://api.refgetaway.net/telegram'); // Replace with your server URL

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

// Function to set the bot description
const setBotDescription = async (description) => {
  try {
    const response = await axios.post(`https://api.telegram.org/bot7120901530:AAEp0BuulmPwBflGGDMucWRjN-zCFudGMSs/setMyDescription`, {
      description: description,
    });
    console.log('Description set:', response.data);
  } catch (error) {
    console.error('Error setting description:', error);
  }
};

const getWebhookInfo = async (token) => {
  const url = `https://api.telegram.org/bot${token}/getWebhookInfo`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.ok) {
          console.log('Webhook URL:', data);
      } else {
          console.error('Error:', data.description);
      }
  } catch (error) {
      console.error('Error fetching webhook info:', error);
  }
};