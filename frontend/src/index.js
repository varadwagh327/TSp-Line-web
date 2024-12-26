import React,{ createContext, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { Toaster } from 'react-hot-toast';


export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      <App />
      <Toaster />
    </Context.Provider>
  );
};



ReactDOM.render(
  <React.StrictMode>
     <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
