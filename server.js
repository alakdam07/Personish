const express = require("express");
const app = express();
const port = 3000;
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true
  })
);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
