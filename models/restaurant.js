module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurant_img: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        
      }
    },
    restaurant_description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1, 160]
      }
    }
  });
  return Restaurant;
};
