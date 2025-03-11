export const QUERY = `
  query Inventories($where: InventoryWhereInput, $orderBy: [InventoryOrderByInput!], $take: Int, $skip: Int) {
    inventories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      description
      batchNumber
      sku
      quantity
      unit
      location
      expiryDate
      receivedDate
      purchasePrice
      category
      salePrice
      status
      cost
      price
      supplier
      isReserved
      isDamaged
      users {
        id
      }
      usersCount
      tags {
        id
      }
      tagsCount
      bom {
        id
      }
      createdAt
      updatedAt
    }
  }
`;
