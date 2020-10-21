import axios from 'axios';

export const Note = class {
  constructor({
    id,
    title,
    body,
    dateCreated,
    dateLastModified,
    archved,
  }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.dateCreated = dateCreated;
    this.dateLastModified = dateLastModified;
    this.archved = archved;
  }
  
  static fromData(data) {
    return new Note(data);
  }

  static async load() {
    const resp = await axios.get('/api/notes').catch(err => {
      console.error(err);
      throw err;
    });
    console.log(resp.data);
    const notes = resp.data.map(note_source => new Note(note_source));
    return notes;
  }

  static async create({
    title,
    body,
  }) {
    const resp = await axios.put('/api/notes', { title, body }).catch(err => {
      console.error(err);
      throw err;
    });
    console.log(resp.data);
    return new Note(resp.data);
  }

  async save({
    title: newTitle,
    body: newBody,
  }) {
    const resp = await axios.post(`/api/notes/${this.id}`, { title: newTitle, body: newBody }).catch(err => {
      console.error(err);
      throw err;
    });
    const { title, body, dateCreated, dateLastModified, archved } = resp.data;
    this.title = title;
    this.body = body;
    this.dateCreated = dateCreated;
    this.dateLastModified = dateLastModified;
    this.archved = archved;
    return this;
  }

  async archive() {
    const resp = await axios.delete(`/api/notes/${this.id}`).catch(err => {
      console.error(err);
      throw err;
    });
    const { title, body, dateCreated, dateLastModified, archved } = resp.data;
    this.title = title;
    this.body = body;
    this.dateCreated = dateCreated;
    this.dateLastModified = dateLastModified;
    this.archved = archved;
    return this;
  }

  toData() {
    const data = {};
    const keys = [
      'id',
      'title',
      'body',
      'dateCreated',
      'dateLastModified',
      'archived',
    ];
    for(const key of keys) data[key] = this[key];
    return data;
  }
};

const app = {
  note: Note,
};
export default app;

