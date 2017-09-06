var restify = require('restify');
var builder = require('botbuilder');

// load config from.env
require('dotenv').config();

//console.log(process.env)
// Setup Restify Server

console.log(process.env.port)
console.log(process.env.PORT)
console.log(process.env.port)

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 1337, function () {
    //console.log('%s listening to %s', server.name, server.url);
    console.log('listening to server.port:%s server.PORT', server.port, server.PORT)
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});
