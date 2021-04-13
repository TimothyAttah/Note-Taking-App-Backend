const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcryptjs' );
const User = mongoose.model( 'User' );

const signupUser = async ( req, res ) => {
  const { firstName, lastName, email, password } = req.body;
  if ( !firstName || !lastName || !email || !password )
    return res.status( 404 ).json( { error: 'Please fill in all fields' } );
  const savedUser = await User.findOne( { email } )
  if (savedUser) return res.status(404).json({error: 'User with that email already exists'})
  const hashedPassword = await bcrypt.hash( password, 12 );
  const fullName = { firstName, lastName };
  try {
    const users = await new User( {
      firstName,
      lastName,
      fullName,
      email,
      password: hashedPassword
    })
    await users.save()
    res.status(200).json({message: 'User successfully signed up.', users})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const signinUser = async ( req, res ) => {
  try {
    
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

module.exports.signupUser = signupUser;
module.exports.signinUser = signinUser;