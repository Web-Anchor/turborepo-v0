export const QUERY = `
  query Items($where: ItemWhereInput, $take: Int, $skip: Int, $orderBy: [ItemOrderByInput!]) {
    items(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
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
