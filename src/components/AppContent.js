import React from 'react';
import { connect } from 'react-redux';
import * as noteActions from '~/modules/note';
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
  cardBody: {
    'whiteSpace': 'pre-wrap',
  },
}));

const mapStateToProps = state => {
  const { note } = state;
  return {
    ...note,
  };
};

export const AppContent = connect(mapStateToProps)(({
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
              <Typography
                variant="subtitle1"
                component="h3"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                className={classes.cardBody}
              >
                {body}
              </Typography>
            </Card>
          );
        })}
      </Container>
    </>
  );
});

