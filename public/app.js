$(document).ready(function() {
    $.getJSON("/api/todos") //fetch data using ajax call
        .then(addTodos)

    $("#todoInput").keypress(function(event) {
        if (event.which == 13) //if keypress "Enter" keycode = 13
            createTodo();
    });
});

function addTodos(todos) {
    //add todos to the page here
    todos.forEach(function(todo) {
         addTodo(todo)    
    }, this);
}

function addTodo(todo) {
    var Todo = $("<li class='task'>" + todo.name + "</li>");
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