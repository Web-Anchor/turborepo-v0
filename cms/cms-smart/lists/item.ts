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

export const InventoryItem: any = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  ui: {
    // isHidden: true,
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text(),
    category: text(), // e.g. "construction", "retail", etc.
    quantity: integer({ defaultValue: 0 }),
    cost: float(), // cost price
    price: float(), // selling price
    taxRate: float({ defaultValue: 0 }),
    reorderLevel: integer({ defaultValue: 0 }),
    unit: text(), // e.g. "pcs", "kg", "meters"
    sku: text(), // Stock Keeping Unit
    barcode: text(),
    supplier: text(),
    leadTime: integer(),
    attributes: json({ defaultValue: {} }), // Additional attributes stored as JSON for flexibility (dimensions, specs, etc.)
    status: select({
      options: inventoryItemStatusOptions,
      defaultValue: 'ACTIVE',
      ui: { displayMode: 'select' },
    }),
    users: relationship({ ref: 'User.items', many: true }),
    orders: relationship({ ref: 'Order.items', many: true }),
    isHidden: checkbox({ defaultValue: false }),
    lists: relationship({ ref: 'List.items', many: true }),
    lastModifiedBy: relationship({ ref: 'User', many: false }),
    tags: relationship({ ref: 'Tag.items', many: true }),
    itemTags: relationship({ ref: 'ItemTag.item', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },
});
