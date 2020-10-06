import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppHeader } from '~/components/AppHeader';
import { AppContent } from '~/components/AppContent';
import { NewEditor } from '~/components/NewEditor';

const useStyle = makeStyles(theme => ({
  FabRoot: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  }
}));

export const App = () => {
  const [ loadingNotes, setLoadingNotes ] = useState(false);
  const [ notes, setNotes ] = useState([]);

  const [ newEditorIsOpen, setNewEditorIsOpen ] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    setLoadingNotes(true);
    setTimeout(() => {
      console.log('loadNotes');
      setNotes([ ...notes, {
        id: String(Math.floor(Math.random() * 100000)),
        title: `Test Note #${notes.length + 1}`,
        body: (new Array(10)).fill(`This is a test note #${notes.length + 1}.`).join(' '),
        dateCreated: new Date().getTime(),
        dateLastModified: new Date().getTime(),
        archived: false
      } ]);
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
      <AppContent
        notes={notes}
      />

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
};

