var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

function addToDoItem() {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

var toDoList = document.getElementById("todo-list");
var toDoEntryBox = document.getElementById("todo-entry-box");

// This function creates a new to-do list item
function newToDoItem(itemText, completed) {
    // Create a new list item
    var toDoItem = document.createElement("li");
    // Create a new piece of text on the web page
    var toDoText = document.createTextNode(itemText);
    // Put that text inside the list item
    toDoItem.appendChild(toDoText);

    // If the to-do is completed, give it the completed class
    if (completed) {
        toDoItem.classList.add("completed");
    }
    // Add the to-do item to the to-do list
    toDoList.appendChild(toDoItem);

    // Add a doubleclick listener to the item
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

var clearButton = document.getElementById("clear-completed-button");
clearButton.addEventListener("click", clearCompletedToDoItems);
// This function cleans up all the completed to-do items
function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);
// This function resets the to-do list to blank
function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

// This function toggles the state of a todo item
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

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

// This function loads the to-do list when the page loads
function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
    else{
        newToDoItem("My", false);
        newToDoItem("to-do", true);
        newToDoItem("list", false);
    }
}

// Load the to-do list when the page loads
loadList();