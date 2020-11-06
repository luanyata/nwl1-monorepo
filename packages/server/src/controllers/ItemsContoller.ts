import { Request, Response } from 'express';
import Item from '../models/items';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response): Promise<Response> {
    const items: Item[] = await knex('items').select('*');

    const serializedItem = items.map((item: Item) => {
      return {
        ...item,
        imageUrl: `http://192.168.0.11:3333/uploads/${item.image}`,
      };
    });
    return response.json(serializedItem);
  }
}

export default ItemsController;
