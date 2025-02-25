export type User = {
  id: string;
  name: string;
  email: string;
  role?: string; // defaults to "USER"
  password: string;
  assignedClusters: Cluster[];
  tags: Tag[];
  orders: Order[];
  listAccesses: Access[];
  items: Item[];
  listInvitations: Invitation[];
  createdAt?: string;
  permissions?: string; // defaults to "ALL"
  configuration?: string; // defaults to "{}"
  updatedAt?: string;
};

export type Cluster = {
  id: string;
  name: string;
  description: string;
  owner?: User;
  ownerId?: string;
  assignedUsers: User[];
  accesses: Access[];
  lists: List[];
  invitations: Invitation[];
  createdAt?: string;
  updatedAt?: string;
};

export type List = {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  clusters?: Cluster;
  clustersId?: string;
  items: Item[];
  accesses: Access[];
  invitations: Invitation[];
  itemsCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity?: number;
  cost?: number;
  price?: number;
  reorderLevel?: number;
  unit: string;
  sku: string;
  barcode: string;
  supplier: string;
  leadTime?: number;
  attributes?: string; // defaults to "{}"
  status?: string; // defaults to "ACTIVE"
  owners: User[];
  orders: Order[];
  isHidden: boolean;
  inventoryList?: List;
  inventoryListId?: string;
  lastModifiedBy?: User;
  lastModifiedById?: string;
  tags: Tag[];
  itemTags: ItemTag[];
  createdAt?: string;
  updatedAt?: string;
};

export type Access = {
  id: string;
  user?: User;
  userId?: string;
  inventoryLists: List[];
  clusters: Cluster[];
  permission?: string; // defaults to "VIEW"
  createdAt?: string;
  updatedAt?: string;
};

export type Invitation = {
  id: string;
  email: string;
  status?: string; // defaults to "PENDING"
  token: string;
  inventoryLists: List[];
  clusters: Cluster[];
  user?: User;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  status?: string; // defaults to "PENDING"
  owners: User[];
  items: Item[];
  source: string;
  totalAmount?: number;
  total: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Integration = {
  id: string;
  user?: User;
  userId?: string;
  integrationType: string;
  storeUrl: string;
  apiKey: string;
  shopId: string;
  status?: string; // defaults to "PENDING"
  createdAt?: string;
  updatedAt?: string;
};

export type Tag = {
  id: string;
  name: string;
  users: User[];
  lists: List[];
  items: Item[];
};

export type ItemTag = {
  id: string;
  name: string;
  inventoryItem?: Item;
  inventoryItemId?: string;
};
