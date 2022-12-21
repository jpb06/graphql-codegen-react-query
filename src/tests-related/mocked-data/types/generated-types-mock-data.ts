export const generatedTypesMockedData = `export interface GqlAddress { id: string; street: string; zipCode: string; city: string; country: string; }
export interface GqlNewAddressOutput { id: string; street: string; zipCode: string; city: string; country: string; }
export interface GqlAuthOutput { id: string; email: string; lastName: string; firstName: string; joinDate: Date; role: string; token: string; }
export interface GqlLoggedUser { id: string; email: string; lastName: string; firstName: string; joinDate: Date; role: string; token: string; }
export interface GqlCategory { id: string; name: string; }
export interface GqlProduct { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number; }
export interface GqlProductWithCategory { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number; category: GqlCategory; }
export interface GqlPaginatedProductsOutput { id: number; data: Array<GqlProductWithCategory>; hasMoreData: boolean; }
export interface GqlCategoryWithProducts { id: string; name: string; products?: Array<GqlProduct>; }
export interface GqlOrderedItem { id: string; quantity: number; name: string; image: string; price: number; }
export interface GqlOrder { id: string; idUser: string; idCreditCard: string; createdAt: Date; creditCardNumber: string; items: Array<GqlOrderedItem>; }
export interface GqlPlaceOrderOutput { orderId: number; }
export interface GqlPartialCreditCard { number: string; expires: string; }
export interface GqlPartialOrderedItem { id: string; quantity: number; name: string; price: number; }
export interface GqlUserOrder { createdAt: Date; creditCard: GqlPartialCreditCard; items: Array<GqlPartialOrderedItem>; }
export interface Query { products: Array<GqlProductWithCategory>; productsByPage: (pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput) =>  GqlPaginatedProductsOutput; productsWithIds: (ids: Array<number>) =>  Array<GqlProductWithCategory>; product: (id: number) =>  GqlProductWithCategory; categories: Array<GqlCategoryWithProducts>; category: (id: number) =>  GqlCategoryWithProducts; me: GqlLoggedUser; getOrder: (id: number) =>  GqlUserOrder; myOrders: Array<GqlOrder>; myAddresses: Array<GqlAddress>; }
export interface GqlPaginationArgs { offset: 0; limit: 25; }
export interface GqlPaginatedProductsFiltersInput { categoriesIds?: Array<number>; text?: string; price?: number; priceCondition?: NumberCondition; availableStock?: boolean; }
export type NumberCondition = 'gte' | 'lte';
export interface GqlPaginatedProductsSortingInput { field?: SortField; direction?: SortDirection; }
export type SortField = 'price' | 'name';
export type SortDirection = 'asc' | 'desc';
export interface Mutation { signup: (email: string, lastName: string, firstName: string, password: string) =>  GqlAuthOutput; login: (username: string, password: string) =>  GqlAuthOutput; placeOrder: (creditCard: GqlPlaceOrderInput, orderedItems: Array<GqlNewOrderedItem>) =>  GqlPlaceOrderOutput; createAddress: (street: string, zipCode: string, city: string, country: string) =>  GqlNewAddressOutput; }
export interface GqlPlaceOrderInput { number: string; name: string; expires: string; cvc: string; }
export interface GqlNewOrderedItem { idProduct: number; quantity: number; }

export type ProductsByPageQueryArgs = { pagination: GqlPaginationArgs, filters: GqlPaginatedProductsFiltersInput, sort: GqlPaginatedProductsSortingInput };
export type ProductsWithIdsQueryArgs = { ids: Array<number> };
export type ProductQueryArgs = { id: number };
export type CategoryQueryArgs = { id: number };
export type GetOrderQueryArgs = { id: number };
export type SignupMutationArgs = { email: string, lastName: string, firstName: string, password: string };
export type LoginMutationArgs = { username: string, password: string };
export type PlaceOrderMutationArgs = { creditCard: GqlPlaceOrderInput, orderedItems: Array<GqlNewOrderedItem> };
export type CreateAddressMutationArgs = { street: string, zipCode: string, city: string, country: string };
`;
