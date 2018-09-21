module.exports = function(sequelize, DataTypes) {
    var Dish = sequelize.define("Dish", {
      dishName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dishDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dishPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true
        }
      }
    },{
      timestamps: false
    });

    Dish.associate = function(models) {
        models.Dish.belongsTo(models.Restaurant, {
            foreignKey: {
                // name: restaurant_id,
                allowNull: false
            }
        });
    }
    return Dish;
  };