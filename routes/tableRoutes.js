
  // Get Tables by RestaurantId
  app.get("/api/tables/:restaurantId", function(req, res) {
    db.Table.findAll({where: {RestaurantId: req.params.restaurantId}}).then(function(dbTables) {
      res.json(dbTables);
    });
  });

  