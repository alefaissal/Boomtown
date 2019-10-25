const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('../api/schema');
let resolvers = require('../api/resolvers');

module.exports = ({ app, pgResource }) => {
	resolvers = resolvers(app);

	/**
   * @TODO: Initialize Apollo Server
   *
   * Once you've defined your schema types, it's time to wire up your schema
   * to your resolving functions. This is Apollo magic, and it's done using
   * the 'makeExecutableSchema' function provided by the 'graphql-tools' package.
   *
   * https://www.apollographql.com/docs/apollo-server/v2/api/graphql-tools.html#makeExecutableSchema
   */

	// @TODO: Refactor to use 'makeExecutableSchema' to wire up your schema to your resolvers:
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	});
	// -------------------------------

	const apolloServer = new ApolloServer({
		context : ({ req }) => {
			const tokenName = app.get('JWT_COOKIE_NAME');
			const token = req ? req.cookies[tokenName] : undefined;
			let user = null;
			// -------------------------------
			try {
				return { req, token, user, pgResource };
			} catch (e) {
				throw e;
			}
		},
		schema
	});

	apolloServer.applyMiddleware({
		app,
		// @TODO: Add the CORS_CONFIG from your application configuration
		cors : undefined
		// -------------------------------
	});
};
