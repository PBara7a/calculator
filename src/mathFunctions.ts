import type { Operator } from "./types";

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

export function operate(operator: Operator, a: number, b: number): number {
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
