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

module.exports.followUsers = async ( req, res ) => {
  try {
    User.findByIdAndUpdate( req.body.followId, {
     $push: {followers: req.user._id}
    }, { new: true }, ( err, result ) => {
      if ( err ) {
        return res.status( 404 ).json( { error: err.message } );
      }
      User.findByIdAndUpdate( req.user._id, {
        $push: {following: req.body.followId}
      }, { new: true } ).select( '-password' ).then( result => {
          res.status(200).json({message: 'You are following', result})
      })  
   })
  } catch (error) {
     return res.status( 500 ).json( { error: error.message } );
  }
}
module.exports.unFollowUsers = async ( req, res ) => {
  try {
    User.findByIdAndUpdate( req.body.unfollowId, {
     $pull:{followers:req.user._id}
    }, { new: true }, ( err, result ) => {
      if ( err ) {
        return res.status( 404 ).json( { error: err.message } );
      }
      User.findByIdAndUpdate( req.user._id, {
        $pull: {following: req.body.unfollowId}
      }, { new: true } ).select( '-password' ).then( result => {
          res.status(200).json({message: 'You are unFollowing', result})
      })  
   })
  } catch (error) {
     return res.status( 500 ).json( { error: error.message } );
  }
}
// module.exports.followUsers = async ( req, res ) => {
//   try {
//     await User.findByIdAndUpdate( req.body.followId, {
//       $push:{followers:req.user._id}
//     }, { new: true }, ( async ( err, result ) => {
//       if ( err )
//         return res.status( 404 ).json( { error: err.message } )
//      await User.findByIdAndUpdate( req.user._id, {
//        $push: {following: req.body.followId}
//      }, { new: true }, async ( myFollowers ) => {
       
//        res.status(200).json({message: 'You are following', myFollowers})
//       } )
//     }))
//   } catch (error) {
//      return res.status( 500 ).json( { error: error.message } );
//   }
// }

// module.exports.unFollowUsers = async ( req, res ) => {
//   try {
//     await User.findByIdAndUpdate( req.body.unfollowId, {
//       $pull:{followers:req.user._id}
//     }, { new: true }, ( async ( err, result ) => {
//       if ( err )
//         return res.status( 404 ).json( { error: err.message } )
//       await User.findByIdAndUpdate( req.user._id, {
//        $push: {following: req.body.unfollowId}
//       }, { new: true } )
//       res.status(200).json({message: 'You are unfollowing', result})
//     }))
//   } catch (error) {
//      return res.status( 500 ).json( { error: error.message } );
//   }
// }