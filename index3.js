
const LineBot1 = require('./src/bot.js');
const LineBot2 = require('./src2/bot.js');

let bset = {
}

let gset = {
    'null': {
        antiKick: 0,    // anti non-admin kick someone
        autoKick: 0,        // kick kicker
        disableQrcode: 0, // auto disable QRcode
    },
    'c21b5c928f1bbc6f869973177f5bfe282': {
        antiKick: 1,
        autoKick: 0,
        disableQrcode: 0,
    },
    'cca6eec4ef70f690fc8a961cd582f93f1': {
        antiKick: 1,
        autoKick: 0,
        disableQrcode: 0,
    },
    'ce8928f774f2961210a2f8d6e5613a92d': {
        antiKick: 1,
        autoKick: 1,
        disableQrcode: 0,
    }
}

let bot1 = new LineBot1(bset['u33a9a527c6ac1b24e0e4e35dde60c79d']);
let bot2 = new LineBot2(bset['uf0073964d53b22f4f404a8fb8f7a9e3e']);

bot1.LINE.groupStatus = gset;
bot2.LINE.groupStatus = gset;

// save to dropbox
let alphatBot = {
    authToken: bot1.LINE.config.tokenn,
    certificate: bot1.LINE.config.chanToken,
    // email: this.email,
    // password: this.password
}
console.log(JSON.stringify(alphatBot, null, 2));