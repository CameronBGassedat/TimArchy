

export default {
  get: async (req, res) => {
    try {
      res.sendStatus(200)
    } catch (error) {
      next(error);
    }
  }

};