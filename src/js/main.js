const calculatorKeys = document.querySelector("[data-js=calculator-keys]");
const calculatorDisplay = document.querySelector("[data-js=calculator-display]");

let calculatorOperation = [];

const startCalculator = key => {
  if(key === "="){
    const operation = calculatorOperation.join("");
    const result = eval(operation);
    calculatorDisplay.textContent = "";
    calculatorDisplay.textContent = result;
    calculatorOperation = [result];
  } else if(key === "C"){
    calculatorOperation = [];
    calculatorDisplay.textContent = "";
  } else if(key === "CE"){
    calculatorOperation.pop();
    calculatorDisplay.textContent = "";
    calculatorDisplay.textContent = calculatorOperation.join("");  
  } else if(key === "x"){
    calculatorOperation.push("*");
  } else if(key === "÷"){
    calculatorOperation.push("/");
  } else{
    calculatorOperation.push(key);
    calculatorDisplay.textContent += key;
  }
};

calculatorKeys.addEventListener("click", e => {
  const key = e.target.textContent;

  startCalculator(key);
});
