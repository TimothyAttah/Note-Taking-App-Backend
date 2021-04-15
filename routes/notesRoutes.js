const express = require( 'express' );
const auth = require( '../middlewares/auth' );
const {
  createNote, allNotes, myNotes, editNote, likeNote
} = require( '../controllers/notesController' );

const router = express.Router();

router.post( '/create', auth, createNote );

router.get( '/', allNotes );

router.get( '/user/note', auth, myNotes );

router.patch( '/edit/:id', auth, editNote );

router.patch('/user/likes', auth, likeNote)

module.exports = router;