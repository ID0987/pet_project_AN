import { 
    NEW_TASK,
    NAME_TASK,
    STATUS_TASK,
    PRIORITY_TASK,
    ADD_TASK_INPUT,
    ADD_TASK_BTN,
    DEL_TASK,
    ADD_ITEM_FORM,
    WRAPPER_TASK,
    block_priority
} from "./constToDoList.js";

const arrToDoList = /*JSON.parse(localStorage.getItem('item')) ||*/ [];

const priorityToDoList = {
    LOW : "low",
    HIGHT : "hight",
    MIDDLE : "middle",
}

const statusToDoList = {
    IN_PROGRESS : "In Progress",
    DONE : "Done",
    TO_DO : "To Do",
}

WRAPPER_TASK.addEventListener("click", addTasks);
WRAPPER_TASK.addEventListener("submit", addTasks);

function addTasks(e) {
    e.preventDefault();
    if(!e.target.classList.contains("addTaskBtn")) return;
    let containerTask = e.target.closest("div")
    for(const key in priorityToDoList) {
        const getName = containerTask.querySelector(`#${priorityToDoList[key]}`)
        
        if (getName) {
            
            const newTask = {name: getName.value, priority: priorityToDoList[key], status: statusToDoList.IN_PROGRESS}
            // console.log(newTask);
            arrToDoList.push(newTask)
            // console.log(arrToDoList);
        }

    }
    rendorState(e)
}

function rendorState(e) {
    e.preventDefault();

    delOldTaskHTML()

    for(const keyToDoList of arrToDoList) {
        for(const key in priorityToDoList) {
            if(priorityToDoList[key] === keyToDoList.priority){
                const findClassNewTask = document.getElementById(`${priorityToDoList[key]}`).closest(".newTask")
                // console.log(findClassNewTask);
                const btnDel = `<button class='delTask'>x</button>`
                const addInnerHtml = `
                <div class='conteinerTasks'>
                    <div class='task'>
                        <div class='nameTask'>${keyToDoList.name}</div>
                        <div class='BlockStatus'>
                            <div class='statusTask'> ${keyToDoList.priority} </div>
                            ${btnDel}
                        </div>
                    </div>
                <div>`
                findClassNewTask.insertAdjacentHTML('afterend', addInnerHtml)
                const btnDelFun = document.querySelector(".delTask")

                btnDelFun.addEventListener("click",  (e) => delTask(e));
            }
        }
    }
}

function delOldTaskHTML() {
    const oldTasks = document.querySelectorAll('.conteinerTasks');
    if(oldTasks.length !== 0) {
        oldTasks.forEach(el => el.remove());
        // console.log(`удаление ${oldTasks.length} произошло`);
    } 
}



function delTask(e) { 
    const findBlockStatus = e.target.parentElement;
    const fintTask = findBlockStatus.parentElement;
    const nameTaskTarget = fintTask.querySelector('.nameTask').textContent;
    const findNameTask = arrToDoList.findIndex(e => e.name === nameTaskTarget);
    const ASK = arrToDoList.splice(findNameTask, 1)
    console.log(arrToDoList);
    rendorState(e);
}























const To_Do = [
    {name : "create task 1", status : statusToDoList.IN_PROGRESS, priority : priorityToDoList.LOW,}, 
    // {name : "create task 2", status : statusToDoList.IN_PROGRESS, priority : priorityToDoList.HIGHT,}, 
    // {name : "create task 3", status : statusToDoList.TO_DO, priority : priorityToDoList.MIDDLE,}, 
    // {name : "create task 4", status : statusToDoList.DONE, priority : priorityToDoList.HIGHT,}, 
]

// NAME_TASK.append(To_Do[0].name)
    // NAME_TASK.insertAdjacentHTML('afterbegin', i.name);


function showTask() {
    if(Array.isArray(To_Do) && To_Do.length === 0){
        console.log("empty");
    } else {
        for(let i in statusToDoList) {
        console.log(statusToDoList[i]);
            To_Do.forEach(e => {
                if(statusToDoList[i] == e.status){
                    console.log(e);
                    // console.log(`${e.name} ${e.status} ${e.priority}`);
                }
            })
        }
    }
}

function addTask(nameTask) {
    let findName = To_Do.map(item => item.name)
    // console.log(findName);
    let addTasks = {name : nameTask, status : statusToDoList.TO_DO, priority : priorityToDoList.HIGHT,};
    if (findName.includes(nameTask)) {
        console.log("задача уже существует");
    } else {
        To_Do.push(addTasks)
    }
}

function dellTaskc(nameTask) {
    let findName = To_Do.map(item => item.name)
    if (findName.includes(nameTask)) {
        To_Do.pop(nameTask)
    } else {
        console.log("задача не существует");
    }
}

function changeStatus(name, checkStatus) {
    let checkSt = To_Do.map(i => i.name);
    let checkID = checkSt.indexOf(name);
    if(checkSt.includes(name)) {
        if(To_Do[checkID].status === checkStatus){
            console.log("статус уже существует");
        } else {
            To_Do[checkID].status = checkStatus
        }
    } else {
        console.log("задачa не существует");
    }
}

function changePriority(name, checkStatus) {
    let checkSt = To_Do.map(i => i.name);
    let checkID = checkSt.indexOf(name);
    if(checkSt.includes(name)) {
        if(To_Do[checkID].priority === checkStatus){
            console.log("статус уже существует");
        } else {
            To_Do[checkID].priority = checkStatus
        }
    } else {
        console.log("задачa не существует");
    }
}
// dellTaskc("create task 4")
// addTask("помыть полы")
// changeStatus("create task 1", statusToDoList.TO_DO)
// changePriority("create task 1", priorityToDoList.HIGHT)
// showTask()