var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
path = require('path');

var routes = require('./api/routes/botkeeperRoutes'); 
routes(app); 

app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'hbs');

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

console.log('Botkeeper RESTful API server started on: ' + port);
