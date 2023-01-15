export const querySelectorResultMockData = `export type QuerySelectorResult = {
  products: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number; category: { id: string; name: string;  }; }[]
  productsByPage: { id: number; data: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number; category: { id: string; name: string;  }; }[];hasMoreData: boolean;  }
  productsWithIds: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number; category: { id: string; name: string;  }; }[]
  product: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number; category: { id: string; name: string;  }; }
  categories: { id: string; name: string; products?: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number;  }[]; }[]
  category: { id: string; name: string; products?: { id: string; idCategory: string; name: string; description: string; image: string; price: number; stock: number;  }[]; }
  me: { id: string; email: string; lastName: string; firstName: string; joinDate: Date; role: string; token: string;  }
  getOrder: { createdAt: Date; creditCard: { number: string; expires: string;  };items: { id: string; quantity: number; name: string; price: number;  }[]; }
  myOrders: { id: string; idUser: string; idCreditCard: string; createdAt: Date; creditCardNumber: string; items: { id: string; quantity: number; name: string; image: string; price: number;  }[]; }[]
  myAddresses: { id: string; street: string; zipCode: string; city: string; country: string;  }[]
  }`;
