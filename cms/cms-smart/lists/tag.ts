import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';

export const Tag: any = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  ui: {
    // isHidden: true,
  },

  // this is the fields for our Tag list
  fields: {
    name: text(),
    // this can be helpful to find out all the Posts associated with a Tag
    users: relationship({ ref: 'User.tags', many: true }),
    lists: relationship({ ref: 'List.tags', many: true }),
    items: relationship({ ref: 'Item.tags', many: true }),
    // you can add more fields here, like images, videos, etc.
  },
});

export const ItemTag: any = list({
  access: allowAll,
  ui: {
    // isHidden: true,
  },
  fields: {
    name: text(),
    item: relationship({ ref: 'Item.itemTags', many: false }),
  },
});
