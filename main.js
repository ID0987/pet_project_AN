import { 
    NEW_TASK,
    NAME_TASK,
    STATUS_TASK,
    PRIORITY_TASK,
    ADD_TASK_INPUT,
    ADD_TASK_BTN,
    DEL_TASK,
} from "./constToDoList.js";

document.querySelector(".wrapperTask").addEventListener("click", aTest)

function aTest(e) {
    // console.log(e.target.closest(".addTaskinput").value != "");
    if(!e.target.classList.contains("addTaskBtn")) return;
    console.log("ok");
    // console.log(ADD_TASK_INPUT.value);
    
     ////

    if(e.target.closest(".Low")) {
        console.log(ADD_TASK_INPUT.value);
        // console.log(e.target.closest(".addTaskinput").value != "");
        // console.log(e.closest(".addTaskinput"));
        
            // e.target.closest(".addTaskinput").getAttribute(value)
            let containerTask = e.target.closest(".Low")
            let getValue = containerTask.querySelector(".addTaskinput").value
        if(getValue != "") {            
            containerTask.innerHTML += `<div class='conteinerTasks'> <div class='task'> <div class='nameTask'> ${getValue} </div> <div class='BlockStatus'><div class='statusTask'>c</div><button class='delTask'>x</button></div></div><div>`
        } else {
            containerTask.querySelector(".addTaskinput").placeholder = "введите текст"
            containerTask.querySelector(".addTaskinput").style.border = " 1px solid red"
            setTimeout(() => containerTask.querySelector(".addTaskinput").style.border = "", 1000);
        }
    }
    if(e.target.closest(".Hight")) {
        let containerTask = e.target.closest(".Hight")
        let getValue = containerTask.querySelector(".addTaskinput").value
        if(getValue != "") {
            containerTask.innerHTML += `<div class='conteinerTasks'> <div class='task'> <div class='nameTask'> ${getValue} </div> <div class='BlockStatus'><div class='statusTask'>c</div><button class='delTask'>x</button></div></div><div>`
        } else {
            containerTask.querySelector(".addTaskinput").placeholder = "введите текст"
            containerTask.querySelector(".addTaskinput").style.border = " 1px solid red"
            setTimeout(() => containerTask.querySelector(".addTaskinput").style.border = "", 1000);
        }
    }
    if(e.target.closest(".Middle")) {
        let containerTask = e.target.closest(".Middle")
        let getValue = containerTask.querySelector(".addTaskinput").value
        if(getValue != "") {
            containerTask.innerHTML += `<div class='conteinerTasks'> <div class='task'> <div class='nameTask'> ${getValue} </div> <div class='BlockStatus'><div class='statusTask'>c</div><button class='delTask'>x</button></div></div><div>`
        } else {
            containerTask.querySelector(".addTaskinput").placeholder = "введите текст"
            containerTask.querySelector(".addTaskinput").style.border = " 1px solid red"
            setTimeout(() => containerTask.querySelector(".addTaskinput").style.border = "", 1000);
        }
    }
    
    

    // let item = e.target.closest(ADD_TASK_BTN);

    // let divTask = document.createElement("div")
    // divTask.classList.add("nameTask")
    // NEW_TASK.append(divTask)

    // let divNameTask = document.createElement("div")
    // divNameTask.innerHTML = "hello name"
    // divNameTask.classList.add("nameTask")
    // divTask.append(divNameTask)

    // let divBlockStatus = document.createElement("div")
    // divBlockStatus.classList.add("nameTasks")
    // divTask.append(divBlockStatus)

    // let divStatus = document.createElement("div")
    // divStatus.innerHTML = "status"
    // divStatus.classList.add("nameTask")
    // divBlockStatus.append(divStatus)

    // let divDell = document.createElement("button")
    // divDell.innerHTML = "x"
    // divDell.classList.add("nameTask")
    // divBlockStatus.append(divDell)

}

























const statusToDoList = {
    IN_PROGRESS : "In Progress",
    DONE : "Done",
    TO_DO : "To Do",
}

const priorityToDoList = {
    LOW : "low",
    MIDDLE : "middle",
    HIGHT : "hight",
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
    // let nameTask = ADD_TASK_INPUT.value
    console.log();
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