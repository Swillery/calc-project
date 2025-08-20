let current = '';
//listen for button presses
function press(value) {
    const operators = ['+', '-', 'x', '/'];

    if (
        operators.includes(value) &&
        operators.includes(current[current.length - 1])
    ) {
        return; // avoid duplicate operators
    }

    if (operators.includes(value)) {
        const result = splitExpression(current);
        if (result && result.left && result.right) {
            const answer = operate(result.left, result.operator, result.right);
            current = answer.toString(); // use result for next calc
        }
    }

    current += value;
    document.getElementById('display').value = current;
};

//split math problem at the operator
function splitExpression(expression) {
  const operators = ['+', '-', 'x', '/'];

  for (let i = 0; i < expression.length; i++) {
    if (operators.includes(expression[i])) {
      const left = expression.substring(0, i);
      const operator = expression[i];
      const right = expression.substring(i + 1);
      return { left, operator, right };
    }
  }

  return null;
}

//create math logic
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

function operate(num1, op, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case 'x': return multiply([a, b]);
        case '/': return divide(a, b);
        default: return "Invalid operator";
    }
}

function clearDisplay() {
    current = '';
    document.getElementById('display').value = '';
};

function calculate() {
    const result = splitExpression(current);
    if (result) {
        const answer = operate(result.left, result.operator, result.right);
        document.getElementById('display').value = answer;
        current = answer.toString();
    } else {
        console.log("No operator found in the expression");
    }
}