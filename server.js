const dotenv = require( 'dotenv' );
dotenv.config( { path: './config/.env' } );
const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );

require( './models/Usermodel' );

const app = express();

const mongoDB = require( './config/db' );
mongoDB();

app.use( express.json() );
app.use( cors() );


app.use( '/api/user', require( './routes/authRoutes' ) );

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) )
  
  app.get( '*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log( `Server is set and running on port: ${ PORT }` ) )
