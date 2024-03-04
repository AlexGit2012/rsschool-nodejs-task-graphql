import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PrismaClient } from '@prisma/client';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: { type: new GraphQLList(Profile) },
  }),
});

export const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: UUIDType },
    content: { type: UUIDType },
    authorId: { type: UUIDType },
  }),
});

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: UUIDType },
    balance: { type: GraphQLFloat },
    profile: { type: Profile },
    posts: { type: new GraphQLList(Post) },
    userSubscribedTo: {
      type: new GraphQLList(User),
      args: { id: { type: UUIDType } },
      resolve: async (
        { id: rootId }: { id: string },
        _args,
        { prisma }: { prisma: PrismaClient },
      ) => {
        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: rootId,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      args: { id: { type: UUIDType } },
      resolve: async (
        { id: rootId }: { id: string },
        _args,
        { prisma }: { prisma: PrismaClient },
      ) => {
        return await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: rootId,
              },
            },
          },
        });
      },
    },
  }),
});

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: { type: MemberType },
    memberTypeId: { type: GraphQLString },
    user: { type: User },
  }),
});
