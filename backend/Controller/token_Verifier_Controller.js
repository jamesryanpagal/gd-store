const Users = require("../Model/user_Model");

const tokenInfo = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await Users.findById(id);
    res.json(user);
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

module.exports = { tokenInfo };
