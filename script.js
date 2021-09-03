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

    const decButton = (() => {
        const decimal = elementBuilder("button", "button", elements.numButtonDiv);
        decimal.classList.add(`number`);
        decimal.textContent = `.`;
        decimal.id = "decimal"
        elementArray.push(decimal);
    })();

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

const display = () => {
    let array = [];

    const clear = () => {
        elements.calcDisplay.textContent = "";
    }

    const pushToDisplay = (num) => {
        elements.calcDisplay.textContent = num;
    }

    const clearArray = () => {
        array = [];
        return array;
    }

    const addToArray = (displayContents) => {
        let decimalCount = 0;
        array.push(displayContents);
        for (i = 0; i < array.length; i++) {
            if (array[i] === ".") {
                decimalCount += 1;
            }
        }
        if (decimalCount < 2) {
            let num = array.join('');
            pushToDisplay(num);
            return num
        } else {
            array.pop(displayContents)
            let num = array.join('');
            pushToDisplay(num);
            return num
        } 
    }

    return { array, clearArray, addToArray, pushToDisplay, clear }
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

const clearButton = (() => {
    let button = elementBuilder('button', 'button', elements.buttonDiv);
    button.id = "clear";
    button.textContent = "Clear";
})();

const calcLogic = (() => {   
    function buttonListener(buttonElement, displayContents, displayObj) {
        buttonElement.addEventListener("click", function numEvent() {
            displayObj.addToArray(displayContents);
        });
    }

    const addListener = (newSet, displayObj) => {
        for (i = 0; i < newSet.elementArray.length; i++) {
            let newButton = newSet.elementArray[i];
            let num = newButton.textContent;
            buttonListener(newButton, num, displayObj)
        };
    }; 

    function equals(operator, numOne, displayObj) {
        let newCalcSet = calcButtons()
        let numTwo = parseFloat(elements.calcDisplay.textContent);
        for (i = 0; i < newCalcSet.elementArray.length -1; i++) {
            let newOpButton = newCalcSet.elementArray[i];
            newOpButton.addEventListener("click", function newOp() {
                displayObj.clearArray();
                let result = calc.operation(operator, numOne, numTwo);
                displayObj.pushToDisplay(result);
                operator = newOpButton.textContent;
                let newNumSet = numButtons()
                secondNum(newNumSet, result, operator, displayObj);
            });
        }
        let equalsButton = document.getElementById("=");
        equalsButton.addEventListener("click", function calculation() {
            let result = calc.operation(operator, numOne, numTwo);
            displayObj.pushToDisplay(result);
            displayObj.clearArray();
            let newNumSet = numButtons();
            addListener(newNumSet, displayObj);
            let newCalcSet = calcButtons()
            getOperator(newCalcSet, displayObj);
        });
    }

    const secondNum = (newSet, numOne, operator, displayObj) => {
        for (i = 0; i < newSet.elementArray.length; i++) {
            let newButton = newSet.elementArray[i];
            let num = newButton.textContent;
            newButton.addEventListener("click", function operation() {
                displayObj.addToArray(num);
                equals(operator, numOne, displayObj);
            });
        };
    }

    function getOperator(calcSet, displayObj) {
        for (i = 0; i < calcSet.operators.length-1; i++) {
            let operator = calcSet.operators[i];
            let newButton = calcSet.elementArray[i];
            newButton.addEventListener("click", function calcEvent() {
                let numOne = parseFloat(elements.calcDisplay.textContent);
                displayObj.clearArray();
                displayObj.pushToDisplay(operator);
                let newNumSet = numButtons()
                secondNum(newNumSet, numOne, operator, displayObj);
            }); 
        }
    }

    function operate() {
        let newdisplay = display()
        clearEvent(newdisplay);
        let numSet = numButtons();
        let calcSet = calcButtons();
        addListener(numSet, newdisplay);
        getOperator(calcSet, newdisplay);
        let equalsButton = document.getElementById("=");
        equalsButton.addEventListener("click", function calculation() {
            let result = elements.calcDisplay.textContent
            newdisplay.clearArray();
            newdisplay.pushToDisplay(result);
            let newCalcSet = calcButtons()
            getOperator(newCalcSet, newdisplay);
        });
    }

    const clearEvent = (displayObj) => {
        let button = document.getElementById("clear")
        function clearAll() {
            displayObj.clearArray();
            displayObj.clear()
            operate();
        }
        button.addEventListener("click", clearAll);
    };


    operate()
})();







