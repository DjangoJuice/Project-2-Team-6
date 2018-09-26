module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
      tableNum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: true
      },
      occupied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    }, {
      timestamps: false
    });

    Table.associate = function(models) {
        Table.belongsTo(models.Restaurant, {
            foreignKey: {
                // name: restaurant_id,
                allowNull: false
            }
        });
    }
    return Table;
  };