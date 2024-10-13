import React from 'react';
interface Props {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterTitle: React.FC<Props> = ({ state, setState }) => {
  return (
    <input
      type="text"
      placeholder="Search by title"
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="w-64 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    />
  );
};
