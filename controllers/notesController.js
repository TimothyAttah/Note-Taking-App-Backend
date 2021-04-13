const mongoose = require( 'mongoose' );
const Notes = mongoose.model( 'Notes' );

const createNote = async ( req, res ) => {
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

module.exports.createNote = createNote;
module.exports.allNotes = allNotes;