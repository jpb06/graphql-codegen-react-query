export const parsedArgsMockData = [
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
    imports: ['GqlPaginationArgs', 'GqlPaginatedProductsFiltersInput'],
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
    imports: ['GqlPaginatedProductsFiltersInput', 'GqlPaginationArgs'],
    data: 'export type CountProductPagesQueryArgs = { filters: GqlPaginatedProductsFiltersInput, pagination?: GqlPaginationArgs };\n',
  },
  {
    type: 'queries',
    name: 'productVariantSummaries',
    gqlParams: ['$input: GqlProductVariantSummaryInput!'],
    gqlArgs: ['input: $input'],
    imports: ['GqlProductVariantSummaryInput'],
    data: 'export type ProductVariantSummariesQueryArgs = { input: GqlProductVariantSummaryInput };\n',
  },
  {
    type: 'queries',
    name: 'companyAddresses',
    gqlParams: ['$type: GqlAddressType!'],
    gqlArgs: ['type: $type'],
    imports: ['GqlAddressType'],
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
    imports: ['GqlOpsOrderFiltersInput'],
    data: 'export type OpsOrdersQueryArgs = { filters: GqlOpsOrderFiltersInput };\n',
  },
  {
    type: 'queries',
    name: 'assets',
    gqlParams: ['$statuses: [GqlAssetStatus!]!'],
    gqlArgs: ['statuses: $statuses'],
    imports: ['GqlAssetStatus'],
    data: 'export type AssetsQueryArgs = { statuses: Array<GqlAssetStatus> };\n',
  },
  {
    type: 'mutations',
    name: 'login',
    gqlParams: ['$username: String!', '$password: String!'],
    gqlArgs: ['username: $username', 'password: $password'],
    imports: [],
    data: 'export type LoginMutationArgs = { username: string, password: string };\n',
  },
  {
    type: 'mutations',
    name: 'resetPasswordRequest',
    gqlParams: ['$email: String!'],
    gqlArgs: ['email: $email'],
    imports: [],
    data: 'export type ResetPasswordRequestMutationArgs = { email: string };\n',
  },
  {
    type: 'mutations',
    name: 'resetPassword',
    gqlParams: [
      '$token: String!',
      '$password: String!',
      '$confirmationPassword: String!',
    ],
    gqlArgs: [
      'token: $token',
      'password: $password',
      'confirmationPassword: $confirmationPassword',
    ],
    imports: [],
    data: 'export type ResetPasswordMutationArgs = { token: string, password: string, confirmationPassword: string };\n',
  },
  {
    type: 'mutations',
    name: 'loginWithGoogle',
    gqlParams: ['$code: String!'],
    gqlArgs: ['code: $code'],
    imports: [],
    data: 'export type LoginWithGoogleMutationArgs = { code: string };\n',
  },
  {
    type: 'mutations',
    name: 'modifyPassword',
    gqlParams: ['$oldPassword: String!', '$newPassword: String!'],
    gqlArgs: ['oldPassword: $oldPassword', 'newPassword: $newPassword'],
    imports: [],
    data: 'export type ModifyPasswordMutationArgs = { oldPassword: string, newPassword: string };\n',
  },
  {
    type: 'mutations',
    name: 'signup',
    gqlParams: [
      '$email: String!',
      '$lastName: String!',
      '$firstName: String!',
      '$password: String!',
      '$idCompanyGroup: ID!',
    ],
    gqlArgs: [
      'email: $email',
      'lastName: $lastName',
      'firstName: $firstName',
      'password: $password',
      'idCompanyGroup: $idCompanyGroup',
    ],
    imports: [],
    data: 'export type SignupMutationArgs = { email: string, lastName: string, firstName: string, password: string, idCompanyGroup: string };\n',
  },
  {
    type: 'mutations',
    name: 'userGeneralInformations',
    gqlParams: [
      '$lastName: String!',
      '$firstName: String!',
      '$email: String!',
      '$phone: String!',
    ],
    gqlArgs: [
      'lastName: $lastName',
      'firstName: $firstName',
      'email: $email',
      'phone: $phone',
    ],
    imports: [],
    data: 'export type UserGeneralInformationsMutationArgs = { lastName: string, firstName: string, email: string, phone: string };\n',
  },
  {
    type: 'mutations',
    name: 'changeUserState',
    gqlParams: ['$idUser: String!', '$newState: GqlUserState!'],
    gqlArgs: ['idUser: $idUser', 'newState: $newState'],
    imports: ['GqlUserState'],
    data: 'export type ChangeUserStateMutationArgs = { idUser: string, newState: GqlUserState };\n',
  },
  {
    type: 'mutations',
    name: 'inviteUser',
    gqlParams: [
      '$email: String!',
      '$firstName: String!',
      '$lastName: String!',
      '$address: String!',
      '$zipCode: String!',
      '$city: String!',
      '$country: String!',
      '$comment: String',
      '$phone: String',
      '$isAdmin: Boolean',
    ],
    gqlArgs: [
      'email: $email',
      'firstName: $firstName',
      'lastName: $lastName',
      'address: $address',
      'zipCode: $zipCode',
      'city: $city',
      'country: $country',
      'comment: $comment',
      'phone: $phone',
      'isAdmin: $isAdmin',
    ],
    imports: [],
    data: 'export type InviteUserMutationArgs = { email: string, firstName: string, lastName: string, address: string, zipCode: string, city: string, country: string, comment?: string, phone?: string, isAdmin?: boolean };\n',
  },
  {
    type: 'mutations',
    name: 'completeUserRegistration',
    gqlParams: ['$data: GqlUserRegistrationArgs!'],
    gqlArgs: ['data: $data'],
    imports: ['GqlUserRegistrationArgs'],
    data: 'export type CompleteUserRegistrationMutationArgs = { data: GqlUserRegistrationArgs };\n',
  },
  {
    type: 'mutations',
    name: 'companyInformations',
    gqlParams: ['$email: String!'],
    gqlArgs: ['email: $email'],
    imports: [],
    data: 'export type CompanyInformationsMutationArgs = { email: string };\n',
  },
  {
    type: 'mutations',
    name: 'changeProductAvailability',
    gqlParams: ['$input: GqlChangeProductAvailabilityArgs!'],
    gqlArgs: ['input: $input'],
    imports: ['GqlChangeProductAvailabilityArgs'],
    data: 'export type ChangeProductAvailabilityMutationArgs = { input: GqlChangeProductAvailabilityArgs };\n',
  },
  {
    type: 'mutations',
    name: 'changeDeliveryDuration',
    gqlParams: ['$input: GqlChangeDeliveryDurationArgs!'],
    gqlArgs: ['input: $input'],
    imports: ['GqlChangeDeliveryDurationArgs'],
    data: 'export type ChangeDeliveryDurationMutationArgs = { input: GqlChangeDeliveryDurationArgs };\n',
  },
  {
    type: 'mutations',
    name: 'createCompanyAddress',
    gqlParams: [
      '$type: GqlAddressType!',
      '$country: String!',
      '$address: String!',
      '$zip: String!',
      '$city: String!',
      '$recipientPhone: String!',
      '$recipientFirstName: String!',
      '$recipientLastName: String!',
      '$contactEmail: String!',
      '$addressName: String!',
      '$isDefault: Boolean!',
    ],
    gqlArgs: [
      'type: $type',
      'country: $country',
      'address: $address',
      'zip: $zip',
      'city: $city',
      'recipientPhone: $recipientPhone',
      'recipientFirstName: $recipientFirstName',
      'recipientLastName: $recipientLastName',
      'contactEmail: $contactEmail',
      'addressName: $addressName',
      'isDefault: $isDefault',
    ],
    imports: ['GqlAddressType'],
    data: 'export type CreateCompanyAddressMutationArgs = { type: GqlAddressType, country: string, address: string, zip: string, city: string, recipientPhone: string, recipientFirstName: string, recipientLastName: string, contactEmail: string, addressName: string, isDefault: boolean };\n',
  },
  {
    type: 'mutations',
    name: 'archiveCompanyAddress',
    gqlParams: ['$idAddress: String!'],
    gqlArgs: ['idAddress: $idAddress'],
    imports: [],
    data: 'export type ArchiveCompanyAddressMutationArgs = { idAddress: string };\n',
  },
  {
    type: 'mutations',
    name: 'setCompanyAddressAsDefault',
    gqlParams: ['$idAddress: String!'],
    gqlArgs: ['idAddress: $idAddress'],
    imports: [],
    data: 'export type SetCompanyAddressAsDefaultMutationArgs = { idAddress: string };\n',
  },
  {
    type: 'mutations',
    name: 'order',
    gqlParams: [
      '$idAddress: ID!',
      '$basket: [GqlBasket!]!',
      '$status: GqlAssetStatus!',
      '$idUser: ID',
    ],
    gqlArgs: [
      'idAddress: $idAddress',
      'basket: $basket',
      'status: $status',
      'idUser: $idUser',
    ],
    imports: ['GqlBasket', 'GqlAssetStatus'],
    data: 'export type OrderMutationArgs = { idAddress: string, basket: Array<GqlBasket>, status: GqlAssetStatus, idUser?: string };\n',
  },
  {
    type: 'mutations',
    name: 'updateOrderStatusBulk',
    gqlParams: ['$ids: [ID!]!', '$status: GqlOrderedProductStatus!'],
    gqlArgs: ['ids: $ids', 'status: $status'],
    imports: ['GqlOrderedProductStatus'],
    data: 'export type UpdateOrderStatusBulkMutationArgs = { ids: Array<string>, status: GqlOrderedProductStatus };\n',
  },
  {
    type: 'mutations',
    name: 'updateDeliveryDate',
    gqlParams: ['$ids: [ID!]!', '$deliveryDate: DateTime!'],
    gqlArgs: ['ids: $ids', 'deliveryDate: $deliveryDate'],
    imports: [],
    data: 'export type UpdateDeliveryDateMutationArgs = { ids: Array<string>, deliveryDate: string };\n',
  },
  {
    type: 'mutations',
    name: 'addOrderComment',
    gqlParams: ['$idOrder: ID!', '$comment: String!'],
    gqlArgs: ['idOrder: $idOrder', 'comment: $comment'],
    imports: [],
    data: 'export type AddOrderCommentMutationArgs = { idOrder: string, comment: string };\n',
  },
  {
    type: 'mutations',
    name: 'changeAssetStatus',
    gqlParams: [
      '$idAsset: ID!',
      '$assignedTo: ID!',
      '$newStatus: GqlAssetStatus!',
    ],
    gqlArgs: [
      'idAsset: $idAsset',
      'assignedTo: $assignedTo',
      'newStatus: $newStatus',
    ],
    imports: ['GqlAssetStatus'],
    data: 'export type ChangeAssetStatusMutationArgs = { idAsset: string, assignedTo: string, newStatus: GqlAssetStatus };\n',
  },
];
