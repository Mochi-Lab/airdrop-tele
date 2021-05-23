require('dotenv').config();
module.exports = {
  telegraf_token: process.env.TELEGRAM_TOKEN,
  mongoURL: process.env.MONGO_URL,
};
