const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type ImplicitResolve {
    name: String!
  }

  type ExplicitResolve {
    name: String!
  }

  type WillBeResolvedExplicitly {
    name: String!
  }

  type Query {
    implAttr: ImplicitResolve!
    explAttr: ExplicitResolve!
    wbre: WillBeResolvedExplicitly!
  }
`;

const resolvers = {
    Query: {
        implAttr: () => {
            return {
                name: 'hello'
            }
        },
        explAttr: () => 123,
        wbre: () => {
            return {
                name: 'hello'
            }
        },
    },
    ExplicitResolve: {
        name: (root) => String(root)
    },
    WillBeResolvedExplicitly: {
        name: (root) => String(root)
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});