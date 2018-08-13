// Prepare some objects we're going to need
var toDoList = document.getElementById("todo-list");
var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-completed-button");
var emptyButton = document.getElementById("empty-button");
var saveButton = document.getElementById("save-button");
var toDoEntryBox = document.getElementById("to-do-entry-box");


// This function creates a new to-do list item
function newToDoItem(itemText, completed) {
    // Create a new list item
    var toDoItem = document.createElement("li");
    // Create a new piece of text on the web page
    var todoText = document.createTextNode(itemText);
    // Put that text inside the list item
    toDoItem.appendChild(todoText);

    // If the to-do is completed, give it the completed class
    if (completed) {
        toDoItem.classList.add("completed");
    }
    // Add the to-do item to the to-do list
    toDoList.appendChild(toDoItem);

    // Add a doubleclick listener to the item
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

// This function adds an item to the to-do list
function addToDoItem() {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

// This function cleans up all the completed to-do items
function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

// This function resets the to-do list to blank
function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

// This function loads the to-do list when the page loads
function loadList() {
    if (localStorage.getItem("toDos") === null) {
        newToDoItem("My", false);
        newToDoItem("to-do", true);
        newToDoItem("list", false);
    } else {
        loadListFromStorage();
    }
}

// This function toggles the state of a to-do item
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

// This function saves the to-do list to local storage
function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadListFromStorage() {
    var toDos = JSON.parse(localStorage.getItem("toDos"));

    for (var i = 0; i < toDos.length; i++) {
        var toDo = toDos[i];
        newToDoItem(toDo.task, toDo.completed);
    }
}

// Load the to-do list when the page loads

loadList();

// Wire up the buttons

addButton.addEventListener("click", addToDoItem);

clearButton.addEventListener("click", clearCompletedToDoItems);

emptyButton.addEventListener("click", emptyList);

saveButton.addEventListener("click", saveList);