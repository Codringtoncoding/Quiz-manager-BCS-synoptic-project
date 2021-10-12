var helpers = require("./helpers.js");

var quizId = 1;

var questions = [
  {
    id: 1,
    name: "Cities of the France",
    question: "what color is the sky?",
    quizid: 1,
  },
  {
    id: 2,
    name: "Cities of the France",
    question: "what color is the grass",
    quizid: 1,
  },
  {
    id: 3,
    name: "Cities of the France",
    question: "what color is the lava",
    quizid: 2,
  },
  {
    id: 4,
    name: "Cities of the France",
    question: "what is the capital of france? ",
    quizid: 1,
  },
];

var output = [
  {
    id: 1,
    name: "Cities of the France",
    question: "what color is the sky?",
    quizid: 1,
  },
  {
    id: 2,
    name: "Cities of the France",
    question: "what color is the grass",
    quizid: 1,
  },
  {
    id: 4,
    name: "Cities of the France",
    question: "what is the capital of france? ",
    quizid: 1,
  },
];

describe("groupQuestionsByQuizId function", () => {
  test("it should filter and match the quiz id of the questions together", () => {
    expect(helpers.groupQuestionsByQuizId(questions, quizId)).toEqual(output);
  });
});
