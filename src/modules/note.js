// Actions
const ON_LOAD = 'note/on-load';
const ON_CREATE = 'note/on-create';
const ON_EDIT = 'note/on-edit';
const ON_ARCHIVE = 'note/on-archive';
const ON_UNARCHIVE = 'note/on-unarchive';

// Reducer
const initialState = {
  notes: [],
};
const reducer = (state = initialState, action) => {
  const { type, value } = action;
  switch(type) {
    case ON_LOAD: {
      const { notes } = value;
      return {
        ...state,
        notes: notes.map(note => note.toData()),
      };
    }
    case ON_CREATE: {
      const { note } = value;
      const notes = [ ...state.notes ];
      notes.push(note.toData());
      return {
        ...state,
        notes,
      };
    }
    case ON_EDIT: {
      const { note } = value;
      const notes = [ ...state.notes ];
      const existing_index = notes.findIndex(_note => _note.id === note.id);
      if(existing_index > -1) notes.splice(existing_index, 1, note.toData());
      return {
        ...state,
        notes,
      };
    }
    case ON_ARCHIVE: {
      const { note } = value;
      const notes = [ ...state.notes ];
      const existing_note = notes.find(_note => _note.id === note.id);
      if(existing_note) existing_note.archived = true;
      return {
        ...state,
        notes,
      };
    }
    case ON_UNARCHIVE: {
      const { note } = value;
      const notes = [ ...state.notes ];
      const existing_note = notes.find(_note => _note.id === note.id);
      if(existing_note) existing_note.archive = false;
      return {
        ...state,
        notes,
      };
    }
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const onLoad = notes => {
  return {
    type: ON_LOAD,
    value: {
      notes,
    },
  };
};

export const onCreate = note => {
  return {
    type: ON_CREATE,
    value: {
      note,
    },
  };
};

export const onEdit = note => {
  return {
    type: ON_EDIT,
    value: {
      note,
    },
  };
};

export const onArchive = note => {
  return {
    type: ON_ARCHIVE,
    value: {
      note,
    },
  };
};

export const onUnarchive = note => {
  return {
    type: ON_UNARCHIVE,
    value: {
      note,
    },
  };
};

