import React from 'react';
import {
  Box,
  AppBar, Toolbar,
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

export const AppHeader = ({
  reflesh,
  onRefreshClick,
  ...props
}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h1" color="inherit">
          Note WebApp
        </Typography>
        <Box display="flex" flexGrow={1} />
        {
          reflesh ? (
            <Box display="flex" justifyContent="center" alignItems="center" style={{ width: 48, height: 48 }}>
              <CircularProgress
                color="inherit"
                size={24}
              />
            </Box>
          ) : (
            <IconButton
              onClick={onRefreshClick}
            >
              <RefreshIcon color="inherit" />
            </IconButton>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

