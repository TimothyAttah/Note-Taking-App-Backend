const express = require( 'express' );
const auth = require( '../middlewares/auth' );
const {
  createNote, allNotes, myNotes
} = require( '../controllers/notesController' );

const router = express.Router();

router.post( '/create', auth, createNote );

router.get( '/', allNotes );

router.get( '/user/note', auth, myNotes );

module.exports = router;