import {
    CALC_ElELEMENT, 
    // CALC_SINBOL, 
    RESULT,
    CALC_DEL_ALL,
    CALC_DEL,
    CALC_RESULT,
    HISTORY,
    GR,
} from "./const.js";

let numbers = [];
let operations = [];

document.addEventListener('DOMContentLoaded', getLocalItem)

function getLocalItem() {
    const numberREC = localStorage.getItem('numberLocal');
    RESULT.value = numberREC;
};

CALC_ElELEMENT.forEach(item => {
    item.addEventListener('click', parseAndCalculate)    
});

function parseAndCalculate(e) {
    // Массивы для хранения цифр и операций
    
    
    let expression = e.target.value;
    // console.log(expression);
    // Разбиваем выражение на части
    let parts = expression.split(/(\d+|\+|-|\*|\/)/) /*.forEach( e => e != "")*/;
    console.log(parts);

    RESULT.value += expression

    // Проходим по разбитым частям
    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i])) { // Если часть - число
            if(parts[i] !== "") {
            // console.log(parts[i]);
            numbers.push(parseFloat(parts[i]));
            }
        } else if (parts[i] === '+' || parts[i] === '-' || parts[i] === '*' || parts[i] === '/') {
            operations.push(parts[i]);
        }
    }


    // Выполняем вычисления
    let result = numbers[0];
    for (let i = 0; i < operations.length; i++) {
        switch (operations[i]) {
            case '+':
                result += numbers[i + 1];
                break;
            case '-':
                result -= numbers[i + 1];
                break;
            case '*':
                result *= numbers[i + 1];
                break;
            case '/':
                result /= numbers[i + 1];
                break;
        }
    }
    localStorage.setItem("numberLocal", result);
    console.log(numbers);
    console.log(operations);

    CALC_RESULT.addEventListener("click", () => RESULT.value = result)
    
}

CALC_DEL_ALL.addEventListener("click", () => {
    numbers.splice(0,numbers.length);
    operations.splice(0,operations.length);
    RESULT.value = "";
})
