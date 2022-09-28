const mainScreen = document.querySelector("#screen-bottom");
const topScreen = document.querySelector("#screen-top");
const numBtns = document.querySelectorAll(".num");
const allClearBtn = document.querySelector("#ac");
const operationBtns = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector("#equals");
const plusMinusBtn = document.querySelector("#plus-minus");
const percentageBtn = document.querySelector("#percentage");
const decimalBtn = document.querySelector("#decimal");
const footer = document.querySelector("footer");

if (footer) footer.textContent += ` ${new Date().getFullYear()}`;

// Setup event listeners
if (allClearBtn) allClearBtn.addEventListener("click", handleallClear);
if (equalsBtn) equalsBtn.addEventListener("click", handleEquals);
if (plusMinusBtn) plusMinusBtn.addEventListener("click", handlePlusEquals);
if (percentageBtn) percentageBtn.addEventListener("click", handlePercentage);
if (decimalBtn) decimalBtn.addEventListener("click", handleDecimalPoint);

numBtns.forEach((btn): void => {
  if (!btn) return;

  btn.addEventListener("click", () => appendOnDisplay(btn.textContent || ""));
});

operationBtns.forEach((btn): void => {
  if (!btn) return;

  btn.addEventListener("click", () => setOperation(btn.textContent || ""));
});

// State
let currentOnDisplay: string;
let firstOperand: number | null;
let currentOperation: string;
let needReset = false;

if (mainScreen) {
  currentOnDisplay = mainScreen.textContent || "";
}

// Math operations
type Operator = "+" | "-" | "x" | "/";

function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  return a / b;
}

function operate(operator: Operator, a: number, b: number): number {
  let result: number;

  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "x":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      const _exhaustiveCheck: never = operator;
      result = _exhaustiveCheck;
  }
  return result;
}

// Calculator functionality
function appendOnDisplay(value: string): void {
  if (!mainScreen) return;

  if (needReset) resetMainScreen();

  if (currentOnDisplay === "0") {
    mainScreen.textContent = value;
  } else if (currentOnDisplay.length < 14) {
    // screen max -> 14 chars
    mainScreen.textContent += value;
  }
  currentOnDisplay = mainScreen.textContent || "";

  needReset = false;
}

function setOperation(operation: string): void {
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
}

function updateTopScreen(): void {
  if (!topScreen) return;

  topScreen.textContent = `${firstOperand} ${currentOperation}`;
}

function resetMainScreen(): void {
  if (!mainScreen) return;

  mainScreen.textContent = "0";
  currentOnDisplay = "0";
}

function handleallClear(): void {
  if (!topScreen) return;

  resetMainScreen();

  topScreen.textContent = "";
  firstOperand = null;
  currentOperation = "";
}

function handleEquals(): void {
  if (!firstOperand) return;

  const result = operate(
    currentOperation,
    firstOperand,
    Number(currentOnDisplay)
  );

  handleallClear();

  appendOnDisplay(String(result));
  needReset = true;
}

function handlePlusEquals(): void {
  needReset = true;
  const currentNumber = Number(currentOnDisplay);
  const newNumStr =
    currentNumber > 0 ? `-${currentNumber}` : currentOnDisplay.slice(1);

  appendOnDisplay(newNumStr);
}

function handlePercentage(): void {
  needReset = true;
  const currentNumber = Number(currentOnDisplay);
  const newNum = operate("/", currentNumber, 100);

  appendOnDisplay(String(newNum));
}

function handleDecimalPoint(): void {
  if (currentOnDisplay.includes(".")) return;

  appendOnDisplay(".");
}
