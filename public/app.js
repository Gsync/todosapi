$(document).ready(function() {
    $.getJSON("/api/todos") //fetch data using ajax call
        .then(addTodos)

    $("#todoInput").keypress(function(event) {
        if (event.which == 13) //if keypress "Enter" keycode = 13
            createTodo();
    });

    $(".list").on("click", "span", function() {
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
    Todo.data("id", todo._id); //assign id to the variable based on li
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