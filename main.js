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

CALC_ElELEMENT.forEach(item => {
    item.addEventListener('click', parseAndCalculate)    
});

function parseAndCalculate(expression) {
    // Массивы для хранения цифр и операций
    let numbers = [];
    let operations = [];
    
    let expression = e.target.value;
    // Разбиваем выражение на части
    let parts = expression.split(/(\d+|\+|-|\*|\/)/);
    console.log(parts);
    RESULT.value += expression

    // Проходим по разбитым частям
    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i])) { // Если часть - число
            numbers.push(parseFloat(parts[i]));
            console.log("number");
        } else if (parts[i] === '+' || parts[i] === '-' || parts[i] === '*' || parts[i] === '/') {
            operations.push(parts[i]);
            console.log("not number");
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
    console.log(numbers);
    console.log(operations);

    RESULT.Value = result
    console.log(result);
    console.log(RESULT.Value);
    return RESULT.Value;
    
}