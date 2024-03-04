import { GraphQLBoolean, GraphQLList, GraphQLObjectType } from 'graphql';
import { Post, Profile, User } from './gqlTypes.js';
import { PrismaClient } from '@prisma/client';
import {
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
} from './gqlInputTypes.js';
import { UUIDType } from './uuid.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: Post,
      args: { dto: { type: CreatePostInput } },
      resolve: async (_parent, { dto }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.post.create({
          data: dto,
        });
      },
    },
    createUser: {
      type: User,
      args: { dto: { type: CreateUserInput } },
      resolve: async (_parent, { dto }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.user.create({
          data: dto,
        });
      },
    },
    createProfile: {
      type: Profile,
      args: { dto: { type: CreateProfileInput } },
      resolve: async (_parent, { dto }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.profile.create({
          data: dto,
        });
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }, { prisma }: { prisma: PrismaClient }) => {
        let isDeleted: boolean;
        try {
          await prisma.post.delete({
            where: {
              id,
            },
          });
          isDeleted = true;
        } catch (err) {
          isDeleted = false;
        }
        return isDeleted;
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }, { prisma }: { prisma: PrismaClient }) => {
        let isDeleted: boolean;
        try {
          await prisma.profile.delete({
            where: {
              id,
            },
          });
          isDeleted = true;
        } catch (err) {
          isDeleted = false;
        }
        return isDeleted;
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }, { prisma }: { prisma: PrismaClient }) => {
        let isDeleted: boolean;
        try {
          await prisma.user.delete({
            where: {
              id,
            },
          });
          isDeleted = true;
        } catch (err) {
          isDeleted = false;
        }
        return isDeleted;
      },
    },
    changePost: {
      type: Post,
      args: { id: { type: UUIDType }, dto: { type: ChangePostInput } },
      resolve: async (_parent, { id, dto }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.post.update({
          where: { id },
          data: dto,
        });
      },
    },
    changeUser: {
      type: User,
      args: { id: { type: UUIDType }, dto: { type: ChangeUserInput } },
      resolve: async (_parent, { id, dto }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.user.update({
          where: { id },
          data: dto,
        });
      },
    },
    changeProfile: {
      type: Profile,
      args: {
        id: { type: UUIDType },
        dto: { type: ChangeProfileInput },
      },
      resolve: async (_parent, { id, dto }, { prisma }: { prisma: PrismaClient }) => {
        return await prisma.profile.update({
          where: { id },
          data: dto,
        });
      },
    },
    subscribeTo: {
      type: new GraphQLObjectType({
        name: 'SubscribeToType',
        fields: {
          id: { type: UUIDType },
          authorId: { type: UUIDType },
          subscriber: { type: new GraphQLList(User) },
          author: { type: User },
        },
      }),
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: async (
        _parent,
        { userId: subscriberId, authorId },
        { prisma }: { prisma: PrismaClient },
      ) => {
        return await prisma.subscribersOnAuthors.create({
          data: { subscriberId, authorId },
        });
      },
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: async (
        _parent,
        { userId: subscriberId, authorId },
        { prisma }: { prisma: PrismaClient },
      ) => {
        let isDeleted: boolean;
        try {
          await prisma.subscribersOnAuthors.delete({
            where: {
              subscriberId_authorId: {
                subscriberId,
                authorId,
              },
            },
          });
          isDeleted = true;
        } catch (err) {
          isDeleted = false;
        }
        return isDeleted;
      },
    },
  },
});
