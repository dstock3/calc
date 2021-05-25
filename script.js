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

function elementBuilder(element, classLabel, parentName) {
    let item = createElement(element);
    item.classList.add(classLabel);
    parentName.appendChild(item);
    return item;
}
