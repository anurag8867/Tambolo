import config = require("config");
import mongoose from 'mongoose';
let _db;

module.exports = {
    connectToServer: async function () {
        try {
            _db = await mongoose.connect(config.get('db.MongoURI'));
            console.log(`Db Connection Successful`);
        } catch (err) {
            console.error('err', { err });
            process.exit(1);
        }
    },

    getDb: function () {
        return _db;
    }
};