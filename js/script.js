const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Adicionando digitos a tela da calculadora
  addDigit(digit) {

    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processar as operações da calculadora
  processOperation(operation) {
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }


    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "-":
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "/":
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "*":
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "DEL":
        this.processDelOperation();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "=":
        this.processEqualOperation();
        break;


      default:
        return;
    }
  }

  // Alterador valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = "";
    }
  }

  //Operações Matemáticas
  changeOperation(operation) {
    const mathOperations = ['*', '/', '+', '-']

    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Deleta Um Digito
  processDelOperation(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
  }

  // Limpa operação
  processClearCurrentOperation(){
    this.currentOperationText.innerText = ""
  }

  // Limpa todas as Operações 
  processClearOperation(){
    this.currentOperationText.innerText = "",
    this.previousOperationText.innerText = ""
  }

  // Processar a Operação
  processEqualOperation(){
    const operation = previousOperationText.innerText.split(" ")[1]

    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    +value >= 0 || value === "." ? calc.addDigit(value) : calc.processOperation(value);
  });
});