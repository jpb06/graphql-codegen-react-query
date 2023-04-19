import { generateQuerySelector } from './generate-query-selector';
import { displayWarning } from '../../../cli/console/console.messages';
import { parsedTypesWithCircularDepsMockData } from '../../../tests-related/mocked-data/generated-code/parsed-types-with-circular-dep.mock-data';
import { parsedTypesMockData } from '../../../tests-related/mocked-data/generated-code/parsed-types.mock-data';
import { graphqlQueryObjectMockedData } from '../../../tests-related/mocked-data/graphql-schema';
import { graphqlQueryObjectWithCircularDependencyMockedData } from '../../../tests-related/mocked-data/graphql-schema/graphql-query-object-with-circular-dep.mock-data';

jest.mock('../../../cli/console/console.messages');

describe('generateQuerySelector function', () => {
  it('should generate selectors for objects containing scalars', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectMockedData,
      parsedTypesMockData,
      true,
    );

    expect(result).toContain(
      `me?: { id?: boolean; email?: boolean; personalEmail?: boolean; phone?: boolean; lastName?: boolean; firstName?: boolean; createdAt?: boolean; status?: boolean; address?: { id?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; createdAt?: boolean; companyAddress?: { id?: boolean; name?: boolean; country?: boolean; address?: boolean; zip?: boolean; city?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; contactEmail?: boolean; recipientPhone?: boolean; isDefault?: boolean;  }; };permissions?: { idUser?: boolean; admin?: boolean; ops?: boolean;  };companyGroup?: { id?: boolean; name?: boolean; description?: boolean; isDefault?: boolean; color?: boolean;  };companyName?: boolean; companyId?: boolean; companyEngagementDuration?: boolean;  }`,
    );
  });

  it('should generate selectors for objects containing objects', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectMockedData,
      parsedTypesMockData,
      true,
    );

    expect(result).toContain(
      `users?: { id?: boolean; email?: boolean; personalEmail?: boolean; phone?: boolean; lastName?: boolean; firstName?: boolean; createdAt?: boolean; status?: boolean; address?: { id?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; createdAt?: boolean; companyAddress?: { id?: boolean; name?: boolean; country?: boolean; address?: boolean; zip?: boolean; city?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; contactEmail?: boolean; recipientPhone?: boolean; isDefault?: boolean;  }; };permissions?: { idUser?: boolean; admin?: boolean; ops?: boolean;  };companyGroup?: { id?: boolean; name?: boolean; description?: boolean; isDefault?: boolean; color?: boolean;  }; }`,
    );
  });

  it('should ignore properties already parsed (circular referency)', () => {
    const result = generateQuerySelector(
      graphqlQueryObjectWithCircularDependencyMockedData,
      parsedTypesWithCircularDepsMockData,
      true,
    );

    expect(displayWarning).toHaveBeenCalledTimes(2);

    expect(result).toBe(
      `export type QuerySelector = {
families?: { id?: boolean; translationKey?: boolean; slug?: boolean; order?: boolean; pictureUrl?: boolean;  }
me?: { id?: boolean; email?: boolean; personalEmail?: boolean; phone?: boolean; lastName?: boolean; firstName?: boolean; createdAt?: boolean; status?: boolean; address?: { id?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; createdAt?: boolean; companyAddress?: { id?: boolean; name?: boolean; country?: boolean; address?: boolean; zip?: boolean; city?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; contactEmail?: boolean; recipientPhone?: boolean; isDefault?: boolean;  }; };permissions?: { idUser?: boolean; admin?: boolean; ops?: boolean; employee?: boolean;  };companyGroup?: { id?: boolean; name?: boolean; description?: boolean; isDefault?: boolean; color?: boolean;  };token?: boolean; companyName?: boolean; companyId?: boolean; companyEngagementDuration?: boolean;  }
userInformations?: { id?: boolean; email?: boolean; personalEmail?: boolean; phone?: boolean; lastName?: boolean; firstName?: boolean; createdAt?: boolean; status?: boolean; address?: { id?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; createdAt?: boolean; companyAddress?: { id?: boolean; name?: boolean; country?: boolean; address?: boolean; zip?: boolean; city?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; contactEmail?: boolean; recipientPhone?: boolean; isDefault?: boolean;  }; };permissions?: { idUser?: boolean; admin?: boolean; ops?: boolean; employee?: boolean;  };companyGroup?: { id?: boolean; name?: boolean; description?: boolean; isDefault?: boolean; color?: boolean;  }; }
users?: { id?: boolean; email?: boolean; personalEmail?: boolean; phone?: boolean; lastName?: boolean; firstName?: boolean; createdAt?: boolean; status?: boolean; address?: { id?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; createdAt?: boolean; companyAddress?: { id?: boolean; name?: boolean; country?: boolean; address?: boolean; zip?: boolean; city?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; contactEmail?: boolean; recipientPhone?: boolean; isDefault?: boolean;  }; };permissions?: { idUser?: boolean; admin?: boolean; ops?: boolean; employee?: boolean;  };companyGroup?: { id?: boolean; name?: boolean; description?: boolean; isDefault?: boolean; color?: boolean;  }; }
getRegistrationStatus?: { firstName?: boolean; lastName?: boolean; email?: boolean; status?: boolean;  }
companyInformations?: { name?: boolean; id?: boolean; email?: boolean; registrationNumber?: boolean;  }
product?: { id?: boolean; name?: boolean; description?: boolean; information?: boolean; pictureUrl?: boolean; disabledAt?: boolean; archivedAt?: boolean; order?: boolean; brand?: { id?: boolean; name?: boolean; pictureUrl?: boolean; description?: boolean; products?: { id?: boolean; name?: boolean; description?: boolean; information?: boolean; pictureUrl?: boolean; disabledAt?: boolean; archivedAt?: boolean; order?: boolean; category?: { id?: boolean; translationKey?: boolean; slug?: boolean; order?: boolean; family?: { id?: boolean; translationKey?: boolean; slug?: boolean; order?: boolean; pictureUrl?: boolean;  }; };productVariants?: { id?: boolean; name?: boolean; pictureUrl?: boolean; createdAt?: boolean; updatedAt?: boolean; product?: { id?: boolean; name?: boolean; description?: boolean; information?: boolean; pictureUrl?: boolean; disabledAt?: boolean; archivedAt?: boolean; order?: boolean; secondaryPictures?: boolean;  };productOffers?: { isDefault?: boolean; idOffer?: boolean; idProduct?: boolean; idCompany?: boolean; product?: { id?: boolean; name?: boolean; pictureUrl?: boolean; createdAt?: boolean; updatedAt?: boolean; productVariantOptions?: { id?: boolean; idProductVariant?: boolean; data?: { keyboard?: boolean;  }; };available?: boolean; deliveryDuration?: boolean;  };company?: { id?: boolean; name?: boolean; legalCompanyName?: boolean; createdAt?: boolean; product?: { isDefault?: boolean; idOffer?: boolean; idProduct?: boolean; idCompany?: boolean; offer?: { id?: boolean; price?: boolean; createdAt?: boolean;  }; }; }; };available?: boolean; deliveryDuration?: boolean;  };secondaryPictures?: boolean;  }; };secondaryPictures?: boolean;  }
productsByPage?: { id?: boolean; name?: boolean; description?: boolean; information?: boolean; pictureUrl?: boolean; disabledAt?: boolean; archivedAt?: boolean; order?: boolean; brand?: { id?: boolean; name?: boolean; pictureUrl?: boolean; description?: boolean; products?: { id?: boolean; name?: boolean; description?: boolean; information?: boolean; pictureUrl?: boolean; disabledAt?: boolean; archivedAt?: boolean; order?: boolean; category?: { id?: boolean; translationKey?: boolean; slug?: boolean; order?: boolean; family?: { id?: boolean; translationKey?: boolean; slug?: boolean; order?: boolean; pictureUrl?: boolean;  }; };productVariants?: { id?: boolean; name?: boolean; pictureUrl?: boolean; createdAt?: boolean; updatedAt?: boolean; product?: { id?: boolean; name?: boolean; description?: boolean; information?: boolean; pictureUrl?: boolean; disabledAt?: boolean; archivedAt?: boolean; order?: boolean; secondaryPictures?: boolean;  };productOffers?: { isDefault?: boolean; idOffer?: boolean; idProduct?: boolean; idCompany?: boolean; product?: { id?: boolean; name?: boolean; pictureUrl?: boolean; createdAt?: boolean; updatedAt?: boolean; productVariantOptions?: { id?: boolean; idProductVariant?: boolean; data?: { keyboard?: boolean;  }; };available?: boolean; deliveryDuration?: boolean;  };company?: { id?: boolean; name?: boolean; legalCompanyName?: boolean; createdAt?: boolean; product?: { isDefault?: boolean; idOffer?: boolean; idProduct?: boolean; idCompany?: boolean; offer?: { id?: boolean; price?: boolean; createdAt?: boolean;  }; }; }; };available?: boolean; deliveryDuration?: boolean;  };secondaryPictures?: boolean;  }; };secondaryPictures?: boolean;  }
countProductPages?: { countPages?: boolean; countTotalProducts?: boolean;  }
productVariantSummaries?: { id?: boolean; productName?: boolean; brand?: boolean; productVariantName?: boolean; available?: boolean; deliveryDuration?: boolean;  }
companyAddresses?: { id?: boolean; name?: boolean; country?: boolean; address?: boolean; zip?: boolean; city?: boolean; recipientFirstName?: boolean; recipientLastName?: boolean; contactEmail?: boolean; recipientPhone?: boolean; isDefault?: boolean;  }
ordersDetails?: { commandNb?: boolean; totalPrice?: boolean; date?: boolean; orderedBy?: { lastName?: boolean; firstName?: boolean;  };deliveredAt?: { recipientFirstName?: boolean; recipientLastName?: boolean; recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; name?: boolean;  };productsByStatus?: { status?: boolean; products?: { brand?: boolean; name?: boolean; pictureUrl?: boolean; variantDetails?: boolean; optionsDetails?: { idOption?: boolean; keyboard?: boolean;  };offerPrice?: boolean; offerDuration?: boolean; count?: boolean;  }; }; }
orders?: { commandId?: boolean; commandNb?: boolean; createdAt?: boolean; totalPrice?: boolean; deliverAt?: boolean; productsStatusFrequency?: { status?: boolean; count?: boolean;  };status?: boolean;  }
employeeOrders?: { commandId?: boolean; commandNb?: boolean; createdAt?: boolean; totalPrice?: boolean; deliverAt?: boolean; productsStatusFrequency?: { status?: boolean; count?: boolean;  };status?: boolean;  }
opsOrders?: { id?: boolean; idAsset?: boolean; commandNb?: boolean; adminName?: boolean; companyName?: boolean; status?: boolean; financialMode?: boolean; logisticianName?: boolean; product?: { brand?: boolean; name?: boolean; pictureUrl?: boolean; variantDetails?: boolean; optionsDetails?: { idOption?: boolean; keyboard?: boolean;  };offerPrice?: boolean; offerDuration?: boolean;  };orderDate?: boolean; leasingContractNumber?: boolean; contractStartDate?: boolean; brand?: boolean; sku?: boolean; serialNumber?: boolean; deliveryDate?: boolean; engagementEnd?: boolean; recipientName?: boolean; deliveryAddress?: { recipientPhone?: boolean; address?: boolean; zip?: boolean; city?: boolean; country?: boolean; comment?: boolean; name?: boolean;  };recipientMail?: boolean; comments?: { id?: boolean; content?: boolean; createdAt?: boolean; author?: { id?: boolean; lastName?: boolean; firstName?: boolean;  }; }; }
assets?: { id?: boolean; serialNumber?: boolean; contract?: { id?: boolean; createdAt?: boolean; leaserContractNumber?: boolean; startDate?: boolean;  };type?: boolean; brand?: boolean; productName?: boolean; variant?: boolean; pictureUrl?: boolean; status?: boolean; category?: boolean; offerDuration?: boolean; assignedTo?: boolean;  }
}`,
    );
  });
});
