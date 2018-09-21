module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    restaurantImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    restaurantDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1, 160]
      }
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
 