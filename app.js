
var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('port', config.get('port'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(app.router);
app.get('/' ,function(req, res, next){
    res.render("index",{
    });
});
var User = require('models/user').User;
app.get('/users' ,function(req, res, next){
    User.find({}, function(err, users){
        if (err) return next (err);
        res.json(users);
    })
    });


app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});


app.use(function(err, req, res, next){
    if (app.get('env')== 'development'){
      var errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    }
    else
    {
        res.send(500);
    }
});
/*
var routes = require('./routes');
var user = require('./routes/user');




// all environments



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


*/
