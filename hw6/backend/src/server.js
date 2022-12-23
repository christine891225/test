import express from 'express';
import cors from 'cors';
import dotenv from "dotenv-defaults";
dotenv.config();
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect(
  process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => console.log("mongo db connection created"));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', routes);

const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);