import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';

export const ItemTag: any = list({
  access: allowAll,
  ui: {
    // isHidden: true,
  },
  fields: {
    name: text(),
    items: relationship({ ref: 'Item.itemTags', many: true }),
  },
});
