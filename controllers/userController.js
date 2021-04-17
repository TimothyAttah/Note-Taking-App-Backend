const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );
const Notes = mongoose.model( 'Notes' );

module.exports.getUser = async ( req, res ) => {
  try {
    const user = await User.findOne( { _id: req.params.id } )
    .select('-password')
    if ( !user )
      return res.status( 404 ).json( { error: 'User not found' } );
    await Notes.find( { postedBy: req.params.id } )
      .populate( 'postedBy', '-password' )
      .exec( async ( err, posts ) => {
        if ( err ) {
           return res.status(404).json({error: err.message})
        }
       return res.status(200).json({message: 'Signed in user', user, posts})
    })
  } catch (error) {
    return res.status( 500 ).json( { error: error.message } );
  }
}