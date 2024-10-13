import { IColumn } from './helpers/transformColumns';

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

export interface IEntityTable {
  id: string;
  path: string;
  label: 'Products' | 'Pages' | 'Price Plans';
  accessorKey: keyof IAll;
  data: IAll[];
  columns: IColumn[];
}

export type Option = 'All' | 'Active' | 'Not Active';
