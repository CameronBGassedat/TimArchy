import { Entity, Schema } from 'redis-om'

interface Building {
  name: string;
  rooms: string[];
}

class Building extends Entity { }

export const buildingSchema = new Schema(Building, {
  name: { type: 'string' },
  rooms: { type: 'string[]' }
})