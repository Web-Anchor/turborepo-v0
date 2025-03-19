export const MUTATION = `
  mutation CreateProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      id
    }
  }
`;

export const CRETE_PRODUCTS_MUTATION = `
  mutation M($data: [ProductCreateInput!]!) {
   createProducts(data: $data) {
      id
    }
  }
`;
