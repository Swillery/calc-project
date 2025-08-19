const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(array) {
  return array.reduce((acc, curr) => acc * curr, 1);
};


const divide = function(a, b) {
    if (b === 0) {
    return "Cannot divide by zero.";
  } return a / b;
};

let A = 0;

let B = null;

let operator = null;

const operate = function(op, num1, num2) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply([num1, num2]);
        case '/':
            return divide(num1, num2);
        default:
            return "Invalid operator";
    };
};