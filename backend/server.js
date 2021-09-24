require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const cors = require("cors");
const mongoose = require("mongoose");

// --------------------------- router ------------------------
const usersRouter = require("./Routes/users_Routes");
const tokenRouter = require("./Routes/token_Verifier_Routes");
const adminRouter = require("./Routes/admin_Routes");
const productRouter = require("./Routes/products_Routes");
const checkRouter = require("./Routes/checkOut_Routes");
const userHistoryRouter = require("./Routes/users_history_Routes");
const riderRouter = require("./Routes/rider_Routes");

const port = process.env.PORT || 5000;
const path = require("path");

//middleware
app.use(cors());
app.use(express.json());

// -------------------- connect to database -------------------
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("connected to mongoDB"));

app.use("/users", usersRouter);
app.use("/tokenVerifier", tokenRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);
app.use("/checkout", checkRouter);
app.use("/usershistory", userHistoryRouter);
app.use("/riders", riderRouter);

// ------------------------- deployment ----------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running");
  });
}

// socket io

// ------------------ MODEL FOR SOCKET ----------------------

// INCOME MODEL
const Income = require("./Model/incomes_Model");

// SALES MODEL
const Sales = require("./Model/sales_Model");

io.on("connection", (socket) => {
  // ------------------------------------------ SALES ------------------------------
  socket.on("addToSales", async (productSales) => {
    const { cart, user } = productSales;
    try {
      const newSales = await Sales.create({
        name: user.name,
        email: user.email,
        address: user.address,
        purchased: cart.map((p) => {
          return p;
        }),
      });
      io.emit("newSales", newSales);
    } catch (error) {
      console.log(error);
    }
  });

  // ------------------------------------- INCOME FROM PRODUCT -----------------------
  socket.on("productPurchased", async (price) => {
    // get income
    const getIncome = await Income.findOne({ income: { $gte: 0 } });
    if (getIncome) {
      let totalIncome = getIncome.income + price;
      const updateIncome = await Income.findByIdAndUpdate(
        getIncome._id,
        { income: totalIncome },
        { new: true }
      );
      io.emit("productIncome", { income: updateIncome.income });
      return;
    }

    // create income
    const createIncome = await Income.create({
      income: price,
    });
    io.emit("productIncome", { income: createIncome.income });
  });

  // ---------------------------------- INCOME FROM PRODUCTS ---------------------------
  socket.on("productsPurchased", async (totaPrice) => {
    // get income
    const getIncome = await Income.findOne({ income: { $gte: 0 } });
    if (getIncome) {
      let totalIncome = getIncome.income + totaPrice;
      const updateIncome = await Income.findByIdAndUpdate(
        getIncome._id,
        { income: totalIncome },
        { new: true }
      );
      io.emit("productsIncome", { income: updateIncome.income });
      return;
    }

    // create income
    const createIncome = await Income.create({
      income: totaPrice,
    });
    io.emit("productsIncome", { income: createIncome.income });
  });
});

//create port
http.listen(port, () => console.log(`server running in port ${port}`));
