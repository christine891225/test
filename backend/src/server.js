import express from 'express';
import cors from 'cors';
import dotenv from "dotenv-defaults";
dotenv.config();
import mongoose from 'mongoose';
import routes from './routes';

import path from "path";

mongoose.connect(
  process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => console.log("mongo db connection created"));

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.json());
app.use('/', routes);

app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);