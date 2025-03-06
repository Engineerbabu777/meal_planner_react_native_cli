const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(error => {
      console.log('Error connecting to MongoDb', error);
    });

  console.log('Server is running on port 3000');
});
