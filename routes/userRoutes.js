const express = require( 'express' );
const router = express.Router();
const auth = require( '../middlewares/auth' );
const {
  getUser, followUsers, unFollowUsers
} = require( '../controllers/userController' );

router.get( '/:id', auth, getUser );

router.patch( '/follow', auth, followUsers );

router.patch( '/unfollow', auth, unFollowUsers );

module.exports = router;