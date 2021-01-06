const calculatorKeys = document.querySelector("[data-js=calculator-keys]");
const calculatorDisplay = document.querySelector("[data-js=calculator-display]");

let calculatorOperation = [];

const startCalculator = key => {
  const checkIfKeyIsSpecialOperator = key === "=" || key === "C" || key === "CE";

  if(checkIfKeyIsSpecialOperator) {
    calculatorSpecialOperators[key]();
  } else{
    putInfoInCalculatorOperation(key);
    showInfoInCalculatorDisplay(key);
  }
};

const calculatorSpecialOperators = {
  "=": () => {
    const operation = calculatorOperation.join("");
    const operationResult = eval(operation).toString();

    clearOperation("all");
    putInfoInCalculatorOperation(operationResult);
    showInfoInCalculatorDisplay(operationResult);
    readTheOperationResult(operationResult);
  },
  "C": () => {
    clearOperation("all");
  },
  "CE": () => {
    clearOperation("lastInfo");
  }
};

const clearOperation = allOrLastInfo => {
  calculatorDisplay.textContent = "";

  if(allOrLastInfo === "all"){
    calculatorOperation = [];
  } else if(allOrLastInfo === "lastInfo"){
    calculatorOperation.pop();

    const operationWithLastInputRemoved = calculatorOperation.map(operator => {
      if(operator === "*"){
        return "x"
      } else if(operator === "/"){
        return "÷"
      } else return operator
    }).join("")
    
    showInfoInCalculatorDisplay(operationWithLastInputRemoved);
  };
};

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

const readTheOperationResult = result => {
  const container = document.querySelector("[data-js=screen-read-only]");
  
  setTimeout(() => {
    container.textContent = `Result is ${result}`;
  }, 100);
  
  setTimeout(() => {
    container.textContent = "";
  }, 1000);
};

calculatorKeys.addEventListener("click", e => {
  const key = e.target;
  const keyValue = e.target.textContent;

  if(key.getAttribute("data-js") === "key") startCalculator(keyValue);
});