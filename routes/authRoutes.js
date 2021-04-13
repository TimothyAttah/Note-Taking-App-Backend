const express = require( 'express' );

const router = express.Router();
const {
  signupUser, signinUser, users
} = require( '../controllers/authController' );

router.post( '/signup', signupUser );

router.post( '/signin', signinUser );

router.get( '/', users );

module.exports = router;