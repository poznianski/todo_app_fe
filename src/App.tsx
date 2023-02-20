import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getAllTodos,
  addTodo,
  removeTodo,
  updateTodo,
  updateAllTodos,
  deleteAllTodos,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';
import { ThemeContext } from './contexts/theme-context';
import { Nav } from './components/Nav/Nav';
import { getTimeForGreeting } from './utils/getTime';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [todoIdsToRemove, setTodoIdsToRemove] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
  });
  const isBrowserDefaultDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());

  const loadTodos = () => {
    getAllTodos().then(setTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addNewTodoToServer = async (title: string) => {
    try {
      if (user) {
        setIsAdding(true);

        const newTodo: Todo = await addTodo(title);

        setTodos([...todos, newTodo]);
        setIsAdding(false);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage('Unable to add a todo');
    }
  };

  const removeTodoFromServer = useCallback(async (todoId: number) => {
    try {
      if (user) {
        await removeTodo(todoId);

        loadTodos();
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage('Unable to remove ToDo');
    }
  }, []);

  const completedTodos = useMemo(
    () => todos.filter(({ completed }) => completed),
    [todos]
  );

  const filteredTodos = useMemo(
    () =>
      todos.filter(({ completed }) => {
        switch (filterType) {
          case FilterType.Active:
            return !completed;

          case FilterType.Completed:
            return completed;

          default:
            return true;
        }
      }),
    [todos, filterType]
  );

  const removeAllCompletedTodos = async () => {
    try {
      deleteAllTodos(
        todos.filter((todo) => todo.completed).map((todo) => todo.id)
      ).then(loadTodos);
    } catch (error) {
      setErrorMessage('Unable to remove all completed todo');
      setHasError(true);
    }
  };

  const toggleTodoStatus = useCallback(async (todoData: Todo) => {
    try {
      await updateTodo(todoData);
      loadTodos();
    } catch (error) {
      setHasError(true);
      setErrorMessage('Unable to toggle ToDo status');
    }
  }, []);

  const toggleAllTodosStatus = async (completed: boolean) => {
    try {
      updateAllTodos(
        todos
          .filter((todo) => todo.completed !== completed)
          .map((todo) => ({ ...todo, completed }))
      ).then(loadTodos);
    } catch (error) {
      setHasError(true);
      setErrorMessage('Unable to toggle all ToDos status');
    }
  };

  const setNewTodoTitleToServer = useCallback((todoData: Todo) => {
    try {
      updateTodo(todoData).then(loadTodos);
    } catch (error) {
      setHasError(true);
      setErrorMessage('Unable to update a todo');
    }
  }, []);

  const closeNotification = useCallback(() => setHasError(false), []);

  useEffect(() => {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }, [hasError]);

  let userName = JSON.parse(localStorage.getItem('user')).name;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <div className="layout-wrapper">
          <div className="container-wrapper">
            <div className="todoapp">
              <Nav />
              <h1 className="todoapp__title">
                {getTimeForGreeting()}, {userName}
              </h1>
              <div className="todoapp__content">
                <Header
                  newTodoField={newTodoField}
                  setHasError={setHasError}
                  setErrorMessage={setErrorMessage}
                  addNewTodo={addNewTodoToServer}
                  isAdding={isAdding}
                  toggleAllTodosStatus={toggleAllTodosStatus}
                  todosLength={todos.length}
                  completedTodosLen={completedTodos.length}
                  filteredTodos={filteredTodos}
                />

                {todos.length > 0 && (
                  <>
                    <TodoList
                      todos={filteredTodos}
                      removeTodo={removeTodoFromServer}
                      isAdding={isAdding}
                      tempTodo={tempTodo}
                      todoIdsToRemove={todoIdsToRemove}
                      toggleTodoStatus={toggleTodoStatus}
                      updateTodo={setNewTodoTitleToServer}
                    />

                    <Footer
                      filterType={filterType}
                      setFilterType={setFilterType}
                      todosLength={todos.length}
                      completedTodos={completedTodos.length}
                      onRemove={removeAllCompletedTodos}
                    />
                  </>
                )}
              </div>

              <Error hasError={hasError} onClose={closeNotification}>
                {errorMessage}
              </Error>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
