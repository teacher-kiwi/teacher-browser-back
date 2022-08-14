const server = require("../server");
const PORT = process.env.PORT;

server.listen({ port: PORT }).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
