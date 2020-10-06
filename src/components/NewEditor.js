import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography,
  Button,
  Box,
  Input,
} from '@material-ui/core';

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
    
  };

  const cancel = () => {

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

