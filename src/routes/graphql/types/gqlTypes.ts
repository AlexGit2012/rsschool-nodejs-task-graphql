import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';

export const memberType = new GraphQLObjectType({
  name: 'MemberTypes',
  fields: () => ({
    id: { type: GraphQLString },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

export const post = new GraphQLObjectType({
  name: 'Posts',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: UUIDType },
    content: { type: UUIDType },
    authorId: { type: UUIDType },
  }),
});

export const user = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: UUIDType },
    balance: { type: GraphQLFloat },
  }),
});

export const profile = new GraphQLObjectType({
  name: 'Profiles',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLString },
  }),
});

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: { type: new GraphQLList(memberType) },
    posts: { type: new GraphQLList(post) },
    users: { type: new GraphQLList(user) },
    profiles: { type: new GraphQLList(profile) },
  },
});
