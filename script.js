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

const elements = (() => {
    const body = document.querySelector('body');
    const calcDivBkg = elementBuilder('div', 'calc-bkg', body);
    const calcDiv = elementBuilder('div', 'calc-div', body);
    const displayDiv = elementBuilder('div', 'display-div', calcDiv)
    const calcDisplay = elementBuilder('div', 'calc-display', displayDiv);
    const calcDisplayBkg = elementBuilder('div', 'display-bkg', displayDiv);
    const buttonDiv = elementBuilder('div', 'button-div', calcDiv);
    const numButtonDiv = elementBuilder("div", "num-buttons", buttonDiv);
    const calcButtonDiv = elementBuilder("div", "calc-buttons", buttonDiv);

    return { body, calcDiv, calcDisplay, buttonDiv, numButtonDiv, calcButtonDiv }
})();

const numButtons = () => {
    removeChildren(elements.numButtonDiv);

    let elementArray = []
    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'button', elements.numButtonDiv);
        newButton.classList.add(`number`);
        numAssign(newButton, i)
        newButton.textContent = `${i}`;
        let num = `${i}`;
        elementArray.push(newButton);
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

    return { elementArray }
};

const calcButtons = () => {
    removeChildren(elements.calcButtonDiv);

    const operators = ['+', '-', 'x', '/', '^', `=`];
    
    let elementArray = [];
    for (i = 0; i < operators.length; i++) {
        let newButton = elementBuilder('button', 'button', elements.calcButtonDiv);
        newButton.classList.add(`calc`);
        newButton.id = operators[i];
        newButton.textContent = operators[i];
        elementArray.push(newButton);
    };
    return { elementArray, operators }
};

const display = (() => {
    let array = [];

    const clearDisplay = () => {
        elements.calcDisplay.textContent = "";
    }

    const pushToDisplay = (num) => {
        elements.calcDisplay.textContent = num;
    }

    const clearArray = () => {
        clearDisplay();
        array = [];
        return array;
    }

    const addToArray = (displayContents) => {
        array.push(displayContents);
        let num = array.join('');
        pushToDisplay(num);
        return num
    }

    return { array, clearArray, addToArray, pushToDisplay }
})();

const clearButton = () => {
    let button = elementBuilder('button', 'button', elements.buttonDiv);
    button.id = "clear";
    button.textContent = "Clear";
    button.addEventListener("click", display.clearArray);
};

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

const calcLogic = (() => {
    function buttonListener(buttonElement, displayContents) {
        buttonElement.addEventListener("click", function numEvent() {
            display.addToArray(displayContents);
        });
    }

    const addListener = (newSet) => {
        for (i = 0; i < newSet.elementArray.length; i++) {
            let newButton = newSet.elementArray[i];
            let num = newButton.textContent
            buttonListener(newButton, num)
            };
    }

    function equals(operator, numOne) {
        let newCalcSet = calcButtons()
        let numTwo = parseInt(elements.calcDisplay.textContent);
        for (i = 0; i < newCalcSet.elementArray.length -1; i++) {
            let newOpButton = newCalcSet.elementArray[i];
            newOpButton.addEventListener("click", function newOp() {
                display.clearArray();
                let result = calc.operation(operator, numOne, numTwo);
                display.pushToDisplay(result);
                operator = newOpButton.textContent;
                let newNumSet = numButtons()
                secondNum(newNumSet, result, operator);
            });
        }
        let equalsButton = document.getElementById("=");
        equalsButton.addEventListener("click", function calculation() {
            let result = calc.operation(operator, numOne, numTwo);
            display.clearArray();
            display.pushToDisplay(result);
            let newCalcSet = calcButtons()
            getOperator(newCalcSet);
        });
    }

    const secondNum = (newSet, numOne, operator) => {
        for (i = 0; i < newSet.elementArray.length; i++) {
            let newButton = newSet.elementArray[i];
            let num = newButton.textContent;
            newButton.addEventListener("click", function operation() {
                display.addToArray(num);
                equals(operator, numOne);
            });
        };
    }

    function getOperator(calcSet) {
        for (i = 0; i < calcSet.operators.length-1; i++) {
            let operator = calcSet.operators[i];
            let newButton = calcSet.elementArray[i];
            newButton.addEventListener("click", function calcEvent() {
                let numOne = parseInt(elements.calcDisplay.textContent);
                display.clearArray();
                display.pushToDisplay(operator);
                let newNumSet = numButtons()
                secondNum(newNumSet, numOne, operator);
            }); 
        }
    }

    function operate() {
        let numSet = numButtons();
        let calcSet = calcButtons();
        addListener(numSet);
        getOperator(calcSet);
        let equalsButton = document.getElementById("=");
        equalsButton.addEventListener("click", function calculation() {
            let result = elements.calcDisplay.textContent
            display.clearArray();
            display.pushToDisplay(result);
            let newCalcSet = calcButtons()
            getOperator(newCalcSet);
        });
    }

    let clear = clearButton()

    operate()
})();







