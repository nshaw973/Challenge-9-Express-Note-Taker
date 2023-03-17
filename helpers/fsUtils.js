const fs = require('fs');
const util = require('util');

//All this was taken straight out of the mini project.

//turns the fs.readFile into a promise-based function
const readFromFile = util.promisify(fs.readFile);

//This is going to take the content that was given to the writeFile const, and add it to the destination it was given. in this case it would
//be in the ./db/db route
const writeToFile = (destination, content) =>
//fs.write file is now taking the content and turning it into a json object, and giving it an indentation of 4 spaces. and adding that json into the destination (./db/db)
//then it gives out either and error or updates the console with a successful log. 
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Data updated on ${destination}\n`)
  );


  //the read and append is more for the posting of the new note. 
  //Takes the content and then the file location (./db/db.json) and selecting the db.json to read the file, and then parsing the json file, and adding in the content into the json
  //before turning it back into a json object.
  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };
  
  module.exports = { readFromFile, writeToFile, readAndAppend };