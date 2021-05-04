import {useEffect} from 'react';
import { ServiceFactory } from './services/todo';

const useTodoService = ServiceFactory({
  checkOnSubmit: ({ todoText, isValid }) => {
    if (!isValid || todoText.length === 0) {
      return false;
    }

    return true;
  },
});

export default function TodoV1() {
  const service = useTodoService();
  const { todoText, isValid, todoList } = service;

  // extend logic hooks
  useEffect(() => {
    if (todoText.length === 0) {
      service.setValid(false);
    } else {
      service.setValid(true);
    }
  }, [todoText]);

  return (
    <>
      <form onSubmit={service.addTodo}>
        <input type="text" value={todoText} onChange={e => service.setTodoText(e.target.value)} />
        <button disabled={!isValid} type="submit">add todo</button>
        <button type="button" onClick={service.clearItems}>clear items</button>
      </form>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
