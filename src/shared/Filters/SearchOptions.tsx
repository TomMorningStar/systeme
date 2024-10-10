import React from 'react';

export type sortByEnums = 'size' | 'amount' | 'default';
export type orderByEnums = 'asc' | 'desc' | 'default';

interface Props {
  onSortOptions?: (sortBy: sortByEnums, order: orderByEnums) => void;
}

export const SearchOptions: React.FC<Props> = ({ onSortOptions }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const dropdownRef = React.createRef<HTMLDivElement>();

  const [selectedFilterOptions, setSelectedFilterOptions] = React.useState<string>('Default');

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (filter: string, sortBy: sortByEnums, order: orderByEnums) => {
    onSortOptions && onSortOptions(sortBy, order);
    setIsOpen(false);
    setSelectedFilterOptions(filter);
  };

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [dropdownRef]
  );

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {selectedFilterOptions}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.293l3.71-3.08a.75.75 0 011.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleOptionClick('Default', 'default', 'default')}
              className={`block px-4 py-2 text-sm w-full text-left ${selectedFilterOptions === 'Size (Ascending)' ? 'bg-gray-100' : ''}`}
            >
              Default
            </button>
            <div className="px-4 py-2 text-sm text-gray-500">Size</div>
            <button
              onClick={() => handleOptionClick('Size (Ascending)', 'size', 'asc')}
              className={`block px-4 py-2 text-sm w-full text-left ${selectedFilterOptions === 'Size (Ascending)' ? 'bg-gray-100' : ''}`}
            >
              Size (Ascending)
            </button>
            <button
              onClick={() => handleOptionClick('Size (Descending)', 'size', 'desc')}
              className={`block px-4 py-2 text-sm w-full text-left ${selectedFilterOptions === 'Size (Descending)' ? 'bg-gray-100' : ''}`}
            >
              Size (Descending)
            </button>

            <div className="px-4 py-2 text-sm text-gray-500">Amount</div>
            <button
              onClick={() => handleOptionClick('Amount (Ascending)', 'amount', 'asc')}
              className={`block px-4 py-2 text-sm w-full text-left ${selectedFilterOptions === 'Amount (Ascending)' ? 'bg-gray-100' : ''}`}
            >
              Amount (Ascending)
            </button>
            <button
              onClick={() => handleOptionClick('Amount (Descending)', 'amount', 'desc')}
              className={`block px-4 py-2 text-sm w-full text-left ${selectedFilterOptions === 'Amount (Descending)' ? 'bg-gray-100' : ''}`}
            >
              Amount (Descending)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
