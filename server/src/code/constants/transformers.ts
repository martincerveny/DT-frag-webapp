import { ValueTransformer } from 'typeorm';

export const bufferToStringTransformer: ValueTransformer = {
  from: value => value.toString(),
  to: value => value,
};
