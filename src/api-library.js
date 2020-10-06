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
    const resp = await axios.put(`/api/notes/${this.id}`, { title: newTitle, body: newBody }).catch(err => {
      console.error(err);
      throw err;
    });
    const { title, body, dateCreated, dateLastModified, archved } = resp;
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
    const { title, body, dateCreated, dateLastModified, archved } = resp;
    this.title = title;
    this.body = body;
    this.dateCreated = dateCreated;
    this.dateLastModified = dateLastModified;
    this.archved = archved;
    return this;
  }
};

export default Note;

