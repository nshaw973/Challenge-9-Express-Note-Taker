const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

//Grabs the data in the db/db.json file and repopulates the page with it.
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//Allows user to search up specific note with id.
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;

        readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            const result = json.filter((note) => note.id === noteId);

            return result.length > 0

            ? res.json(result)
            : res.json('No note with that ID');

    });
});



//This adds the title and text the user typed out, into the db/db.json file
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

  module.exports = notes;