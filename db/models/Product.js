const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');

class Product extends Model{}

Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  product_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_slogan: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  product_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  product_category: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  default_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: seq
});

module.exports = Product;