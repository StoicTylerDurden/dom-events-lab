/*-------------------------------- Constants --------------------------------*/
// Select all elements with the class 'button' and store them in a NodeList
const buttons = document.querySelectorAll('.button');
// Select the display element and store it
const display = document.querySelector('.display');

/*-------------------------------- Variables --------------------------------*/
// Variable to store the current operand being entered
let currentOperand = '';
// Variable to store the previous operand entered
let previousOperand = '';
// Variable to store the current operator selected
let operator = null;

/*----------------------------- Event Handlers -----------------------------*/
// Handle clicks on number buttons
const handleNumberClick = (event) => {
  const number = event.target.innerText;

  // If clicked '0' or nothing when currentOperand is empty, do nothing
  if (number === '0' && currentOperand === '') return;

  // Append the clicked number to the current operand
  currentOperand += number;
  // Update the display with the new current operand
  updateDisplay();
};

// Handle clicks on operator buttons
const handleOperatorClick = (event) => {
  const operation = event.target.innerText;

  // If no current operand, do nothing
  if (currentOperand === '') return;

  // If there's already a previous operand, compute the result first
  if (previousOperand !== '') {
    compute();
  }

  // Set the operator and move current operand to previous operand
  operator = operation;
  previousOperand = currentOperand;
  currentOperand = '';
  // Update the display
  updateDisplay();
};

// Handle clicks on the equals button
const handleEqualsClick = () => {
  // Compute the result of the operation
  compute();
  // Update the display with the result
  updateDisplay();
};

// Handle clicks on the clear button
const handleClearClick = () => {
  // Clear all operands and operator
  clear();
  // Update the display
  updateDisplay();
};

/*----------------------------- Event Listeners -----------------------------*/
// Add event listeners to buttons based on their classes or inner text
buttons.forEach((button) => {
  if (button.classList.contains('number')) {
    // Add event listener for number buttons
    button.addEventListener('click', handleNumberClick);
  } else if (button.classList.contains('operator')) {
    // Add event listener for operator buttons
    button.addEventListener('click', handleOperatorClick);
  } else if (button.classList.contains('equals')) {
    // Add event listener for the equals button
    button.addEventListener('click', handleEqualsClick);
  } else if (button.innerText === 'C') {
    // Add event listener for the clear button
    button.addEventListener('click', handleClearClick);
  }
});

/*-------------------------------- Functions --------------------------------*/
// Compute the result based on the operator and operands
function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // If either operand is not a number, return without doing anything
  if (isNaN(prev) || isNaN(current)) return;

  // Perform the appropriate calculation based on the operator
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }

  // Set the result as the new current operand
  currentOperand = computation;
  // Clear the operator and previous operand
  operator = null;
  previousOperand = '';
}

// Clear all operands and operator
function clear() {
  currentOperand = '';
  previousOperand = '';
  operator = null;
}

// Update the display with the current operand
function updateDisplay() {
  display.innerText = currentOperand;
}
