const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');

class Question extends Model {}

Question.init({
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Products",
      key: "product_id"
    }
  },
  question_body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 1000]
    }
  },
  question_date: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  asker_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 60]
    }
  },
  asker_email: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 60]
    }
  },
  reported: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  question_helpfulness: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }


}, {
  sequelize: seq
});

module.exports = Question;