const uniqid = require('uniqid');
const router = require('express').Router();
const fs = require("fs");
const path = require('path');
let { notes } = require('../../db/db.json');
const { networkInterfaces } = require('os');
const { notDeepEqual } = require('assert');

function deleteNote(id) {
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        else {
            let parsedNotes = JSON.parse(data).notes;
            var filteredNotes = parsedNotes.filter(function (value, index, arr) {
                return value.id != id;
            })
            console.log(filteredNotes);
            notes = filteredNotes; 

            
            fs.writeFileSync('./db/db.json', JSON.stringify({ notes: filteredNotes }, null, 4),
                (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully deleted note!')
            )
            return filteredNotes;
        }
    })
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

// read db.json file and return all saved notes
router.get('/notes', (req, res) => {
    let results = notes;
    console.log("this is the get request" , notes);
    res.json(results);
})

router.delete('/notes/:id', (req, res, next) => {
    const id = req.params.id;
    const newArray = deleteNote(id);
    console.log("this is the delete request" , notes);
    res.json(newArray);
})

router.post('/notes', (req, res) => {
    // set id with uniqid
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
})

module.exports = router;