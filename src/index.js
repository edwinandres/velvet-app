import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter} from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'animate.css/animate.min.css';

import { Provider } from 'react-redux';
import store from './redux/store';


export const browserHistory = createBrowserHistory({
                                                       basename : process.env.PUBLIC_URL
                                                   });

ReactDOM.render (
                  <React.StrictMode>
                    {/* <BrowserRouter history={browserHistory} basename={process.env.PUBLIC_URL}> */}
                    <Router history={browserHistory} basename={process.env.PUBLIC_URL}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                    </Router>
                  </React.StrictMode>,
                  document.getElementById('root')
                );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
