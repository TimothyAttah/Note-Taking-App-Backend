const express = require( 'express' );
const router = express.Router();
const auth = require( '../middlewares/auth' );
const {
  getUser, followUsers
} = require( '../controllers/userController' );

router.get( '/:id', auth, getUser );

router.patch( '/follow', auth, followUsers );

module.exports = router;