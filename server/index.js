// all imports

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// define app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// connecting to DB
mongoose
  .connect("mongodb://localhost:27017/heyjana", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to the database on ${PORT} port`))
  .catch((err) => console.log("Error connecting to the database", err));

// creating schemas
const contentSchema = new mongoose.Schema({
  content: String,
});

// creating model
const Content = mongoose.model("Content", contentSchema);

// Routes
app.post("/content", async (req, res) => {
  const content = new Content(req.body);
  await content.save();
  res.send(content);
});

app.get("/content", async (req, res) => {
  const content = await Content.find();
  res.send(content);
});

app.put("/content/:id", async (req, res) => {
  const content = await Content.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(content);
});

app.delete("/content/:id", async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.send({ message: "Content Deleted" });
});

app.listen(PORT, () =>
  console.log(`Server is running on https://localhost:${PORT}`)
);
