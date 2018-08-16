import TodoService from './todo-service.js';

var todoService = new TodoService();
const todosContainer = document.getElementById('todos');
const todoCount = document.getElementById('todo-count');

// Use this getTodos function as your callback for all other edits
async function getTodos() {
  draw((await todoService.getTodos()).data);
}

function draw(todos) {
  console.log('draw:', todos);

  let toBeCompleted = 0;

  todosContainer.innerHTML = todos
    .map(
      todo => (
        !todo.completed && toBeCompleted++,
        `
			<article class='todo material checkbox'>
				<input
					type='checkbox'
					id='todo-${todo._id}'
					${todo.completed ? 'checked' : ''}
					onchange='app.controllers.todos.toggleTodoStatus("${todo._id}")'
				/>
				<label for='todo-${todo._id}'>${todo.description}</label>
			</article>`
      )
    )
    .join('');

  todoCount.textContent = toBeCompleted;
}

export default class TodoController {
  constructor() {
    getTodos();
  }

  async addTodo(text) {
    await todoService.addTodo({
      description: text
    });
    getTodos();
  }

  async toggleTodoStatus(todoId) {
    await todoService.toggleTodoStatus(todoId);
    getTodos();
  }

  async removeTodo(todoId) {
    await todoService.removeTodo(todoId);
    getTodos();
  }
}
