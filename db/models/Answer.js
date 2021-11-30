const { Sequelize, Model, DataTypes } = require('sequelize');
const seq = require('../db.js');

class Answer extends Model {}

Answer.init({
  answer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Questions",
      key: "question_id"
    }
  },
  answer_body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 1000]
    }
  },
  answer_date: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  answerer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 60]
    }
  },
  answerer_email: {
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
  answer_helpfulness: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

}, {
  indexes: [
    {
      fields: ['question_id']
    },
    {
      fields: ['reported']
    }
  ],
  sequelize: seq
});

module.exports = Answer;