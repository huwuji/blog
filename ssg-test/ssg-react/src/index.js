import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MyInfo from './router/MyInfo';

import reportWebVitals from './reportWebVitals';

const routers = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/myinfo" element={<MyInfo />} />
    </Routes>
  </BrowserRouter>
);

if (window._useSsg) {
  console.log('_useSsg');
  hydrate(routers, document.getElementById('root'));
} else {
  console.log('no_useSsg');

  ReactDOM.render(routers, document.getElementById('root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
