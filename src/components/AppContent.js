import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Card,
  Typography,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const AppContent = ({
  notes,
  ...props
}) => {
  const classes = useStyle();
  return (
    <>
      <Container maxWidth="sm">
        {Array.isArray(notes) && notes.map(note => {
          const { id, title, body, dateCreated, dateLastModified, archived } = note;
          return (
            <Card key={id} variant="outlined" className={classes.card}>
              <Typography variant="subtitle1" component="h3" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2">
                {body}
              </Typography>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

