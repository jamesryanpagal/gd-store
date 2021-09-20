const Sales = require("../Model/sales_Model");
const { v4: uuidv4 } = require("uuid");

const sales = async (req, res) => {
  const { cart, user } = req.body;
  try {
    const newSales = await Sales.create({
      sales_id: uuidv4(),
      name: user.name,
      email: user.email,
      address: user.address,
      purchased: cart.map((p) => {
        return { ...p, product_id: uuidv4() };
      }),
    });
    res.json(newSales);
  } catch (error) {
    res.json(error.message);
  }
};

const getSales = async (req, res) => {
  try {
    const get_Sales = await Sales.find();
    res.json(get_Sales);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { sales, getSales };
