import mongoose from "mongoose";
import express from "express";
import Data from "./Schema.js";
import cors from "cors";


const uri = process.env.MONGO_URI ||
  "default";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log("Connected to database");

    // Start server only after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

// Optional: Additional connection event listeners for debugging
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

connectToDatabase();

app.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    // Ensure required fields are provided in the request
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Request body is empty or invalid" });
    }

    const newData = new Data(req.body);
    const result = await newData.save();
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

app.get("/get", async (req, res) => {
  try {
    console.log("GET request received");
    const data = await Data.find().limit(30); // Limit results to 30 documents
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const result = await Data.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
);
