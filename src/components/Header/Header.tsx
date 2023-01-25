import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { getAllTodos } from '../../api/todos';
import { FilterType } from '../../types/FilterType';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>
  setHasError: (status: boolean) => void
  setErrorMessage: (message: string) => void
  addNewTodo: (title: string) => Promise<void>
  isAdding: boolean
  toggleAllTodosStatus: (completed: boolean) => void
  todosLength: number
  completedTodosLen: number
  filteredTodos: boolean
}

export const Header: React.FC<Props> = React.memo(
  ({
    newTodoField,
    setHasError,
    setErrorMessage,
    addNewTodo,
    isAdding,
    todosLength,
    completedTodosLen,
    toggleAllTodosStatus,
  }) => {
    const [title, setTitle] = useState('')
    const isAllCompleted = completedTodosLen === todosLength;
    const hasActiveTodos = completedTodosLen > 0;

    const toggleAll = () => {
      toggleAllTodosStatus(!hasActiveTodos);
    };

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title.trim()) {
          setHasError(true)
          setErrorMessage('ToDo title can`t be empty!')

          return
        }

        addNewTodo(title.trim())
        setTitle('')
      },
      [title]
    )

    return (
      <header className="todoapp__header">
        {todosLength > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: isAllCompleted,
              hidden: todosLength < 1,
            })}
            aria-label="Toggle All"
            onClick={toggleAll}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={newTodoField}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isAdding}
          />
        </form>
      </header>
    )
  }
)
