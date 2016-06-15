var express = require('express');
var path = require('path');
var events = require('./eventsController');
var app = express();
var rootpath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(rootpath));
//app.use(express.static(__dirname + '/'));

app.get('/data/event/:id', events.get);
app.get('/data/event', events.getAll);
app.post('/data/event/:id', events.save);

app.listen(8080);
console.log('Listening on port 8080...');
