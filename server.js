var http = require("http");
var ping = require("./ping");
var Asset = require("./asset").Asset;

// Static file server.
var asset = new Asset();
ping.createServer(asset).listen(9000);
console.log("Static file server is running at 9000 port.");
