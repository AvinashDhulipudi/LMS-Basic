const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/Users');
const classes = require('./routes/api/Class');
const register = require('./routes/api/Register');
const unregister = require('./routes/api/Unregister');
const passport = require('passport');
const path = require('path');

const app = express();
//Db config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
//connect mongoose

mongoose
    .connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.log(err));

//passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users',users);
app.use('/api/Class',classes);
app.use('/api/register',register);
app.use('/api/unregister',unregister);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

process.on('SIGINT', () => { console.log("good bye!"); process.exit(); })
const port = process.env.PORT || 5000;
app.listen (port,()=> console.log(`server running on port ${port}`));   
