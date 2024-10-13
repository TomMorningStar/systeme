import React from 'react';

export type ISortOrder = 'default' | 'asc' | 'desc';

interface Props {
  title: string;
  setState: React.Dispatch<React.SetStateAction<ISortOrder>>;
  state: ISortOrder;
}

const sortOptions: ISortOrder[] = ['default', 'asc', 'desc'];

export const FilterDate: React.FC<Props> = ({ title, setState, state }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: ISortOrder) => {
    setState(option);
    setIsOpen(false);
  };

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

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
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {title}:{' '}
          {state === 'asc' ? '⬆️ Ascending' : state === 'desc' ? '⬇️ Descending' : '➖ Default'}
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
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`block px-4 py-2 text-sm w-full text-left ${state === option ? 'bg-gray-100' : ''}`}
              >
                {option === 'asc'
                  ? '⬆️ Ascending'
                  : option === 'desc'
                    ? '⬇️ Descending'
                    : '➖ Default'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
