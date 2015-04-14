/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = {'results': []};
var fs = require("fs");

var requestHandler = exports.requestHandler =  function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  //
  // if(request.method === "GET"){

  console.log("Serving request type " + request.method + " for url " + request.url);



  // The outgoing status.
  var statusCode;
  console.log("request.url: " + request.url)

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  if (request.method==="GET"){
    statusCode=200;
    if(request.url === '/classes/messages'){
        headers['Content-Type'] = "text/JSON";
        response.writeHead(statusCode, headers);
        //console.log("it is expecting: " + JSON.stringify(messages));
        response.end(JSON.stringify(messages));
        //REFACTOR FOR OTHER ROOMS
      } else if(request.url === '/classes/room1'){
        headers['Content-Type'] = "text/JSON";
        response.writeHead(statusCode, headers);
        //console.log("MESSAGES.RESULTS.LENGTH"+messages.results.length);
        response.end(JSON.stringify(messages))
      } else{
        statusCode=404;
        headers['Content-Type'] = "text/plain";
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(messages))
      }
  } else if (request.method==="POST"){
    console.log("I GOT HERE1");
    statusCode=201;
    var messageReceived = '';
    if(request.url === ''){

    } else if(request.url === '/classes/messages'){
      request.on('data', function(chunk){
        messageReceived += chunk;
      })
      request.on('end', function(){
        messages.results.push(JSON.parse(messageReceived));
        headers['Content-Type'] = "text/plain";
        response.writeHead(statusCode, headers);
        // console.log(response);
        //response.write(JSON.stringify(messages))
        response.end();
      })

    } else if(request.url === '/classes/room1'){
      request.on('data', function(chunk){
      messageReceived+= chunk;
      console.log("I GOT HERE2");
      })
      request.on('end', function(){
        console.log("MESSAGES.RESULTS BEFORE"+JSON.stringify(messages.results));
        messages.results.push(JSON.parse(messageReceived));
        console.log("MESSAGES.RESULTS AFTER"+JSON.stringify(messages.results));
        headers['Content-Type'] = "text/plain";
        response.writeHead(statusCode, headers);
        response.end();
      })
    }else{
      statusCode=404;
      headers['Content-Type'] = "text/plain";
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages))
    }
  }











  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  //#headers['Content-Type'] = "text/JSON";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //#response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //#response.end("Hello, World!");
};
  // }
  // console.log("Serving request type " + request.method + " for url " + request.url);
  //   var directory = '../client'+request.url;
  //   if(directory==="../client/" || directory ==="/classes/messages"){
  //     directory="../client/index.html"
  //   }

  //   console.log(request.url);

  //   // The outgoing status.
  //   var statusCode = 200;

  //   // See the note below about CORS headers.
  //   var headers = defaultCorsHeaders;

  //   // Tell the client we are sending them plain text.
  //   //
  //   // You will need to change this if you are sending something
  //   // other than plain text, like JSON or HTML.
  //   headers['Content-Type'] = "text/html";

  //   // .writeHead() writes to the request line and headers of the response,
  //   // which includes the status and all headers.

  //   response.writeHead(statusCode,"Everything is totally cool", headers);
  //   fs.readFile(directory, function (err, page) {
  //       if (err) {
  //         console.log(directory);
  //           throw err;
  //       }
  //       console.log(page);
  //       response.write(page);
  //       response.end();
  // });


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // response.write(html);

//};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = exports.defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

