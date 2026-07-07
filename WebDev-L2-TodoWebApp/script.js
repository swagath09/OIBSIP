const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function updateStats(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}

function displayTasks(){

    taskList.innerHTML = "";

    if(tasks.length === 0){

        emptyMessage.style.display = "block";

    }

    else{

        emptyMessage.style.display = "none";

    }

    tasks.forEach((task,index)=>{

        const div = document.createElement("div");

        div.className = task.completed ? "task completed fade" : "task fade";

        div.innerHTML = `

        <div class="task-left">

            <h3>${task.name}</h3>

            <p>📅 ${task.date || "No Due Date"}</p>

            <span class="priority ${task.priority.toLowerCase()}">

                ${task.priority}

            </span>

        </div>

        <div class="task-actions">

            <button class="complete-btn">

                <i class="fa-solid fa-check"></i>

            </button>

            <button class="edit-btn">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button class="delete-btn">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        div.querySelector(".complete-btn").onclick = ()=>{

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();

        };

        div.querySelector(".delete-btn").onclick = ()=>{

            tasks.splice(index,1);

            saveTasks();

            displayTasks();

        };

        taskList.appendChild(div);

    });

    updateStats();

}

addBtn.addEventListener("click",()=>{

    const name = taskInput.value.trim();

    if(name===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        name:name,

        priority:priority.value,

        date:dueDate.value,

        completed:false

    });

    saveTasks();

    displayTasks();

    taskInput.value="";

    dueDate.value="";

});

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        addBtn.click();

    }

});

displayTasks();

function editTask(index){

    const newTask = prompt("Edit Task", tasks[index].name);

    if(newTask === null) return;

    if(newTask.trim() === ""){

        alert("Task cannot be empty.");

        return;

    }

    tasks[index].name = newTask.trim();

    saveTasks();

    displayTasks();

}

function attachEditButtons(){

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach((button,index)=>{

        button.addEventListener("click",()=>{

            editTask(index);

        });

    });

}

attachEditButtons();

const searchTask = document.getElementById("searchTask");

searchTask.addEventListener("keyup",()=>{

    const value = searchTask.value.toLowerCase();

    const cards = document.querySelectorAll(".task");

    cards.forEach(card=>{

        const text = card.querySelector("h3").textContent.toLowerCase();

        if(text.includes(value)){

            card.style.display="flex";

        }

        else{

            card.style.display="none";

        }

    });

});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        const cards = document.querySelectorAll(".task");

        cards.forEach(card=>{

            if(filter==="all"){

                card.style.display="flex";

            }

            else if(filter==="completed"){

                if(card.classList.contains("completed")){

                    card.style.display="flex";

                }

                else{

                    card.style.display="none";

                }

            }

            else{

                if(card.classList.contains("completed")){

                    card.style.display="none";

                }

                else{

                    card.style.display="flex";

                }

            }

        });

    });

});

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

const oldDisplay = displayTasks;

displayTasks = function(){

    oldDisplay();

    attachEditButtons();

}

document.addEventListener("click", (e) => {

    if (e.target.closest(".delete-btn")) {

        const button = e.target.closest(".delete-btn");

        const cards = [...document.querySelectorAll(".delete-btn")];

        const index = cards.indexOf(button);

        if (confirm("Are you sure you want to delete this task?")) {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

            showToast("Task Deleted Successfully");

        }

    }

});

const today = new Date().toISOString().split("T")[0];

dueDate.min = today;

const toast = document.createElement("div");

toast.id = "toast";

document.body.appendChild(toast);

function showToast(message) {

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

const originalClick = addBtn.onclick;

addBtn.addEventListener("click", () => {

    if (taskInput.value.trim() !== "") {

        showToast("Task Added Successfully");

    }

});

function highlightOverdue() {

    const cards = document.querySelectorAll(".task");

    cards.forEach((card, index) => {

        const taskDate = tasks[index].date;

        if (!taskDate) return;

        const today = new Date();

        const due = new Date(taskDate);

        if (due < today && !tasks[index].completed) {

            card.style.borderLeft = "6px solid red";

        }

    });

}

const oldDisplayTasks = displayTasks;

displayTasks = function () {

    oldDisplayTasks();

    attachEditButtons();

    highlightOverdue();

};

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "0.8s";

    setTimeout(() => {

        document.body.style.opacity = "1";

    }, 200);

});

displayTasks();