import { Entity, Schema } from 'redis-om'

interface Building {
    name: string;
    location: string;
}

class Building extends Entity {}

export const buildingSchema = new Schema(Building, {
  name: { type: 'string' },
  location: { type: 'string' }
})