const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
}

function handleOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    
    currentInput = computation.toString();
    operation = null;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '±') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
            return;
        }
        handleOperator(button.textContent);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
});

// Initialize display
updateDisplay(); 