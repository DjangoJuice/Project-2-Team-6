module.exports = function(sequelize, DataTypes) {
    var Dish = sequelize.define("Dish", {
      dish_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dish_price: {
        type: DataTypes.FLOAT,
        defaultValue: false,
        validate: {
          isFloat: true
        }
      }
    });

    associate = function(models) {
        models.Dish.belongsTo(models.Restaurant, {
            foreignKey: {
                name: restaurant_id,
                allowNull: false
            }
        });
    }
    return Dish;
  };