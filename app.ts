import express from 'express';
let app = express();
import * as bodyParser from 'body-parser';
import { handleError } from './helpers/error';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config = require("config");
const gameModel = require("./db/models/game");
const randomModel = require("./db/models/random");
const ticketModel = require("./db/models/ticket");
const indexRouter = require("./routes/index");
const mongoUtil = require("./db/mongoUtil");
app = express();
//Db Calls and other formalities
// const tables = require('./db/tables');

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
// app.use((err: Object, req: Object, res: Object) => {
//     handleError(err, res);
// });

mongoUtil.connectToServer().then((result) => {
    app.listen(config.get('port'), () => console.log(`Example app listening at http://localhost:${config.get('port')}`));
}).catch((err) => {
    console.error('err', err);
    process.exit(1);
});

// const server = app.listen(config.get('port'), () => console.log(`Example app listening at http://localhost:${config.get('port')}`));
// module.exports = server