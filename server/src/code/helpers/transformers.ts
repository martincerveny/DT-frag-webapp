import { ValueTransformer } from 'typeorm';

/**
 * Transforms buffer to string
 */
export const bufferToStringTransformer: ValueTransformer = {
  from: value => value.toString(),
  to: value => value,
};
