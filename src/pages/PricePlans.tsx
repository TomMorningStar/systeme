// PricePlansPage.tsx
import React from 'react';

import { pricePlans } from '../shared/data';
import { Filters } from '../shared/Filters';
import { orderByEnums } from '../shared/Filters/SearchOptions';
import { Title } from '../shared/Title';
import { IPricePlan, Option } from '../shared/types';
import { Modal } from '../widgets/modal/Modal';
import { IColumn, Table } from '../widgets/table/Table';

const TITLE_KEY = 'description';
const PricePlans: React.FC = () => {
  const [data, setData] = React.useState<IPricePlan[]>(pricePlans);
  const [openModal, setOpenModal] = React.useState(false);

  const [editing, setEditing] = React.useState<IPricePlan | null>(null);
  const [filteredData, setFilteredData] = React.useState<IPricePlan[]>(data);
  const [selectedOption, setSelectedOption] = React.useState<Option>('All');
  const [sortDateCreateAt, setSortDateCreateAt] = React.useState<orderByEnums>('default');
  const [sortDateRemovedAt, setSortDateRemovedAt] = React.useState<orderByEnums>('default');

  const handleOpenModal = (data: IPricePlan) => {
    setOpenModal(true);
    setEditing(data);
  };

  const [searchTerm, setSearchTerm] = React.useState<string>('');

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

    // 3. Сортировка по дате создания
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

    // 4. Сортировка по дате удаления
    if (sortDateRemovedAt !== 'default') {
      tempData = tempData.sort((a, b) => {
        const dateA = new Date(a.removedAt).getTime();
        const dateB = new Date(b.removedAt).getTime();

        if (sortDateRemovedAt === 'asc') {
          return dateA - dateB;
        } else if (sortDateRemovedAt === 'desc') {
          return dateB - dateA;
        } else {
          return 0;
        }
      });
    }

    setFilteredData(tempData);
  }, [data, selectedOption, searchTerm, sortDateCreateAt, sortDateRemovedAt]);

  const columns: IColumn<IPricePlan>[] = [
    { header: 'Description', accessor: 'description' },
    { header: 'Active', accessor: 'active' },
    { header: 'CreatedAt', accessor: 'createdAt' },
    { header: 'RemovedAt', accessor: 'removedAt' },
    {
      header: 'Edit button',
      accessor: (current: IPricePlan): JSX.Element => (
        <button onClick={() => handleOpenModal(current)}>Edit</button>
      ),
    },
  ];

  return (
    <div>
      <Title title="Price Plans" />

      <Filters
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        titleKey={TITLE_KEY}
        onSortDateCreateAt={setSortDateCreateAt}
        onSortDateRemovedAt={setSortDateRemovedAt}
      />
      <Table<IPricePlan> data={filteredData} columns={columns} />
      {openModal && editing && (
        <Modal
          setData={setData}
          setOpenModal={setOpenModal}
          curKey={TITLE_KEY}
          id={editing.id}
          placeholder={editing.description}
        />
      )}
    </div>
  );
};

export default PricePlans;
