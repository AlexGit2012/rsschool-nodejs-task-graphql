import { PrismaClient } from '@prisma/client';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';
import { MemberType, Post, User, Profile, MemberTypeIdEnum } from './gqlTypes.js';
import { UUIDType } from './uuid.js';

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_parent, _args, { prisma }: { prisma: PrismaClient }) =>
        await prisma.memberType.findMany(),
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (_parent, _args, { prisma }: { prisma: PrismaClient }) =>
        await prisma.post.findMany(),
    },
    users: {
      type: new GraphQLList(User),
      resolve: async (_parent, _args, { prisma }: { prisma: PrismaClient }) =>
        await prisma.user.findMany({
          include: {
            posts: true,
            profile: {
              include: {
                memberType: true,
              },
            },
          },
        }),
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (_parent, _args, { prisma }: { prisma: PrismaClient }) =>
        await prisma.profile.findMany(),
    },
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeIdEnum } },
      resolve: async (
        _parent,
        { id }: { id: MemberTypeId },
        { prisma }: { prisma: PrismaClient },
      ) => {
        return await prisma.memberType.findUnique({
          where: {
            id,
          },
        });
      },
    },
    post: {
      type: Post,
      args: { id: { type: UUIDType } },
      resolve: async (
        _parent,
        { id }: { id: string },
        { prisma }: { prisma: PrismaClient },
      ) => {
        return await prisma.post.findUnique({
          where: {
            id,
          },
        });
      },
    },
    user: {
      type: User,
      args: { id: { type: UUIDType } },
      resolve: async (
        _parent,
        { id }: { id: string },
        { prisma }: { prisma: PrismaClient },
      ) => {
        const result = await prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            posts: true,
            profile: {
              include: {
                memberType: true,
              },
            },
          },
        });
        return result;
      },
    },
    profile: {
      type: Profile,
      args: { id: { type: UUIDType } },
      resolve: async (
        _parent,
        { id }: { id: string },
        { prisma }: { prisma: PrismaClient },
      ) => {
        const result = await prisma.profile.findUnique({
          where: {
            id,
          },
        });
        return result;
      },
    },
  },
});
