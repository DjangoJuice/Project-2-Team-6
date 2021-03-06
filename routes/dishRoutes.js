
var db = require("../models");

module.exports = function(app) {
    app.get("/api/dishes/restaurants/:restaurantId?", function(req, res) {
        if(req.params.restaurantId) {
            // Get Dishes by RestaurantId
            db.Dish.findAll({where: {RestaurantId: req.params.restaurantId}}).then(function(dbDishes){
                res.json(dbDishes);
            });
        }
        else {
            // Get Dishes Across All Restaurants
            db.Dish.findAll({}).then(function(dbDishes) {
                res.json(dbDishes);
            });
        }
    });

    app.post("/api/dishes/", function(req, res) {
        db.Dish.create({
            dishName: req.body.dishName,
            dishDescription: req.body.dishDescription,
            category: req.body.category,
            dishPrice: req.body.dishPrice,
            RestaurantId: req.body.RestaurantId
        }).then(function(dbDishes) {
            res.json(dbDishes);
        });
    });

    app.put("/api/dishes/:id", function(req, res) {
        db.Dish.update({
            dishName: req.body.dishName,
            dishDescription: req.body.dishDescription,
            category: req.body.category,
            dishPrice: req.body.dishPrice,
            RestaurantId: req.body.RestaurantId
        }, {
            where: {id: req.params.id}
        }).then(function() {
            res.json({message: "Dish updated"})
        });
    });

    app.delete("/api/dishes/:id", function(req, res) {
        db.Dish.destroy({where: {id: req.params.id}}).then(function() {
            res.json({message: "Dish removed"});
        })
    });
};
