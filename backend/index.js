const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const projectsRoute = require('./routes/projects.js');
const usersRoute = require('./routes/users.js');
// const auth = require('./middleware/auth.js');

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(cors())

app.use('/projects', projectsRoute);
app.use('/users', usersRoute);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)));