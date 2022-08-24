import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AppRouter from './components/AppRouter';
import TopNavBar from './components/TopNavBar';
import { AuthProvider } from './services/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ToastContainer pauseOnFocusLoss={false} limit={8} />
        <TopNavBar />
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;
