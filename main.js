import {
    CALC_ElELEMENT,
    RESULT,
    CALC_DEL_ALL,
    CALC_DEL,
    CALC_RESULT,
    HISTORY,
    GR,
} from "./const.js";

const numbers = [];
const operations = [];
const historyArr = [];
const updatePage = [];

document.addEventListener('DOMContentLoaded', getLocalItem);

function getLocalItem() {
    try {
        const numberREC = localStorage.getItem('numberLocal');
        const historyLocalRec = localStorage.getItem("historyLocal")
        if (numberREC !== null || historyLocalRec !== null ) {
            RESULT.value = numberREC;
            HISTORY.value = historyLocalRec;
            updatePage.push(numberREC);
        }
        console.log("Загруженные данные из localStorage:");
        console.log(numbers);
        console.log(operations);
        console.log(historyArr);
    } catch (error) {
        console.error("Ошибка при загрузке данных из localStorage:", error);
    }
}

CALC_ElELEMENT.forEach(item => {
    item.addEventListener('click', parseAndCalculate);
});

function parseAndCalculate(e) {
    try {
        let expression = e.target.value;      
        RESULT.value += expression;
        
        // Разбиваем выражение на части только если выражение завершено оператором
        let parts = RESULT.value.split(/([+\-*/])/).filter(part => part !== "");
        console.log(parts);
        // Очищаем массивы перед новым разбиением
        numbers.length = 0;
        operations.length = 0;

        for (let i = 0; i < parts.length; i++) {
            if (!isNaN(parts[i])) {
                numbers.push(parseFloat(parts[i]));
            } else if (['+', '-', '*', '/'].includes(parts[i])) {
                operations.push(parts[i]);
            }
        }

        console.log("Текущие числа:", numbers);
        console.log("Текущие операции:", operations);
    } catch (error) {
        console.error("Ошибка при разборе и вычислении выражения:", error);
    } finally {
        console.log("Парсинг (регулярки) и вычисление завершены");
    }
}

CALC_RESULT.addEventListener("click", (e) => {
    e.preventDefault(); // Предотвращаем отправку формы, не работает если внутри функции вызывать
    try {
        if (numbers.length === 0 || operations.length === 0) return;
        let result = numbers[0];

        let expression = RESULT.value;
        let historyEntry = `${expression} = `;
        historyArr.push(historyEntry);
        localStorage.setItem("historyLocal", historyArr);

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
        console.log("Результат:", result);
        localStorage.setItem("numberLocal", result);
        RESULT.value = result;
        HISTORY.value = localStorage.getItem("historyLocal") /*+ localStorage.getItem('numberLocalHistory')*/;
        
    } catch (error) {
        console.error("Ошибка при выполнении вычислений:", error);
    } finally {
        // Очищаем массивы после вычисления результата
        numbers.length = 0;
        operations.length = 0;
        historyArr.length = 0;
        console.log("История операций:", historyArr);
        console.log("Массивы чисел и операций очищены");
    }
});

CALC_DEL_ALL.addEventListener("click", () => {
    try {
        numbers.length = 0;
        operations.length = 0;
        RESULT.value = "";
        localStorage.removeItem("numberLocal");
        historyArr.length = 0;

        console.log("Очищены все данные");
    } catch (error) {
        console.error("Ошибка при очистке данных:", error);
    } finally {
        console.log("Операция очистки завершена");
    }
});
