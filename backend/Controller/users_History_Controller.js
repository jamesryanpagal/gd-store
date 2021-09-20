const Users_history = require("../Model/users_history_Model");
const { v4: uuidv4 } = require("uuid");

const createUserHistory = async (req, res) => {
  const { cart, id } = req.body;
  try {
    const documentExist = await Users_history.findOne({ userId: id });
    if (documentExist) {
      const updateHistory = await Users_history.updateOne(
        { userId: documentExist.userId },
        {
          $push: {
            purchased: cart.map((p) => {
              return { ...p, product_id: uuidv4() };
            }),
          },
        }
      );
      res.json(updateHistory);
      return;
    }
    const createHistory = await Users_history.create({
      userId: id,
      purchased: cart.map((p) => {
        return { ...p, product_id: uuidv4() };
      }),
    });
    res.json(createHistory);
  } catch (error) {
    res.json(error.message);
  }
};

const getUserHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const getHistory = await Users_history.findOne({ userId: id });
    if (!getHistory) {
      res.json("server error");
      return;
    }
    res.json({
      history: getHistory.purchased,
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { createUserHistory, getUserHistory };
