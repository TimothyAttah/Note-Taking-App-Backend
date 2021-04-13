const mongoose = require( 'mongoose' );
const keys = require( './keys' );

const mongoDB = async () => {
  try {
    const mongoConnect = await mongoose.connect( keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  } )
  
  console.log(`MongoDB connected on port: ${mongoConnect.connection.host}`);
  } catch (error) {
    console.log('Error:', error);
  }
}

module.exports = mongoDB;