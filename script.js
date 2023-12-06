let trailingResult = 0;
let operationOptions = ['divide', 'multiply', 'subtract', 'add'];
let workingOperation = "";

function updateDisplay(input) {
 let display = document.getElementById("display");
 let secondaryDisplay = document.getElementById("secondaryDisplay");

 if (display.innerHTML === "0" && operationOptions.indexOf(input) === -1) {
    if (input === "decimal") {
      display.innerHTML = "0.";
    } else if (input === "negative-value") {
      if (display.innerHTML.indexOf("-1") === -1) {
        display.innerHTML = "-" + display.innerHTML
      } else if (display.innerHTML.indexOf("-1" > -1)) {
        display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
      }
    } else {
      display.innerHTML = input;
    }
 } else if (operationOptions.indexOf(input) >= 0) {
     console.log("Dealing with a operation");

    if (trailingResult === display.innerHTML) {
      // Operand button pressed twice exeception
      workingOperation = input;
    } else if (workingOperation === "") {
      // Dealing without an operand
      workingOperation = input;
      trailingResult = display.innerHTML;
      secondaryDisplay.innerHTML = trailingResult;
      display.innerHTML = 0;
    } else {
      // Dealing with a set operand
       console.log(display.innerHTML, " Dealing with set operand");
      // Check if the previous input was also an operator
      let previousInput = display.innerHTML.slice(-1);
      if (operationOptions.indexOf(previousInput) >= 0) {
        // Replace the workingOperation with the new input and ignore the previous one
        workingOperation = input;
      } else {
        // Perform the calculation as usual
        trailingResult = calculate(trailingResult, display.innerHTML, workingOperation);
        secondaryDisplay.innerHTML = trailingResult;
        display.innerHTML = 0;
        workingOperation = input;
      }
    }
 } else if (input === "equals") {
    // Check if the display value has a "-" at the beginning
    if (display.innerHTML.startsWith("-")) {
      // Remove the "-" from the display value
      display.innerHTML = display.innerHTML.slice(1);
    }
    display.innerHTML = calculate(trailingResult, display.innerHTML, workingOperation);
    trailingResult = 0;
    workingOperation = "";
    secondaryDisplay.innerHTML = trailingResult;
 } else if (input === "decimal") {
     console.log('decimal clicked');
    if (display.innerHTML.indexOf(".") === -1) {
      display.innerHTML += ".";
    }
     console.log("decimal skipped because decimal already in number.");
 } else if (input === "negative-value") {
     console.log("negative-value selected");
    if (display.innerHTML.indexOf("-1") === -1) {
      display.innerHTML = "-" + display.innerHTML
    } else if (display.innerHTML.indexOf("-1" > -1)) {
      display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
    }
 } else {
    display.innerHTML += input;
 }
 // 5 - 2 = / 2 =
  console.log(trailingResult, "<= trailingResult", display.innerHTML, " <= display.innerHTML", workingOperation, " <= workingOperation");
}

function clearDisplay() {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");
  trailingResult = 0;
  display.innerHTML = 0;
  secondaryDisplay.innerHTML = trailingResult;
}

function calculate(firstNumber, secondNumber, operation) {
  let result;
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  // Check if the secondNumber has a "-" at the beginning
  if (secondNumber.toString().startsWith("-")) {
    // Multiply it by -1 to make it negative
    secondNumber = secondNumber * -1;
  }
  switch(operation) {
    case "add":
       console.log("add calculated")
      result = firstNumber + secondNumber;
      break;
    case "subtract":
       console.log("subtract calculated")
      result = firstNumber - secondNumber;
      break;
    case "multiply":
       console.log("multiply calculated")
      result = firstNumber * secondNumber;
      break;
    case "divide":
       console.log("divide calculated")
      result = firstNumber / secondNumber;
      break;
    default:
      console.log("Calculate switch statement missed something");
  }
  return result.toString();
}
