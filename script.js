const mainScreen = document.querySelector("#screen-bottom");
const topScreen = document.querySelector("#screen-top");
const numBtns = document.querySelectorAll(".num");
const allClearBtn = document.querySelector("#ac");
const operationBtns = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector("#equals");
const plusMinusBtn = document.querySelector("#plus-minus");
const percentageBtn = document.querySelector("#percentage");

// Calculator functions
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

let currentOnDisplay = mainScreen.textContent;
let firstOperand;
let currentOperation;
let needReset = false;

const appendOnDisplay = (num) => {
  if (needReset) {
    resetMainScreen();
  }

  if (currentOnDisplay === "0") {
    mainScreen.textContent = num;
  } else if (currentOnDisplay.length < 14) {
    // screen max -> 14 chars
    mainScreen.textContent += num;
  }
  currentOnDisplay = mainScreen.textContent;
  needReset = false;
};

const setOperation = (operation) => {
  if (firstOperand) {
    firstOperand = operate(
      currentOperation,
      firstOperand,
      Number(currentOnDisplay)
    );
  } else {
    firstOperand = Number(currentOnDisplay);
  }
  currentOperation = operation;
  needReset = true;

  updateTopScreen();
};

const updateTopScreen = () => {
  topScreen.textContent = `${firstOperand} ${currentOperation}`;
};

const resetMainScreen = () => {
  mainScreen.textContent = "0";
  currentOnDisplay = "0";
};

const allClear = () => {
  resetMainScreen();
  topScreen.textContent = "";
  firstOperand = "";
  currentOperation = "";
};

const handleEquals = () => {
  const result = operate(
    currentOperation,
    firstOperand,
    Number(currentOnDisplay)
  );

  allClear();

  appendOnDisplay(result);
  needReset = true;
};

const handlePlusEquals = () => {
  needReset = true;
  const currentNumber = Number(currentOnDisplay);
  const newNum =
    currentNumber > 0 ? `-${currentNumber}` : currentOnDisplay.slice(1);

  appendOnDisplay(newNum);
};

const handlePercentage = () => {
  needReset = true;
  const currentNumber = Number(currentOnDisplay);
  const newNum = operate("/", currentNumber, 100);

  appendOnDisplay(newNum);
};

// Setup events
numBtns.forEach((btn) => {
  btn.onclick = () => appendOnDisplay(btn.textContent);
});

operationBtns.forEach((btn) => {
  btn.onclick = () => setOperation(btn.textContent);
});

allClearBtn.onclick = allClear;

equalsBtn.onclick = handleEquals;

plusMinusBtn.onclick = handlePlusEquals;

percentageBtn.onclick = handlePercentage;
