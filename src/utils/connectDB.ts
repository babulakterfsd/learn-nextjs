/* eslint-disable consistent-return */
const { MongoClient } = require('mongodb');

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ooo4k.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default async function connectDB() {
  try {
    const connectedDB = await client.connect();
    console.log('Connected to movieDB');

    return connectedDB;
  } catch (error) {
    console.log(error);
  }
}
