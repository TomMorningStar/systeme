import React from 'react';
import { Option } from '../types';
import { DateFilter } from './DateFilter';
import { SearchActive } from './SearchActive';
import { orderByEnums, SearchOptions, sortByEnums } from './SearchOptions';
import { SearchTitle } from './SearchTitle';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  titleKey: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option>>;
  hasOptions?: boolean;
  onSortOptions?: (sortBy: sortByEnums, order: orderByEnums) => void;
  onSortDateCreateAt?: (order: orderByEnums) => void;
  onSortDateRemovedAt?: (order: orderByEnums) => void;
  onSortDatePublishedAt?: (order: orderByEnums) => void;
  onSortDateUpdateAt?: (order: orderByEnums) => void;
}

export const Filters: React.FC<Props> = ({
  searchTerm,
  selectedOption,
  setSelectedOption,
  setSearchTerm,
  titleKey: TITLE_KEY,
  hasOptions,
  onSortOptions,
  onSortDateCreateAt,
  onSortDateRemovedAt,
  onSortDatePublishedAt,
  onSortDateUpdateAt,
}) => {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '30px' }}>
      <SearchTitle title={TITLE_KEY} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchActive selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      {hasOptions && <SearchOptions onSortOptions={onSortOptions} />}
      {onSortDateCreateAt && <DateFilter title="Cheated At" onSortDate={onSortDateCreateAt} />}
      {onSortDateRemovedAt && <DateFilter title="Removed At" onSortDate={onSortDateRemovedAt} />}
      {onSortDateUpdateAt && <DateFilter title="Updated At" onSortDate={onSortDateUpdateAt} />}
      {onSortDatePublishedAt && (
        <DateFilter title="Published At" onSortDate={onSortDatePublishedAt} />
      )}
    </div>
  );
};
