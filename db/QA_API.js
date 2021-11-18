const Product = require('./models/Product.js');
const Question = require('./models/Question.js');
const Answer = require('./models/Answer.js');
const Answer_Photo = require('./models/Answer_Photo.js');

const markQuestionHelpful = (question_id) => {
  // do stuff
  return Question.increment('question_helpfulness', {
    where: {question_id: question_id}
  });
};

module.exports.markQuestionHelpful = markQuestionHelpful;