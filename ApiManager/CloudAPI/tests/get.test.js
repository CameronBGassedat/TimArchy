const axios = require('axios')

describe('Test Get All Sensors', () => {
    it('should test that getting a single sensor on the database works', async () => {
        const response = await axios.get('http://localhost:3000/sensor')
        expect(response.status).toEqual(200)
      });
  })
  
describe('Test Get All Buidlings', () => {
    it('should test that getting a single sensor on the database works', async () => {
        const response = await axios.get('http://localhost:3000/building')
        expect(response.status).toEqual(200)
      });
  })
  
describe('Test Get All Users', () => {
    it('should test that getting a single sensor on the database works', async () => {
        const response = await axios.get('http://localhost:3000/user')
        expect(response.status).toEqual(200)
      });
  })
  
describe('Test Get All Rooms', () => {
    it('should test that getting a single sensor on the database works', async () => {
        const response = await axios.get('http://localhost:3000/room')
        expect(response.status).toEqual(200)
      });
  })