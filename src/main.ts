function calculator() {
  const keysEl = <HTMLElement>(
    document.querySelector("[data-js=calculator-keys]")
  );
  const displayEl = <HTMLElement>(
    document.querySelector("[data-js=calculator-display]")
  );

  let operation: string[] = [];

  function start(key: string) {
    const keyIsSpecialOperator = key === "=" || key === "C" || key === "CE";

    if (keyIsSpecialOperator) {
      handleSpecialOperators()[key]();
    } else {
      newOperation(key);
      displayOperation(key);
      console.log(operation);
    }
  }

  function handleSpecialOperators() {
    return {
      "=": () => {
        const op = operation.join("");
        const operationResult = eval(op).toString();

        clearOperation("all");
        newOperation(operationResult);
        displayOperation(operationResult);
        readResult(operationResult);
      },
      C: () => {
        clearOperation("all");
      },
      CE: () => {
        clearOperation("lastInfo");
      },
    };
  }

  function newOperation(op: string) {
    if (op === "x") {
      operation.push("*");
    } else if (op === "÷") {
      operation.push("/");
    } else {
      operation.push(op);
    }
  }

  function clearOperation(allOrLastOp: string) {
    displayEl.textContent = "";

    if (allOrLastOp === "all") {
      operation = [];
    } else if (allOrLastOp === "lastInfo") {
      operation.pop();

      const operationWithoutLastInput = operation
        .map((op) => {
          if (op === "*") {
            return "x";
          } else if (op === "/") {
            return "÷";
          } else return op;
        })
        .join("");

      displayOperation(operationWithoutLastInput);
    }
  }

  function displayOperation(op: string) {
    displayEl.textContent += op;
  }

  function readResult(result: string) {
    const screenReaderEl = <HTMLElement>(
      document.querySelector("[data-js=screen-read-only]")
    );

    setTimeout(() => {
      screenReaderEl.textContent = `Result is ${result}`;
    }, 100);

    setTimeout(() => {
      screenReaderEl.textContent = "";
    }, 1000);
  }

  keysEl.addEventListener("click", (e) => {
    const keyEl = <HTMLElement>e.target;
    const key = <string>keyEl.textContent;

    if (keyEl.getAttribute("data-js") === "key") start(key.trim());
  });
}

calculator();
