
const crypto = require("./crypto.js");

const LineBot1 = require('./src/bot.js');
const LineBot2 = require('./src2/bot.js');

let config = {};

const loadConfigFromDbox = async () => {
    try {
        // let rawData = Buffer.from(await require("./dbox.js").fileDownload("AntiKick.json"), "binary").toString();
        // // 解密
        // let key = process.env.LINE_ALPHAT_JSONKEY;
        // let data = crypto.decrypt(rawData, key);

        let data = require('fs').readFileSync("AntiKickRaw.json").toString();

        // encode
        let obj;
        try { obj = JSON.parse(data); } catch (e) { }

        console.log("Update auth token from dropbox");
        Object.assign(config, obj);
    } catch (e) {
        // error
        console.log(e);
    }
}
const saveConfigToDbox = async () => {
    // 加密 to dropbox
    let key = process.env.LINE_ALPHAT_JSONKEY;
    let data = crypto.encrypt(JSON.stringify(config, null, 2), key);

    console.log("Upload auth token to dropbox");
    // console.log(key)
    // console.log(data)

    require("./dbox.js").fileUpload("AntiKick.json", data);

    require('fs').writeFileSync("AntiKickRaw.json", JSON.stringify(config, null, 2));
}

// const test = async () => {
//     await loadConfigFromDbox();
//     await saveConfigToDbox();
// };
// test();

const main = async () => {
    await loadConfigFromDbox();
    console.log(config)

    let bot1 = new LineBot1(config.auth['u33a9a527c6ac1b24e0e4e35dde60c79d']);
    bot1.LINE.groupStatus = config.groupStatus;
    config.auth['u33a9a527c6ac1b24e0e4e35dde60c79d'].authToken = bot1.client.authToken;

    let bot2 = new LineBot2(config.auth['ub926d3162aab1d3fbf975d2c56be69aa']);
    bot2.LINE.groupStatus = config.groupStatus;
    config.auth['ub926d3162aab1d3fbf975d2c56be69aa'].authToken = bot2.client.authToken;

    // save to dropbox
    await saveConfigToDbox();
    // console.log(bot1.client.authToken)

    // check cfg
    let cfgstr;
    const debug = async () => {
        let newstr = JSON.stringify(config, null, 2);

        if (cfgstr && cfgstr != newstr) {
            console.log(config)
            await saveConfigToDbox();
        }
        cfgstr = newstr;

        setTimeout(debug, 500)
    }; debug();

};
main();




