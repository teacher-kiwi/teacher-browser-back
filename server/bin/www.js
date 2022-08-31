const server = require("../server");
const PORT = process.env.PORT;

require("../src/config/db");

server.listen({ port: PORT }).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
