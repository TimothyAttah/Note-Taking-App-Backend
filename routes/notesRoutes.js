const express = require( 'express' );
const auth = require( '../middlewares/auth' );
const {
  createNote, allNotes, myNotes, editNote
} = require( '../controllers/notesController' );

const router = express.Router();

router.post( '/create', auth, createNote );

router.get( '/', allNotes );

router.get( '/user/note', auth, myNotes );

router.patch( '/edit/:id', auth, editNote );

module.exports = router;