export const QUERY = `
  query Orders($take: Int, $skip: Int, $orderBy: [OrderOrderByInput!], $where: OrderWhereInput) {
    orders(take: $take, skip: $skip, orderBy: $orderBy, where: $where) {
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

export const MUTATION_CREATE = `
  mutation CreateOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;

export const MUTATION_UPDATE = `
  mutation UpdateOrder($where: OrderWhereUniqueInput!, $data: OrderUpdateInput!) {
    updateOrder(where: $where, data: $data) {
      id
    }
  }
`;
