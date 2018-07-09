var HTTPS = require('https');
//var request = require('request');
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
     botRegex = /^\/test$/;

 if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    console.log("before");
    potySearch();
    console.log("after");
    //postMessage("Hello", botID);
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function potySearch() {
  //request('https://api.groupme.com/v3/groups/41931948/messages?limit=100&token=GI06VY9NNHhWwfwILfIJFCCXaPpLE5XizxSUcmdH', function (error, response, body) {
    cosole.log("inside before");
    var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.groupme.com/v3/groups/41931948/messages?limit=100&token=GI06VY9NNHhWwfwILfIJFCCXaPpLE5XizxSUcmdH", true);
  var response = xhttp.send();
  postMessage(response, botID);
  console.log("inside after");
  //});
}

function postMessage(botResponse, botID) {
  var options, body, botReq;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse 
  };

  console.log('sending ' + botResponse);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });
  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;