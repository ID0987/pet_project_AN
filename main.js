import { 
    NEW_TASK,
    NAME_TASK,
    STATUS_TASK,
    PRIORITY_TASK,
    ADD_TASK_INPUT,
    ADD_TASK_BTN,
    DEL_TASK,
    ADD_ITEM_FORM,
} from "./constToDoList.js";

const arrItems = /*JSON.parse(localStorage.getItem('item')) ||*/ [];

const priorityToDoList = {
    LOW : "low",
    MIDDLE : "middle",
    HIGHT : "hight",
}

const statusToDoList = {
    IN_PROGRESS : "In Progress",
    DONE : "Done",
    TO_DO : "To Do",
}

document.querySelector(".wrapperTask").addEventListener("click", addTasks)

function addTasks(e) {
    e.preventDefault();
    // console.log(e.target.closest(".addTaskinput").value != "");
    if(!e.target.classList.contains("addTaskBtn")) return;
    // console.log(ADD_TASK_INPUT.value);
        
    rendorState(e)
}

function rendorState(e) {
    e.preventDefault();
    for(const key in priorityToDoList) {
        let containerTask = e.target.closest(`.${priorityToDoList[key]}`)
        if(containerTask) {     
            let findName = arrItems.map(item => item.name)
            
            const getValue = containerTask.querySelector(".addTaskinput").value
            const item = {name: getValue, priority: key, stats: key}
            if(getValue != "" && !findName.includes(getValue)) {
                arrItems.push(item)
                // localStorage.setItem("item", JSON.stringify(arrItems) )
                console.log("задача добавлена");    
                console.log(arrItems);        
                let addInnerHtml = `
                <div class='conteinerTasks'>
                    <div class='task'>
                        <div class='nameTask'> ${getValue} </div>
                        <div class='BlockStatus'>
                            <div class='statusTask'> ${priorityToDoList[key]} </div>
                            <button class='delTask'>x</button>
                        </div>
                    </div>
                <div>`
                let innerAddHtml = containerTask.insertAdjacentHTML('beforeend', addInnerHtml)
                
            } else {
                containerTask.querySelector(".addTaskinput").placeholder = "введите текст"
                containerTask.querySelector(".addTaskinput").style.border = " 1px solid red"
                setTimeout(() => containerTask.querySelector(".addTaskinput").style.border = "", 1000);
            }
        }
        showTaskHTML(e)
    }
    
    //удалялись элементы на странице

    //затем добавлялись на страницу из массива
    // e.preventDefault();
    
}

function showTaskHTML(e) {
    // e.preventDefault();
    const task = document.querySelectorAll('.conteinerTasks');
    task.forEach(el => el.remove());
    // for(const key in priorityToDoList) {
    //     let containerTask = e.target.closest(`.${priorityToDoList[key]}`)
    // }
    for(const key of arrItems) {
        for(let keyc of priorityToDoList) {
            let containerTask = e.target.closest(`.${priorityToDoList[keyc]}`)
            if(containerTask) {
                let addInnerHtml = `
                    <div class='conteinerTasks'>
                        <div class='task'>
                            <div class='nameTask'> ${getValue} </div>
                            <div class='BlockStatus'>
                                <div class='statusTask'> ${priorityToDoList[keyc]} </div>
                                <button class='delTask'>x</button>
                            </div>
                        </div>
                    <div>`
                containerTask.insertAdjacentHTML('beforeend', addInnerHtml)
                console.log("fast");
            }
            console.log("key.map(a => a.task)");
        }
    }
}

document.querySelector(".wrapper").addEventListener("click", delTask)

function delTask(e) {
    if(!e.target.closest(".delTask")) return 
    let item = e.target.closest(".conteinerTasks")
    item.remove()

    //rendorState()
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