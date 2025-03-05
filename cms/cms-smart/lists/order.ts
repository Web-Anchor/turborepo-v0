import { orderStatusOptions } from '../config/options';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  timestamp,
  select,
  integer,
} from '@keystone-6/core/fields';

export const Order: any = list({
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
    orderNumber: text(),
    status: select({
      options: orderStatusOptions,
      defaultValue: 'PENDING',
      ui: { displayMode: 'select' },
    }),
    users: relationship({
      ref: 'User.orders',
      many: true,
      ui: {
        displayMode: 'select',
        labelField: 'email',
        searchFields: ['firstName', 'lastName', 'email'],
      },
    }),
    products: relationship({ ref: 'Product.orders', many: true }),
    items: relationship({ ref: 'Inventory.orders', many: true }),
    source: text(),
    amount: integer(),
    currency: text(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },
});
