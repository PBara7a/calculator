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
let currentOnDisplay;
let firstOperand;
let currentOperation;
let needReset = false;
if (footer instanceof HTMLElement) {
    footer.textContent += ` ${new Date().getFullYear()}`;
}
if (mainScreen instanceof HTMLElement) {
    currentOnDisplay = mainScreen.textContent || "";
}
// Calculator functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (operator, a, b) => {
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
};
const appendOnDisplay = (value) => {
    if (!(mainScreen instanceof HTMLElement))
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
};
const setOperation = (operation) => {
    if (firstOperand) {
        firstOperand = operate(currentOperation, firstOperand, Number(currentOnDisplay));
    }
    else {
        firstOperand = Number(currentOnDisplay);
    }
    currentOperation = operation;
    needReset = true;
    updateTopScreen();
};
const updateTopScreen = () => {
    if (!(topScreen instanceof HTMLElement))
        return;
    topScreen.textContent = `${firstOperand} ${currentOperation}`;
};
const resetMainScreen = () => {
    if (!(mainScreen instanceof HTMLElement))
        return;
    mainScreen.textContent = "0";
    currentOnDisplay = "0";
};
const allClear = () => {
    if (!(topScreen instanceof HTMLElement))
        return;
    resetMainScreen();
    topScreen.textContent = "";
    firstOperand = null;
    currentOperation = "";
};
const handleEquals = () => {
    if (!firstOperand)
        return;
    const result = operate(currentOperation, firstOperand, Number(currentOnDisplay));
    allClear();
    appendOnDisplay(String(result));
    needReset = true;
};
const handlePlusEquals = () => {
    needReset = true;
    const currentNumber = Number(currentOnDisplay);
    const newNumStr = currentNumber > 0 ? `-${currentNumber}` : currentOnDisplay.slice(1);
    appendOnDisplay(newNumStr);
};
const handlePercentage = () => {
    needReset = true;
    const currentNumber = Number(currentOnDisplay);
    const newNum = operate("/", currentNumber, 100);
    appendOnDisplay(String(newNum));
};
const appendDecimalPoint = () => {
    if (currentOnDisplay.includes("."))
        return;
    appendOnDisplay(".");
};
// Setup events
numBtns.forEach((btn) => {
    if (!(btn instanceof HTMLElement))
        return;
    btn.onclick = () => appendOnDisplay(btn.textContent || "");
});
operationBtns.forEach((btn) => {
    if (!(btn instanceof HTMLElement))
        return;
    btn.onclick = () => setOperation(btn.textContent || "");
});
if (allClearBtn instanceof HTMLElement) {
    allClearBtn.onclick = allClear;
}
if (equalsBtn instanceof HTMLElement) {
    equalsBtn.onclick = handleEquals;
}
if (plusMinusBtn instanceof HTMLElement) {
    plusMinusBtn.onclick = handlePlusEquals;
}
if (percentageBtn instanceof HTMLElement) {
    percentageBtn.onclick = handlePercentage;
}
if (decimalBtn instanceof HTMLElement) {
    decimalBtn.onclick = appendDecimalPoint;
}
