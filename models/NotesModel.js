const mongoose = require( 'mongoose' );
const {ObjectId} = mongoose.Schema.Types

const NotesSchema = new mongoose.Schema( {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: true } );

mongoose.model( 'Notes', NotesSchema );