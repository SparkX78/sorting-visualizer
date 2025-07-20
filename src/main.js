import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = document.getElementById('root');
if (root) {
    ReactDOM.createRoot(root).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
}
else {
    console.error("❌ No <div id='root'> found in index.html");
}
