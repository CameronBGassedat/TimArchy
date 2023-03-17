const axios = require('axios')

describe('Test Post All Sensors', () => {
    it('should test that adding a single sensor on the database works', async () => {
        const response = await axios.post(
                'http://localhost:3000/sensor', 
                {
                    id : 1,
                    name : 'light',
                    data : '15 degrees',
                    roomID : 11
                }
        )
        expect(response.status).toEqual(200)
      });
  })

describe('Test Post All Building', () => {
    it('should test that adding a single building on the database works', async () => {
        const response = await axios.post(
                'http://localhost:3000/sensor', 
                {
                    id : 2,
                    name : 'main house',
                    clientsID : [300, 301],
                    roomID : 11
                }
        )
        expect(response.status).toEqual(200)
      });
  })
  describe('Test Post All Rooms', () => {
    it('should test that adding a single room on the database works', async () => {
        const response = await axios.post(
                'http://localhost:3000/sensor', 
                {
                    id : 1,
                    name : 'kitchen',
                    data : '15 degrees',
                    sensorID : 1
                }
        )
        expect(response.status).toEqual(200)
      });
  })
  describe('Test Post All Users', () => {
    it('should test that adding a single User on the database works', async () => {
        const response = await axios.post(
                'http://localhost:3000/sensor', 
                {
                    id : 21,
                    name : 'cameron',
                    email : 'cameron@moi'
                }
        )
        expect(response.status).toEqual(200)
      });
  })
