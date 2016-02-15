/*Exercise 2: A wild parameter has appeared!

Create a web server that can listen to requests for /hello/:firstName, and respond with some HTML that says <h1>Hello _name_!</h1>. 
For example, if a client requests /hello/John, the server should respond with <h1>Hello John!</h1>*/


var express = require('express');
var app = express();


app.get('/hello/:firstName', function(req, res) {
    res.send('Hello ' + req.params.firstName);
});

app.listen(process.env.PORT);


