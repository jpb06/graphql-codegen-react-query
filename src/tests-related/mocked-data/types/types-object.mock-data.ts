export const typesObjectMockData = {
  GqlContract: {
    id: 'string',
    createdAt: 'string',
    leaserContractNumber: 'string',
  },
  GqlAsset: {
    id: 'string',
    serialNumber: 'string',
    contract: 'GqlContract',
    type: 'GqlAssetType',
    brand: 'string',
    productName: 'string',
    variant: 'string',
    pictureUrl: 'string',
    status: 'GqlAssetStatus',
    category: 'string',
    offerDuration: 'number',
    assignedTo: 'string',
  },
  GqlCompanyAddress: {
    id: 'string',
    name: 'string',
    country: 'string',
    address: 'string',
    zip: 'string',
    city: 'string',
    recipientFirstName: 'string',
    recipientLastName: 'string',
    contactEmail: 'string',
    recipientPhone: 'string',
    isDefault: 'boolean',
  },
  GqlAddress: {
    id: 'string',
    recipientFirstName: 'string',
    recipientLastName: 'string',
    recipientPhone: 'string',
    address: 'string',
    zip: 'string',
    city: 'string',
    country: 'string',
    comment: 'string',
    createdAt: 'string',
    companyAddress: 'GqlCompanyAddress',
  },
  GqlPermissions: { idUser: 'string', admin: 'boolean', ops: 'boolean' },
  GqlCompanyGroup: {
    id: 'string',
    name: 'string',
    description: 'string',
    isDefault: 'boolean',
    color: 'string',
  },
  GqlBaseUser: {
    id: 'string',
    email: 'string',
    personalEmail: 'string',
    phone: 'string',
    lastName: 'string',
    firstName: 'string',
    createdAt: 'string',
    status: 'GqlUserState',
    address: 'GqlAddress',
    permissions: 'GqlPermissions',
    companyGroup: 'GqlCompanyGroup',
  },
  GqlAuthOutput: {
    email: 'string',
    personalEmail: 'string',
    phone: 'string',
    lastName: 'string',
    firstName: 'string',
    status: 'GqlUserState',
    address: 'GqlAddress',
    permissions: 'GqlPermissions',
    companyGroup: 'GqlCompanyGroup',
  },
  GqlInvitedUserStatus: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    status: 'string',
  },
  GqlLoggedUser: {
    id: 'string',
    email: 'string',
    personalEmail: 'string',
    phone: 'string',
    lastName: 'string',
    firstName: 'string',
    createdAt: 'string',
    status: 'GqlUserState',
    address: 'GqlAddress',
    permissions: 'GqlPermissions',
    companyGroup: 'GqlCompanyGroup',
    companyName: 'string',
    companyId: 'string',
    companyEngagementDuration: 'number',
  },
  GqlCompanyInformations: {
    name: 'string',
    id: 'string',
    email: 'string',
    registrationNumber: 'string',
  },
  GqlBaseBrand: {
    id: 'string',
    name: 'string',
    pictureUrl: 'string',
    description: 'string',
  },
  GqlBaseCategory: {
    id: 'string',
    translationKey: 'string',
    slug: 'string',
    order: 'number',
  },
  GqlCatalogProduct: {
    id: 'string',
    name: 'string',
    description: 'string',
    information: 'string',
    pictureUrl: 'string',
    disabledAt: 'string',
    archivedAt: 'string',
    order: 'number',
    brand: 'GqlBaseBrand',
  },
  GqlCatalogCategory: {
    id: 'string',
    translationKey: 'string',
    slug: 'string',
    order: 'number',
    products: 'Array<GqlCatalogProduct>',
  },
  GqlCatalogFamily: {
    id: 'string',
    translationKey: 'string',
    slug: 'string',
    order: 'number',
    categories: 'Array<GqlCatalogCategory>',
  },
  GqlCatalogResult: { families: 'Array<GqlCatalogFamily>' },
  GqlAuthor: { id: 'string', lastName: 'string', firstName: 'string' },
  GqlOrderComment: {
    id: 'string',
    content: 'string',
    createdAt: 'string',
    author: 'GqlAuthor',
  },
  GqlOrderCommentAddOutput: {
    id: 'string',
    content: 'string',
    createdAt: 'string',
  },
  GqlOrderDeliveryAddress: {
    recipientFirstName: 'string',
    recipientLastName: 'string',
    recipientPhone: 'string',
    address: 'string',
    zip: 'string',
    city: 'string',
    country: 'string',
    comment: 'string',
    name: 'string',
  },
  GqlOrderedProductOptions: { idOption: 'string', keyboard: 'string' },
  GqlOrderedProduct: {
    brand: 'string',
    name: 'string',
    pictureUrl: 'string',
    variantDetails: 'string',
    optionsDetails: 'GqlOrderedProductOptions',
    offerPrice: 'number',
    offerDuration: 'number',
    count: 'number',
  },
  GqlOrderStatusGroup: {
    status: 'GqlOrderedProductStatus',
    products: 'Array<GqlOrderedProduct>',
  },
  GqlOrderInitiator: { lastName: 'string', firstName: 'string' },
  GqlOrderDetails: {
    commandNb: 'string',
    totalPrice: 'number',
    date: 'string',
    orderedBy: 'GqlOrderInitiator',
    deliveredAt: 'GqlOrderDeliveryAddress',
    productsByStatus: 'Array<GqlOrderStatusGroup>',
  },
  GqlOpsOrderAddress: {
    recipientPhone: 'string',
    address: 'string',
    zip: 'string',
    city: 'string',
    country: 'string',
    comment: 'string',
    name: 'string',
  },
  GqlOpsOrderedProduct: {
    brand: 'string',
    name: 'string',
    pictureUrl: 'string',
    variantDetails: 'string',
    optionsDetails: 'GqlOrderedProductOptions',
    offerPrice: 'number',
    offerDuration: 'number',
  },
  GqlOpsOrder: {
    id: 'string',
    commandNb: 'string',
    adminName: 'string',
    companyName: 'string',
    status: 'GqlOrderedProductStatus',
    financialMode: 'string',
    logisticianName: 'string',
    product: 'GqlOpsOrderedProduct',
    orderDate: 'string',
    leasingContractNumber: 'string',
    brand: 'string',
    sku: 'string',
    serialNumber: 'string',
    deliveryDate: 'string',
    engagementEnd: 'string',
    recipientName: 'string',
    deliveryAddress: 'GqlOpsOrderAddress',
    recipientMail: 'string',
    comments: 'Array<GqlOrderComment>',
  },
  GqlOrderProductsStatusFrequency: {
    status: 'GqlOrderedProductStatus',
    count: 'number',
  },
  GqlUserOrder: {
    commandId: 'number',
    commandNb: 'string',
    createdAt: 'string',
    totalPrice: 'number',
    deliverAt: 'string',
    productsStatusFrequency: 'Array<GqlOrderProductsStatusFrequency>',
    status: 'GqlOrderStatus',
  },
  GqlCount: { count: 'number' },
  GqlProductCount: { count: 'number' },
  GqlProductVariantSummary: {
    id: 'string',
    productName: 'string',
    brand: 'string',
    productVariantName: 'string',
    available: 'boolean',
    deliveryDuration: 'number',
  },
  GqlBaseCompany: {
    id: 'string',
    name: 'string',
    legalCompanyName: 'string',
    createdAt: 'string',
  },
  GqlBaseOffer: { id: 'string', price: 'number', createdAt: 'string' },
  GqlProductVariantOptionData: { keyboard: 'string' },
  GqlProductVariantOptions: {
    id: 'string',
    idProductVariant: 'string',
    data: 'GqlProductVariantOptionData',
  },
  GqlProductResultProductOffer: {
    isDefault: 'boolean',
    idOffer: 'string',
    idProduct: 'string',
    idCompany: 'string',
    offer: 'GqlBaseOffer',
    company: 'GqlBaseCompany',
  },
  GqlProductResultVariant: {
    id: 'string',
    name: 'string',
    pictureUrl: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    available: 'boolean',
    deliveryDuration: 'number',
    productOffers: 'Array<GqlProductResultProductOffer>',
    options: 'Array<GqlProductVariantOptions>',
  },
  GqlProductResult: {
    id: 'string',
    name: 'string',
    description: 'string',
    information: 'string',
    pictureUrl: 'string',
    disabledAt: 'string',
    archivedAt: 'string',
    order: 'number',
    brand: 'GqlBaseBrand',
    category: 'GqlBaseCategory',
    variants: 'Array<GqlProductResultVariant>',
  },
  GqlProductByPageResultProductOffer: {
    isDefault: 'boolean',
    idOffer: 'string',
    idProduct: 'string',
    idCompany: 'string',
    offer: 'GqlBaseOffer',
    company: 'GqlBaseCompany',
  },
  GqlProductByPageResultVariant: {
    id: 'string',
    name: 'string',
    pictureUrl: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    available: 'boolean',
    deliveryDuration: 'number',
    productOffers: 'Array<GqlProductByPageResultProductOffer>',
  },
  GqlProductByPageResult: {
    id: 'string',
    name: 'string',
    description: 'string',
    information: 'string',
    pictureUrl: 'string',
    disabledAt: 'string',
    archivedAt: 'string',
    order: 'number',
    brand: 'GqlBaseBrand',
    category: 'GqlBaseCategory',
    variants: 'Array<GqlProductByPageResultVariant>',
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
  GqlPaginationArgs: { offset: 'number', limit: 'number' },
  GqlPaginatedProductsFiltersInput: {
    categorySlug: 'string',
    familySlug: 'string',
    search: 'string',
  },
  GqlProductVariantSummaryInput: { search: 'string' },
  GqlOpsOrderFiltersInput: { search: 'string' },
  Mutation: {
    login: 'GqlAuthOutput',
    logout: 'string',
    resetPasswordRequest: 'string',
    resetPassword: 'string',
    loginWithGoogle: 'GqlAuthOutput',
    modifyPassword: 'boolean',
    signup: 'GqlAuthOutput',
    userGeneralInformations: 'boolean',
    changeUserState: 'boolean',
    inviteUser: 'boolean',
    completeUserRegistration: 'boolean',
    companyInformations: 'boolean',
    changeProductAvailability: 'GqlCount',
    changeDeliveryDuration: 'GqlCount',
    createCompanyAddress: 'boolean',
    archiveCompanyAddress: 'boolean',
    setCompanyAddressAsDefault: 'boolean',
    order: 'string',
    updateOrderStatusBulk: 'GqlCount',
    updateDeliveryDate: 'GqlCount',
    addOrderComment: 'GqlOrderCommentAddOutput',
    changeAssetStatus: 'boolean',
  },
  GqlUserRegistrationArgs: {
    token: 'string',
    password: 'string',
    country: 'string',
    address: 'string',
    city: 'string',
    zipCode: 'string',
    phone: 'string',
  },
  GqlChangeProductAvailabilityArgs: {
    idProductVariants: 'Array<string>',
    isAvailable: 'boolean',
  },
  GqlChangeDeliveryDurationArgs: {
    idProductVariants: 'Array<string>',
    duration: 'number',
  },
  GqlBasket: {
    idConfiguration: 'string',
    idOffer: 'string',
    idOption: 'string',
    quantity: 'number',
  },
};
