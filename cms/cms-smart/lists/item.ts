import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  timestamp,
  integer,
  float,
  select,
  checkbox,
} from '@keystone-6/core/fields';

const inventoryStatusOptions = [
  { label: 'In Stock', value: 'IN_STOCK' },
  { label: 'Reserved', value: 'RESERVED' },
  { label: 'Sold', value: 'SOLD' },
  { label: 'Damaged', value: 'DAMAGED' },
  { label: 'Expired', value: 'EXPIRED' },
];

export const Item: any = list({
  access: allowAll,

  ui: {
    labelField: 'batchNumber',
    searchFields: ['batchNumber', 'product.name', 'location'],
  },

  fields: {
    products: relationship({ ref: 'Product.items', many: true }),

    batchNumber: text({ validation: { isRequired: true } }), // Unique batch identifier
    sku: text({ isIndexed: 'unique' }), // Optional SKU tracking at the inventory level

    // Stock Tracking
    quantity: integer({ validation: { min: 0 }, defaultValue: 0 }),
    location: text(), // Warehouse or store location
    expiryDate: timestamp(), // Expiry date for perishable goods
    receivedDate: timestamp({ defaultValue: { kind: 'now' } }),

    // Pricing & Valuation
    purchasePrice: float({ validation: { min: 0 } }), // Cost per unit at time of purchase
    salePrice: float({ validation: { min: 0 } }), // Selling price per unit (can differ from product default)

    // Status & Availability
    status: select({
      options: inventoryStatusOptions,
      defaultValue: 'IN_STOCK',
      ui: { displayMode: 'segmented-control' },
    }),
    supplier: text(),
    isReserved: checkbox({ defaultValue: false }), // If reserved for an order
    isDamaged: checkbox({ defaultValue: false }), // If item is damaged
    users: relationship({ ref: 'User.items', many: true }),
    lists: relationship({ ref: 'List.items', many: true }),
    tags: relationship({ ref: 'Tag.items', many: true }),
    itemTags: relationship({ ref: 'ItemTag.items', many: true }),

    // // Relationships
    orders: relationship({ ref: 'Order.items', many: true }),

    // Metadata
    lastModifiedBy: relationship({ ref: 'User' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },
});
