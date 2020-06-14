var express = require('express'),
    { checkSchema, validationResult } = require("express-validator"),
    { error } = require("../helpers/error"),
    config = require('config'),
    mathService = require("../services/math");

var app = express();

app.get('/', checkSchema({
    // id: {
    //     in: ['body'],
    //     errorMessage: 'ID is wrong',
    //     isInt: true,
    //     // Sanitizers can go here as well
    //     toInt: true
    // }
}), function (req, res) {
    try {
        validationResult(req).throw();
        res.send('Hello Sir');
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.get('/add', function (req, res) {
    try {
        return res.status((config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')) || parseInt(config.get('httpStatusCode.oK'))))
            .send({ result: mathService.add(10, 11) });
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.post('/hello', function (req, res) {
    try {
        process.connection.query('INSERT INTO table1 SET ?', { name: 'Craig Buckler', city: 'Bangalore' }, (err, result) => {
            if (err) new error();
            console.log('Last insert ID:', result.insertId);
            res.status(config.get('httpStatusCode.created')).send({ result })
        });
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = app;