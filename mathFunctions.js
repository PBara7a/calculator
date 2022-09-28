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
export function operate(operator, a, b) {
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
        case "/":
            result = divide(a, b);
            break;
        default:
            const _exhaustiveCheck = operator;
            result = _exhaustiveCheck;
    }
    return result;
}
