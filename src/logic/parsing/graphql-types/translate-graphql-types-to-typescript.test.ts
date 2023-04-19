import { translateGraphqlTypesToTypescript } from './translate-graphql-types-to-typescript';
import {
  graphqlEnumMockedData,
  graphqlGqlAddresstMockedData,
  graphqlMetadataTypeMockedData,
  graphqlQueryObjectMockedData,
} from '../../../tests-related/mocked-data/graphql-schema';

describe('translateGraphqlTypesToTypescript function', () => {
  it('should return nothing if all types begin with "__"', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlMetadataTypeMockedData,
    ]);

    expect(result).toStrictEqual({
      types: [],
      typesObject: {},
      args: [],
      count: 0,
    });
  });

  it('should return enum types', () => {
    const result = translateGraphqlTypesToTypescript([graphqlEnumMockedData]);

    expect(result).toStrictEqual({
      types: [
        {
          data: "export type NumberCondition = 'gte' | 'lte'",
          name: 'NumberCondition',
          type: 'enum',
        },
      ],
      typesObject: {},
      count: 1,
      args: [],
    });
  });

  it('should return object types', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlGqlAddresstMockedData,
    ]);

    expect(result).toStrictEqual({
      types: [
        {
          data: 'export interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }\n',
          name: 'GqlAddress',
          type: 'type',
        },
      ],
      typesObject: {
        GqlAddress: {
          id: 'string',
          street: 'string',
          zipCode: 'string',
          city: 'string',
          country: 'string',
        },
      },
      count: 1,
      args: [],
    });
  });

  it('should return a complex object containing functions', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlQueryObjectMockedData,
    ]);

    expect(result).toStrictEqual({
      types: [
        {
          name: 'Query',
          data: 'export interface Query { catalog: GqlCatalogResult; me: GqlLoggedUser; userInformations: GqlBaseUser; users: Array<GqlBaseUser>; getRegistrationStatus: GqlInvitedUserStatus; companyInformations: GqlCompanyInformations; product: GqlProductResult; productsByPage: Array<GqlProductByPageResult>; countProductPages: GqlProductCount; productVariantSummaries: Array<GqlProductVariantSummary>; companyAddresses: Array<GqlCompanyAddress>; ordersDetails: GqlOrderDetails; orders: Array<GqlUserOrder>; opsOrders: Array<GqlOpsOrder>; assets: Array<GqlAsset>; }\n',
          type: 'type',
        },
      ],
      args: [
        {
          type: 'queries',
          name: 'catalog',
          gqlParams: ['$slug: String'],
          gqlArgs: ['slug: $slug'],
          imports: [],
          data: 'export type CatalogQueryArgs = { slug?: string };\n',
        },
        {
          type: 'queries',
          name: 'userInformations',
          gqlParams: ['$idUser: String!'],
          gqlArgs: ['idUser: $idUser'],
          imports: [],
          data: 'export type UserInformationsQueryArgs = { idUser: string };\n',
        },
        {
          type: 'queries',
          name: 'users',
          gqlParams: ['$searchText: String'],
          gqlArgs: ['searchText: $searchText'],
          imports: [],
          data: 'export type UsersQueryArgs = { searchText?: string };\n',
        },
        {
          type: 'queries',
          name: 'getRegistrationStatus',
          gqlParams: ['$token: String!'],
          gqlArgs: ['token: $token'],
          imports: [],
          data: 'export type GetRegistrationStatusQueryArgs = { token: string };\n',
        },
        {
          type: 'queries',
          name: 'product',
          gqlParams: ['$idProduct: String!'],
          gqlArgs: ['idProduct: $idProduct'],
          imports: [],
          data: 'export type ProductQueryArgs = { idProduct: string };\n',
        },
        {
          type: 'queries',
          name: 'productsByPage',
          gqlParams: [
            '$pagination: GqlPaginationArgs!',
            '$filters: GqlPaginatedProductsFiltersInput!',
          ],
          gqlArgs: ['pagination: $pagination', 'filters: $filters'],
          imports: [],
          data: 'export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput };\n',
        },
        {
          type: 'queries',
          name: 'countProductPages',
          gqlParams: [
            '$filters: GqlPaginatedProductsFiltersInput!',
            '$pagination: GqlPaginationArgs',
          ],
          gqlArgs: ['filters: $filters', 'pagination: $pagination'],
          imports: [],
          data: 'export type CountProductPagesQueryArgs = { filters: GqlPaginatedProductsFiltersInput, pagination?: GqlPaginationArgs };\n',
        },
        {
          type: 'queries',
          name: 'productVariantSummaries',
          gqlParams: ['$input: GqlProductVariantSummaryInput!'],
          gqlArgs: ['input: $input'],
          imports: [],
          data: 'export type ProductVariantSummariesQueryArgs = { input: GqlProductVariantSummaryInput };\n',
        },
        {
          type: 'queries',
          name: 'companyAddresses',
          gqlParams: ['$type: GqlAddressType!'],
          gqlArgs: ['type: $type'],
          imports: [],
          data: 'export type CompanyAddressesQueryArgs = { type: GqlAddressType };\n',
        },
        {
          type: 'queries',
          name: 'ordersDetails',
          gqlParams: ['$commandNb: Int!'],
          gqlArgs: ['commandNb: $commandNb'],
          imports: [],
          data: 'export type OrdersDetailsQueryArgs = { commandNb: number };\n',
        },
        {
          type: 'queries',
          name: 'opsOrders',
          gqlParams: ['$filters: GqlOpsOrderFiltersInput!'],
          gqlArgs: ['filters: $filters'],
          imports: [],
          data: 'export type OpsOrdersQueryArgs = { filters: GqlOpsOrderFiltersInput };\n',
        },
        {
          type: 'queries',
          name: 'assets',
          gqlParams: ['$statuses: [GqlAssetStatus!]!'],
          gqlArgs: ['statuses: $statuses'],
          imports: [],
          data: 'export type AssetsQueryArgs = { statuses: Array<GqlAssetStatus> };\n',
        },
      ],
      typesObject: {
        Query: {
          catalog: 'GqlCatalogResult',
          me: 'GqlLoggedUser',
          userInformations: 'GqlBaseUser',
          users: 'Array<GqlBaseUser>',
          getRegistrationStatus: 'GqlInvitedUserStatus',
          companyInformations: 'GqlCompanyInformations',
          product: 'GqlProductResult',
          productsByPage: 'Array<GqlProductByPageResult>',
          countProductPages: 'GqlProductCount',
          productVariantSummaries: 'Array<GqlProductVariantSummary>',
          companyAddresses: 'Array<GqlCompanyAddress>',
          ordersDetails: 'GqlOrderDetails',
          orders: 'Array<GqlUserOrder>',
          opsOrders: 'Array<GqlOpsOrder>',
          assets: 'Array<GqlAsset>',
        },
      },
      count: 1,
    });
  });

  it('should return several types', () => {
    const result = translateGraphqlTypesToTypescript([
      graphqlGqlAddresstMockedData,
      graphqlQueryObjectMockedData,
      graphqlEnumMockedData,
      graphqlMetadataTypeMockedData,
    ]);

    expect(result).toStrictEqual({
      types: [
        {
          name: 'GqlAddress',
          data: 'export interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }\n',
          type: 'type',
        },
        {
          name: 'Query',
          data: 'export interface Query { catalog: GqlCatalogResult; me: GqlLoggedUser; userInformations: GqlBaseUser; users: Array<GqlBaseUser>; getRegistrationStatus: GqlInvitedUserStatus; companyInformations: GqlCompanyInformations; product: GqlProductResult; productsByPage: Array<GqlProductByPageResult>; countProductPages: GqlProductCount; productVariantSummaries: Array<GqlProductVariantSummary>; companyAddresses: Array<GqlCompanyAddress>; ordersDetails: GqlOrderDetails; orders: Array<GqlUserOrder>; opsOrders: Array<GqlOpsOrder>; assets: Array<GqlAsset>; }\n',
          type: 'type',
        },
        {
          name: 'NumberCondition',
          type: 'enum',
          data: "export type NumberCondition = 'gte' | 'lte'",
        },
      ],
      args: [
        {
          type: 'queries',
          name: 'catalog',
          gqlParams: ['$slug: String'],
          gqlArgs: ['slug: $slug'],
          imports: [],
          data: 'export type CatalogQueryArgs = { slug?: string };\n',
        },
        {
          type: 'queries',
          name: 'userInformations',
          gqlParams: ['$idUser: String!'],
          gqlArgs: ['idUser: $idUser'],
          imports: [],
          data: 'export type UserInformationsQueryArgs = { idUser: string };\n',
        },
        {
          type: 'queries',
          name: 'users',
          gqlParams: ['$searchText: String'],
          gqlArgs: ['searchText: $searchText'],
          imports: [],
          data: 'export type UsersQueryArgs = { searchText?: string };\n',
        },
        {
          type: 'queries',
          name: 'getRegistrationStatus',
          gqlParams: ['$token: String!'],
          gqlArgs: ['token: $token'],
          imports: [],
          data: 'export type GetRegistrationStatusQueryArgs = { token: string };\n',
        },
        {
          type: 'queries',
          name: 'product',
          gqlParams: ['$idProduct: String!'],
          gqlArgs: ['idProduct: $idProduct'],
          imports: [],
          data: 'export type ProductQueryArgs = { idProduct: string };\n',
        },
        {
          type: 'queries',
          name: 'productsByPage',
          gqlParams: [
            '$pagination: GqlPaginationArgs!',
            '$filters: GqlPaginatedProductsFiltersInput!',
          ],
          gqlArgs: ['pagination: $pagination', 'filters: $filters'],
          imports: [],
          data: 'export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput };\n',
        },
        {
          type: 'queries',
          name: 'countProductPages',
          gqlParams: [
            '$filters: GqlPaginatedProductsFiltersInput!',
            '$pagination: GqlPaginationArgs',
          ],
          gqlArgs: ['filters: $filters', 'pagination: $pagination'],
          imports: [],
          data: 'export type CountProductPagesQueryArgs = { filters: GqlPaginatedProductsFiltersInput, pagination?: GqlPaginationArgs };\n',
        },
        {
          type: 'queries',
          name: 'productVariantSummaries',
          gqlParams: ['$input: GqlProductVariantSummaryInput!'],
          gqlArgs: ['input: $input'],
          imports: [],
          data: 'export type ProductVariantSummariesQueryArgs = { input: GqlProductVariantSummaryInput };\n',
        },
        {
          type: 'queries',
          name: 'companyAddresses',
          gqlParams: ['$type: GqlAddressType!'],
          gqlArgs: ['type: $type'],
          imports: [],
          data: 'export type CompanyAddressesQueryArgs = { type: GqlAddressType };\n',
        },
        {
          type: 'queries',
          name: 'ordersDetails',
          gqlParams: ['$commandNb: Int!'],
          gqlArgs: ['commandNb: $commandNb'],
          imports: [],
          data: 'export type OrdersDetailsQueryArgs = { commandNb: number };\n',
        },
        {
          type: 'queries',
          name: 'opsOrders',
          gqlParams: ['$filters: GqlOpsOrderFiltersInput!'],
          gqlArgs: ['filters: $filters'],
          imports: [],
          data: 'export type OpsOrdersQueryArgs = { filters: GqlOpsOrderFiltersInput };\n',
        },
        {
          type: 'queries',
          name: 'assets',
          gqlParams: ['$statuses: [GqlAssetStatus!]!'],
          gqlArgs: ['statuses: $statuses'],
          imports: [],
          data: 'export type AssetsQueryArgs = { statuses: Array<GqlAssetStatus> };\n',
        },
      ],
      typesObject: {
        GqlAddress: {
          id: 'string',
          street: 'string',
          zipCode: 'string',
          city: 'string',
          country: 'string',
        },
        Query: {
          catalog: 'GqlCatalogResult',
          me: 'GqlLoggedUser',
          userInformations: 'GqlBaseUser',
          users: 'Array<GqlBaseUser>',
          getRegistrationStatus: 'GqlInvitedUserStatus',
          companyInformations: 'GqlCompanyInformations',
          product: 'GqlProductResult',
          productsByPage: 'Array<GqlProductByPageResult>',
          countProductPages: 'GqlProductCount',
          productVariantSummaries: 'Array<GqlProductVariantSummary>',
          companyAddresses: 'Array<GqlCompanyAddress>',
          ordersDetails: 'GqlOrderDetails',
          orders: 'Array<GqlUserOrder>',
          opsOrders: 'Array<GqlOpsOrder>',
          assets: 'Array<GqlAsset>',
        },
      },
      count: 3,
    });
  });
});
