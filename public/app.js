$(document).ready(function() {
    $.getJSON("/api/todos") //fetch data using ajax call
        .then(addTodos)
});

function addTodos(todos) {
    //add todos to the page here
    todos.forEach(function(todo) {
        var Todo = $("<li class='task'>" + todo.name + "</li>");
        if (todo.completed) {
            Todo.addClass("done");
        }
        $(".list").append(Todo);        
    }, this);
}