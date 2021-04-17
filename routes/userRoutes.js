const express = require( 'express' );
const router = express.Router();
const auth = require( '../middlewares/auth' );
const {
  getUser
} = require( '../controllers/userController' );

router.get( '/:id', auth, getUser );

module.exports = router;