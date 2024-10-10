export type IAll = IProduct | IPage | IPricePlan;

export type IProduct = {
  id: number;
  name: string;
  options: {
    size: string;
    amount: number;
  };
  active: boolean;
  createdAt: string;
};

export type IPricePlan = {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
};

export type IPage = {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
};

export type Option = 'All' | 'Active' | 'Not Active';
