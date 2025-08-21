//clear button support
function clearDisplay() {
    current = '';
    document.getElementById('display').value = '';
};

//backspace button support
function backspace() {
    current = current.slice(0, -1);
    document.getElementById('display').value = current;
};

//rounds out long decimals
function roundResult(value) {
    if (typeof value === 'number') {
        return parseFloat(value.toFixed(6));
    };
    return value;
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

let current = '';
//listen for button presses
function press(value) {
     //prevent back to back operators
    const operators = ['+', '-', 'x', '/'];
    if (
        operators.includes(value) &&
        operators.includes(current[current.length - 1])
    ) {
        return;
    };

    //prevent multiple decimals
    if (value === '.') {
        const lastOperatorIndex = Math.max(
            current.lastIndexOf('+'),
            current.lastIndexOf('-'),
            current.lastIndexOf('x'),
            current.lastIndexOf('/')
        );
        const lastNumber = current.slice(lastOperatorIndex + 1);
        if (lastNumber.includes('.')) return;
    };

     //chaining equations
    if (operators.includes(value)) {
        const result = splitExpression(current);
        if (result && result.left && result.right) {
            const answer = roundResult(operate(result.left, result.operator, result.right));
            current = answer.toString();
        }
    };

    current += value;
    document.getElementById('display').value = current;
};

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

function calculate() {
    const result = splitExpression(current);
    if (result) {
        const answer = roundResult(operate(result.left, result.operator, result.right));
        document.getElementById('display').value = answer;
        current = answer.toString();
    } else {
        console.log("No operator found in the expression");
    }
}

//keyboard support
document.addEventListener('keydown', function(e) {
    const key = e.key;
    e.preventDefault();//prevent double entry into input

    if (!isNaN(key)) {
        press(key); // Numbers 0–9
    } else if (['+', '-', '*', '/'].includes(key)) {
        press(key === '*' ? 'x' : key); // Normalize * to x
    } else if (key === '.') {
        press('.');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});