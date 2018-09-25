
var db = require("../models");

module.exports = function(app) {
    // Get Dishes Across All Restaurants
    app.get("/api/orders/restaurants/:restaurantId?", function(req, res) {
        if(req.params.restaurantId) {
            // Get Orders for Restaurant
            db.Order.findAll({
                include: [{
                    model: db.Customer,
                    include: [{
                        model: db.Table,
                        include: [{
                            model: db.Restaurant
                        }]
                    }]
                }]
            },{
                where: {RestaurantId: req.params.restaurantId}
            }).then(function(dbOrders) {
                res.json(dbOrders);
            });
        }
        else {
            // Get All Orders
            db.Order.findAll({
                include: [{
                    model: db.Customer,
                    include: [{
                        model: db.Table,
                        include: [{
                            model: db.Restaurant
                        }]
                    }]
                }]
            }).then(function(dbOrders) {
                res.json(dbOrders);
            });
        }
    });

    app.get("/api/orders/customers/:customerId?", function(req, res) {
        if(req.params.customerId) {
            // Get Orders For A Particular Customer
            db.Order.findAll({where: {CustomerId: req.params.customerId}}).then(function(dbOrders){
                res.json(dbOrders);
            });
        }
        else {
            // Get All Orders
            db.Order.findAll({}).then(function(dbOrders) {
                res.json(dbOrders);
            });
        }
    });


    app.post("/api/orders/restaurants/", function(req, res) {
        // Create an Order - supply order unique id
        db.Order.create({
            dishName: req.body.dishName,
            category: req.body.category,
            dishPrice: req.body.dishPrice,
            dishQuantity: req.body.dishQuantity,
            notes: req.body.notes,
            RestaurantId: req.body.RestaurantId,
            CustomerId: req.body.CustomerId
        }).then(function(dbOrders) {
            res.json(dbOrders);
        });
    });

    //Updating Record for filled orders. (Send filled: true)
    app.put("/api/orders/restaurants/:id", function(req, res) {
            db.Dish.update({
            filled: req.body.filled,
            timeFilled: new Date()
        }, {
            where: {id: req.params.id}
        }).then(function() {
            res.json({message: "Order updated"})
        });
    });

    //General Order Updates 
    app.put("/api/orders/restaurants/:id", function(req, res) {
            db.Dish.update({
            dishName: req.body.dishName,
            category: req.body.category,
            dishPrice: req.body.dishPrice,
            dishQuantity: req.body.dishQuantity,
            notes: req.body.notes,
            CustomerId: req.body.CustomerId
        }, {
            where: {id: req.params.id}
        }).then(function() {
            res.json({message: "Order updated"})
        });
    });

    app.delete("/api/orders/restaurants/:id", function(req, res) {
        db.Order.destroy({where: {id: req.params.id}}).then(function() {
            res.json({message: "Order removed"});
        });
    });
};
