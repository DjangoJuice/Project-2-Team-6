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
      },
      paid: {
          type: DataTypes.BOOLEAN,
          defaultValue: false       
      },
      //part of a put method to indicate the time when the order has been filled
      timeFilled: {
          type: DataTypes.DATE,
          allowNull: true
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