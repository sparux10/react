import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App';
import MenuContext from './Context/MenuContext';
import EditContext from './Context/EditContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <EditContext>
        <MenuContext>
            <Router>
                <App />
            </Router>
        </MenuContext>
    </EditContext>
);
