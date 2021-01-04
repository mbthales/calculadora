const calculatorKeys = document.querySelector("[data-js=calculator-keys]");
const calculatorDisplay = document.querySelector("[data-js=calculator-display]");

let calculatorOperation = [];

const putInfoInCalculatorOperation = info => calculatorOperation.push(info);

const calculatorDisplayInfo = info => calculatorDisplay.textContent += info;

const clearCalculatorDisplay = () => calculatorDisplay.textContent = "";

const deleteLastInfoInOperation = () => {
  calculatorOperation.pop();

  const operation = calculatorOperation.join("");
  
  clearCalculatorDisplay();
  calculatorDisplayInfo(operation);
}

const startCalculator = key => {
  if(key === "="){
    const operation = calculatorOperation.join("");
    const result = eval(operation);

    calculatorOperation = [];

    clearCalculatorDisplay();
    calculatorDisplayInfo(result);
    putInfoInCalculatorOperation(result);
  } else if(key === "C"){
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
  }
};

calculatorKeys.addEventListener("click", e => {
  const key = e.target.textContent;

  startCalculator(key);
});