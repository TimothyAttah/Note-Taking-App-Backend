const dotenv = require( 'dotenv' );
dotenv.config( { path: './config/key' } );
const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );

require( './models/Usermodel' );
require( './models/NotesModel' );

const app = express();

const mongoDB = require( './config/db' );
mongoDB();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use( express.json() );
app.use( cors() );


app.use( 'https://notes-taking-app-front-end.herokuapp.com/api/user', require( './routes/authRoutes' ) );
app.use( 'https://notes-taking-app-front-end.herokuapp.com/api/notes', require( './routes/notesRoutes' ) );
app.use( 'https://notes-taking-app-front-end.herokuapp.com/api/auth/user', require( './routes/userRoutes' ) );

//  app.get( '/', ( req, res ) => {
//     res.send('Hello world')
//   })
  

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) )

  // app.get( '*', ( req, res ) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })

  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '/client/build/index.html', 'index.html'));
});

}


const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log( `Server is running on port: ${ PORT }` ) )
