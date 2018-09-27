module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    restaurantImg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    restaurantDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Table, {
      onDelete: "CASCADE"
    });
    Restaurant.hasMany(models.Dish, {
      onDelete: "CASCADE"
    });
  }
  return Restaurant;
};
 