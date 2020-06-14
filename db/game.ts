const mongoose = require('mongoose');
const gameModel = mongoose.model('Game');
export class GameRepo {

    /**
     * Create a game details record
     * @returns docId
     */
    async create(data: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            gameModel.create(data, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }

    /**
     * get a game details record
     * @returns docId
     */
    async get(query: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            gameModel.findOne(query, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }
}
