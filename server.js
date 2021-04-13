const express = require( 'express' );
const cors = require( 'cors' );
require('dotenv').config({path: './config/.env'})
const path = require( 'path' );

const app = express();

const mongoDB = require( './config/db' );

app.use( express.json() )
app.use( cors() )

mongoDB()

app.get( '/', ( req, res ) => {
  res.send('This is a note taking app. I hope you like it')
} )

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) )
  
  app.get( '*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log( `Server is set and running on port: ${ PORT }` ) )
