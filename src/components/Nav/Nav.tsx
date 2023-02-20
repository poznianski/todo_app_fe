import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';

export const Nav: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
  };

  return (
    <div className="toggle-btn-section">
      <div className={`toggle-checkbox m-vertical-auto`}>
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="checkbox"
          onChange={handleThemeChange}
          checked={theme === 'light'}
        />
        <button
          type="button"
          className={`toggle-btn__input-label`}
          onClick={handleThemeChange}
        ></button>
      </div>
    </div>
  );
};
