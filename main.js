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

const numbers = [];
const operations = [];
const historyArr = []

// try {

    document.addEventListener('DOMContentLoaded', getLocalItem)

    function getLocalItem() {
        const numberREC = localStorage.getItem('numberLocal');
        RESULT.value = numberREC;
        console.log(numbers);
        console.log(operations);
        console.log(historyArr);
    }; 

    CALC_ElELEMENT.forEach(item => {
        item.addEventListener('click', parseAndCalculate)    
    });



    function parseAndCalculate(e) {
        // Массивы для хранения цифр и операций
        
        
        let expression = e.target.value;
        console.log(typeof expression);
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
    }   

    CALC_RESULT.addEventListener("click", why );

    function why() {
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
        console.log(result);
        historyArr.push(result);
        localStorage.setItem("numberLocal", result);
        

        console.log(numbers);
        console.log(operations);
        console.log(historyArr);
    }
    

    CALC_DEL_ALL.addEventListener("click", () => {
        numbers.splice(0,numbers.length);
        operations.splice(0,operations.length);
        RESULT.value = "";
        
        HISTORY.value = numbers
    })

// } catch (e){
//     alert("код гавно")
//     alert(e)
// }