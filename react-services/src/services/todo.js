const {useState} = require("react");

export function ServiceFactory({ checkOnSubmit } = {}) {
  return function useTodoService() {
    // state
    const [todoList, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [isValid, setValid] = useState(true);

    // context reference
    // use for stage callbacks
    // hello function components and goodbye class components?
    const ctx = {};

    // actions
    const addTodo = event => {
      if (event && typeof event === 'object' && event.preventDefault) {
        event.preventDefault();
      }

      if (typeof checkOnSubmit === 'function' && checkOnSubmit(ctx) === false) {
        return;
      }

      setTodos(prev => [...prev, todoText]);
      setTodoText('');
    };

    const clearItems = () => {
      setTodos([]);
    };


    // build actual context
    Object.assign(ctx, {
      todoList,
      setTodos,
      todoText,
      setTodoText,
      addTodo,
      clearItems,
      isValid,
      setValid,
    });

    return ctx;
  }
}
