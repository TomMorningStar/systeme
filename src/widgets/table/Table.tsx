export interface IColumn<T> {
  header: string | JSX.Element;
  accessor: keyof T | ((row: T) => JSX.Element);
}

interface TableProps<T> {
  data: T[];
  columns: IColumn<T>[];
}

export const Table = <T extends Record<string, unknown>>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns
              .filter((column) => column.header !== 'Edit button')
              .map((column, columnIndex) => (
                <th
                  key={columnIndex}
                  colSpan={columns.length - 2 === columnIndex ? 2 : 1}
                  className={`border border-gray-300 px-4 py-2 text-left ${columnIndex === 0 ? 'w-32' : ''}`}
                >
                  {column.header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className={`border border-gray-300 px-4 py-2 ${columnIndex === 0 ? ' w-96  break-words' : ''}`}
                >
                  {typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
