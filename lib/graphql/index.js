/**
 * graphql服务器
 */
const {gql, ApolloServer} = require('apollo-server-koa');
const typeLoader = require('./type-loader');
const queryLoader = require('./query-loader');
const mutationLoader = require('./mutation-loader');

module.exports = (app, models) => {

    let type = '', queryType = '', queryResolver = {}, mutationType = '', mutationResolver = {};
    models.forEach(model => {
        type += typeLoader(model, models);                  // model的类型定义
        let queryLoaderRes = queryLoader(model, models);
        queryType += queryLoaderRes.type;           // query的类型定义
        queryResolver = {...queryResolver, ...queryLoaderRes.resolver};            // query的处理器
        let mutationLoaderRes = mutationLoader(model, models);
        mutationType += mutationLoaderRes.type;     // mutation的类型定义
        mutationResolver = {...mutationResolver, ...mutationLoaderRes.resolver};  // mutation的处理器
    });

    const server = new ApolloServer({
        typeDefs: gql`
          ${type}
            
          type Query {
            ${queryType}
          }
          
          type Mutation {
            ${mutationType}
          }
        `,
        resolvers: {
            Query: queryResolver,
            Mutation: mutationResolver
        },
        introspection: true,
        debug: true,
        tracing: true,
        context: ({ctx}) => {
            return {
                models: app.db.models,
                config: app.config,
                ...ctx
            };
        },
        formatError: error => {
            console.log(error);
            return new Error(error);
        }
    });

    app.server = server;
    return server;
};