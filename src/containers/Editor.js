import React, { useState } from 'react';
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
  handleEdited: note => dispatch(noteActions.onEdit(note)),
});

export const Editor = connect(null, mapDispatchToProps)(({
  note,
  open,
  handleEdited,
  onClose,
  ...props
}) => {
  const {
    title: initialTitle,
    body: initialBody,
    dateCreated,
    dateLastModified,
  } = note;

  const [ title, setTitle ] = useState(initialTitle);
  const [ body, setBody ] = useState(initialBody);
  const [ saving, setSaving ] = useState(false);

  const formatDateLastModified = time => {
    const date = new Date(time);
    return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  };

  const save = () => {
    api.note.fromData(note).save({ title, body }).then(note => {
      console.log(note);
      handleEdited(note);
      onClose(note);
    }).catch(err => {
      console.error(err);
    });
  };

  const cancel = () => {
    onClose();
  };

  const close = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        メモを編集
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
        <Typography
          display="block"
          align="right"
          color="textSecondary"
          variant="caption"
        >
          {dateCreated === dateLastModified ? '作成日時' : '最終更新'}: {formatDateLastModified(dateLastModified)}
        </Typography>
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

