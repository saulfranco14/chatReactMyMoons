const express = require('express');
const router  = express.Router();

router.get('/', ( req, res ) => {
    res.send( "Server esta arriba y corriendo" );
});

module.exports = router;