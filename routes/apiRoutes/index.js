// set up this file to use as a central hub for all routing functions we may want to add to the application

const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

router.use(noteRoutes);

module.exports = router;