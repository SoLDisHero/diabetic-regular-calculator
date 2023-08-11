const displayPrevious = document.querySelector(".previous");
const displayCurrent = document.querySelector(".current");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const clearLast = document.querySelector(".clear-entrance");
const buttonsAll = document.querySelectorAll(".button");
const diabetButton = document.querySelector(".diabetic");
const mgdl = document.querySelector(".mgdl");
const mmol = document.querySelector(".mmol");
const textMgdl = document.querySelector(".textMgdl");
const textMmol = document.querySelector(".textMmol");

let numberPrevious = "";
let numberCurrent = "";
let sum = null;
let lastOperation = "";
let dot = false;
let isDiabetic = false;
let firstNumber = mgdl.value;
let secondNumber = mmol.value;

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if(e.target.innerText === "." && numberCurrent.includes(".")) return
        numberCurrent += e.target.innerText;
        displayCurrent.innerText = numberCurrent;        
    })
});

operations.forEach(operation => {
    operation.addEventListener("click", (e) => {
        const operationName = e.target.innerText;
        dot = false;
        if(!numberCurrent) return;
        if(numberPrevious !== ""){
            calculations();
        }else{
            sum = parseFloat(numberCurrent);
        }        
        updateDisplay(operationName);
        lastOperation = operationName;
        console.log(sum);
    })
});

function updateDisplay(name = "") {
    numberPrevious += numberCurrent + " " + name + " ";
    displayPrevious.innerText = numberPrevious;
    displayCurrent.innerText = "";
    numberCurrent = "";
};

function calculations() {
    if(lastOperation === "*"){
        sum = parseFloat(sum) * parseFloat(numberCurrent);
    }else if(lastOperation === "+"){
        sum = parseFloat(sum) + parseFloat(numberCurrent);
    }else if(lastOperation === "-"){
        sum = parseFloat(sum) - parseFloat(numberCurrent);
    }else if(lastOperation === "/"){
        sum = parseFloat(sum) / parseFloat(numberCurrent);
    }else if(lastOperation === "%"){
        sum = parseFloat(sum) % parseFloat(numberCurrent);
    }
};

equal.addEventListener("click", (e) => {
    if(!numberCurrent || !numberPrevious) return;
    dot = false;
    calculations();
    updateDisplay();
    displayCurrent.innerText = sum;
    displayPrevious.innerText += " = " + sum;
    numberCurrent = sum;
    numberPrevious = ""; 
       
});

clear.addEventListener("click", (e) => {
    displayCurrent.innerText = "0";
    displayPrevious.innerText = "0";
    numberCurrent = "";
    numberPrevious = "";
    dot = false;
    sum = null;
    if(isDiabetic){
    mgdl.value = "";
    mmol.value = "";
    first.value = "";
    second.value = "";
    }
});

clearLast.addEventListener("click", (e) => {
    numberCurrent = "";
    displayCurrent.innerText = "";
});

//diabetic calc

mgdl.addEventListener("focus", () => {
    let currentValue = "";

    numbers.forEach(number => {
        number.addEventListener("click", (e) => {
            if (e.target.innerText === "." && currentValue.includes(".")) return;
            currentValue += e.target.innerText;
            mgdl.value = currentValue;
            mmol.value = "";
        });
        
    });
});
mmol.addEventListener("focus", () => {
    let currentValue = "";
    numbers.forEach(number => {
        number.addEventListener("click", (e) => {
            if (e.target.innerText === "." && currentValue.includes(".")) return;
            currentValue += e.target.innerText;
            mmol.value = currentValue;
            mgdl.value = "";
        });
        
    });
});

btn.addEventListener("click", (e) => {    
    firstNumber = mmolToMgdl();
    secondNumber = mgdlToMmol();
    mmol.value = secondNumber;
    mgdl.value = firstNumber;
});

mgdl.addEventListener("focus", () => {
    mgdl.value = "";
    clear.click();
});
mmol.addEventListener("focus", () => {
    mmol.value = "";
    clear.click();
});

diabetButton.addEventListener("click", (e) => {
    if(isDiabetic){
        operations.forEach(operation => operation.classList.remove("disableButtons"))
        clearLast.classList.remove("disableButtons");
        diabetButton.innerText = "Diabet";
        displayPrevious.removeAttribute("hidden");
        displayCurrent.removeAttribute("hidden");
        mgdl.setAttribute("hidden", true);
        mmol.setAttribute("hidden", true);
        textMmol.setAttribute("hidden", true);
        textMgdl.setAttribute("hidden", true);
        btn.classList.add("hidden");
    }else{
        displayPrevious.setAttribute("hidden", true);
        displayCurrent.setAttribute("hidden", true);
        mgdl.removeAttribute("hidden");
        mmol.removeAttribute("hidden");
        textMmol.removeAttribute("hidden");
        textMgdl.removeAttribute("hidden");
        operations.forEach(operation => operation.classList.add("disableButtons"))
        clearLast.classList.add("disableButtons");        
        diabetButton.innerText = "Regular";
        btn.classList.remove("hidden");
    }
    isDiabetic = !isDiabetic;
})
function mgdlToMmol(){
    const mgdlToMmolNumber = parseFloat(+mgdl.value) * 0.0555;
    return mgdlToMmolNumber;
}
function mmolToMgdl(){
    const mmolToMgdlNumber = parseFloat(+mmol.value) * 18;
    return mmolToMgdlNumber;
}

//keybord handlening

window.addEventListener("keydown", (e) => {
    e.preventDefault();
    console.log(e.key)
    if(
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "0" ||
        e.key === "."
    ){
        clickNumber(e.key);
        toggleClass(e.key);
    }else if(
        e.key === "%" ||
        e.key === "/" ||
        e.key === "*" ||
        e.key === "-" ||
        e.key === "+" 
    ){
        clickOperations(e.key);
        toggleClass(e.key);
    }else if(
        e.key === "Enter" || e.key === "="
    ){
        if(isDiabetic){
            
            btn.click();
            
        }        
        equal.click();
        toggleClass("=");
    }else if(
        e.key === "Escape"
    ){
        clear.click();
        toggleClass("C");
    }else if(
        e.key === " "
    ){
        clearLast.click();
        toggleClass("CE");
    }
});

function clickNumber(key){
    numbers.forEach(number => {
        if(number.innerText === key){
            number.click();
        }
    })
};

function clickOperations(key){
    operations.forEach(operation => {
        if(operation.innerText === key){
            operation.click();
        }
    })
};

function toggleClass(key){
    buttonsAll.forEach(button => {
        if(button.innerText === key){
            button.classList.add("active");
            setTimeout(() => {
                button.classList.remove("active");
            }, 100)
        }        
    })
};



// numbers.forEach(number => {
//     number.addEventListener("click", (e) => {
//         // Determine the currently focused field
//         let currentField = document.activeElement;
        
//         if (currentField === mgdl || currentField === mmol) {
//             // If the current field is mgdl or mmol, append the number
//             if(e.target.innerText === "." && currentField.value.includes(".")) return
//             currentField.value += e.target.innerText;
//         }
//     })
// });