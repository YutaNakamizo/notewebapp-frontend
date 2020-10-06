import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography,
  Button,
  Box,
  Input,
} from '@material-ui/core';
import { Note as NoteClass } from '~/api-library';

export const NewEditor = ({
  onClose,
  ...props
}) => {
  const [ open, setOpen ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const save = () => {
    NoteClass.create({ title, body }).then(note => {
      console.log(note);
      onClose(note);
    }).catch(err => {
      console.error(err);
    });
  };

  const cancel = () => {
    onClose();
  };

  const close = () => {
    setOpen(false);
  };
  const afterClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      onExited={afterClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography
          variant="h6"
          component="h1"
        >
          新規メモ
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Input
          placeholder="タイトル"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          disableUnderline
          autoFocus
        />
        <Input
          placeholder="メモ"
          value={body}
          onChange={e => setBody(e.target.value)}
          fullWidth
          multiline
          disableUnderline
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancel}
          disabled={saving}
        >
          キャンセル
        </Button>
        <Button
          onClick={save}
          disabled={saving}
          color="primary"
          variant="contained"
          disableElevation
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

