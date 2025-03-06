import {Document, Schema, Model, model} from 'mongoose';

interface IMenuItem {
  name: string;
  type: string;
  mealType: string;
}

interface IMenu extends Document {
  date: string;
  items: IMenuItem[];
}

const menuSchema: Schema<IMenu> = new Schema({
  date: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      mealType: {
        type: String,
        required: true,
      },
    },
  ],
});

const Menu: Model<IMenu> = model<IMenu>('Menu', menuSchema);

export {Menu};
export type {IMenu};
