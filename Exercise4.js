var findLatestPost = require('./sequelizer.js').findLatestPost;

var express = require('express');
var app = express();

app.get('/posts', function(req, res){
    findLatestPost().then(function(results){
      var list = '';
      results.forEach(function(item){
          list = list +'<li><h2><a href=' + item.url + '>' + item.title + '</a></h2><p>Created by ' + item.screen_name + '</p></li>'
      })
       var html = '<div><h1>List of contents</h1><ul>' + list + '</ul></div>';
      res.send(html);
    }
    );
 
})

app.listen(process.env.PORT);
