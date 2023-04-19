import { generateQueryReplacer } from './generate-query-replacer';
import { graphqlQueryObjectMockedData } from '../../../../tests-related/mocked-data/graphql-schema';
import { GqlType } from '../../../../types/introspection-query-response.type';

describe('generateQueryReplacer function', () => {
  it('should import nothing from api types if there is no queries with args', () => {
    const result = generateQueryReplacer({
      fields: [graphqlQueryObjectMockedData?.fields?.[0]],
    } as GqlType);

    expect(result).not.toContain(`from './../types/api-types';`);
  });

  it('should import query args types', () => {
    const result = generateQueryReplacer(graphqlQueryObjectMockedData);

    expect(result).toContain(
      `import { CatalogQueryArgs } from './../types/queries/catalog/CatalogQueryArgs.type';
import { UserInformationsQueryArgs } from './../types/queries/userInformations/UserInformationsQueryArgs.type';
import { UsersQueryArgs } from './../types/queries/users/UsersQueryArgs.type';
import { GetRegistrationStatusQueryArgs } from './../types/queries/getRegistrationStatus/GetRegistrationStatusQueryArgs.type';
import { ProductQueryArgs } from './../types/queries/product/ProductQueryArgs.type';
import { ProductsByPageQueryArgs } from './../types/queries/productsByPage/ProductsByPageQueryArgs.type';
import { CountProductPagesQueryArgs } from './../types/queries/countProductPages/CountProductPagesQueryArgs.type';
import { ProductVariantSummariesQueryArgs } from './../types/queries/productVariantSummaries/ProductVariantSummariesQueryArgs.type';
import { CompanyAddressesQueryArgs } from './../types/queries/companyAddresses/CompanyAddressesQueryArgs.type';
import { OrdersDetailsQueryArgs } from './../types/queries/ordersDetails/OrdersDetailsQueryArgs.type';
import { OpsOrdersQueryArgs } from './../types/queries/opsOrders/OpsOrdersQueryArgs.type';
import { AssetsQueryArgs } from './../types/queries/assets/AssetsQueryArgs.type';`,
    );
  });

  it('should create functions returning undefined for queries with no args', () => {
    const result = generateQueryReplacer(graphqlQueryObjectMockedData);

    expect(result).toContain(`me: () => undefined`);
    expect(result).toContain(`companyInformations: () => undefined`);
    expect(result).toContain(`orders: () => undefined`);
  });

  it('should create functions returning an array of regex/string for queries with args', () => {
    const result = generateQueryReplacer(graphqlQueryObjectMockedData);

    expect(result).toContain(
      "productsByPage: (args: ProductsByPageQueryArgs) => [new RegExp('^ {2}productsByPage {$', 'gm'), `  productsByPage(pagination: ${args?.pagination === undefined ? '{}' : stringify(args?.pagination, \"GqlPaginationArgs\")}, filters: ${args?.filters === undefined ? '{}' : stringify(args?.filters, \"GqlPaginatedProductsFiltersInput\")}) {`],",
    );
    expect(result).toContain(
      "userInformations: (args: UserInformationsQueryArgs) => [new RegExp('^ {2}userInformations {$', 'gm'), `  userInformations(idUser: ${args?.idUser === undefined ? 'null' : stringify(args?.idUser, \"string\")}) {`],",
    );
    expect(result).toContain(
      "companyAddresses: (args: CompanyAddressesQueryArgs) => [new RegExp('^ {2}companyAddresses {$', 'gm'), `  companyAddresses(type: ${args?.type === undefined ? '{}' : stringify(args?.type, \"GqlAddressType\")}) {`]",
    );
  });
});
