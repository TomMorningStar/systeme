import React from 'react';
import { orderByEnums } from './SearchOptions';

interface DateFilterProps {
  title: string;
  onSortDate: (sortBy: orderByEnums) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ title, onSortDate }) => {
  const [sortDateOrder, setSortDateOrder] = React.useState<orderByEnums>('default');

  const handleSort = () => {
    const newOrder: orderByEnums =
      sortDateOrder === 'default' ? 'asc' : sortDateOrder === 'asc' ? 'desc' : 'default';

    setSortDateOrder(newOrder);

    onSortDate(newOrder);
  };

  return (
    <div className="flex items-center">
      <span>{title}</span>
      <button
        onClick={handleSort}
        className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 outline-none focus:outline-none  border border-gray-300"
      >
        {sortDateOrder === 'asc' ? '⬆️' : sortDateOrder === 'desc' ? '⬇️' : '➖'}
      </button>
    </div>
  );
};
