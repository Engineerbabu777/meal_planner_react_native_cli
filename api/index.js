const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

require('dotenv').config();
const cors = require('cors');
const Menu = require('./models/menu.model');
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

app.post('/menu/addDish', async (req, res) => {
  try {
    const {date, name, type, mealType} = req.body;

    let menuItem = await Menu.findOne({date});

    if (!menuItem) {
      menuItem = new Menu({date});
    }

    menuItem.items.push({name, type, mealType});

    await menuItem.save();
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.get('/menu/all', async (req, res) => {
  try {
    const allMenuData = await Menu.find({});

    if (!allMenuData || allMenuData.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(allMenuData);
  } catch (error) {
    res.status(500).json({error: 'Internal server error'});
  }
});
