const express = require('express');
const helmet = require('helmet');
const app = express();

/*Hackers can exploit known vulnerabilities in Express/Node if they see that your site 
is powered by Express. X-Powered-By: Express is sent in every request coming from Express by default. 
Use the helmet.hidePoweredBy() middleware to remove the X-Powered-By header.*/


app.use(helmet.hidePoweredBy());



/**Your page could be put in a <frame> or <iframe> without your consent. This can result in clickjacking attacks, among other things. Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained by executing your page in a malicious context, by means of iframing. In that context, a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts. This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.

We don’t need our app to be framed.

Use helmet.frameguard() passing with the configuration object {action: 'deny'} */



// Block all iframing
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

















module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
