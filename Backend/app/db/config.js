require("dotenv").config();
const mongoose = require("mongoose");
const URL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tailor-shard-00-00.o7ln9.mongodb.net:27017,tailor-shard-00-01.o7ln9.mongodb.net:27017,tailor-shard-00-02.o7ln9.mongodb.net:27017/tailorsApp?ssl=true&replicaSet=atlas-q1xtzx-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected..."))
  .catch((err) => console.error(err));
