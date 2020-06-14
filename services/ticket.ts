const { TicketRepo } = require("../db/ticket");
const { GameRepo } = require("../db/game");
import config = require("config");
export class TicketService {
    /**
     * create a new ticket
     * @param param0 
     */
    async create({ gameId, userName }): Promise<Record<string, number | string>> {
        let gameDetail = await GameRepo.prototype.get({
            _id: gameId
        });
        //Checking the existence of the game
        if (!gameDetail) throw {
            message: "No Game created for this id, request you to create game first",
            status: config.get("httpStatusCode.preconditionFailed")
        }
        let randomNumber = String(Math.random());
        let ticketDetails: Object = {
            ticket_number: new Date().getTime(),
            game_id: gameId,
            user_name: userName,
            created_at: new Date()

        };
        let dbResp = await TicketRepo.prototype.create(ticketDetails)
        return dbResp._doc._id;
    }

    /**
     * get the details of already ticket
     * @param param0 
     */
    async get({ ticketId }): Promise<Record<string, number | string>> {
        let ticketDetail = await TicketRepo.prototype.get({
            _id: ticketId
        });
        if (!ticketDetail) throw {
            message: "No ticket created for this id, request you to create ticket first",
            status: config.get("httpStatusCode.preconditionFailed")
        }
        return ticketDetail._doc;
    }

    getHtml(ticketNumber: Number, userName: String, gameId: any, createdAt: any) {
        return '<!doctype html>\n<html lang="en">\n' +
            '\n<meta charset="utf-8">\n<title>Ticket Details</title>\n' +
            '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
            '\n\n<h1>Ticket Details:</h1>\n' +
            '<li>User Name:  ' + userName + '</li>' +
            '<li>Ticket Number:  ' + ticketNumber + '</li>' +
            '<li>game_id:  ' + gameId + '</li>' +
            '<li>Generated At:  ' + createdAt + '</li></ul>';
    }
}