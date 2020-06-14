const mongoose = require('mongoose');
const randomModel = mongoose.model('Random');
export class RandomRepo {

    /**
     * Create a random number details record
     * @returns docId
     */
    async create(data: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            randomModel.create(data, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }

    /**
     * get all random numbers filtered by the provided search query
     * @returns docId
     */
    async getAll(query: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            randomModel.find(query, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }
}
