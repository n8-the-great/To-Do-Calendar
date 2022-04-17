const todoListRouter = require('express').Router();



// Routes needed:
// GET ':userEmail' -> For all data
// POST ':userEmail' -> Adding or Upserting a "todoList item"
// PATCH ':userEmail' -> For updating the data -> ex. Moving around item in Calendar / Lengthening item in Calendar / Clicking on "Done" in Modal for Calendar/TodoList
// DELETE ':userEmail' -> For deleting the data -> Clicking on "Delete" button in Modal

// The above list is also in Home.jsx, so also make the appropriate changes there, as well.

// Feel free to make any changes, additions, subtractions to the above list of routes we should be writing for the database queries. These are all that I could think of at the moment.
todoListRouter.route('/:userEmail').get((req, res) => {
  console.log('toDO route');
  res.send('userEmail');
})

todoListRouter.get((req, res) => {
  console.log('toDo route');
  res.send('Todo List Router GET');
})

module.exports = todoListRouter;