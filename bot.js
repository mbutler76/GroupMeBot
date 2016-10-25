var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
     // coolRegex = /^\/cool guy$/,
      gifRegex = /^\/gif$/;

 /* if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Hello", botID);
    this.res.end();
  }*/ 
  /*else*/ if(request.text && botRegex.test(request.text)) {
    searchTerm = request.text.substr(6);
    this.res.writeHead(200);
    gif(searchTerm);
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function gif(searchTerm) {
  request('http://api.giphy.com/v1/gifs/translate?s=' + searchTerm + '&api_key=dc6zaTOxFJmzC&rating=r', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    parsedData = JSON.parse(body),
    postMessage(parsedData.data.images.downsized.url, botID, parsedData.data.images.downsized.size);
    } 
  }); 
} 

function postMessage(botResponse, botID, size) {
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

  console.log('sending ' + botResponse + ' to ' + botID);

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