export const users = {
  validUser: {
    email: 'usuario@teste.com',
    password: '123456',
  },
  invalidUser: {
    email: 'fake@teste.com',
    password: 'wrongpass',
  },
};

export const products = {
  availableProduct: {
    name: 'Notebook Lenovo IdeaPad Slim 3 15',
    searchTerm: 'notebook',
  },
  unavailableProduct: {
    name: 'produto-exemplo-indisponivel',
    searchTerm: 'produto-exemplo-indisponivel',
  },
};

export const addresses = {
  validAddress: {
    cep: '01001000',
  },
  invalidAddress: {
    cep: '00000000',
  },
};

export const payments = {
  creditCardValid: {
    number: '4111111111111111',
    expiry: '12/30',
    cvv: '123',
  },
  creditCardInvalid: {
    number: '0000000000000000',
    expiry: '01/20',
    cvv: '000',
  },
};
