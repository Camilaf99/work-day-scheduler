function turnHourToString(currentHour) {
    let am = currentHour < 12;
    var currentHourText = "";
    if(!am) {
        if(currentHour > 12) {
            currentHourText = (currentHour - 12) + " PM";
        } else {
            currentHourText = currentHour + " PM";
        }
    } 
    else currentHourText = currentHour + " AM";
    if((!am && currentHour > 12) || (am && currentHour < 10)) {
        currentHourText = "0" + currentHourText;
    }
    return currentHourText;
}

var tasksForDay = ["Have breakfast", "", "", "", "Lunch with friends", "", "Send paperwork to Tommy", "", ""];

function renderHourlyTasks(tasks) {
    let scheduleElement = document.getElementById("schedule");
    scheduleElement.innerHTML = "";
    for(var i = 0; i < tasks.length; i++) {
        let currentTaskHour = i + 9;      
        let currentTaskHourStr = turnHourToString(currentTaskHour) 
        let hourRow = "<div id=\"hour" + currentTaskHour + "\" class=\"row time-block\"><div class=\"col-md-1 hour\">" + currentTaskHourStr + "</div><textarea id=\"task_" + i + "\" class=\"col-md-9 description\">" + tasks[i] + "</textarea><button class=\"btn saveBtn col-md-1\" onClick=\"saveTask(" + i + ");\"><i class=\"fas fa-save\"></i></button></div>";
        scheduleElement.innerHTML = scheduleElement.innerHTML + hourRow;
    }
}

function todaysDate() {
    let currentDate = moment().format("dddd, MMMM Do");
    document.getElementById("currentDay").textContent = currentDate;
}

function retrieveFromLocalStorage(forDate) {
    let stringifiedTasks = window.localStorage.getItem(forDate);
    if(!stringifiedTasks) {
        return ["", "", "", "", "", "", "", "", ""];
    } else {
        return JSON.parse(stringifiedTasks).tasks;
    }
}

function storeIntoLocalStorage(forDate, tasks) {
    let jsonTasks = {
        tasks: tasks
    };
    window.localStorage.setItem(forDate, JSON.stringify(jsonTasks));
}

function getCurrentDateForLocalStorage() {
    return moment().format("MMDDYYYY");
}

function saveTask(taskIndex) {
    let taskText = document.getElementById("task_" + taskIndex).value;
    tasksForDay[taskIndex] = taskText;
    storeIntoLocalStorage(getCurrentDateForLocalStorage(), tasksForDay);
}

todaysDate();
renderHourlyTasks(tasksForDay);



//let currentSchedule = {
//    tasks: tasksForDay
//}
//window.localStorage.setItem("04032022", JSON.stringify(currentSchedule));
//JSON.parse(window.localStorage.getItem("04032022"))

// Key:   04032022
// Value: ["", "", ""]