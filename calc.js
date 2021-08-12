/* DOM manipulation */

function elementBuilder(element, classLabel, parentName) {
    let item = document.createElement(element);
    item.classList.add(classLabel);
    parentName.appendChild(item);
    return item;
}

/* Calculation functions */

const calc = (() => {
    const add = (x, y) => x + y;
    const mult = (x, y) => x * y;
    const sub = (x, y) => x - y;
    const div = (x, y) => x / y;
    const exp = (x, y) => x ** y;
    return { add, mult, sub, div, exp }
})();

/* Calc Elements */
const elements = (() => {
    const body = document.querySelector('body');
    const calcDivBkg = elementBuilder('div', 'calc-bkg', body);
    const calcDiv = elementBuilder('div', 'calc-div', body);
    const displayDiv = elementBuilder('div', 'display-div', calcDiv)
    const calcDisplay = elementBuilder('div', 'calc-display', displayDiv);
    const calcDisplayBkg = elementBuilder('div', 'display-bkg', displayDiv);
    const buttonDiv = elementBuilder('div', 'button-div', calcDiv);
    return { body, calcDiv, calcDisplay, buttonDiv }
})();

/* Button Elements */

const numButtons = (() => {
    let numElementArray = []
    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'button', elements.buttonDiv);
        newButton.classList.add(`number`);
        newButton.setAttribute('id', `${i}`);
        newButton.textContent = `${i}`;
        numElementArray.push(newButton);
    };
    
    return numElementArray
})();

const calcButtons = (() => {
    const calcArray = ['+', '-', 'x', '/', '^', `=`];
    let calcElementArray = [];
    for (i = 0; i < calcArray.length; i++) {
        let newButton = elementBuilder('button', 'button', elements.buttonDiv);
        newButton.classList.add(`calc`);
        newButton.setAttribute('id', `${calcArray[i]}`);
        newButton.textContent = `${calcArray[i]}`;
        calcElementArray.push(newButton);
    };
    return calcElementArray
})();

let display = [];
let opArray = [];

const newDisplay = (displayArray, displayElement) => {
    let newNumber = displayArray[0]
    displayElement.textContent = newNumber

    for (x = 1; x < displayArray.length; x++) {
        let numComponent = displayArray[x];
        newNumber = String(newNumber) + String(numComponent);
    };

    displayElement.textContent = newNumber;
    return parseInt(newNumber);
}

const getNum = (displayArray, displayElement) => {
    let num = newDisplay(displayArray, displayElement);
    return num  
}

const numGetter = (displayArray, numButtonnId, displayElement) => {
    let number = parseInt(numButtonnId);
    displayArray.push(number);
    num = getNum(displayArray, displayElement);
    return num
}

const numberEvent = (displayArray, operationArray, calculationButtons, displayElement) => {
    if (!(displayArray.length > 0)) {
        displayArray.push(0);
        newDisplay(displayArray, elements.calcDisplay);
        for (i = 0; i < numButtons.length; i++) {
            let numButton = numButtons[i];
            numButton.addEventListener('click', function newNum() {
                if (displayArray[0] === 0) {
                    displayArray.splice(0, 1);
                    let numOne = numGetter(displayArray, numButton.id, displayElement);
                    let newDisplayArray = getOperator(display, operationArray, calculationButtons, elements.calcDisplay);
                    console.log(newDisplayArray)
                    if (!(newDisplayArray.length > 0)) {
                        let numTwo = numGetter(newDisplayArray, numButton.id, displayElement);

                    }
                } else {
                    let numOne = numGetter(displayArray, numButton.id, displayElement);
                    let newDisplayArray = getOperator(display, operationArray, calculationButtons, elements.calcDisplay);
                    console.log(newDisplayArray)
                    if (!(newDisplayArray.length > 0)) {
                        let numTwo = numGetter(newDisplayArray, numButton.id, displayElement);

                    }
                }
            });
        }
    } else {
        for (i = 0; i < numButtons.length; i++) {
            let numButton = numButtons[i];
            numButton.addEventListener('click', function newNum() {
                let numOne = numGetter(displayArray, numButton.id, displayElement);
                let newDisplayArray = getOperator(displayArray, operationArray, calculationButtons, displayElement);
                console.log(newDisplayArray)
                if (!(newDisplayArray.length > 0)) {
                    let numTwo = numGetter(newDisplayArray, numButton.id, displayElement);

                }

            });
        }
    }
}

const getOperator = (displayArray, operationArray, calculationButtons, displayElement) => {
    for (y = 0; y < calculationButtons.length -1; y++) {
        let operatorElement = calculationButtons[y];
        let operator = operatorElement.id;
        operatorElement.addEventListener('click', function getOperator() {
            displayElement.textContent = operator;
            operationArray.push(operator);
            displayArray = []
            return displayArray
        });
    }
}

const operationMatcher = (calculator, operator, numOne, numTwo) => {
    let resultArray = [];
    if (operator === `+`) {
        let newOperation = calculator.add(numOne, numTwo);
        resultArray.push(newOperation);
        let result = newDisplay(resultArray);
        return result
    };

    if (operator === `x`) {
        let newOperation = calculator.mult(numOne, numTwo);
        resultArray.push(newOperation);
        let result = newDisplay(resultArray);
        return result
    };

    if (operator === `-`) {
        let newOperation = calculator.sub(numOne, numTwo);
        resultArray.push(newOperation);
        let result = newDisplay(resultArray);
        return result
    };

    if (operator === `/`) {
        let newOperation = calculator.div(numOne, numTwo);
        resultArray.push(newOperation);
        let result = newDisplay(resultArray);
        return result
    };

    if (operator === `^`) {
        let newOperation = calculator.exp(numOne, numTwo);
        resultArray.push(newOperation);
        let result = newDisplay(resultArray);
        return result
    };
}

const operation = (calculator, operationArray, displayElement) => {
    let displayArray = [];
    numberEvent(displayArray, calcDisplay);
    let equals = document.getElementById("=");
    equals.addEventListener('click', function getOperator() {
        displayElement.textContent = "=";
        if (operationArray.length == 3) {
            let numOne = operationArray[0];
            let operator = operationArray[1];
            let numTwo = operationArray[2];
            let result = operationMatcher(calculator, operator, numOne, numTwo);
            return result
        }
    });
}

numberEvent(display, opArray, calcButtons, elements.calcDisplay);

//operation(calc, opArray, calcDisplay);


