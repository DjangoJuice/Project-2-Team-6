module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
      table_num: {
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
    });

    Table.associate = function(models) {
        Table.belongsTo(models.Restaurant, {
            onDelete: "CASCADE",
            foreignKey: {
                name: restaurant_id,
                type: DataTypes.INTEGER,
                allowNull: false
            }
        });
    }
    return Table;
  };