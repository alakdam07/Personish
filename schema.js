const graphql = require("graphql");
const DB = require("./db");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "This represent person",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(person) {
        return person.id;
      }
    },
    firstname: {
      type: GraphQLString,
      resolve(person) {
        return person.firstname;
      }
    },
    lastname: {
      type: GraphQLString,
      resolve(person) {
        return person.lastname;
      }
    },

    email: {
      type: GraphQLString,
      resolve(person) {
        return person.email;
      }
    },
    post: {
      type: new GraphQLList(Posttype),
      resolve(person) {
        return person.getPosts();
      }
    }
  })
});

const Posttype = new GraphQLObjectType({
  name: "Post",
  description: "This is a post",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(person) {
        return person.id;
      }
    },
    title: {
      type: GraphQLString,
      resolve(post) {
        return post.title;
      }
    },
    content: {
      type: GraphQLString,
      resolve(post) {
        return post.content;
      }
    },
    person: {
      type: PersonType,
      resolve(post) {
        return post.getPerson();
      }
    }
  })
});

const query = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This is a rootquery",
  fields: () => {
    return {
      person: {
        type: new GraphQLList(PersonType), //
        args: {
          id: { type: GraphQLID },
          email: { type: GraphQLString }
          //firstname: { type: GraphQLString }
        },
        resolve(parent, args) {
          return DB.models.person.findAll({ where: args });
        }
      },
      post: {
        type: new GraphQLList(Posttype),
        args: {
          id: { type: GraphQLID },
          title: { type: GraphQLString },
          content: { type: GraphQLString }
        },
        resolve(parent, args) {
          // console.log(parent);

          return DB.models.post.findAll({ where: args });
        }
      }
    };
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Data can create",
  fields() {
    return {
      addPerson: {
        type: PersonType,
        args: {
          firstname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(parent, args) {
          return DB.models.person.create({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email.toLowerCase()
          });
        }
      }
    };
  }
});

const Scheme = new GraphQLSchema({
  query,
  mutation
});

module.exports = Scheme;
