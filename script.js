/* Calculation functions */

function multiply(x, y) {
    return x * y;
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function divide(x, y) {
    return x / y;
}

function exponent(x, y) {
    return x ** y;
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

const calcArray = ['+', '-', 'x', '/', '^', `=`];


const numButtonBuilder = (() => {
    let numElementArray = []
    for (i = 0; i < 10; i++) {
        let newButton = elementBuilder('button', 'number-button', buttonDiv);
        newButton.setAttribute('id', `${i}`);
        newButton.textContent = `${i}`;
        newButton.addEventListener('click', () => {
            let num = parseInt(newButton.id);
            calcDisplay.textContent = newButton.id;
            return num;
        })
    
        numElementArray.push(newButton);
    };
    
    return numElementArray
})();

const calcButtonBuilder = (newCalcArray) => {
    let calcElementArray = [];
    for (i = 0; i < newCalcArray.length; i++) {
        let newButton = elementBuilder('button', 'calc-button', buttonDiv);
        newButton.setAttribute('id', `${newCalcArray[i]}`);
        newButton.textContent = `${newCalcArray[i]}`;
        newButton.addEventListener('click', () => {
            let calc = parseInt(newButton.id);
            calcDisplay.textContent = newButton.id;
        });
    
        calcElementArray.push(newButton);
    };
    return calcElementArray
};



let num = calcControl.numButtonBuilder();
let calc = calcButtonBuilder(calcArray);
