const calculatorKeys = document.querySelector("[data-js=calculator-keys]");
const calculatorDisplay = document.querySelector("[data-js=calculator-display]");

const calculatorSpecialOperators = {
  "=": () => {
    const operationResult = eval(buildOperation()).toString();

    clearOperation("all");
    putInfoInCalculatorOperation(operationResult);
    showInfoInCalculatorDisplay(operationResult);
    readTheResultOfOperation(operationResult);
  },
  "C": () => {
    clearOperation("all");
  },
  "CE": () => {
    clearOperation("lastInfo");
  }
};

let calculatorOperation = [];

const buildOperation = () => calculatorOperation.join("");

const putInfoInCalculatorOperation = info => {
  if(info === "x") {
    calculatorOperation.push("*");
  } else if(info === "÷") {
    calculatorOperation.push("/");
  } else {
    calculatorOperation.push(info);
  };
};

const showInfoInCalculatorDisplay = info => calculatorDisplay.textContent += info;

const clearOperation = allOrLastInfo => {
  calculatorDisplay.textContent = "";

  if(allOrLastInfo === "all"){
    calculatorOperation = [];
  } else if(allOrLastInfo === "lastInfo"){
    calculatorOperation.pop();
    
    showInfoInCalculatorDisplay(buildOperation());
  };
};

const startCalculator = key => {
  const checkIfKeyIsSpecialOperator = key === "=" || key === "C" || key === "CE";

  if(checkIfKeyIsSpecialOperator) {
    calculatorSpecialOperators[key]();
  } else{
    putInfoInCalculatorOperation(key);
    showInfoInCalculatorDisplay(key);
  }
};

calculatorKeys.addEventListener("click", e => {
  const key = e.target;
  const keyValue = e.target.textContent;

  if(key.getAttribute("data-js") === "key") startCalculator(keyValue);
});

const readTheResultOfOperation = result => {
  const body = document.body;
  const id = `speak ${Date.now}`;
  const template = `
  <div id="${id}" class="sr-only" aria-live="polite">
  </div>
  `;
  body.innerHTML += template;

  setTimeout(() => {
    document.getElementById(id).innerHTML = `Result is ${result}`;
  }, 100);

  setTimeout(() => {
      body.removeChild(document.getElementById(id));
  }, 1000);
}