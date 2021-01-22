require("../api/models/secret");
const secretController = require('../api/controllers/secret');

const express = require('express');
const router = express.Router();

/**
 *    @apiGroup User
 *    @api {post} /api/secret Adding an user to the db.
 *    @apiParam {String} secret  [This text that will be saved as a secret].
 *    @apiParam {String} expireAfterViews  [The secret won't be available after the given number of views].
 *    @apiParam {Number} expireAfter  [The secret won't be available after the given time. The value is provided in minutes. 0 means never expires]
 *    @apiExample {response} Example response:
 *       {
 *            "hash": "[The hash of the string]",
 *            "secretText": "[The original text]",
 *            "createdAt": "[The Timestamp the secret was created]",
 *            "expiresAt": "[The Timestamp the secret if TTL is given]",
 *            "remainingViews": "female",
 *      }
 */
router.post('/secret', secretController.add);
router.get('/secret/:hash', secretController.get);

module.exports = router;
