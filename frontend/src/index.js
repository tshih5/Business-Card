import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store/configureStore';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
     <Route path="/" component={App} />
    </Router>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <Root store ={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
