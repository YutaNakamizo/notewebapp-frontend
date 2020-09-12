import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.amber[500]
    }
  }
});

export const App = withRouter(() => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Backdrop open={true} style={{ zIndex: 2000 }}>
          <CircularProgress style={{ color: '#fff' }} />
        </Backdrop>
      </div>
    </ThemeProvider>
  );
});

