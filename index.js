0// 1
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector( "[data-previous-operand]");
const currentOperandTextElement = document.querySelector( "[data-current-operand]");

// 2 How we store the operations

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // 3 the different methods and functionalities of our calculator

  clear() {
    // clears out our different varriables
    // 5 removes al of the values entered
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    // removing a single number
    this.currentOperand = this.currentOperand.slice(0,-1)
  }



  appendNumber(number) {
    //  11 We want the '.' to get added just once
    if (number === "." && this.currentOperand.includes(".")) return;
    // this is what happens when a number is clicked
    // 9 Updates the currentOperand Value and appends the number to the calc display
    // number would be converted to a string so that we can eassily append to it  using the +
    // also because javascript will try to add them as actual nubers e.g 1 + 1 = 2 instead of appending one at a time
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    //  when any operation is clicked
    // Move the information from the current operand to the previous opeeand and allows us to input a desired operation
    // if you must have seen that if you click an operation it actually goes through with computation... stop that with a check
    if (this.currentOperand === '') return
    // 16 another to note about the currentOperand is that if we have 2 values and we click and operation, 
    // it will do thecomputation and it also puts all of our operands values where they need to be. we need to have another check for that.
    if (this.previousOperand != '') {
      this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    // takes our values inside of the calculator and computes a single value for what is needed to be displayed on the calc

    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return

    switch(this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  updateDisplay() {
    // Updates the values in our output/screen
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

// 4 finding out the different properties needed by our calculator
// Knowing both previous and current element text and the desired user operation

// 7
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//  8 add an event listener to each button and append the innerText(number) on the button
// 8i Our display values will be constantly updated everytime we click a button

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// 13
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});


equalsButton.addEventListener("click", () => {
  calculator.compute()
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete()
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear()
  calculator.updateDisplay();
});

