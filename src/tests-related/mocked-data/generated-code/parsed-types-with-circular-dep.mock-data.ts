import { ParsedType } from '../../../logic/parsing/graphql-types/translate-graphql-types-to-typescript';

export const parsedTypesWithCircularDepsMockData: Array<ParsedType> = [
  {
    name: 'GqlContract',
    data: 'export interface GqlContract { id: string; createdAt: string; leaserContractNumber?: string; startDate?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlAsset',
    data: 'export interface GqlAsset { id: string; serialNumber?: string; contract?: GqlContract; type: GqlAssetType; brand: string; productName: string; variant?: string; pictureUrl: string; status: GqlAssetStatus; category: string; offerDuration: number; assignedTo: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlAssetType',
    type: 'enum',
    data: "export type GqlAssetType = 'purchase' | 'lease'",
  },
  {
    name: 'GqlAssetStatus',
    type: 'enum',
    data: "export type GqlAssetStatus = 'assigned' | 'inStock' | 'toBeAssigned' | 'toBeStocked'",
  },
  {
    name: 'GqlCompanyAddress',
    data: 'export interface GqlCompanyAddress { id: string; name: string; country: string; address: string; zip: string; city: string; recipientFirstName: string; recipientLastName: string; contactEmail: string; recipientPhone?: string; isDefault: boolean; }\n',
    type: 'type',
  },
  {
    name: 'GqlAddress',
    data: 'export interface GqlAddress { id: string; recipientFirstName: string; recipientLastName: string; recipientPhone?: string; address: string; zip: string; city: string; country: string; comment?: string; createdAt: string; companyAddress?: GqlCompanyAddress; }\n',
    type: 'type',
  },
  {
    name: 'GqlPermissions',
    data: 'export interface GqlPermissions { idUser: string; admin: boolean; ops: boolean; employee: boolean; }\n',
    type: 'type',
  },
  {
    name: 'GqlCompanyGroup',
    data: 'export interface GqlCompanyGroup { id: string; name: string; description: string; isDefault: boolean; color: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlBaseUser',
    data: 'export interface GqlBaseUser { id: string; email: string; personalEmail?: string; phone?: string; lastName: string; firstName: string; createdAt: string; status: GqlUserState; address?: GqlAddress; permissions?: GqlPermissions; companyGroup: GqlCompanyGroup; }\n',
    type: 'type',
  },
  {
    name: 'GqlUserState',
    type: 'enum',
    data: "export type GqlUserState = 'invited' | 'activated' | 'deactivated' | 'anonymized'",
  },
  {
    name: 'GqlAuthOutput',
    data: 'export interface GqlAuthOutput { email: string; personalEmail?: string; phone?: string; lastName: string; firstName: string; status: GqlUserState; address?: GqlAddress; permissions?: GqlPermissions; companyGroup: GqlCompanyGroup; }\n',
    type: 'type',
  },
  {
    name: 'GqlInvitedUserStatus',
    data: 'export interface GqlInvitedUserStatus { firstName: string; lastName: string; email: string; status: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlLoggedUser',
    data: 'export interface GqlLoggedUser { id?: string; email?: string; personalEmail?: string; phone?: string; lastName?: string; firstName?: string; createdAt?: string; status?: GqlUserState; address?: GqlAddress; permissions?: GqlPermissions; companyGroup?: GqlCompanyGroup; token: string; companyName: string; companyId: string; companyEngagementDuration: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlCompanyInformations',
    data: 'export interface GqlCompanyInformations { name: string; id: string; email?: string; registrationNumber?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlFamily',
    data: 'export interface GqlFamily { id: string; translationKey: string; slug: string; order: number; pictureUrl: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlAuthor',
    data: 'export interface GqlAuthor { id: string; lastName: string; firstName: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderComment',
    data: 'export interface GqlOrderComment { id: string; content: string; createdAt: string; author: GqlAuthor; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderCommentAddOutput',
    data: 'export interface GqlOrderCommentAddOutput { id: string; content: string; createdAt: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderDeliveryAddress',
    data: 'export interface GqlOrderDeliveryAddress { recipientFirstName: string; recipientLastName: string; recipientPhone?: string; address: string; zip: string; city: string; country: string; comment?: string; name?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderedProductOptions',
    data: 'export interface GqlOrderedProductOptions { idOption: string; keyboard?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderedProduct',
    data: 'export interface GqlOrderedProduct { brand: string; name: string; pictureUrl: string; variantDetails: string; optionsDetails?: GqlOrderedProductOptions; offerPrice: number; offerDuration: number; count: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderStatusGroup',
    data: 'export interface GqlOrderStatusGroup { status: GqlOrderedProductStatus; products: Array<GqlOrderedProduct>; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderedProductStatus',
    type: 'enum',
    data: "export type GqlOrderedProductStatus = 'toProcess' | 'shipped' | 'delivered' | 'cancelled'",
  },
  {
    name: 'GqlOrderInitiator',
    data: 'export interface GqlOrderInitiator { lastName: string; firstName: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderDetails',
    data: 'export interface GqlOrderDetails { commandNb: string; totalPrice: number; date: string; orderedBy: GqlOrderInitiator; deliveredAt: GqlOrderDeliveryAddress; productsByStatus: Array<GqlOrderStatusGroup>; }\n',
    type: 'type',
  },
  {
    name: 'GqlOpsOrderAddress',
    data: 'export interface GqlOpsOrderAddress { recipientPhone?: string; address: string; zip: string; city: string; country: string; comment?: string; name?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlOpsOrderedProduct',
    data: 'export interface GqlOpsOrderedProduct { brand: string; name: string; pictureUrl: string; variantDetails: string; optionsDetails?: GqlOrderedProductOptions; offerPrice: number; offerDuration: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlOpsOrder',
    data: 'export interface GqlOpsOrder { id: string; idAsset: string; commandNb: string; adminName: string; companyName: string; status: GqlOrderedProductStatus; financialMode: string; logisticianName: string; product: GqlOpsOrderedProduct; orderDate: string; leasingContractNumber?: string; contractStartDate?: string; brand: string; sku: string; serialNumber?: string; deliveryDate: string; engagementEnd?: string; recipientName: string; deliveryAddress: GqlOpsOrderAddress; recipientMail: string; comments: Array<GqlOrderComment>; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderProductsStatusFrequency',
    data: 'export interface GqlOrderProductsStatusFrequency { status: GqlOrderedProductStatus; count: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlUserOrder',
    data: 'export interface GqlUserOrder { commandId: number; commandNb: string; createdAt: string; totalPrice: number; deliverAt: string; productsStatusFrequency: Array<GqlOrderProductsStatusFrequency>; status: GqlOrderStatus; }\n',
    type: 'type',
  },
  {
    name: 'GqlOrderStatus',
    type: 'enum',
    data: "export type GqlOrderStatus = 'cancelled' | 'completed' | 'inProgress'",
  },
  {
    name: 'GqlCount',
    data: 'export interface GqlCount { count: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductCount',
    data: 'export interface GqlProductCount { countPages: number; countTotalProducts: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductVariantSummary',
    data: 'export interface GqlProductVariantSummary { id: string; productName: string; brand: string; productVariantName: string; available: boolean; deliveryDuration: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlBrand',
    data: 'export interface GqlBrand { id: string; name: string; pictureUrl: string; description: string; products: Array<GqlProduct>; }\n',
    type: 'type',
  },
  {
    name: 'GqlCategory',
    data: 'export interface GqlCategory { id: string; translationKey: string; slug: string; order: number; family: GqlFamily; products: Array<GqlProduct>; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductVariantOptionData',
    data: 'export interface GqlProductVariantOptionData { keyboard?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductVariantOption',
    data: 'export interface GqlProductVariantOption { id: string; idProductVariant: string; data: GqlProductVariantOptionData; }\n',
    type: 'type',
  },
  {
    name: 'GqlCompany',
    data: 'export interface GqlCompany { id: string; name: string; legalCompanyName?: string; createdAt: string; product: Array<GqlProductOffer>; }\n',
    type: 'type',
  },
  {
    name: 'GqlOffer',
    data: 'export interface GqlOffer { id: string; price: number; createdAt: string; productOffers: Array<GqlProductOffer>; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductOffer',
    data: 'export interface GqlProductOffer { isDefault: boolean; idOffer: string; idProduct: string; idCompany?: string; product: GqlProductVariant; company?: GqlCompany; offer: GqlOffer; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductVariant',
    data: 'export interface GqlProductVariant { id: string; name: string; pictureUrl?: string; createdAt: string; updatedAt: string; product: GqlProduct; productOffers: Array<GqlProductOffer>; productVariantOptions: Array<GqlProductVariantOption>; available: boolean; deliveryDuration: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlProduct',
    data: 'export interface GqlProduct { id: string; name: string; description?: string; information?: string; pictureUrl: string; disabledAt?: string; archivedAt?: string; order?: number; brand: GqlBrand; category: GqlCategory; productVariants: Array<GqlProductVariant>; secondaryPictures: Array<string>; }\n',
    type: 'type',
  },
  {
    name: 'Query',
    data: 'export interface Query { families: Array<GqlFamily>; me: GqlLoggedUser; userInformations: GqlBaseUser; users: Array<GqlBaseUser>; getRegistrationStatus: GqlInvitedUserStatus; companyInformations: GqlCompanyInformations; product: GqlProduct; productsByPage: Array<GqlProduct>; countProductPages: GqlProductCount; productVariantSummaries: Array<GqlProductVariantSummary>; companyAddresses: Array<GqlCompanyAddress>; ordersDetails: GqlOrderDetails; orders: Array<GqlUserOrder>; employeeOrders: Array<GqlUserOrder>; opsOrders: Array<GqlOpsOrder>; assets: Array<GqlAsset>; }\n',
    type: 'type',
  },
  {
    name: 'GqlPaginationArgs',
    data: 'export interface GqlPaginationArgs { offset: 0; limit: 12; }\n',
    type: 'type',
  },
  {
    name: 'GqlPaginatedProductsFiltersInput',
    data: 'export interface GqlPaginatedProductsFiltersInput { categorySlug?: string; familySlug?: string; search?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlProductVariantSummaryInput',
    data: 'export interface GqlProductVariantSummaryInput { search?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlAddressType',
    type: 'enum',
    data: "export type GqlAddressType = 'billing' | 'delivery'",
  },
  {
    name: 'GqlOpsOrderFiltersInput',
    data: 'export interface GqlOpsOrderFiltersInput { search?: string; }\n',
    type: 'type',
  },
  {
    name: 'Mutation',
    data: 'export interface Mutation { login: GqlAuthOutput; logout: string; resetPasswordRequest: string; resetPassword: string; loginWithGoogle: GqlAuthOutput; modifyPassword: boolean; signup: GqlAuthOutput; userGeneralInformations: boolean; changeUserState: boolean; inviteUser: boolean; completeUserRegistration: boolean; companyInformations: boolean; changeProductAvailability: GqlCount; changeDeliveryDuration: GqlCount; createCompanyAddress: boolean; archiveCompanyAddress: boolean; setCompanyAddressAsDefault: boolean; order: string; updateOrderStatusBulk: GqlCount; updateDeliveryDate: GqlCount; addOrderComment: GqlOrderCommentAddOutput; changeAssetStatus: boolean; updateContract: boolean; }\n',
    type: 'type',
  },
  {
    name: 'GqlUserRegistrationArgs',
    data: 'export interface GqlUserRegistrationArgs { token: string; password?: string; country?: string; address?: string; city?: string; zipCode?: string; phone?: string; }\n',
    type: 'type',
  },
  {
    name: 'GqlChangeProductAvailabilityArgs',
    data: 'export interface GqlChangeProductAvailabilityArgs { idProductVariants: Array<string>; isAvailable: boolean; }\n',
    type: 'type',
  },
  {
    name: 'GqlChangeDeliveryDurationArgs',
    data: 'export interface GqlChangeDeliveryDurationArgs { idProductVariants: Array<string>; duration: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlBasket',
    data: 'export interface GqlBasket { idConfiguration: string; idOffer: string; idOption?: string; quantity: number; }\n',
    type: 'type',
  },
  {
    name: 'GqlAddContractInfoArgs',
    data: 'export interface GqlAddContractInfoArgs { idAsset: string; serialNumber?: string; contractNumber?: string; startDate?: string; }\n',
    type: 'type',
  },
];
