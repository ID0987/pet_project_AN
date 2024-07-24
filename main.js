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

const arrToDoList = [];
const arrlocalDate = [];

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

// ADD_ITEM_FORM
// const formItem = ADD_ITEM_FORM.elements;
// console.log(formItem);

// for(let i = 0; i < formItem.length; i++) {
//     formItem[i].addEventListener("change", changeForm)
// }

// function changeForm() {
//     if (this.type === "text") {
//         console.log(this);
//     } else {
//         console.log(typeText);
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    // const form = document.getElementById('addItemForm');
    const form = document.forms.formHTML;
    console.log(form.elements);
    const lowInput = localStorage.getItem('low');
    console.log(lowInput);
    const hightInput = localStorage.getItem('hight');
    const middleInput = localStorage.getItem('middle');

    if (lowInput) {
        form.elements['low'].value = lowInput;
        console.log(form.elements['low']);
    }
    else  if (hightInput) {
        form.elements['hight'].value = hightInput;
    }
    else if (middleInput) {
        form.elements['middle'].value = middleInput;
    } 
    else { console.log(form.elements['low'])
    }
});

for(let i = 0; i < ADD_TASK_BTN.length; i++) {
    ADD_TASK_BTN[i].addEventListener("click", saveForm)
    console.log(ADD_TASK_BTN[i].name);

}
function saveForm() {
    
    // const form = document.getElementById('addItemForm');
    const form = document.forms.formHTML;
    console.log(form.elements['low']);
    const lowInput = form.elements['low'].value;
    const hightInput = form.elements['hight'].value;
    const middleInput = form.elements['middle'].value;
    
    // Сохранение данных формы в localStorage
    for(let i = 0; i < ADD_TASK_BTN.length; i++) {
    
    
        if(ADD_TASK_BTN[i].name === "low"){
            localStorage.setItem('lowInput', lowInput);
        }
        if(ADD_TASK_BTN[i].name === "hight"){
        localStorage.setItem('hightInput', hightInput);
        }
        if(ADD_TASK_BTN[i].name === "middle"){
        localStorage.setItem('middleInput', middleInput);
        }
    }
}









function addTasks(e) {
    e.preventDefault();
    const getParentTarget = e.target.parentElement;
    // closest(".newTask")
    // const localDate = JSON.parse(localStorage.getItem('user'));

    // for (const i of arrlocalDate){
    //     ADD_ITEM_FORM = i
    // }

    const getInputValue = getParentTarget.querySelector('.addTaskinput');
    if (getInputValue.value === "" ) return; 
    else{
        for(const key in priorityToDoList) {
            const getName = getParentTarget.querySelector(`#${priorityToDoList[key]}`)
            
            if (getName) {
                if (arrToDoList.find(e => e.name === getName.value)) return;
                const newTask = {name: getName.value, priority: priorityToDoList[key], status: statusToDoList.IN_PROGRESS};
                console.log(newTask);

                arrToDoList.push(newTask);
                
                

                ADD_TASK_INPUT.forEach(e => e.value = "")
            }
        }
        rendorState(e)

    }
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

                // const localDate = localStorage.setItem("name", JSON.stringify(addInnerHtml));
                // console.log(localDate);

                // arrlocalDate.push(localDate);
                // console.log(arrlocalDate);
                

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

    // localStorage.removeItem();

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