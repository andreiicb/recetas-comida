import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './styles.css';  // Asegúrate de que este archivo exista para los estilos globales

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
