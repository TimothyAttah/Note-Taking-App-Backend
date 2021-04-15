const mongoose = require( 'mongoose' );
const Notes = mongoose.model( 'Notes' );

module.exports.createNote = async ( req, res ) => {
  const notesData = req.body;
  const { title, content } = notesData;
  if ( !title || !content )
    return res.status( 404 ).json( { error: 'Please fill in all required fields' } );
  try {
    req.user.password = undefined;
    const note = await new Notes( {
      title,
      content,
      postedBy: req.user
    })
    await note.save()
    res.status( 200 ).json( { message: 'Note Created Successfully', note } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

const allNotes = async ( req, res ) => {
  try {
    const note = await Notes.find()
    .populate('postedBy', '-password')
    res.status( 200 ).json( note );
  } catch (error) {
     res.status( 500 ).json( { error: error.message } );
  }
}

const myNotes = async ( req, res ) => {
  try {
    const note = await Notes.find( { postedBy: req.user._id } )
      .populate( 'postedBy', '-password' );
    res.status(200).json({note: note})
  } catch (error) {
     res.status( 500 ).json( { error: error.message } );
  }
}

const editNote = async ( req, res ) => {
  const { id: _id } = req.params;
  const notesData = req.body;
  try {
    if ( !mongoose.Types.ObjectId.isValid )
      return res.status( 404 ).json( { error: 'No note found with that id' } );
    const updatedNote = await Notes.findByIdAndUpdate( _id, notesData, { new: true } );
    res.status( 200 ).json( { message: 'Note Updated Successfully', updatedNote } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

module.exports.likeNote = async ( req, res ) => {
  try {
    if ( !req.body.noteId )
      return res.status(404).json({error: 'Cannot like note. Try again'})
    const likedNote = await Notes.findByIdAndUpdate( req.body.noteId, {
      $push: { likes: req.user._id }
    }, { new: true } )
    res.status(200).json({message: 'You like this note', likedNote})
  } catch (error) {
     res.status( 500 ).json( { error: error.message } );
  }
}

module.exports.unLikeNote = async ( req, res ) => {
  try {
    const unLikedNote = await Notes.findByIdAndUpdate( req.body.noteId, {
      $pull: { likes: req.user._id }
    }, { new: true } )
    res.status(200).json({message: 'You like this note', unLikedNote})
  } catch (error) {
     res.status( 500 ).json( { error: error.message } );
  }
}

module.exports.allNotes = allNotes;
module.exports.myNotes = myNotes;
module.exports.editNote = editNote;