const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});

async function start() {
  try {
    mongoose
      .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB connected!');
    const { url } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`Server is listening on ${url}`);
  } catch (err) {
    console.error(err)
  }
}

start();
