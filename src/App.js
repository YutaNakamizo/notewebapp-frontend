import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { App as AppMain } from '~/containers/App';

export const App = withRouter(() => {
  return (
    <div className="App">
      <AppMain />
      {/*<Backdrop open={true} style={{ zIndex: 2000 }}>
        <CircularProgress style={{ color: '#fff' }} />
      </Backdrop>*/}
    </div>
  );
});

