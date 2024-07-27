import { 
    WRAPPER_TASK 
} from "./constToDoList.js";

const arrToDoList = JSON.parse(localStorage.getItem('tasks')) || [];

const priorityToDoList = {
    LOW: "low",
    HIGH: "high",
    MIDDLE: "middle",
}

const statusToDoList = {
    IN_PROGRESS: "In Progress",
    DONE: "Done",
    TO_DO: "To Do",
}

document.addEventListener('DOMContentLoaded', renderState)

WRAPPER_TASK.addEventListener("click", addTasks);

function addTasks(e) {
    e.preventDefault();
    if (!e.target.classList.contains("addTaskBtn")) return;
    let containerTask = e.target.closest("div");
    for (const key in priorityToDoList) {
        const getName = containerTask.querySelector(`#${priorityToDoList[key]}`);
        
        if (getName && getName.value.trim() !== "") {
            const newTask = {
                name: getName.value,
                priority: priorityToDoList[key],
                status: statusToDoList.IN_PROGRESS
            }
            arrToDoList.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(arrToDoList));
        }
    }
    renderState();
}

function renderState() {
    delOldTaskHTML();
    for (const keyToDoList of arrToDoList) {
        for (const key in priorityToDoList) {
            if (priorityToDoList[key] === keyToDoList.priority) {
                const findClassNewTask = document.getElementById(priorityToDoList[key]).closest(".newTask");
                const newTaskHTML = document.createElement('div');
                newTaskHTML.classList.add('containerTasks');
                newTaskHTML.innerHTML = `
                    <div class='task'>
                        <div class='nameTask'>${keyToDoList.name}</div>
                        <div class='BlockStatus'>
                            <div class='statusTask'>${keyToDoList.priority}</div>
                            <button class='delTask'>x</button>
                        </div>
                    </div>`;
                
                findClassNewTask.insertAdjacentElement('afterend', newTaskHTML);
            }
        }
    }
    // Добавляем обработчики событий для всех кнопок удаления после рендеринга всех задач иначе будет магия дублирования
    document.querySelectorAll('.delTask').forEach(btn => {
        btn.addEventListener('click', delTask);
    });
}

function delOldTaskHTML() {
    const oldTasks = document.querySelectorAll('.containerTasks');
    oldTasks.forEach(el => el.remove());
}

function delTask(e) {
    const findBlockStatus = e.target.closest('.BlockStatus');
    const findTask = findBlockStatus.closest('.task');
    const nameTaskTarget = findTask.querySelector('.nameTask').textContent;
    const findNameTask = arrToDoList.findIndex(task => task.name === nameTaskTarget);
    arrToDoList.splice(findNameTask, 1);
    localStorage.setItem('tasks', JSON.stringify(arrToDoList));
    renderState();
}
