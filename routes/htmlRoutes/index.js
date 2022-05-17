const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
});

// the * route should always come last
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = router;