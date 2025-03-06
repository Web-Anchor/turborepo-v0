export const QUERY = `
  query Q($where: ProductWhereInput!, $orderBy: [ProductOrderByInput!], $take: Int, $skip: Int) {
    products(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      description
      category
      sku
      barcode
      attributes
      isComposite
      cost
      price
      taxRate
      reorderLevel
      unit
      quantity
      supplier
      leadTime
      status
      isHidden
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
      bomCount
      createdAt
      updatedAt
    }
  }
`;
