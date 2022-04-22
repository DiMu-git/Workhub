var Crypto = require('./cryptojs/cryptojs.js').Crypto;
var app = getApp();
function RdWXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}
RdWXBizDataCrypt.prototype.decryptData = function(encryptedData, iv) {
    // base64 decode
    var encryptedData = Crypto.util.base64ToBytes(encryptedData)
    // console.log(sessionKey)
    var key = Crypto.util.base64ToBytes(this.sessionKey);
    var iv = Crypto.util.base64ToBytes(iv);
    // console.log(encryptedData,key,iv)
    var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
    try {
        // Decryption
        var bytes = Crypto.AES.decrypt(encryptedData, key, {
            asBpytes: true,
            iv: iv,
            mode: mode
        });
        var decryptResult = JSON.parse(bytes);

    } catch (err) {
        console.log(err)
    }
    if (decryptResult.watermark.appid !== this.appId) {
        console.log(err)
    }
    return decryptResult
}
module.exports = RdWXBizDataCrypt
