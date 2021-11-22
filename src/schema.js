import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";


const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`)
// **'s mean all folders, *'s mean all files 

export const typeDefs = mergeTypeDefs(loadedTypes)
export const resolvers = mergeResolvers(loadedResolvers)