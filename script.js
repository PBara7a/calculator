"use strict";
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
if (footer)
    footer.textContent += ` ${new Date().getFullYear()}`;
// Setup event listeners
if (allClearBtn)
    allClearBtn.addEventListener("click", handleallClear);
if (equalsBtn)
    equalsBtn.addEventListener("click", handleEquals);
if (plusMinusBtn)
    plusMinusBtn.addEventListener("click", handlePlusEquals);
if (percentageBtn)
    percentageBtn.addEventListener("click", handlePercentage);
if (decimalBtn)
    decimalBtn.addEventListener("click", handleDecimalPoint);
numBtns.forEach((btn) => {
    if (!btn)
        return;
    btn.addEventListener("click", () => appendOnDisplay(btn.textContent || ""));
});
operationBtns.forEach((btn) => {
    if (!btn)
        return;
    btn.addEventListener("click", () => setOperation(btn.textContent || ""));
});
// State
let currentOnDisplay;
let firstOperand;
let currentOperation;
let needReset = false;
if (mainScreen) {
    currentOnDisplay = mainScreen.textContent || "";
}
// Math operations
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(operator, a, b) {
    let result;
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
        default:
            result = divide(a, b);
    }
    return result;
}
// Calculator functionality
function appendOnDisplay(value) {
    if (!mainScreen)
        return;
    if (needReset)
        resetMainScreen();
    if (currentOnDisplay === "0") {
        mainScreen.textContent = value;
    }
    else if (currentOnDisplay.length < 14) {
        // screen max -> 14 chars
        mainScreen.textContent += value;
    }
    currentOnDisplay = mainScreen.textContent || "";
    needReset = false;
}
function setOperation(operation) {
    if (firstOperand) {
        firstOperand = operate(currentOperation, firstOperand, Number(currentOnDisplay));
    }
    else {
        firstOperand = Number(currentOnDisplay);
    }
    currentOperation = operation;
    needReset = true;
    updateTopScreen();
}
function updateTopScreen() {
    if (!topScreen)
        return;
    topScreen.textContent = `${firstOperand} ${currentOperation}`;
}
function resetMainScreen() {
    if (!mainScreen)
        return;
    mainScreen.textContent = "0";
    currentOnDisplay = "0";
}
function handleallClear() {
    if (!topScreen)
        return;
    resetMainScreen();
    topScreen.textContent = "";
    firstOperand = null;
    currentOperation = "";
}
function handleEquals() {
    if (!firstOperand)
        return;
    const result = operate(currentOperation, firstOperand, Number(currentOnDisplay));
    handleallClear();
    appendOnDisplay(String(result));
    needReset = true;
}
function handlePlusEquals() {
    needReset = true;
    const currentNumber = Number(currentOnDisplay);
    const newNumStr = currentNumber > 0 ? `-${currentNumber}` : currentOnDisplay.slice(1);
    appendOnDisplay(newNumStr);
}
function handlePercentage() {
    needReset = true;
    const currentNumber = Number(currentOnDisplay);
    const newNum = operate("/", currentNumber, 100);
    appendOnDisplay(String(newNum));
}
function handleDecimalPoint() {
    if (currentOnDisplay.includes("."))
        return;
    appendOnDisplay(".");
}
