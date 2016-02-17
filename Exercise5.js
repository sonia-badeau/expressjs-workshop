var createNewContent = require("./sequelizer.js").createNewContent
var findLatestPost = require('./sequelizer.js').findLatestPost;
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
app.use(bodyParser());



app.get('/', function(req, res) {
    findLatestPost().then(function(posts){
        res.send(posts);
    })
})


// GET method route
app.get('/createcontent', function(req, res){
    res.sendFile(path.join(__dirname + '/form.html'));
    
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// POST method route
// This route receives the posted form
app.post('/createContent', function(req, res){
    createNewContent(1, req.body.url, req.body.title, function (newContent) {
        res.redirect('/');
    })
})


app.listen(process.env.PORT);

