import { GraphQLSchema, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

export const depthValidation = (schema: GraphQLSchema, query: string) => {
  const errors = validate(schema, parse(query), [depthLimit(5)]);
  return errors.length && { data: null, errors };
};
