export const QUERY = `
  query bOMS($where: BOMWhereInput!, $orderBy: [BOMOrderByInput!], $take: Int, $skip: Int) {
    bOMS(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      description
      composite {
        id
      }
      component {
      id 
      }
      users {
        id
      }
      usersCount
      quantity
      unit
      updatedAt
      createdAt
    }
  }
`;
