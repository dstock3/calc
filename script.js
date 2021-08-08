/* Calculation functions */

const calc = (() => {
    const add = (x, y) => x + y;
    const mult = (x, y) => x * y;
    const sub = (x, y) => x - y;
    const div = (x, y) => x / y;
    const exp = (x, y) => x ** y;
    return { add, mult, sub, div, exp }
})();

/* DOM manipulation */

function elementBuilder(element, classLabel, parentName) {
    let item = document.createElement(element);
    item.classList.add(classLabel);
    parentName.appendChild(item);
    return item;
}

/* Calc Visuals */

const body = document.querySelector('body');
const calcDiv = elementBuilder('div', 'calc-div', body);
const calcDisplay = elementBuilder('div', 'calc-display', calcDiv);
const buttonDiv = elementBuilder('div', 'button-div', calcDiv);
calcDisplay.textContent = "";

const numButtonBuilder = (() => {
    let numElementArray = []
    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'number-button', buttonDiv);
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
        let newButton = elementBuilder('button', 'calc-button', buttonDiv);
        newButton.setAttribute('id', `${calcArray[i]}`);
        newButton.textContent = `${calcArray[i]}`;
        calcElementArray.push(newButton);
    };
    return calcElementArray
})();

const calcFlow = (numButtonArray, displayElement, calculationButtons) => {

    let display = [];

    const newDisplay = (displayArray) => {
        let newNumber = displayArray[0]
        displayElement.textContent = newNumber

        for (x = 1; x < displayArray.length; x++) {
            let numComponent = display[x];
            newNumber = String(newNumber) + String(numComponent);
        };

        displayElement.textContent = newNumber;
        return parseInt(newNumber);
    }

    const operation = (numOne, operator, numTwo) => {
        if (operator === `+`) {
            let newOperation = calc.add(numOne, numTwo);
            display.push(newOperation);
            let result = newDisplay(display);
            return result
        };
    
        if (operator === `x`) {
            let newOperation = calc.mult(numOne, numTwo);
            display.push(newOperation);
            let result = newDisplay(display);
            return result
        };
    
        if (operator === `-`) {
            let newOperation = calc.sub(numOne, numTwo);
            display.push(newOperation);
            let result = newDisplay(display);
            return result
        };
    
        if (operator === `/`) {
            let newOperation = calc.div(numOne, numTwo);
            display.push(newOperation);
            let result = newDisplay(display);
            return result
        };
    
        if (operator === `^`) {
            let newOperation = calc.exp(numOne, numTwo);
            display.push(newOperation);
            let result = newDisplay(display);
            return result
        };
    }

    const expression = () => {
        for (i = 0; i < numButtonArray.length; i++) {
            let firstButton = numButtonArray[i];
            firstButton.addEventListener('click', function getNumOne() {
                let num = parseInt(firstButton.id);
                display.push(num);
                console.log("For num one: " + display)
                let numOne = newDisplay(display);
                for (y = 0; y < calculationButtons.length; y++) {
                    display = [];
                    let operatorElement = calculationButtons[y];
                    let operator = operatorElement.id;
                    operatorElement.addEventListener('click', function getOperator() {
                        displayElement.textContent = operator;
                        for (x = 0; x < numButtonArray.length; x++) {
                            let secondButton = numButtonArray[x];
                            secondButton.addEventListener('click', function getNumTwo() {
                                let num = parseInt(secondButton.id);
                                display.push(num);
                                console.log("For num two: " + display)
                                let numTwo = newDisplay(display);

                                //let result = operation(numOne, operator, numTwo);
                            });
                        };
                    });
                    
                };
            })
        };
    }

    return { expression }
}

let calculation = calcFlow(numButtonBuilder, calcDisplay, calcButtons);
let newNumber = calculation.expression();



