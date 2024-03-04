import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, mySchema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const query = req.body.query;
      const variables = req.body.variables;

      const resolvers = {
        memberTypes: () => prisma.memberType.findMany(),
        posts: () => prisma.post.findMany(),
        users: () => prisma.user.findMany(),
        profiles: () => prisma.profile.findMany(),
      };

      const response = await graphql({
        schema: mySchema,
        source: query,
        rootValue: resolvers,
      });
      console.log('response', response);
      return response;
    },
  });
};

export default plugin;
