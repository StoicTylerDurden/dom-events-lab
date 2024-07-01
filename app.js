/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');

/*-------------------------------- Variables --------------------------------*/
let currentOperand = '';
let previousOperand = '';
let operator = null;

/*------------------------ Cached Element References ------------------------*/
let display = document.querySelector('.display');

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;

    if (event.target.classList.contains('number')) {
      // If the clicked is a number 
      appendNumber(value);
    } else if (event.target.classList.contains('operator')) {
      // If the clicked is a n operator
      chooseOperation(value);
    } else if (event.target.classList.contains('equals')) {
      // If clicked == "="
      calculate();

      // If clicked == 'C'
    } else if (value === 'C') {
      clear();
    }

    updateDisplay();
  });
});

/*-------------------------------- Functions --------------------------------*/
function appendNumber(number) {
  if (number === '0' && currentOperand === '') return;
  currentOperand += number;
}

function chooseOperation(operation) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  operator = operation;
  previousOperand = currentOperand;
  currentOperand = '';
}

function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

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

  currentOperand = computation;
  operator = null;
  previousOperand = '';
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  operator = null;
}

function updateDisplay() {
  display.innerText += currentOperand;
}
