import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {IMenu, Menu} from './models/menu.model';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://awaismumtaz0099:778677867786a..@cluster0.3so1bcq.mongodb.net/meal_planner',
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

interface AddDishRequest extends Request {
  body: {
    date: string;
    name: string;
    type: string;
    mealType: string;
  };
}

app.post('/menu/addDish', async (req: AddDishRequest, res: Response) => {
  try {
    const {date, name, type, mealType} = req.body;

    let menuItem = await Menu.findOne({date});

    if (!menuItem) {
      menuItem = new Menu({date, items: []});
    }

    menuItem.items.push({name, type, mealType});
    await menuItem.save();

    res.status(201).json({message: 'Dish added successfully'});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.get('/menu/all', async (_req: Request, res: Response) => {
  try {
    const allMenuData: IMenu[] = await Menu.find({});
    res.status(200).json(allMenuData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/copyItems', async (req: any, res: any) => {
  try {
    const {prevDate, nextDate} = req.body;

    const prevMenu = await Menu.findOne({date: prevDate});
    if (!prevMenu) {
      return res.status(404).json({message: 'Previous date not found'});
    }

    let nextMenu = await Menu.findOne({date: nextDate});
    if (!nextMenu) {
      nextMenu = new Menu({date: nextDate, items: prevMenu.items});
    } else {
      nextMenu.items = prevMenu.items;
    }

    await nextMenu.save();
    res.status(200).json({message: 'Items copied successfully'});
  } catch (error) {
    console.error('Error copying items:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.delete('/deleteItems/:date', async (req: Request, res: Response) => {
  try {
    const {date} = req.params;
    const deletedItem = await Menu.findOneAndDelete({date});

    if (deletedItem) {
      res.status(200).json({message: 'Item deleted'});
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});

export default app;
