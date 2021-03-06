module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerPhone: {
          type: DataTypes.STRING,
          allowNull: true,
          isTwelve(value) {
              if (value.length != 12) {
                  throw new Error("Incorrect Phone Number Format");
              }
          }
      },
      customerEmail: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          }
      }
    },{
        timestamps: false
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

        models.Customer.hasMany(models.Table, {
            foreignKey: {
                onDelete: "CASCADE"
            }
        });
    }
    return Customer;
  };