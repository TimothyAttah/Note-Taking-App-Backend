const express = require( 'express' );
const auth = require( '../middlewares/auth' );
const {
  createNote, allNotes
} = require( '../controllers/notesController' );

const router = express.Router();

router.post( '/create', auth, createNote );

router.get( '/', allNotes );

module.exports = router;