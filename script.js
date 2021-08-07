/* Calculation functions */

const calc = (() => {
    const add = (x, y) => x + y;
    const mult = (x, y) => x * y;
    const sub = (x, y) => x - y;
    const div = (x, y) => x / y;
    const exp = (x, y) => x ** y;
    return { add, mult, sub, div, exp }
})();

function operate (numOne, operator, numTwo) {
    let result = operator(numOne, numTwo);
    return result
}

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

    const expression = () => {
        for (i = 0; i < numButtonArray.length; i++) {
            displayElement.innerHTML = ""
            let firstButton = numButtonArray[i];
            firstButton.addEventListener('click', () => {
                let num = parseInt(firstButton.id);
                display.push(num);
                let numOne = newDisplay(display);
                for (y = 0; y < calculationButtons.length; y++) {
                    let operator = calculationButtons[y];
                    operator.addEventListener('click', () => {
                        displayElement.innerHTML = ""
                        let calc = operator.id;
                        displayElement.textContent = calc;
                        for (x = 0; x < numButtonArray.length; x++) {
                            displayElement.innerHTML = ""
                            let secondButton = numButtonArray[x];
                            secondButton.addEventListener('click', () => {
                                let num = parseInt(secondButton.id);
                                display.push(num);
                                let numTwo = newDisplay(display);
                                let operation = operate(numOne, operator, numTwo);
                                display.push(operation);
                                let result = newDisplay(display);
                            })

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



