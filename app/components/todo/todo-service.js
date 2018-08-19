const todoApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/ChrisBrownie55/todos/',
  timeout: 3000
});

function logError(error) {
  console.error(error);
}

let todoList = [];

export default class TodoService {
  constructor() {
    this.retryCount = 0;
    this.retryMax = 5;
  }

  getTodos() {
    return todoApi
      .get('')
      .then(res => ((todoList = res.data.data), res.data))
      .catch(error => {
        logError(error);
        if (++this.retryCount > this.retryMax) {
          document.getElementById(
            'toasts'
          ).innerHTML += `<toast-message>Unable to load Todos.</toast-message>`;
          return (this.retryCount = 0);
        }
        document.getElementById(
          'toasts'
        ).innerHTML += `<toast-message>Trying to get Todos.</toast-message>`;
        return this.getTodos();
      });
  }

  addTodo(todo) {
    return todoApi
      .post('', todo)
      .then(res => res.data)
      .catch(logError);
  }

  toggleTodoStatus(todoId) {
    const todo = todoList.find(todo => todo._id === todoId);
    if (!todo) {
      return;
    }

    return todoApi
      .put(todoId, {
        ...todo,
        completed: !todo.completed
      })
      .then(res => res.data)
      .catch(logError);
  }

  removeTodo(todoId) {
    return todoApi.delete(todoId).then(res => res.data);
  }
}
