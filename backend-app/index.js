require('dotenv').config();
const cors = require('cors')
const express = require("express");
const connection = require("./database");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const port = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json());

app.use('/products',productRoutes );
app.use('/orders', orderRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to the Home Page Backend Testing");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port} and Connected To the DB`);
  } catch (error) {
    console.log(error);
  }
});
