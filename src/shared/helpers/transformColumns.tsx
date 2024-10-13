import type { IAll, IProduct } from '../types';

export interface IColumn {
  header: string;
  accessor: string;
}

export interface ITransformColumns {
  header: string;
  accessor: keyof IAll | ((row: IAll) => JSX.Element);
}

export const transformColumns = (
  columns: IColumn[],
  keyEntity: string,
  openEditModal: (current: IAll) => void
) => {
  return columns.map((column) => {
    if (keyEntity === 'Products') {
      if (column.accessor === 'jsx options') {
        return {
          ...column,
          accessor: ({ options: { size, amount } }: IProduct) =>
            size ? (
              <>
                <div>Size: {size}</div>
                <div>Amount: {amount}</div>
              </>
            ) : (
              <div>No options</div>
            ),
        } as ITransformColumns;
      }
    }

    if (column.accessor === 'jsx edit button') {
      return {
        ...column,
        accessor: (current: IAll): JSX.Element => (
          <button onClick={() => openEditModal(current)}>Edit</button>
        ),
      } as ITransformColumns;
    }

    return column as ITransformColumns;
  });
};
