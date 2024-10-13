import { ISortOrder } from '../Filters/FilterDate';
import { IFilterOptions } from '../Filters/FilterOptions';
import type { IAll, IEntityTable, IProduct } from '../types';
import { IPage, IPricePlan } from './../types';

type IHasCreatedAt = (IProduct | IPricePlan)[];
type IHasRemovedAt = IPricePlan[];
type IHasUpdatedAt = IPage[];
type IPublishedAt = IPage[];

interface Props {
  filterTitle: string;
  filterActive: string;
  accessorKey: keyof IAll;
  filterOptions: IFilterOptions;
  filterDateCreatedAt: ISortOrder;
  filterDateRemovedAt: ISortOrder;
  filterDateUpdatedAt: ISortOrder;
  filterDatePublishedAt: ISortOrder;
  data: IEntityTable;
}

export const useFilters = ({
  filterTitle,
  filterActive,
  accessorKey,
  filterOptions,
  filterDateCreatedAt,
  filterDateRemovedAt,
  filterDateUpdatedAt,
  filterDatePublishedAt,
  data,
}: Props) => {
  let tempData = [...data.data];

  // 1. Фильтрация по активному статусу
  if (filterActive === 'Active') {
    tempData = tempData.filter((item) => item.active);
  } else if (filterActive === 'Not Active') {
    tempData = tempData.filter((item) => !item.active);
  } else if (filterActive === 'All') {
    tempData = [...data.data];
  }

  // 2. Фильтрация по поисковому запросу
  if (filterTitle) {
    tempData = tempData.filter((item) =>
      String(item[accessorKey]).toLowerCase().includes(filterTitle.toLowerCase())
    );
  }

  // 3. Сортировка по размеру
  if (data.label === 'Products') {
    tempData = (tempData as IProduct[]).sort((a, b) => {
      const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];
      const aIndex = sizeOrder.indexOf(a.options.size);
      const bIndex = sizeOrder.indexOf(b.options.size);

      if (filterOptions === 'Amount (Ascending)') {
        return a.options.amount - b.options.amount;
      } else if (filterOptions === 'Amount (Descending)') {
        return b.options.amount - a.options.amount;
      } else if (filterOptions === 'Size (Ascending)') {
        return aIndex - bIndex;
      } else if (filterOptions === 'Size (Descending)') {
        return bIndex - aIndex;
      } else {
        return 0;
      }
    });
  }

  // 4. Сортировка по дате создания
  if (data.label === 'Products' || data.label === 'Price Plans') {
    tempData = (tempData as IHasCreatedAt).sort((a, b) => {
      if (filterDateCreatedAt === 'asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (filterDateCreatedAt === 'desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return 0;
      }
    });
  }

  // 5. Сортировка по дате удаления
  if (data.label === 'Price Plans') {
    tempData = (tempData as IHasRemovedAt).sort((a, b) => {
      if (filterDateRemovedAt === 'asc') {
        return new Date(a.removedAt).getTime() - new Date(b.removedAt).getTime();
      } else if (filterDateRemovedAt === 'desc') {
        return new Date(b.removedAt).getTime() - new Date(a.removedAt).getTime();
      } else {
        return 0;
      }
    });
  }

  // 6. Сортировка по дате обновления
  if (data.label === 'Pages') {
    tempData = (tempData as IHasUpdatedAt).sort((a, b) => {
      if (filterDateUpdatedAt === 'asc') {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      } else if (filterDateUpdatedAt === 'desc') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        return 0;
      }
    });
  }

  // 7. Сортировка по дате публикации
  if (data.label === 'Pages') {
    tempData = (tempData as IPublishedAt).sort((a, b) => {
      if (filterDatePublishedAt === 'asc') {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      } else if (filterDatePublishedAt === 'desc') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else {
        return 0;
      }
    });
  }

  return tempData;
};
