import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
// import UsersContextProvider from "./contexts/usersContext";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <UsersContextProvider> */}
    <App />
    {/* </UsersContextProvider> */}
  </Provider>,
)
