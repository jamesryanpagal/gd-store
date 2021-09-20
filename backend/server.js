require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//router
const usersRouter = require("./Routes/users_Routes");
const tokenRouter = require("./Routes/token_Verifier_Routes");
const adminRouter = require("./Routes/admin_Routes");
const productRouter = require("./Routes/products_Routes");
const checkRouter = require("./Routes/checkOut_Routes");
const userHistoryRouter = require("./Routes/users_history_Routes");
const salesRouter = require("./Routes/sales_Routes");
const riderRouter = require("./Routes/rider_Routes");
const port = process.env.PORT || 5000;
const path = require("path");

//middleware
app.use(cors());
app.use(express.json());

//connect to database
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
app.use("/sales", salesRouter);
app.use("/riders", riderRouter);

//deployment
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

//create port
app.listen(port, () => console.log(`server running in port ${port}`));
