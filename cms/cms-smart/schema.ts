// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { User } from './lists/user';
import { Tag, ItemTag } from './lists/tag';
import { InventoryList } from './lists/list';
import { InventoryItem } from './lists/item';
import { Cluster } from './lists/cluster';
import { Invitation } from './lists/invitation';
import { Order } from './lists/order';
import { Integration } from './lists/integration';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types';

export const lists = {
  User,
  Cluster,
  List: InventoryList,
  Item: InventoryItem,
  Invitation,
  Order,
  Integration,
  Tag, // this last list is our Tag list, it only has a name field for now
  ItemTag,
} satisfies Lists;
