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

    const operation = (operator, x, y) => {
        if (operator === '+') {
            let sum = add(x, y)
            return sum
        }
        if (operator === "x") {
            let product = mult(x, y)
            return product
        }
        if (operator === "-") {
            let difference = sub(x, y)
            return difference
        }
        if (operator === "/") {
            let quotient = div(x, y)
            return quotient
        }
        if (operator === "^") {
            let power = exp(x, y)
            return power
        }
    }

    return { add, mult, sub, div, exp, operation}
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

    const clearDisplay = () => {
        calcDisplay.textContent = 0;
    }

    const pushToDisplay = (num) => {
        calcDisplay.textContent = num;
    }

    return { body, calcDiv, calcDisplay, buttonDiv, clearDisplay, pushToDisplay }
})();

/* Button Elements */

const numButtons = (() => {
    let numElementArray = []
    let displayArray = []

    function buttonListener(buttonElement, displayArray, displayContents) {
        buttonElement.addEventListener("click", function numEvent() {
            displayArray.push(displayContents);
            let newNum = displayArray.join('');
            elements.pushToDisplay(newNum);
        });
    }

    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'button', elements.buttonDiv);
        newButton.classList.add(`number`);
        newButton.setAttribute('id', `${i}`);
        newButton.textContent = `${i}`;
        let num = `${i}`;
        numElementArray.push(newButton);
        buttonListener(newButton, displayArray, num)
    };

    return { numElementArray, displayArray }
})();

const calcButtons = (() => {
    const calcArray = ['+', '-', 'x', '/', '^', `=`];
    let calcElementArray = [];
    let newNumDisplay = [];

    function calcButtonBuilder(newCalcArray, index) {
        let newButton = elementBuilder('button', 'button', elements.buttonDiv);
        newButton.classList.add(`calc`);
        newButton.id = `${newCalcArray[index]}`;
        newButton.textContent = `${newCalcArray[index]}`;
        calcElementArray.push(newButton);
        return newButton
    };

    for (i = 0; i < calcArray.length; i++) {
        let newButton = calcButtonBuilder(calcArray, i);
        let operator = `${calcArray[i]}`;
        
        newButton.addEventListener("click", function calcEvent() {
            let numOne = parseInt(elements.calcDisplay.textContent);
            elements.pushToDisplay(operator);
            for (i = 0; i < numButtons.numElementArray.length; i++) {
                newButton = numButtons.numElementArray[i];
                let num = newButton.id;
                newButton.addEventListener("click", function numEvent() {
                    elements.pushToDisplay(num);
                    let newNum = parseInt(elements.calcDisplay.textContent);
                    newNumDisplay.push(newNum);
                    let numTwo = parseInt(newNumDisplay.join(''));
                    elements.pushToDisplay(numTwo);
                    let equalsButton = document.getElementById("=");
                    equalsButton.addEventListener("click", function calculation() {
                        let result = calc.operation(operator, numOne, numTwo)
                        elements.pushToDisplay(result);
                        numButtons.displayArray = result;
                        newNumDisplay = [];
                        
                    });

                });

            }

        });
    };

    const clearButton = (() => {
        let button = elementBuilder('button', 'button', elements.buttonDiv);
        button.textContent = "Clear";
        button.addEventListener("click", elements.clearDisplay);
    })();

    return { calcElementArray, calcArray, clearButton }
})();



