import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // xóa React.StrictMode để tránh gọi useEffect 2 lần =))
  <React.StrictMode>
    <App />
  </React.StrictMode>
);