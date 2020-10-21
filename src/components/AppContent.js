import React from 'react';
import { connect } from 'react-redux';
import * as noteActions from '~/modules/note';
import {
  Container,
} from '@material-ui/core';
import { NoteCard } from '~/components/NoteCard';

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
  return (
    <>
      <Container maxWidth="sm">
        {Array.isArray(notes) && notes.map(note => {
          return (
            <NoteCard
              key={note.id}
              note={note}
            />
          );
        })}
      </Container>
    </>
  );
});

