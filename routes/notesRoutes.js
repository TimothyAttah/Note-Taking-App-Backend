const express = require( 'express' );
const auth = require( '../middlewares/auth' );

const router = express.Router();

router.post( '/create', auth );

module.exports = router;