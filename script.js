const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (a, b, operator) => {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
};

let storedInput = "";
let input_a = "";
let operator = "";
let input_b = "";
let clearDisplay = false;
let decimal = false;
let runEqual = false;

const display = document.querySelector(".display");

const displayNumber = (id) => {
  // Case: After operator has been set
  if (operator !== "" && !clearDisplay) {
    clearDisplay = true;
    display.textContent = "";
    storedInput += id;
    display.textContent += id;
    // To toggle operator highlighting
    operatorButton.forEach((btn) => {
      if (btn.classList.contains("selected")) {
        btn.classList.toggle("selected");
      }
    });
  }
  // Case: After equal button pressed
  else if (runEqual) {
    display.textContent = "";
    storedInput += id;
    display.textContent += id;
    input_a = "";
    runEqual = false;
  }
  // Case: No number input
  else {
    storedInput += id;
    display.textContent += id;
  }
};

const updateOperator = (className) => {
  // Acting as equal button
  if (operator !== "") {
    input_b = parseFloat(storedInput);
    display.textContent = operate(input_a, input_b, operator);
    input_a = operate(input_a, input_b, operator);
    clearDisplay = false;
  }

  // First time pressing operator button
  if (input_a === "") {
    input_a = parseFloat(storedInput);
  }

  operator = className; // Set operator
  storedInput = "";
};

const equal = () => {
  if (storedInput !== "") {
    input_b = parseFloat(storedInput);
    display.textContent = operate(input_a, input_b, operator);
    input_a = operate(input_a, input_b, operator);
    input_b = "";
    operator = "";
    storedInput = "";
    clearDisplay = false;
    runEqual = true;
  }
};

const clear = () => {
  display.textContent = "";
  input_a = "";
  input_b = "";
  operator = "";
  storedInput = "";
  clearDisplay = false;
  decimal = false;
  runEqual = false;
  operatorButton.forEach((btn) => {
    if (btn.classList.contains("selected")) {
      btn.classList.toggle("selected");
    }
  });
};

const displayDecimal = () => {
  if (!decimal) {
    storedInput += `.`;
    display.textContent += `.`;
    decimal = true;
  }
};

const numberButton = document.querySelectorAll(".number");

numberButton.forEach((btn) => {
  btn.addEventListener("click", () => displayNumber(btn.id));
});

const operatorButton = document.querySelectorAll("button[data-class]");
console.log(operatorButton);

operatorButton.forEach((btn) => {
  btn.addEventListener("click", () =>
    updateOperator(btn.getAttribute("data-class"))
  );

  btn.addEventListener("click", () => btn.classList.toggle("selected"));
});

const equalButton = document.querySelector("#equal");

equalButton.addEventListener("click", () => equal());

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => clear());

const negateButton = document.querySelector("#negate");

negateButton.addEventListener("click", () => {
  storedInput *= -1;
  display.textContent *= -1;
});

const percentageButton = document.querySelector("#percentage");

percentageButton.addEventListener("click", () => {
  storedInput /= 100;
  display.textContent /= 100;
});

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", () => displayDecimal());

document.addEventListener("keydown", (e) => {
  e.key === "1" && displayNumber(1);
  e.key === "2" && displayNumber(2);
  e.key === "3" && displayNumber(3);
  e.key === "4" && displayNumber(4);
  e.key === "5" && displayNumber(5);
  e.key === "6" && displayNumber(6);
  e.key === "7" && displayNumber(7);
  e.key === "8" && displayNumber(8);
  e.key === "9" && displayNumber(9);
  e.key === "0" && displayNumber(0);
  e.key === "+" && updateOperator("add");
  e.key === "-" && updateOperator("subtract");
  e.key === "*" && updateOperator("multiply");
  e.code === "NumpadDivide" && updateOperator("divide");
  e.code === "Slash" && updateOperator("divide");
  e.key === "." && displayDecimal();
  e.key === "Enter" && equal();
  e.key === "Backspace" && clear();
});
