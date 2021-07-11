const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function start() {
  try {
    mongoose
      .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB connected!');
    const { url } = await server.listen();
    console.log(`Server is listening on ${url}`)
  } catch (err) {
    console.error(err)
  }
}

start();
