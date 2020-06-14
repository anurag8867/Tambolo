const { GameRepo } = require("../db/game");
const { RandomRepo } = require("../db/random");
const { TicketRepo } = require("../db/ticket");


export class GameService {
    /**
     * Create a game details record
     * @returns docId
     */
    async create(): Promise<Record<string, number | string>> {
        let randomNumber: String = String(Math.random());
        let gameDetails: Object = {
            players: Number(randomNumber.slice(randomNumber.length - 6)),
            private_players: Number(randomNumber.slice(randomNumber.length - 4)),
            is_active: true,
            created_at: new Date()

        };
        let dbResp = await GameRepo.prototype.create(gameDetails)
        return dbResp._doc._id;
    }

    /**
     * Generate a random number and save that number into Db, with the assigned gameId
     * @param gameId
     * @returns docId
     */
    async getRandomNumber({ gameId }): Promise<Record<string, number | string>> {
        let randomNumber = new Date().getMilliseconds() + String(Math.random()).slice(4)
        let randomNumberDetails: Object = {
            number: randomNumber,
            game_id: gameId,
            created_at: new Date()

        };
        let dbResp = await RandomRepo.prototype.create(randomNumberDetails)
        return dbResp._doc._id;
    }

    /**
     * This function will get all the random numbers assigned to that Game Id 
     * @param gameId
     * @returns Array of Docs
     */
    async getNumbersPickedForGame({ gameId }): Promise<Record<string, number | string>> {
        let dbResp = await RandomRepo.prototype.getAll({
            game_id: gameId
        });
        return dbResp;
    }

    /**
     * This function will get all the stats of a game according to the provided Game Id 
     * @param gameId
     * @returns Array of Docs
     */
    async getStats({ gameId }): Promise<Record<string, number | string>> {
        let randomResp = await RandomRepo.prototype.getAll({
            game_id: gameId
        });
        let ticketResp = await TicketRepo.prototype.getAll({
            game_id: gameId
        });
        return {
            numberOfUsers: ticketResp && ticketResp.length || null,
            numberOfTickets: ticketResp && ticketResp.length || null,
            numberOfDrawn: randomResp && randomResp.length || null,
        };
    }
}