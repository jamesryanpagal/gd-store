const Users = require("../Model/user_Model");

const getRiders = async (req, res) => {
  try {
    const rider = await Users.find();
    res.json(rider);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { getRiders };
