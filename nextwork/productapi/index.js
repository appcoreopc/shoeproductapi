const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs") 
// that together define the "shape" of queries that are executed against 
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  
  type Shoe {
    sku : String 
    name : String
    manufacturer: String
    producttype : String 
    price : Float 
  }

  type User { 
      id : String 
      firstname : String 
      lastname : String 
      username : String 
      cartid : String
  }


  type Cart { 
      
    id : String
    item : [Shoe]
  }

  type Mutation {
    updateUserAge(id: ID!, age: Int!): User
  }  

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  type Query {
    shoes: [Shoe]
    user : [User]
  }

`;

const shoesData = [
    {
      name: 'Nike X',
      manufacturer: 'Nike',
    },
    {
      name: 'Air Jordan',
      manufacturer: 'Nike',
    },
    {
        name: 'Air Max',
        manufacturer: 'Nike',
      },
  ];

  function getUsers() {

  const usersData = [
    {
      firstname: 'Nike X',
      lastname: 'Nike',
    },
    {
      firstname: 'Air Jordan',
      lastname: 'Nike',
    },
    {
      firstname: 'Air Max',
      lastname: 'Nike',
      },
  ];

  return usersData;

}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      shoes: () => shoesData,
      user : () => getUsers()
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});