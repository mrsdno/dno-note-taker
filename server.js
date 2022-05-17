const { query } = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001;
const { append } = require('express/lib/response');
const { notes } = require('./db/db.json')
const fs = require("fs");
const path = require("path");
const { join } = require('path');
const app = express();

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

app.use(express.json());

// read db.json file and return all saved notes
app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(results);

    res.json(results);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})

app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
    console.log(notes);
})