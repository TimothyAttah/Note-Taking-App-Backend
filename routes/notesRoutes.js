const express = require( 'express' );
const auth = require( '../middlewares/auth' );
const {
  createNote, allNotes, myNotes, editNote, likeNote, unlikeNote, commentsNote, deleteNote
} = require( '../controllers/notesController' );

const router = express.Router();

router.post( '/create', auth, createNote );

router.get( '/', allNotes );

router.get( '/user/note', auth, myNotes );

router.patch( '/edit/:id', auth, editNote );

router.patch( '/user/like', auth, likeNote )

router.patch( '/user/unlike', auth, unlikeNote )

router.patch( '/user/comments', auth, commentsNote )

router.delete( '/delete/:noteId', auth, deleteNote );

module.exports = router;