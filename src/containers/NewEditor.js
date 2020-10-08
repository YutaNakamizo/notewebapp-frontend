import React, { useState, useEffect } from 'react';
import api from '~/api-library';
import { connect } from 'react-redux';
import * as noteActions from '~/modules/note';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography,
  Button,
  Box,
  Input,
} from '@material-ui/core';

const mapDispatchToProps = dispatch => ({
  handleCreated: note => dispatch(noteActions.onCreate(note)),
});

export const NewEditor = connect(null, mapDispatchToProps)(({
  handleCreated,
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
    api.note.create({ title, body }).then(note => {
      console.log(note);
      handleCreated(note);
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
        新規メモ
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
});

