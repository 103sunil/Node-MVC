const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes"); 
const errorHandling = require("./middlewares/errorHandler"); 
const createUserTable = require("./data/createUserTable.js")

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//create table before starting server
createUserTable()

// Routes must come BEFORE error handler
app.use("/api", userRoutes); 

// Centralized error handler (always last)
app.use(errorHandling);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
