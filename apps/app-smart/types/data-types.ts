export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  password: string;
  assignedClusters: Cluster[];
  tags: Tag[];
  listAccesses: Access[];
  listInvitations: Invitation[];
  createdAt?: string;
  configuration?: string;
  updatedAt?: string;
  from_Cluster_owner: Cluster[];
  from_Item_lastModifiedBy: Item[];
};

export type Cluster = {
  id: string;
  name?: string;
  description?: string;
  owner?: User | null;
  ownerId?: string | null;
  assignedUsers?: User[];
  accesses?: Access[];
  lists?: List[];
  invitations?: Invitation[];
  createdAt?: string;
  updatedAt?: string;
};

export type List = {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  clusters?: Cluster | null;
  clustersId?: string | null;
  items: Item[];
  accesses: Access[];
  invitations: Invitation[];
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
  attributes?: string;
  status?: string;
  isHidden: boolean;
  inventoryList?: List | null;
  inventoryListId?: string | null;
  lastModifiedBy?: User | null;
  lastModifiedById?: string | null;
  tags: Tag[];
  itemTags: ItemTag[];
  createdAt?: string;
  updatedAt?: string;
};

export type Access = {
  id: string;
  user?: User | null;
  userId?: string | null;
  inventoryLists: List[];
  clusters: Cluster[];
  permission?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Invitation = {
  id: string;
  email: string;
  status?: string;
  token: string;
  inventoryLists: List[];
  clusters: Cluster[];
  user?: User | null;
  userId?: string | null;
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
  inventoryItem?: Item | null;
  inventoryItemId?: string | null;
};
