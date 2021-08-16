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

const clearDisplay = () => {
    let display = document.getElementsByClassName("calc-display")[0];
    display.textContent = 0;
}

const numberEvent = (displayArray, calculationButtons, displayElement) => {
    if (!(displayArray.length > 0)) {
        displayArray.push(0);
        newDisplay(displayArray, elements.calcDisplay);
        for (i = 0; i < numButtons.length; i++) {
            let numButton = numButtons[i];
            numButton.addEventListener('click', function newNum() {
                if (displayArray[0] === 0) {
                    displayArray.splice(0, 1);
                    let numOne = numGetter(displayArray, numButton.id, displayElement);
                    getOperator(numOne, calculationButtons, displayElement);
                } else {
                    let numOne = numGetter(displayArray, numButton.id, displayElement);
                    getOperator(numOne, calculationButtons, displayElement);
                }
            });
        }
    } else {
        for (i = 0; i < numButtons.length; i++) {
            let numButton = numButtons[i];
            numButton.addEventListener('click', function newNum() {
                let numOne = numGetter(displayArray, numButton.id, displayElement);
                getOperator(numOne, calculationButtons, displayElement);
            });
        }
    }
}

const getOperator = (numOne, calculationButtons, displayElement) => {
    let operatorArray = [numOne]
    for (i = 0; i < calculationButtons.length - 1; i++) {
        let operatorElement = calculationButtons[i];
        let operator = operatorElement.id;
        operatorElement.addEventListener('click', function getOperator() {
            displayElement.textContent = operator;
            operatorArray.push(operator);
            console.log(operatorArray)
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

numberEvent(display, calcButtons, elements.calcDisplay);




