// React
import React from 'react';
import ReactDOM from 'react-dom';
// React Router
import { BrowserRouter as Router } from 'react-router-dom';
// Redux
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import reducer from './modules/reducer';
// Material UI
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';
import 'fontsource-roboto';
// Others
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.amber[500]
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
