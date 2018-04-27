'use strict';
module.exports = function(app) {
  var botkeeper = require('../controllers/botkeeperController');

  app.route('/products')
    .get(botkeeper.get_products);

  app.route('/products/:name')
    .get(botkeeper.get_single_product);

  app.route('*')
     .get(botkeeper.errorPage);

};