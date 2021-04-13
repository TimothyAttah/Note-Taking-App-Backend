const mongoose = require( 'mongoose' );

const NotesSchema = new mongoose.Schema( {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true } );

mongoose.model( 'Notes', NotesSchema );