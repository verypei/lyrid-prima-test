import { Transform } from 'class-transformer';

/**
 * Custom decorator to transform string values to lowercase.
 */
export function TransformLowerCase() {
  return Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase() : value));
}
