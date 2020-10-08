import React, { useState, useEffect } from 'react';
import api, { Note } from '~/api-library';
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

const mapStateToProps = state => {
  const { note } = state;
  return {
    ...note,
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoaded: notes => dispatch(noteActions.onLoad(notes)),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(({
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
    setTimeout(() => {
      console.log('loadNotes');
      handleLoaded([
        ...(notes.map(note => new Note(note))),
        new Note({
          id: String(Math.floor(Math.random() * 100000)),
          title: `Test Note #${notes.length + 1}`,
          body: (new Array(10)).fill(`This is a test note #${notes.length + 1}.`).join(' '),
          dateCreated: new Date().getTime(),
          dateLastModified: new Date().getTime(),
          archived: false
        })
      ]);
      setLoadingNotes(false);
    }, 2000);
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

