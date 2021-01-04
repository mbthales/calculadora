const calculatorKeys = document.querySelector("[data-js=calculator-keys]");
const calculatorDisplay = document.querySelector("[data-js=calculator-display]");

let calculatorOperation = [];

const createCalculatorOperation = () => calculatorOperation.join("");

const clearCalculatorOperation = () => calculatorOperation = [];

const clearCalculatorDisplay = () => calculatorDisplay.textContent = "";

const calculatorDisplayInfo = info => calculatorDisplay.textContent += info;

const putInfoInCalculatorOperation = info => calculatorOperation.push(info);

const deleteLastInfoInOperation = () => {
  calculatorOperation.pop();

  const operation = createCalculatorOperation();
  
  clearCalculatorDisplay();
  calculatorDisplayInfo(operation);
};

const startCalculator = key => {
  if(key === "="){
    const operation = createCalculatorOperation();
    const result = eval(operation).toString();

    clearCalculatorOperation();
    clearCalculatorDisplay();
    calculatorDisplayInfo(result);
    putInfoInCalculatorOperation(result);
  } else if(key === "C"){
    clearCalculatorOperation();
    clearCalculatorDisplay();
  } else if(key === "CE"){
    deleteLastInfoInOperation();
  } else if(key === "x"){
    putInfoInCalculatorOperation("*");
    calculatorDisplayInfo("x");
  } else if(key === "÷"){
    putInfoInCalculatorOperation("/");
    calculatorDisplayInfo("÷");
  } else{
    putInfoInCalculatorOperation(key);
    calculatorDisplayInfo(key);
  };
};

calculatorKeys.addEventListener("click", e => {
  const key = e.target.textContent;

  startCalculator(key);
});