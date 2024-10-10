import React from 'react';
import { products } from '../shared/data';
import { Filters } from '../shared/Filters';
import { orderByEnums, sortByEnums } from '../shared/Filters/SearchOptions';
import { Title } from '../shared/Title';
import { IProduct, Option } from '../shared/types';
import { Modal } from '../widgets/modal/Modal';
import { IColumn, Table } from '../widgets/table/Table';

const TITLE_KEY = 'name';

const Products: React.FC = () => {
  const [data, setData] = React.useState<IProduct[]>(products);
  const [openModal, setOpenModal] = React.useState(false);

  const [editing, setEditing] = React.useState<IProduct | null>(null);
  const [filteredData, setFilteredData] = React.useState<IProduct[]>(data);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = React.useState<Option>('All');
  const [sortBy, setSortBy] = React.useState<sortByEnums>('default');
  const [orderBy, setOrderBy] = React.useState<orderByEnums>('asc');
  const [sortDateCreateAt, setSortDateCreateAt] = React.useState<orderByEnums>('default');

  const handleOpenModal = (data: IProduct) => {
    setOpenModal(true);
    setEditing(data);
  };

  React.useMemo(() => {
    let tempData = [...data];

    // 1. Фильтрация по активному статусу
    if (selectedOption === 'Active') {
      tempData = tempData.filter((item) => item.active);
    } else if (selectedOption === 'Not Active') {
      tempData = tempData.filter((item) => !item.active);
    }

    // 2. Фильтрация по поисковому запросу
    if (searchTerm) {
      tempData = tempData.filter((item) =>
        String(item[TITLE_KEY]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Сортировка по размеру
    tempData = tempData.sort((a, b) => {
      if (sortBy === 'size') {
        const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];
        const aIndex = sizeOrder.indexOf(a.options.size);
        const bIndex = sizeOrder.indexOf(b.options.size);
        return orderBy === 'asc' ? aIndex - bIndex : bIndex - aIndex;
      } else if (sortBy === 'amount') {
        return orderBy === 'asc'
          ? a.options.amount - b.options.amount
          : b.options.amount - a.options.amount;
      } else {
        return 0; // По умолчанию, без сортировки
      }
    });

    // 4. Сортировка по дате создания
    if (sortDateCreateAt !== 'default') {
      tempData = tempData.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (sortDateCreateAt === 'asc') {
          return dateA - dateB;
        } else if (sortDateCreateAt === 'desc') {
          return dateB - dateA;
        } else {
          return 0;
        }
      });
    }

    setFilteredData(tempData);
  }, [data, selectedOption, searchTerm, sortDateCreateAt, sortBy, orderBy]);

  const onSortOptions = (sortBy: sortByEnums, order: orderByEnums) => {
    setSortBy(sortBy);
    setOrderBy(order);
  };

  const columns: IColumn<IProduct>[] = [
    { header: 'Name', accessor: 'name' },
    {
      header: 'Options',
      accessor: ({ options: { size, amount } }: IProduct) => (
        <>
          <div>Size: {size}</div>
          <div>Amount: {amount}</div>
        </>
      ),
    },
    {
      header: 'Active',
      accessor: 'active',
    },
    {
      header: 'CreatedAt',
      accessor: 'createdAt',
    },
    {
      header: 'Edit button',
      accessor: (current: IProduct): JSX.Element => (
        <button onClick={() => handleOpenModal(current)}>Edit</button>
      ),
    },
  ];

  return (
    <div>
      <Title title="Products" />

      <Filters
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        titleKey={TITLE_KEY}
        hasOptions={true}
        onSortOptions={onSortOptions}
        // onSortDateCreateAt={createdAt.setFilterDate}
        onSortDateCreateAt={setSortDateCreateAt}
      />

      <Table<IProduct> data={filteredData} columns={columns} />
      {openModal && editing && (
        <Modal
          setData={setData}
          setOpenModal={setOpenModal}
          curKey={TITLE_KEY}
          id={editing.id}
          placeholder={editing.name}
        />
      )}
    </div>
  );
};

export default Products;
