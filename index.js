
const crypto = require("./crypto.js");

const LineBot1 = require('./src/bot.js');
const LineBot2 = require('./src2/bot.js');

let config = {};

const loadConfigFromDbox = async () => {
    try {
        let rawData = Buffer.from(await require("./dbox.js").fileDownload("AntiKick.json"), "binary").toString();
        // 解密
        let key = process.env.LINE_ALPHAT_JSONKEY;
        let data = crypto.decrypt(rawData, key);

        // data = require('fs').readFileSync("AntiKickRaw.json").toString();

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


const main = async () => {
    await loadConfigFromDbox();
    console.log(config)
    let bot1 = new LineBot1(config.auth['u33a9a527c6ac1b24e0e4e35dde60c79d']);
    let bot2 = new LineBot2(config.auth['uf0073964d53b22f4f404a8fb8f7a9e3e']);
    bot1.LINE.groupStatus = config.groupStatus;
    bot2.LINE.groupStatus = config.groupStatus;

    // save to dropbox
    config.auth['u33a9a527c6ac1b24e0e4e35dde60c79d'].authToken = bot1.LINE.config.tokenn;
    config.auth['uf0073964d53b22f4f404a8fb8f7a9e3e'].authToken = bot2.LINE.config.tokenn;
    await saveConfigToDbox();

    // // check cfg
    // let cfgstr;
    // const debug = async () => {
    //     let newstr = JSON.stringify(config, null, 2);

    //     if (cfgstr != newstr) {
    //        await   saveConfigToDbox();
    //     }
    //     cfgstr = newstr;

    //     setTimeout(debug, 500)
    // }; debug();

}; main();




