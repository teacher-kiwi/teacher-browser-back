const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");

const loadedTypes = loadFilesSync(path.join(__dirname, "../typeDefs-resolvers/**/*.graphql"));
const loadedResolvers = loadFilesSync(path.join(__dirname, "../typeDefs-resolvers/**/*.js"));

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

module.exports = { typeDefs, resolvers };
