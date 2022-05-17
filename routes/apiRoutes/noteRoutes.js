const uniqid = require('uniqid');
const router = require('express').Router();
const fs = require("fs");
const path = require('path');
const { notes } = require('../../db/db.json');


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
    console.log(results);

    res.json(results);
})

router.post('/notes', (req, res) => {
    // set id with uniqid
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
    console.log(notes);
})

module.exports = router;