import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
} from '@material-ui/core';
import { Editor } from '~/containers/Editor';

const useStyle = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  cardBody: {
    'whiteSpace': 'pre-wrap',
  },
}));

export const NoteCard = ({
  note,
  ...props
}) => {
  const { title, body, dateCreated, dateLastModified } = note;

  const [ editorIsOpen, setEditorIsOpen ] = useState(false);

  const formatDateLastModified = time => {
    const date = new Date(time);
    return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  };

  const openEditor = () => {
    setEditorIsOpen(true);
  };

  const closeEditor = () => {
    setEditorIsOpen(false);
  };
 
  const classes = useStyle();
  return (
    <>
      <Card variant="outlined" className={classes.card}
        onClick={openEditor}
      >
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
        <Typography
          display="block"
          align="right"
          color="textSecondary"
          variant="caption"
        >
          {dateCreated === dateLastModified ? '作成日時' : '最終更新'}: {formatDateLastModified(dateLastModified)}
        </Typography>
      </Card>
      <Editor
        note={note}
        open={editorIsOpen}
        onClose={closeEditor}
      />
    </>
  );
};

