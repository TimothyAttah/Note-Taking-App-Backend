const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );

const User = mongoose.model( 'User' );

const auth = ( req, res, next ) => {
  const { authorization } = req.headers;
  if ( !authorization )
    return res.status( 404 ).json( { error: 'Unauthorized User. Permission Denied' } );
  const token = authorization.replace( 'Bearer ', '' );
  jwt.verify( token, process.env.JWT_SECRET, async ( err, payload ) => {
    if ( err )
      return res.status( 404 ).json( { error: 'Unauthorized User. Request Denied' } );
    const { _id } = payload;
    const userData = await User.findById( _id );
    req.user = userData;
    next();
  })
}

module.exports = auth;