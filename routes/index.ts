import express from 'express';
import { checkSchema } from 'express-validator';
import config = require("config");
const { GameService } = require("../services/game");
const { TicketService } = require("../services/ticket");
let app = express();

/**
 * This EP will create a new game
 * @returns GameId
 */
app.post('/api/game/create', async function (req: any, res: any) {
    try {
        let resp = await GameService.prototype.create();
        return res.status(config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')))
            .send({ game_id: resp });
    } catch (e) {
        return res.status(config.get('httpStatusCode.internalServerError')).send(e && typeof e === "string" ? e : String(e));
    }
});

/**
 * This EP will generate a new unique random number
 * @returns random number Id
 */
app.post('/api/game/:game_id/number/random', checkSchema({
    game_id: {
        in: ['params'],
        errorMessage: 'game_id is missing',
    }
}), async function (req: any, res: any) {
    try {
        let resp = await GameService.prototype.getRandomNumber({
            gameId: req.params.game_id
        });
        return res.status(config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')))
            .send({ result: resp });
    } catch (e) {
        return res.status(config.get('httpStatusCode.internalServerError')).send(e && typeof e === "string" ? e : e && e.message && e.stack ? {
            msg: e.message, stack: e.stack
        } : e);
    }
});

/**
 * This EP will get all the numbers picked for this game
 * @returns random number picked for the given name
 */
app.get('/api/game/:game_id/number', checkSchema({
    game_id: {
        in: ['params'],
        errorMessage: 'game_id is missing',
    }
}), async function (req: any, res: any) {
    try {
        let resp = await GameService.prototype.getNumbersPickedForGame({
            gameId: req.params.game_id
        });
        return res.status(config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')))
            .send({ result: resp.map((value) => value.number) });
    } catch (e) {
        return res.status(config.get('httpStatusCode.internalServerError')).send(e && typeof e === "string" ? e : e && e.message && e.stack ? {
            msg: e.message, stack: e.stack
        } : e);
    }
});

/**
 * This EP will get all the stats of the game {numbers drawn/no of tickets/no of users}
 * @returns stats
 */
app.get('/api/game/:game_id/stats', checkSchema({
    game_id: {
        in: ['params'],
        errorMessage: 'game_id is missing',
    }
}), async function (req: any, res: any) {
    try {
        let resp = await GameService.prototype.getStats({
            gameId: req.params.game_id
        });
        return res.status(config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')))
            .send({ result: resp });
    } catch (e) {
        return res.status(config.get('httpStatusCode.internalServerError')).send(e && typeof e === "string" ? e : e && e.message && e.stack ? {
            msg: e.message, stack: e.stack
        } : e);
    }
});

/**
 * This EP will create a new game
 * @returns GameId
 */
app.post('/api/:game_id/ticket/:user_name/generate', checkSchema({
    user_name: {
        in: ['params'],
        errorMessage: 'user_name is missing',
    },
    game_id: {
        in: ['params'],
        errorMessage: 'game_id is missing',
    }
}), async function (req: any, res: any) {
    try {
        let resp = await TicketService.prototype.create({
            gameId: req.params.game_id, userName: req.params.user_name
        });
        return res.status(config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')))
            .send({ result: resp });
    } catch (e) {
        return res.status(config.get('httpStatusCode.internalServerError')).send(e && typeof e === "string" ? e : e && e.message && e.stack ? {
            msg: e.message, stack: e.stack
        } : e);
    }
});

/**
 * This EP will create a new game
 * @returns GameId
 */
app.get('/ticket/:ticket_id', checkSchema({
    ticket_id: {
        in: ['params'],
        errorMessage: 'ticket_id is missing',
    }
}), async function (req: any, res: any) {
    try {
        let resp = await TicketService.prototype.get({
            ticketId: req.params.ticket_id
        }),
            html = await TicketService.prototype.getHtml(
                resp.ticket_number, resp.user_name, resp.game_id,
                resp.created_at
            );

        res.set('Content-Type', 'text/html');
        res.writeHead(config.get('httpStatusCode.oK'), { 'Content-Type': 'text/html' });
        res.write(html);
        return res.end();
    } catch (e) {
        return res.status(config.get('httpStatusCode.internalServerError')).send(e && typeof e === "string" ? e : e && e.message && e.stack ? {
            msg: e.message, stack: e.stack
        } : e);
    }
});

module.exports = app;