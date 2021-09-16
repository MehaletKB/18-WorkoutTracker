const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/apiRoutes.js');
const views = require('./routes/views.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public", { extensions: ["html"] }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.DB_CLIENT_URL || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(router);

app.use(views)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });