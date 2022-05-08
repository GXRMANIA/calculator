const display = document.querySelector(".display")

let firstNum = [];
let secNum = [];
let resNum = [];
let operatorPressed = false;
let operatorSign = null; // will be "+", "-" and so on
let operator = null; // will be "add", "subtract" and so on

const digits = document.querySelectorAll(".digit");
digits.forEach(digit => {
    digit.addEventListener("click", (e) => {

        if(display.textContent == "ERROR") clear();

        if(operatorPressed) {
            secNum.push(e.target.textContent)
            display.textContent = firstNum.join("") + " " + operatorSign + " " + secNum.join("");
            return;
        }
        
        // if there is a solution number on the screen left but user clicks a new num
        if(resNum[0] != null) {
            resNum = [];
            firstNum = [];
            firstNum.push(e.target.textContent)
            display.textContent = firstNum.join("")
            return;
        }

        firstNum.push(e.target.textContent)
        display.textContent = firstNum.join("");

    })
})

const dotBtn = document.querySelector(".dot");
dotBtn.addEventListener("click", () => {
    if(operatorPressed && secNum.length != 0 && !secNum.includes(".")) {
        secNum.push(".")
        display.textContent = firstNum.join("") + " " + operatorSign + " " + secNum.join("");
    } else if(firstNum.length != 0 && !firstNum.includes(".") && resNum.length == 0) {
        firstNum.push(".")
        display.textContent = firstNum.join("")
    } 
    

})

const operators = document.querySelectorAll(".operator");
operators.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", (e) => {
        if(firstNum.length == 0) return; //if there is no number on screen deactivate btn

        // if user pressed operator instead of equals button
        if(operatorPressed) {
            if(operator != null && secNum.length == 0) return;
            resNum[0] = Math.round((operate(operator, firstNum.join(""), secNum.join(""))) * 100) / 100; 
            if(resNum[0] == Infinity) {
                display.textContent = "ERROR";
                return;
            }
            display.textContent = resNum[0];

            firstNum = [];
            firstNum[0] = resNum[0];
            secNum = [];
            operator = null;
        }

        operator = e.target.value;
        operatorSign = e.target.textContent;
        operatorPressed = true;
        display.textContent += " " + e.target.textContent;
    })
})

const equalsBtn = document.querySelector(".equals");
equalsBtn.addEventListener("click", (e) => {
    // deacitivates button when there is a number missing
    if(firstNum.length == 0 || secNum.length == 0) return;

    resNum[0] = Math.round((operate(operator, firstNum.join(""), secNum.join(""))) * 100) / 100; 
    if(resNum[0] == Infinity) {
        display.textContent = "ERROR";
    }
    display.textContent = resNum[0];

    firstNum = [];
    firstNum[0] = resNum[0];
    secNum = [];
    operator = null;
    operatorPressed = false;
})

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clear)

function clear() {
    firstNum = [];
    secNum = [];
    operator = null;
    resNum = [];
    display.textContent = "";
    operatorPressed = false;
}



function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(fun, a, b) {

    if(a == null) return

    if(fun == "add") {
        return add(a, b)
    } else if (fun == "subtract") {
        return subtract(a,b)
    } else if(fun == "multiply") {
        return multiply(a,b)
    } else if(fun == "divide") {
        return divide(a,b)
    }
}

