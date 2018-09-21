module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurant_address: {
      type: Datatypes.STRING,
      allowNull: false
    },
    restaurant_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    restaurant_description: {
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
 