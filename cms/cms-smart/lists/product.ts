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
    listView: {
      initialColumns: ['name', 'category', 'price', 'quantity', 'status'],
    },
  },

  hooks: {
    afterOperation: {
      create: async ({ resolvedData, context }) => {
        /* ... */
        // create a new bom record and add composite product
        // as a component with quantity 1
        // await context.lists.BOM.createOne({
        //   data: {
        //     name: args.data.name,
        //     composite: { connect: { id: args.result.id } },
        //     components: { connect: { id: args.result.id } },
        //     updatedAt: new Date(),
        //   },
        // });
        console.log('🪝 prop types ', { resolvedData, context });
      },
      update: async ({ resolvedData, context }) => {
        console.log('🪝 prop types ', { resolvedData, context });

        /* ... */
      },
      delete: async (args) => {
        /* ... */
      },
    },
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: 'textarea' } }),
    category: text(), // e.g. "construction", "retail"
    sku: text(), // Stock Keeping Unit
    barcode: text(),
    attributes: json({ defaultValue: {} }), // Additional specs stored as JSON (e.g., dimensions)
    isComposite: checkbox({ defaultValue: false }),

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
      ref: 'User',
      many: true,
      ui: {
        displayMode: 'select',
        labelField: 'email',
        searchFields: ['firstName', 'lastName', 'email'],
      },
    }),
    tags: relationship({ ref: 'Tag.products', many: true }),
    bom: relationship({ ref: 'BOM.composite', many: false }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },
});
