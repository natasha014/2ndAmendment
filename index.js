'use strict';

var builder = require('botbuilder');
var restify = require('restify');
var https = require ('https');


let uri = 'westus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment';
var body_;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "9e2921f3-6b82-45b6-9a2e-2d9b022ed2d4",
    appPassword: "VS/i_DmrgywoDvzI"
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


//store data in bot storage;
var inMemoryStorage = new builder.MemoryBotStorage();

// This is a dinner reservation bot that uses a waterfall technique to prompt users for input.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("This survery will help you determine wheter to buy a fire arm.");
         session.userData.score=0;
        builder.Prompts.text(session, "Are you over 18?");

    },
    function (session, results) {
        if(`${results.response}`!= "no"|| `${results.response}`!='No' )
        {
        	session.userData.score++;

        }
        else
        {
        	session.userData.score-=3.5;
        }
        builder.Prompts.text(session, "Do you have a gun licence");

    },
     function (session, results) {
        if(`${results.response}`!= "no"|| `${results.response}`!='No' )
        {
        	session.userData.score++;

        }
        else
        {
        	session.userData.score-=1;
        }
        builder.Prompts.text(session, "Describe your average day in 3 to 4 lines");

    },
    function(session,results)
    {
    	session.userData.questionresposearray=[`${results.response}`];
    	builder.Prompts.text(session, "What do you feel when you see a group of people laughing. Write a response in 3 to 4 lines");

    },
    function(session,results)
    {
    	session.userData.questionresposearray.push(`${results.response}`);
    	builder.Prompts.text(session, "Please describe prominent patterns in your mood, behaviour, weight and sleep cycle. Describe the changes in these patterns in the last six months(if any)");

    },

    function (session, results) {

    				session.userData.questionresposearray.push(`${results.response}`);
					let uri = 'westcentralus.api.cognitive.microsoft.com';
					let path = '/text/analytics/v2.0/sentiment';

					let response_handler = function (response) {
					let body = '';
					response.on ('data', function (d) {
					    body += d;
					});
					response.on ('end', function () {
					   	body_ = JSON.parse (body);
					    let body__ = JSON.stringify (body_, null, '  ');
					   
					for(var i=0; i<3; i++)
					{
						session.userData.score+= body_.documents[i].score;
					}
					 console.log (`${session.userData.score}`);
					if(`${session.userData.score}`>3.5)
					session.send("You can buy a gun if you feel that you need it");
					else
					session.send("We advise you not to buy a gun");
				 	session.endDialog();

					});
					response.on ('error', function (e) {
					    console.log ('Error: ' + e.message);
					});
					};

					let get_sentiments = function (documents) {
					let body = JSON.stringify (documents);

					let request_params = {
					    method : 'POST',
					    hostname : uri,
					    path : path,
					    headers : {
					        'Ocp-Apim-Subscription-Key' : '7698203cc2cc4d4c8e0b76af1a843aa9',
					    }
					};

					let req = https.request (request_params, response_handler);
					req.write (body);
					req.end ();
					}

					let documents = { 'documents': [
					{ 'id': '1', 'language': 'en', 'text': `${session.userData.questionresposearray[0]}` },
					{ 'id': '2', 'language': 'en', 'text': `${session.userData.questionresposearray[1]}` },
					{ 'id': '3', 'language': 'en', 'text': `${session.userData.questionresposearray[2]}` },

					]};

					get_sentiments (documents);


					
					
				
				
			},



]).set('storage', inMemoryStorage); // Register in-memory storage 
