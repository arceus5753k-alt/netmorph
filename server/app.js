const express = require('express');
const cors = require("cors")
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
  console.log("NETMORPH API running")
})
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});