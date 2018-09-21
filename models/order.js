module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      dishName: {
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
      },
      dishQuantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
      },
      notes: {
          type: DataTypes.TEXT,
          allowNull: true,
          validate: {
              len: [1, 200]
          }
      },
      filled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
    });

    Order.associate = function(models) {
        models.Order.belongsTo(models.Restaurant, {
            foreignKey: {
                // name: restaurant_id,
                allowNull: false
            }
        });
        models.Order.belongsTo(models.Customer, {
            foreignKey: {
                // name: customer_id,
                allowNull: false
            }
        });
    }
    return Order;
  };