/**
 * RestaurantController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  create: function(req, res) {
    Restaurant.create({
      name: req.param('restaurant').name,
      menu: req.param('restaurant').menu,
      votes: req.param('restaurant').votes,
      visited: req.param('restaurant').visited
    }).done(function(err, restaurant) {
      // Error handling
      if (err) {
        return res.send(err, 500)
      }else {
        //restaurant.save();
        console.log(restaurant.toJSON())
        return res.send({restaurant: restaurant.toJSON()})
      }
    });
  },

  show: function(req, res) {
    Restaurant.findOne(req.param('id')).done(function(err, restaurant){
      if (err) {
        res.send(err, 500);
      }
        res.send({restaurant: restaurant.toJSON()});
    });
  },

  update: function(req, res) {
    Restaurant.findOne(req.param('id')).done(function(err, restaurant){
      if (err) {
        res.send(err, 404);
      }
      restaurant.votes = req.param('restaurant').votes;
      restaurant.visited = req.param('restaurant').visited;
      restaurant.save(function(){
        res.send({restaurant: restaurant.toJSON()});
      });

    });
  },

  index: function(req, res) {
    Restaurant.find().done(function(err, restaurants){
       if (err) {
         res.send(err, 500)
       } else {
         var restaurantJSON = {restaurants: []};
         restaurants.forEach(function(restaurant){
           console.log("restaurant is " + restaurant);
           restaurantJSON.restaurants.push( {id: restaurant.id, name: restaurant.name, menu: restaurant.menu, visited: restaurant.visited, votes: restaurant.votes});
         });
         res.send(restaurantJSON);
       }
    });
  },

  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RestaurantController)
   */
  _config: {}

  
};
