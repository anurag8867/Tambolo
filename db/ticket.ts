const mongoose = require('mongoose');
const ticketModel = mongoose.model('Ticket');
export class TicketRepo {

    /**
     * Create ticket doc
     * @returns docId
     */
    async create(data: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            ticketModel.create(data, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }

    /**
     * get ticket doc
     * @returns docId
     */
    async get(query: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            ticketModel.findOne(query, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }

    /**
     * get all ticket doc
     * @returns docId
     */
    async getAll(query: Object): Promise<Record<string, number | string>> {
        return new Promise((resolve, reject) => {
            ticketModel.find(query, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    }
}
