const mongoose = require("mongoose");

const Secret = mongoose.model("Secret");

const saveSecret = (data) => {
    const secret = new Secret(data);
    secret.setHash(data.secret);
    secret.secretText = data.secret;
    secret.remainingViews = data.expireAfterViews;
    const now = new Date();
    secret.expiresAt = new Date(now.getTime() + data.expireAfter * 60 * 1000);
    return secret.save();
};

const getSecret = (hash) => Secret.findOne({hash: hash});

const extractObject = ( obj, keys ) => {
    const returnObj = { };
    keys.forEach( key => { returnObj[ key ] = obj[ key ]; } );

    return returnObj;
};

module.exports = {
    saveSecret,
    getSecret,
    extractObject
};
