var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');


// load config from.env
require('dotenv').config();

//console.log(process.env)
// Setup Restify Server

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 1337, function () {
    //console.log('%s listening to %s', server.name, server.url);
    console.log('listening to server.name:%s', server.name)
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
//var bot = new builder.UniversalBot(connector, function (session) {
//    console.log("You said: %s", session.message.text);
//    session.send("貴方の会話: %s", session.message.text);
//});
var bot = new builder.UniversalBot(connector);

//
//=========================================================
// Bots Dialogs
//=========================================================

var recognizer = new cognitiveservices.QnAMakerRecognizer({
    knowledgeBaseId: '', 
    subscriptionKey: ''});

var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: 'No match! Try changing the query terms!',
    qnaThreshold: 0.3
});

bot.dialog('/', basicQnAMakerDialog);
