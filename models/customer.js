module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerPhone: {
          type: DataTypes.INTEGER,
          allowNull: true,
      }
    });

    Customer.associate = function(models) { 
        models.Customer.hasMany(models.Order, {
            foreignKey: {
                onDelete: "CASCADE"
            }
        });
        models.Customer.belongsTo(models.User, {
            foreignKey: {
                // name: user_id,
                allowNull: false
            }
        });
    }
    return Customer;
  };