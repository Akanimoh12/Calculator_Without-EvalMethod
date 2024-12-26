let display = document.querySelector("#display");
let btnNumbs = document.querySelectorAll(".numb");
let ac = document.querySelector(".operator");
let de = document.querySelector(".de");
let evaluateButton = document.querySelector("#evaluate");

// This is for my tracking of Operands and Operators
let currentOperand = '';
let operator = null;
let previousOperand = '';

// This function displays my values buttons when they are clicked
btnNumbs.forEach((button) => {
  button.addEventListener("click", () => {
    let newBtnNumbs = button.defaultValue;
    display.value += newBtnNumbs; 
  });
});

// This my function Clears everything in my input field 
ac.addEventListener("click", () => {
  display.value = ""; // Clear the display
  // currentOperand = '';
  // previousOperand = '';
  // operator = null;
});

// Delete last character of my expression by One
de.addEventListener("click", () => {
  display.value = display.value.slice(0, -1); // Remove last character
});

// Evaluate the expression when '=' button is clicked
evaluateButton.addEventListener("click", () => {
  let inputExpression = display.value;

  // This my code Parse the input expression and calculate the result manually
  try {
    let result = manualEvaluate(inputExpression);
    display.value = result; 
  } catch (error) {
    display.value = "Error"; 
  }
});


// Function to evaluate the mathematical expression manually
function manualEvaluate(expression) {
  let numbers = [];
  let operations = [];
  let currentNumber = '';

  // Parse the expression into numbers and operators
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];

    if (isDigit(char) || char === '.') {
      currentNumber += char; // Build the current number
    } else if (isOperator(char)) {
      if (currentNumber === '') throw "Invalid Expression";
      numbers.push(parseFloat(currentNumber)); // Push the current number
      operations.push(char); // Push the operator
      currentNumber = ''; // Reset current number
    } else {
      throw "Invalid Character";
    }
  }

  if (currentNumber !== '') {
    numbers.push(parseFloat(currentNumber)); // Push the last number
  }

  if (numbers.length - 1 !== operations.length) throw "Invalid Expression";

  // Perform calculations based on operators
  while (operations.length > 0) {
    let num1 = numbers.shift();
    let num2 = numbers.shift();
    let op = operations.shift();

    let result = performOperation(num1, num2, op);
    numbers.unshift(result); // Push the result back into the array
  }

  return numbers[0];
}

// Helper function to perform basic operations
function performOperation(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) throw "Division by Zero";
      return a / b;
    default:
      throw "Invalid Operator";
  }
}

// This function is to check if a character is a digit
function isDigit(char) {
  return char >= '0' && char <= '9';
}

// Helper function to check if a character is an operator
function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}
