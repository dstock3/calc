/* DOM manipulation */

function elementBuilder(element, classLabel, parentName) {
    let item = document.createElement(element);
    item.classList.add(classLabel);
    parentName.appendChild(item);
    return item;
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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
    const numButtonDiv = elementBuilder("div", "num-buttons", buttonDiv);

    const clearDisplay = () => {
        calcDisplay.textContent = "";
    }

    const pushToDisplay = (num) => {
        calcDisplay.textContent = num;
    }

    return { body, calcDiv, calcDisplay, buttonDiv, numButtonDiv, clearDisplay, pushToDisplay }
})();

/* Display Controller */

const display = (() => {
    let array = [];

    const clearArray = () => {
        elements.clearDisplay();
        array = [];
        return array;
    }

    const addToArray = (displayContents) => {
        array.push(displayContents);
        let num = array.join('');
        elements.pushToDisplay(num);
        return num
    }

    return { array, clearArray, addToArray }
})();

/* Button Elements */

const numButtons = () => {
    let numElementArray = []

    let displayArray = display.array;

    function buttonListener(buttonElement, displayContents) {
        buttonElement.addEventListener("click", function numEvent() {
            display.addToArray(displayContents);
        });
    }

    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'button', elements.numButtonDiv);
        newButton.classList.add(`number`);
        numAssign(newButton, i)
        newButton.textContent = `${i}`;
        let num = `${i}`;
        numElementArray.push(newButton);
    };

    function numAssign(numButton, i) {
        if (i === 0) {numButton.id = "zero"};
        if (i === 1) {numButton.id = "one"};
        if (i === 2) {numButton.id = "two"};
        if (i === 3) {numButton.id = "three"};
        if (i === 4) {numButton.id = "four"};
        if (i === 5) {numButton.id = "five"};
        if (i === 6) {numButton.id = "six"};
        if (i === 7) {numButton.id = "seven"};
        if (i === 8) {numButton.id = "eight"};
        if (i === 9) {numButton.id = "nine"};
    };

    return { numElementArray, displayArray, buttonListener }
};

const calcButtons = (() => {
    let firstSet = numButtons()

    const calcArray = ['+', '-', 'x', '/', '^', `=`];
    let calcElementArray = [];
    let displayArray = display.array;

    const addListener = (newSet) => {
        for (i = 0; i < calcArray.length; i++) {
            if (elements.calcDisplay.textContent === calcArray[i]) {
                for (i = 0; i < newSet.numElementArray.length; i++) {
                    let newButton = newSet.numElementArray[i];
                    let num = newButton.textContent
                    newSet.buttonListener(newButton, num)
                    let numTwo = parseInt(elements.calcDisplay.textContent);
                    return numTwo

                }
            } else {
                for (i = 0; i < newSet.numElementArray.length; i++) {
                    let newButton = newSet.numElementArray[i];
                    let num = newButton.textContent
                    newSet.buttonListener(newButton, num)
                }
            }
        }
    }

    addListener(firstSet);

    const calcElementDiv = elementBuilder("div", "calc-buttons", elements.buttonDiv);

    function calcButtonBuilder(newCalcArray, index) {
        let newButton = elementBuilder('button', 'button', calcElementDiv);
        newButton.classList.add(`calc`);
        newButton.id = `${newCalcArray[index]}`;
        newButton.textContent = `${newCalcArray[index]}`;
        calcElementArray.push(newButton);
        return newButton
    };

    function equals(operator, numOne, numTwo) {
        let equalsButton = document.getElementById("=");
        equalsButton.addEventListener("click", function calculation() {
            let result = calc.operation(operator, numOne, numTwo)
            elements.pushToDisplay(result);
            display.Array = result;
            
            return result
        });
    }

    for (i = 0; i < calcArray.length; i++) {
        let newButton = calcButtonBuilder(calcArray, i);
        let operator = `${calcArray[i]}`;
        newButton.addEventListener("click", function calcEvent() {
            let numOne = parseInt(elements.calcDisplay.textContent);
            display.clearArray();
            elements.pushToDisplay(operator);
            removeChildren(elements.numButtonDiv)
            let secondSet = numButtons()
            let numTwo = addListener(secondSet)
            let result = equals(operator, numOne, numTwo);

                //display.addToArray(result);

        }); 
    };
})();

const clearButton = (() => {
    let button = elementBuilder('button', 'button', elements.buttonDiv);
    button.id = "clear";
    button.textContent = "Clear";
    button.addEventListener("click", display.clearArray);
})();





