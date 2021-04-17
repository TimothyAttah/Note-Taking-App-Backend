const mongoose = require( 'mongoose' );
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema( {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{type: ObjectId, ref: 'User'}],
  following: [{type: ObjectId, ref: 'User'}],
}, { timestamps: true } );

mongoose.model( 'User', UserSchema );