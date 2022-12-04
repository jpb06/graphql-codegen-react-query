export type GqlKind =
  | 'NON_NULL'
  | 'SCALAR'
  | 'OBJECT'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'ENUM';

export type GqlFieldType = {
  kind: GqlKind;
  name: string | null;
  ofType: GqlFieldType | null;
};

export type GqlField = {
  name: string;
  description: string | null;
  type: GqlFieldType;
  defaultValue: unknown;
  args: Array<GqlField> | null;
};

export type GqlEnum = {
  name: string;
  description: string | null;
  isDeprecated: boolean;
  deprecationReason: string | null;
};

export type GqlType = {
  kind: GqlKind;
  name: string;
  description: string | null;
  fields: Array<GqlField> | null;
  inputFields: Array<GqlField>;
  interfaces: unknown | null;
  enumValues: Array<GqlEnum> | null;
  possibleTypes: unknown | null;
};

export type IntrospectQuery = {
  data: {
    __schema: {
      queryType: { name: 'Query' } | null;
      mutationType: { name: 'Mutation' } | null;
      subscriptionType: unknown | null;
      types: Array<GqlType>;
      directives: Array<unknown>;
    };
  };
};
