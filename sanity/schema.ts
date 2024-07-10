import { type SchemaTypeDefinition } from "sanity";
import userSchema from "./user";
import postSchema from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userSchema, postSchema],
};
