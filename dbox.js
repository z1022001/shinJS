
const path = require('path');
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;

const dbox = new Dropbox({
    fetch: fetch,
    accessToken: process.env.DROPBOX_ACCESS_TOKEN
});
const root = "/";

module.exports = {
    // download
    async fileDownload(base) {
        try {
            let onlinePath = path.format({ root, base });
            let response = await dbox.filesDownload({ path: onlinePath });
            return response.fileBinary;

        } catch (error) {
            console.log("fileDownload error... " + base);
            throw error;
        }
    },

    // upload
    async fileUpload(dirPath, fileBinary, mode) {
        let filesCommitInfo = {
            path: root + dirPath,
            contents: fileBinary,
            mode: { ".tag": (mode || "overwrite") },
            autorename: false,
            mute: true
        };

        for (let retry = 0; ; ++retry) {
            try {
                await dbox.filesUpload(filesCommitInfo);
                return true;
            } catch (error) {
                console.log("fileUpload error... " + dirPath);
                console.log(error);
                if (retry >= 1) { throw error; }
            }
            await sleep(1000);
        }
    },
};


/*
const debugFunc = function() {

	dboxCore.listDir("").then(function(obj){console.log(obj);});

}
setTimeout(debugFunc, 1 * 1000);*/

