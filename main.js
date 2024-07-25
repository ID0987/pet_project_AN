import { 
    WRAPPER_TASK 
} from "./constToDoList.js";

const arrToDoList = [];

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
                const addInnerHtml = `
                <div class='containerTasks'>
                    <div class='task'>
                        <div class='nameTask'>${keyToDoList.name}</div>
                        <div class='BlockStatus'>
                            <div class='statusTask'>${keyToDoList.priority}</div>
                            <button class='delTask'>x</button>
                        </div>
                    </div>
                </div>`;
                findClassNewTask.insertAdjacentHTML('afterend', addInnerHtml);
            }
        }
    }
    // Добавляем обработчики событий для кнопок удаления после рендеринга всех задач уже после создания, иначе происходит магия дублирования
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
    const findNameTask = arrToDoList.findIndex(e => e.name === nameTaskTarget);
    arrToDoList.splice(findNameTask, 1);
    renderState();
}
