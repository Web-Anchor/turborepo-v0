export const MUTATION = `
  mutation CreateInventory($data: InventoryCreateInput!) {
   createInventory(data: $data) {
      id
    }
  }
`;

export const CRETE_PRODUCTS_MUTATION = `
  mutation CreateProducts($data: [ProductCreateInput!]!) {
   createProducts(data: $data) {
      id
    }
  }
`;
