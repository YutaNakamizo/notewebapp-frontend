import React, { useState, useEffect } from 'react';
import api from '~/api-library';
import { connect } from 'react-redux';
import * as noteActions from '~/modules/note';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppHeader } from '~/components/AppHeader';
import { AppContent } from '~/components/AppContent';
import { NewEditor } from '~/containers/NewEditor';

const useStyle = makeStyles(theme => ({
  FabRoot: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  }
}));

const mapDispatchToProps = dispatch => ({
  handleLoaded: notes => dispatch(noteActions.onLoad(notes)),
});

export const App = connect(null, mapDispatchToProps)(({
  notes,
  handleLoaded,
  ...props
}) => {
  const [ loadingNotes, setLoadingNotes ] = useState(false);

  const [ newEditorIsOpen, setNewEditorIsOpen ] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    setLoadingNotes(true);
    api.note.load().then(notes => {
      console.log(JSON.stringify(notes, null, 2));
      handleLoaded(notes);
      setLoadingNotes(false);
    });
  };

  const openNewEditor = () => {
    setNewEditorIsOpen(true);
  };

  const closeNewEditor = () => {
    setNewEditorIsOpen(false);
  };
  
  const classes = useStyle();
  return (
    <>
      <AppHeader
        reflesh={loadingNotes}
        onRefreshClick={loadNotes}
      />
      <AppContent />

      <Fab
        color="primary"
        onClick={openNewEditor}
        className={classes.FabRoot}
      >
        <AddIcon />
      </Fab>

      {newEditorIsOpen && (
        <NewEditor
          onClose={closeNewEditor}
        />
      )}
    </>
  );
});

