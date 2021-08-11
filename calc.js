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

const body = document.querySelector('body');
const calcDivBkg = elementBuilder('div', 'calc-bkg', body);
const calcDiv = elementBuilder('div', 'calc-div', body);
const displayDiv = elementBuilder('div', 'display-div', calcDiv)
const calcDisplay = elementBuilder('div', 'calc-display', displayDiv);
const calcDisplayBkg = elementBuilder('div', 'display-bkg', displayDiv);
const buttonDiv = elementBuilder('div', 'button-div', calcDiv);

/* Button Elements */

const numButtons = (() => {
    let numElementArray = []
    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'button', buttonDiv);
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
        let newButton = elementBuilder('button', 'button', buttonDiv);
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
    let numOne = newDisplay(displayArray, displayElement);
    return numOne
}

const numGetter = (displayArray, numButtonnId, displayElement) => {
    let num = parseInt(numButtonnId);
    displayArray.push(num);
    getNum(displayArray, displayElement);
}

const numberEvent = (displayArray, displayElement) => {
    if (!(displayArray.length > 0)) {
        displayArray.push(0);
        newDisplay(displayArray, calcDisplay);
        for (i = 0; i < numButtons.length; i++) {
            let numButton = numButtons[i];
            numButton.addEventListener('click', function newNum() {
                if (displayArray[0] === 0) {
                    displayArray.splice(0, 1);
                    numGetter(displayArray, numButton.id, displayElement);
                } else {
                    numGetter(displayArray, numButton.id, displayElement);
                }
            });
        }
    } else {
        for (i = 0; i < numButtons.length; i++) {
            let numButton = numButtons[i];
            numButton.addEventListener('click', function newNum() {
                numGetter(displayArray, numButton.id, displayElement);
            });
        }
    }
}

const getOperator = (calculationButtons, displayElement) => {
    for (y = 0; y < calculationButtons.length; y++) {
        let operatorElement = calculationButtons[y];
        let operator = operatorElement.id;
        operatorElement.addEventListener('click', function getOperator() {
            displayElement.textContent = operator;
            return operator
        });
    }
}

numberEvent(display, calcDisplay);
getOperator(calcButtons, calcDisplay);


