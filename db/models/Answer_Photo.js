const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');

class Answer_Photo extends Model{}

Answer_Photo.init({
  photo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  answer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Answers",
      key: "answer_id"
    }
  },
  photo_url: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize: seq
});

module.exports = Answer_Photo;