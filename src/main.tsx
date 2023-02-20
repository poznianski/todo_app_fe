import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';
import './styles/normalize.scss';

import React from 'react';
import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
