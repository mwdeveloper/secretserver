const utils = require("../utils/utils");

exports.add = async (req, res) => {
    try {
        const savedSecret = await utils.saveSecret(req.body);
        return await res.json(utils.extractObject(
            savedSecret,
            ["hash", "secretText", "createdAt", "expiresAt", "remainingViews"],
        ));
    } catch (err) {
        res.send(err);
    }
};

exports.get = async (req, res) => {
    try {
        var selectedItem = await utils.getSecret(req.params.hash);
        const now = new Date();
        if (now.getTime() > selectedItem.expiresAt.getTime()) {
            if (selectedItem.remainingViews > 0) {
                selectedItem.remainingViews = selectedItem.remainingViews - 1;
                selectedItem = await selectedItem.save();
            } else {
                return res.json({
                    "message": "The secret remaining views is unavailable."
                })
            }
        }
        return await res.json(utils.extractObject(selectedItem,
            ["hash", "secretText", "createdAt", "expiresAt", "remainingViews"],
        ));
    } catch (err) {
        return res.json(err)
    }
};
