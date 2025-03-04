export const QUERY = `
  query Products($where: ProductWhereInput, $take: Int, $skip: Int, $orderBy: [ProductOrderByInput!]) {
    products(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      description
      category
      price
      unit
      attributes
      status
      cost
      quantity
      reorderLevel
      lists {
        id
        name
      }
      tags {
        name
      }
      users {
        id
        firstName
        lastName
        email
      }
      isHidden
      createdAt
      updatedAt
    }
  }
`;
