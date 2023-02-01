export const querySelectorMockData = `export type QuerySelector = {
products?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean; category?: { id?: boolean; name?: boolean;  }; }
productsByPage?: { id?: boolean; data?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean; category?: { id?: boolean; name?: boolean;  }; };hasMoreData?: boolean;  }
productsWithIds?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean; category?: { id?: boolean; name?: boolean;  }; }
product?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean; category?: { id?: boolean; name?: boolean;  }; }
categories?: { id?: boolean; name?: boolean; products?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean;  }; }
category?: { id?: boolean; name?: boolean; products?: { id?: boolean; idCategory?: boolean; name?: boolean; description?: boolean; image?: boolean; price?: boolean; stock?: boolean;  }; }
me?: { id?: boolean; email?: boolean; lastName?: boolean; firstName?: boolean; joinDate?: boolean; role?: boolean; token?: boolean;  }
getOrder?: { createdAt?: boolean; creditCard?: { number?: boolean; expires?: boolean;  };items?: { id?: boolean; quantity?: boolean; name?: boolean; price?: boolean;  }; }
myOrders?: { id?: boolean; idUser?: boolean; idCreditCard?: boolean; createdAt?: boolean; creditCardNumber?: boolean; items?: { id?: boolean; quantity?: boolean; name?: boolean; image?: boolean; price?: boolean;  }; }
myAddresses?: { id?: boolean; street?: boolean; zipCode?: boolean; city?: boolean; country?: boolean;  }
}`;
