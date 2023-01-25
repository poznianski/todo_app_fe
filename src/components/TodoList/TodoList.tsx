import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListItem';

type Props = {
  todos: Todo[];
  removeTodo: (todoId: number) => Promise<void>;
  isAdding: boolean;
  tempTodo: Todo;
  todoIdsToRemove: number[];
  toggleTodoStatus: (todoData: Todo) => Promise<void>;
  updateTodo: (todoData: Todo) => Promise<void>;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    removeTodo,
    isAdding,
    tempTodo,
    todoIdsToRemove,
    toggleTodoStatus,
    updateTodo,
  }) => (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          isLoading={todoIdsToRemove.includes(todo.id)}
          onRemove={removeTodo}
          toggleTodoStatus={toggleTodoStatus}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}

      {isAdding && (
        <TodoListItem
          todo={tempTodo}
          isLoading={isAdding}
          toggleTodoStatus={toggleTodoStatus}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      )}
    </section>
  )
);
