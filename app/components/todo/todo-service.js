const todoApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/ChrisBrownie55/todos/',
  timeout: 3000
});

function logError(error) {
  console.error(error);
}

let todoList = [];

export default class TodoService {
  getTodos() {
    return todoApi
      .get('')
      .then(
        res => (
          console.log('getTodos:', res.data),
          (todoList = res.data.data),
          res.data
        )
      )
      .catch(logError);
  }

  addTodo(todo) {
    return todoApi
      .post('', todo)
      .then(res => (console.log('addTodo:', res.data), res.data))
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
      .then(res => (console.log('toggleTodoStatus:', res.data), res.data))
      .catch(logError);
  }

  removeTodo(todoId) {
    return todoApi
      .delete(todoId)
      .then(res => (console.log('removeTodo:', res.data), res.data));
  }
}
