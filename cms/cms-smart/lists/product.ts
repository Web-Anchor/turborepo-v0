import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  timestamp,
  integer,
  float,
  json,
  select,
  checkbox,
} from '@keystone-6/core/fields';
import { inventoryItemStatusOptions } from '../config/options';

export const Product: any = list({
  access: allowAll,

  ui: {
    labelField: 'name',
    searchFields: ['name', 'sku', 'barcode'],
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: 'textarea' } }),
    category: text(), // e.g. "construction", "retail"
    sku: text(), // Stock Keeping Unit
    barcode: text(),
    attributes: json({ defaultValue: {} }), // Additional specs stored as JSON (e.g., dimensions)

    // Pricing & Taxation
    cost: float({ validation: { min: 0 } }), // Cost price
    price: float({ validation: { min: 0 } }), // Selling price
    taxRate: float({ defaultValue: 0, validation: { min: 0, max: 100 } }), // Percentage-based tax

    // Inventory & Tracking
    reorderLevel: integer({ defaultValue: 0, validation: { min: 0 } }), // When to restock
    unit: text({ defaultValue: 'pcs' }), // Measurement unit (e.g., kg, liters)
    quantity: integer({ defaultValue: 0, validation: { min: 0 } }), // Current stock
    supplier: text(),
    leadTime: integer({ validation: { min: 0 } }), // Days for restocking

    // Status & Relationships
    status: select({
      options: inventoryItemStatusOptions,
      defaultValue: 'ACTIVE',
      ui: { displayMode: 'select' },
    }),
    isHidden: checkbox({ defaultValue: false }),

    users: relationship({
      ref: 'User.products',
      many: true,
      ui: {
        displayMode: 'select',
        labelField: 'email',
        searchFields: ['firstName', 'lastName', 'email'],
      },
    }),
    orders: relationship({ ref: 'Order.products', many: true }),
    lists: relationship({ ref: 'List.products', many: true }),
    tags: relationship({ ref: 'Tag.products', many: true }),

    // // Inventory Items (Stock tracking)
    items: relationship({ ref: 'Inventory.products', many: true }),

    // Metadata
    lastModifiedBy: relationship({ ref: 'User' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },
});
