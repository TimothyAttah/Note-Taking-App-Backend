const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );

const app = express()

app.use( express.json() )
app.use( cors() )

app.get( '/', ( req, res ) => {
  res.send('This is a note taking app')
} )

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) )
  
  app.get( '*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server is set and running on port: ${PORT}`))