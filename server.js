const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const logger = require("./utils/logger/logger")
const config = require("./config/keys")

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = config.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// Bind all api endpoints
require('./routes')(app);

const port = process.env.PORT || config.port;

app.listen(port, () => logger.info(`Server running on port ${port}`));

module.exports = app;