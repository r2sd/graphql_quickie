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
        // Resolver can be async and can do stuff like DB call
        // Apollo does await accordingly
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

// Query
// query {
//     implAttr {
//       name
//     }
//     explAttr {
//       name
//     }
//     wbre {
//       name
//     }
//   }

// Result
// {
//     "data": {
//       "implAttr": {
//         "name": "hello"
//       },
//       "explAttr": {
//         "name": "123"
//       },
//       "wbre": {
//         "name": "[object Object]"
//       }
//     }
//   }