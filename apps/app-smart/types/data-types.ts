export type User = {
  id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role?: string; // default "USER"
  password: string;
  tags: Tag[];
  orders: Order[];
  items: Item[];
  listInvitations: Invitation[];
  createdAt?: string;
  permissions?: string; // default "ALL"
  configuration?: string; // default "{}"
  updatedAt?: string;
};

export type ClerkUser = {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  lastActiveAt?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type Cluster = {
  id: string;
  name: string;
  description: string;
  users: User[];
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
  clusters: Cluster[];
  items: Item[];
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
  attributes?: string; // default "{}"
  status?: string; // default "ACTIVE"
  users: User[];
  orders: Order[];
  isHidden: boolean;
  lists: List[];
  lastModifiedBy?: User;
  lastModifiedById?: string;
  tags: Tag[];
  itemTags: ItemTag[];
  createdAt?: string;
  updatedAt?: string;
};

export type Invitation = {
  id: string;
  email: string;
  status?: string; // default "PENDING"
  token: string;
  lists: List[];
  clusters: Cluster[];
  user?: User;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  status?: string; // default "PENDING"
  users: User[];
  items: Item[];
  source: string;
  amount?: number;
  currency: string;
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
  status?: string; // default "PENDING"
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
  item?: Item;
  itemId?: string;
};

export type Statistics = {
  itemsCount: number;
  ordersCount: number;
  items: Item[];
  orders: Order[];
};
