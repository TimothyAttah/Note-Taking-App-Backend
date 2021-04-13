const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcryptjs' );
const User = mongoose.model( 'User' );

const signupUser = async ( req, res ) => {
  const { firstName, lastName, email, password } = req.body;
  if ( !firstName || !lastName || !email || !password )
    return res.status( 404 ).json( { error: 'Please fill in all fields' } );
  const users = await User.findOne( { email } )
  if (users) return res.status(404).json({error: 'User with that email already exists'})
  const hashedPassword = await bcrypt.hash( password, 12 );
  try {
    const fullName = { firstName, lastName };
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
  const { email, password } = req.body;
  if ( !email || !password )
    return res.status( 404 ).json( { error: 'Please enter your email or password' } );
  const users = await User.findOne( { email } );
  if ( !users ) return res.status( 404 ).json( { error: 'User with that email does not exists' } );
  const userPassword = await bcrypt.compare( password, users.password );
  if ( !userPassword ) return res.status( 404 ).json( { error: 'Incorrect password. Please try again' } );
  try {
    const token = jwt.sign( { _id: users._id }, process.env.JWT_SECRET );
    res.status( 200 ).json( { message: 'User successfully signed in.', token, users } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

const users = async ( req, res ) => {
  try {
    const savedUsers = await User.find();
    res.status( 200 ).json( { message: 'All users', savedUsers } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

const protected = async ( req, res ) => {
  try {
    res.send('I am a protected page!!!')
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

module.exports.signupUser = signupUser;
module.exports.signinUser = signinUser;
module.exports.users = users;
module.exports.protected = protected;