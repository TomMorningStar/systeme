import React from 'react';
import { useFilters } from '../helpers/useFilters';
import type { IAll, IEntityTable, Option } from '../types';
import { FilterActive } from './FilterActive';
import { FilterDate, ISortOrder } from './FilterDate';
import { FilterOptions, IFilterOptions } from './FilterOptions';
import { FilterTitle } from './FilterTitle';

interface Props {
  setFilteredData: React.Dispatch<React.SetStateAction<IAll[]>>;
  accessorKey: keyof IAll;
  data: IEntityTable;
}

export const Filters: React.FC<Props> = ({ setFilteredData, accessorKey, data }) => {
  const [filterTitle, setFilterTitle] = React.useState<string>('');
  const [filterActive, setFilterActive] = React.useState<Option>('All');
  const [filterOptions, setFilterOptions] = React.useState<IFilterOptions>('Default');
  const [filterDateCreatedAt, setFilterDateCreatedAt] = React.useState<ISortOrder>('default');
  const [filterDateRemovedAt, setFilterDateRemovedAt] = React.useState<ISortOrder>('default');
  const [filterDateUpdatedAt, setFilterDateUpdatedAt] = React.useState<ISortOrder>('default');
  const [filterDatePublishedAt, setFilterDatePublishedAt] = React.useState<ISortOrder>('default');

  const tempData = useFilters({
    filterTitle,
    filterActive,
    accessorKey,
    filterOptions,
    filterDateCreatedAt,
    filterDateRemovedAt,
    filterDateUpdatedAt,
    filterDatePublishedAt,
    data,
  });

  const dependencies = [
    filterTitle,
    filterActive,
    accessorKey,
    filterOptions,
    filterDateCreatedAt,
    filterDateRemovedAt,
    filterDateUpdatedAt,
    filterDatePublishedAt,
  ];

  React.useEffect(() => {
    setFilteredData(tempData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '30px' }}>
      <FilterTitle state={filterTitle} setState={setFilterTitle} />
      <FilterActive state={filterActive} setState={setFilterActive} />

      {/* тут можно тоже что-то придумать, но уже времени нет */}

      {data.label === 'Products' && (
        <FilterOptions state={filterOptions} setState={setFilterOptions} />
      )}

      {data.label === 'Products' && (
        <FilterDate
          title="Created At"
          state={filterDateCreatedAt}
          setState={setFilterDateCreatedAt}
        />
      )}

      {data.label === 'Price Plans' && (
        <FilterDate
          title="Created At"
          state={filterDateCreatedAt}
          setState={setFilterDateCreatedAt}
        />
      )}

      {data.label === 'Price Plans' && (
        <FilterDate
          title="Removed At"
          state={filterDateRemovedAt}
          setState={setFilterDateRemovedAt}
        />
      )}

      {data.label === 'Pages' && (
        <FilterDate
          title="Updated At"
          state={filterDateUpdatedAt}
          setState={setFilterDateUpdatedAt}
        />
      )}

      {data.label === 'Pages' && (
        <FilterDate
          title="Published At"
          state={filterDatePublishedAt}
          setState={setFilterDatePublishedAt}
        />
      )}
    </div>
  );
};
