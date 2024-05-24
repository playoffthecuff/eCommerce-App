type BaseNamePath = string | number | boolean | (string | number | boolean)[];
/**
 * Store: The store type from `FormInstance<Store>`
 * ParentNamePath: Auto generate by nest logic. Do not fill manually.
 */
export type DeepNamePath<Store = unknown, ParentNamePath extends unknown[] = []> = ParentNamePath['length'] extends 10
  ? never
  : true extends (Store extends BaseNamePath ? true : false)
    ? ParentNamePath['length'] extends 0
      ? Store | BaseNamePath
      : Store extends unknown[]
        ? [...ParentNamePath, number]
        : never
    : Store extends unknown[] // Connect path. e.g. { a: { b: string }[] }
      ? [...ParentNamePath, number] | DeepNamePath<Store[number], [...ParentNamePath, number]>
      : keyof Store extends never
        ? Store
        : {
            // eslint-disable-next-line @typescript-eslint/ban-types
            [FieldKey in keyof Store]: Store[FieldKey] extends Function
              ? never
              :
                  | (ParentNamePath['length'] extends 0 ? FieldKey : never)
                  | [...ParentNamePath, FieldKey]
                  | DeepNamePath<Required<Store>[FieldKey], [...ParentNamePath, FieldKey]>;
          }[keyof Store];

export type InternalNamePath = (string | number)[];
export type NamePath<T = unknown> = DeepNamePath<T>;
export type StoreValue = unknown;
export interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  warnings: string[];
  name: InternalNamePath;
  validated: boolean;
}
export interface InternalFieldData extends Meta {
  value: StoreValue;
}
/**
 * Used by `setFields` config
 */
export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
  name: NamePath;
}
