export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string;
  clerkId: string;
  email: string;
  role?: string;
  password: string;
  permissions?: string;
  configuration?: string;
  tags: Tag[];
  updatedAt?: string;
  createdAt?: string;
  from_Cluster_users: Cluster[];
  from_List_users: List[];
  from_Product_users: Product[];
  from_Inventory_users: Inventory[];
  from_Invitation_user: Invitation[];
  from_Order_users: Order[];
  from_Integration_user: Integration[];
};

export type Cluster = {
  id: string;
  name: string;
  description: string;
  users: User[];
  lists: List[];
  createdAt?: string;
  updatedAt?: string;
  from_List_clusters: List[];
  from_Invitation_clusters: Invitation[];
};

export type List = {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  clusters: Cluster[];
  users: User[];
  products: Product[];
  items: Inventory[];
  createdAt?: string;
  updatedAt?: string;
  from_Cluster_lists: Cluster[];
  from_Invitation_lists: Invitation[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  barcode: string;
  attributes?: string;
  isComposite: boolean;
  cost?: number;
  price?: number;
  taxRate?: number;
  reorderLevel?: number;
  unit: string;
  quantity?: number;
  supplier: string;
  leadTime?: number;
  status?: string;
  isHidden: boolean;
  users: User[];
  tags: Tag[];
  boms: BOM[];
  createdAt?: string;
  updatedAt?: string;
  from_List_products: List[];
  from_Order_products: Order[];
};

export type Inventory = {
  id: string;
  name: string;
  description: string;
  batchNumber: string;
  sku: string;
  quantity?: number;
  unit: string;
  location: string;
  expiryDate?: string;
  receivedDate?: string;
  purchasePrice?: number;
  category?: string;
  salePrice?: number;
  price?: number;
  cost?: number;
  status?: string;
  supplier: string;
  attributes?: string;
  isReserved: boolean;
  isDamaged: boolean;
  users: User[];
  tags: Tag[];
  bom?: BOM;
  createdAt?: string;
  updatedAt?: string;
  from_List_items: List[];
  from_Order_inventory: Order[];
};

export type Invitation = {
  id: string;
  email: string;
  status?: string;
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
  status?: string;
  users: User[];
  products: Product[];
  inventory: Inventory[];
  source: string;
  quantity?: number;
  price?: number;
  taxRate?: number;
  unit: string;
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
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Tag = {
  id: string;
  name: string;
  description: string;
  users: User[];
  lists: List[];
  products: Product[];
  inventory: Inventory[];
};

export type BOM = {
  id: string;
  name: string;
  description: string;
  composite?: Product;
  compositeId?: string;
  component?: Inventory;
  componentId?: string;
  quantity: number;
  unit: string;
  users: User[];
  createdAt?: string;
  updatedAt?: string;
};

export type Statistics = {
  itemsCount: number;
  ordersCount: number;
  products: Product[];
  orders: Order[];
};

export type ClerkUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  clerkId: string;
  lastActiveAt?: string;
  updatedAt?: string;
  createdAt?: string;
};
