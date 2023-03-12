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
            : res.json(console.log('No note with that ID'));

    });
});

//Deletes the note after clicking on the trashcan symbol
notes.delete('/:id', (req, res) => {
    //selects the id given to the paramter that was an element inside the button with the note id
    const noteId = req.params.id;
    //grabbing the data from the database
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        //it only grabs the data back for everything that did not contain that id#
        const result = json.filter((note) => note.id !== noteId);
        
        writeToFile('./db/db.json', result);
  
        res.json(console.log(`Item ${noteId} has been deleted`));
      });
  });


//This adds the title and text the user typed out, into the db/db.json file
notes.post('/', (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(console.log(`Note added successfully`));
  } else {
    res.error(console.log('Error in adding note'));
  }
});

  module.exports = notes;