const sequelize = require("sequelize");
const _ = require("lodash");
const Faker = require("faker");
const validate = require("validator");

var con = new sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const Person = con.define("person", {
  firstname: {
    type: sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Post = con.define("post", {
  title: {
    type: sequelize.STRING
  },
  content: {
    type: sequelize.STRING
  }
});

//relationship

Person.hasMany(Post);
Post.belongsTo(Person);

// con.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return Person.create({
//       firstname: Faker.name.firstName(),
//       lastname: Faker.name.lastName(),
//       email: Faker.internet.email()
//     }).then(person => {
//       return person.createPost({
//         title: `Sample title by ${person.firstname}`,
//         content: "this is a sample article"
//       });
//     });
//   });
// });

// con
//   .sync({ force: true })
//   .then(() => {
//     _.times(10, () => {
//       return Post.create({
//         title: Faker.name.title(),
//         content: Faker.name.jobType()
//       });
//     });
//   })
//   .then(() => {
//     _.times(10, () => {
//       return Person.create({
//         firstname: Faker.name.firstName(),
//         lastname: Faker.name.lastName(),
//         email: Faker.internet.email()
//       });
//     });
//   });

module.exports = con;
