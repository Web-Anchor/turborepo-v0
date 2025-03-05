import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, timestamp } from '@keystone-6/core/fields';

export const InventoryList: any = list({
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
    name: text(),
    description: text(),
    tags: relationship({ ref: 'Tag.lists', many: true }),
    clusters: relationship({ ref: 'Cluster.lists', many: true }),
    invitations: relationship({
      ref: 'Invitation.lists',
      many: true,
    }),
    users: relationship({
      ref: 'User.lists',
      many: true,
      ui: {
        displayMode: 'select',
        labelField: 'email',
        searchFields: ['firstName', 'lastName', 'email'],
      },
    }),
    products: relationship({ ref: 'Product.lists', many: true }),
    items: relationship({ ref: 'Inventory.lists', many: true }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ db: { updatedAt: true } }),
  },
});
