import classNames from 'classnames';
import React, { useCallback } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterType: FilterType;
  setFilterType: (status: FilterType) => void;
  completedTodos: number;
  todosLength: number;
  onRemove: () => Promise<void>;
};

export const Footer: React.FC<Props> = React.memo(
  ({
    filterType, setFilterType, completedTodos, onRemove, todosLength,
  }) => {
    const uncompletedCount = todosLength - completedTodos;

    const handleFilterType = useCallback((status: FilterType) => {
      setFilterType(status);
    }, []);

    const filterHrefByType = {
      [FilterType.All]: '#/',
      [FilterType.Active]: '#/active',
      [FilterType.Completed]: '#/completed',
    };

    const filterTypeList = Object.values(FilterType);

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {uncompletedCount <= 1
            ? `${uncompletedCount} item left`
            : `${uncompletedCount} items left`}
        </span>

        <nav className="filter">
          {filterTypeList.map((status) => (
            <a
              data-cy="FilterLinkAll"
              href={filterHrefByType[status]}
              key={status}
              className={classNames('filter__link', {
                selected: filterType === status,
              })}
              onClick={() => handleFilterType(status)}
            >
              {status}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={classNames('todoapp__clear-completed', {
            hidden: completedTodos <= 0,
          })}
          onClick={onRemove}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
