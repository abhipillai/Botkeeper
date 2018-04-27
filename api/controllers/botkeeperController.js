'use strict';

var request =  require('request-promise');
var promise = require('promise');

exports.errorPage = function(req, res){
    res.render('../views/error');
}

exports.get_products = function(req, res){
    var product;
    var inventory = [];
    var r1 = request({method: 'GET', uri: 'http://autumn-resonance-1298.getsandbox.com/products'})
    .then( function (response) {
        product = JSON.parse(response);
    });
    var r2 = request({method: 'GET', uri: 'http://autumn-resonance-1298.getsandbox.com/inventory'})
    .then( function (response) {
        var inv = JSON.parse(response);
        for(var i = 0; i < inv.inventory.length; i++){
            inventory.push({'name': inv.inventory[i].name, 'inventory': inv.inventory[i].inventory});
        }
    });
    promise.all([r1,r2]).then (function (){
        var prodDetails = [];
        for(let i = 0; i < product.length; i++){
            var prod = product[i];
            for(let j = 0; j < inventory.length; j++){
                var inv = inventory[j];
                if(prod.name == inv.name){
                    prodDetails.push({'name': prod.name, 'price': prod.price, 'inventory': inv.inventory});
                }
            }
        }
        res.json(prodDetails);  
    }).catch(function(err){
        console.log('Error', err);
    });
}

exports.get_single_product = function(req, res){
    var product;
    var inventory;
    var r1 = request({method: 'GET', uri: 'http://autumn-resonance-1298.getsandbox.com/products/'+req.params.name})
    .then( function (response) {
        product = JSON.parse(response).product;
    });
    var r2 = request({method: 'GET', uri: 'http://autumn-resonance-1298.getsandbox.com/inventory/'+req.params.name})
    .then( function (response) {
        var inv = JSON.parse(response);
        inventory = inv.inventory;
    });
    promise.all([r1, r2]).then(function() {
        if(inventory[0].name == product[0].name){
            var prodDetails = {'name': product[0].name, 'price': product[0].price, 'inventory': inventory[0].inventory};
            res.json(prodDetails);
            //res.json({'name': product[0].name, 'price': product[0].price, 'inventory': inventory[0].inventory});
        }
    })
    .catch(function(err){
        console.log("Error", err)
        res.json('The product was not found');
    });
};