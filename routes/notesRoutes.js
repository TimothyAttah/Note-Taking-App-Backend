const express = require( 'express' );
const auth = require( '../middlewares/auth' );
const {
  createNote
} = require( '../controllers/notesController' );

const router = express.Router();

router.post( '/create', auth, createNote );

module.exports = router;