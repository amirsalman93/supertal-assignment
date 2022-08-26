import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AppRouter from './components/AppRouter';
import TopNavBar from './components/TopNavBar';
import { AuthProvider } from './services/AuthProvider';
import { RoutesProvider } from './services/RoutesProvider';

function App() {
  return (
    <AuthProvider>
      <RoutesProvider>
        <div className="App">
          <ToastContainer pauseOnFocusLoss={false} limit={8} />
          <TopNavBar />
          <AppRouter />
        </div>
      </RoutesProvider>
    </AuthProvider>
  );
}

export default App;
