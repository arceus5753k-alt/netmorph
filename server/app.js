const express = require('express');
const cors = require("cors")
const connectDB = require("./db");

const mockMiddleware = require("./middleware/mockMiddleware");
const ruleRoutes = require("./routes/ruleRoutes")

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use(mockMiddleware);

app.use("/api", ruleRoutes);

app.get("/",(req,res)=>{
  res.send("NETMORPH API running")
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});