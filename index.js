
const LineBot = require('./src/bot.js');

new LineBot({
    authToken: process.env.AUTH_TOKEN,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
});

