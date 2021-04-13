const express = require( 'express' );
const auth = require( '../middlewares/auth' );

const router = express.Router();
const {
  signupUser, signinUser, users, protected
} = require( '../controllers/authController' );

router.post( '/signup', signupUser ); 

router.post( '/signin', signinUser );

router.get( '/', users );

router.get( '/protected', auth, protected );

module.exports = router;