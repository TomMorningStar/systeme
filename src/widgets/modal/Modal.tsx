import React, { Dispatch, SetStateAction } from 'react';
import { api } from '../../api/getData';
import { IAll, IEntityTable } from '../../shared/types';

interface Props<T> {
  id: string;
  setState: Dispatch<SetStateAction<IAll[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  curKey: string;
  placeholder: string;
  onClose?: () => void;
  editing: T;
  tableEntity: IEntityTable;
}

export const Modal = <T extends { id: number }>({
  curKey,
  setState,
  placeholder,
  id,
  setOpenModal,
  editing,
  tableEntity,
}: Props<T>) => {
  const [value, setValue] = React.useState<string>(placeholder ?? '');

  const handleSave = () => {
    const { data } = tableEntity;

    // Пришлось так извращаться из-за ограничений в API
    const cb = (item: IAll) => (item.id === editing.id ? { ...item, [curKey]: value } : item);
    const body = {
      ...tableEntity,
      data: data.map(cb),
    };

    api.put(`/entity-table/${id}`, body).then(() => {
      setState(data.map(cb));
    });

    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h1 className="text-xl font-semibold mb-4">{curKey}</h1>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end">
          <button
            disabled={value === placeholder || value === ''}
            onClick={handleSave}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 ${value === placeholder || value === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Save
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
