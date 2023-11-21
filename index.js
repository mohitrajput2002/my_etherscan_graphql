const { ApolloServer } = require("apollo-server"); // Import ApolloServer from apollo-server
const { importSchema } = require("graphql-import"); // Import importSchema from graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource class
const typeDefs = importSchema("./schema.graphql"); // Import GraphQL schemas from schema.graphql

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  // Define GraphQL resolvers
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // Resolver for etherBalanceByAddress field
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // Resolver for totalSupplyOfEther field
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // Resolver for latestEthereumPrice field
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // Resolver for blockConfirmationTime field
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  // Create ApolloServer instance
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  // Start Apollo server on port 9000
  console.log(`🚀 Server ready at ${url}`);
});
