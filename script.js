// calculator functions
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operations = {
  "+": add,
  "-": subtract,
  x: multiply,
  "/": divide,
};

const operate = (operator, a, b) => operations[operator](a, b);
