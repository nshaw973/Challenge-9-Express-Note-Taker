const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const db = require('./db/db.json')

//selects the host being the one that was given by heroku, or 3001 if its done through the localhost
const PORT = process.env.PORT || 3001;

const app = express();

////allows for static assets like the html, css, and the js file in the public folder 
//without having to write custom routes for the files.
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allows the use of the routes
//also proves a path to place all the data to route from the backend
app.use('/api', api)

//api fetch to get db.json to appear
app.get('/api/notes', (req, res) => res.json(db));

//Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

//Wildcard
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Express listens for the port it's given and checks for any gets, posts, and deletes.
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})