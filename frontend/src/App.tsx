import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <div className="App">
      <ToastContainer pauseOnFocusLoss={false} limit={8}/>
      {/* <LoginPage /> */}
      <RegisterPage />
    </div>
  );
}

export default App;
