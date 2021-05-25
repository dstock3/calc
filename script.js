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

const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

function numButtonBuilder(numberArray) {
    for (i = 0; i <= numArray.length-1; i++) {
        let newButton = elementBuilder('button', 'number-button', calcDiv);
        newButton.setAttribute('id', `${numberArray[i]}`);
        newButton.textContent = `${numberArray[i]}`;
    };

};

numButtonBuilder(numArray);

