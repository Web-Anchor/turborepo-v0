export const QUERY = `
  query Orders($take: Int, $skip: Int, $orderBy: [OrderOrderByInput!]) {
    orders(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      orderNumber
      status
      users {
        id
      }
      usersCount
      products {
        id
      }
      productsCount
      inventory {
        id
      }
      inventoryCount
      source
      quantity
      price
      taxRate
      unit
      currency
      createdAt
      updatedAt
    }
  }
`;

export const MUTATION = `
  mutation CreateOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;
