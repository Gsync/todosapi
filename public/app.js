$(document).ready(function() {
    $.getJSON("/api/todos") //fetch data using ajax call
        .then(addTodos)

    $("#todoInput").keypress(function(event) {
        if (event.which == 13) //if keypress "Enter" keycode = 13
            createTodo();
    });

    $(".list").on("click", "li", function() {
        updateTodo($(this));
    });

    $(".list").on("click", "span", function(e) {
        e.stopPropagation(); //stops the event to trigger parent li event
       removeTodo($(this).parent());
    });
});

function addTodos(todos) {
    //add todos to the page here
    todos.forEach(function(todo) {
         addTodo(todo)    
    }, this);
}

function addTodo(todo) {
    var Todo = $("<li class='task'>" + todo.name + "<span>Delete</span></li>");
    Todo.data("id", todo._id); //assign id = _id to the variable based on li
    Todo.data("completed", todo.completed); //assign completed = true/false to the variable based on li
    if (todo.completed) {
        Todo.addClass("done");
    }
    $(".list").append(Todo);   
}

function createTodo() {
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
        .then(function(newtodo) {
            if ($("#todoInput").val().length > 0) {
                addTodo(newtodo);
                $("#todoInput").val("");
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}

function removeTodo(todo) {
    var clickId = todo.data("id");
    var delUrl = "/api/todos/" + clickId;
    $.ajax({
        method: "Delete",
        url: delUrl
    })
    .then(function(data) {
        todo.remove();
    })
}

function updateTodo(todo) {
    var updateUrl = "/api/todos/" + todo.data("id");
    var isCompleted = !todo.data("completed");
    var updateData = {completed: isCompleted}; //change the completed status to true/false
    $.ajax({
        method: "Put",
        url: updateUrl,
        data: updateData
    })
    .then(function(update) {
        todo.toggleClass("done"); //toggle css class
        todo.data("completed", isCompleted);
    })
}