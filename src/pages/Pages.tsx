import React from 'react';
import { pages } from '../shared/data';
import { Filters } from '../shared/Filters';
import { orderByEnums } from '../shared/Filters/SearchOptions';
import { Title } from '../shared/Title';
import { IPage, Option } from '../shared/types';
import { Modal } from '../widgets/modal/Modal';
import { IColumn, Table } from '../widgets/table/Table';

const TITLE_KEY = 'title';

const Pages: React.FC = () => {
  const [data, setData] = React.useState<IPage[]>(pages);
  const [openModal, setOpenModal] = React.useState(false);

  const [editing, setEditing] = React.useState<IPage | null>(null);
  const [filteredData, setFilteredData] = React.useState<IPage[]>(data);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = React.useState<Option>('All');
  const [sortDateUpdateAt, setSortDateUpdateAt] = React.useState<orderByEnums>('default');
  const [sortDatePublishedAt, setSortDatePublishedAt] = React.useState<orderByEnums>('default');

  const handleOpenModal = (data: IPage) => {
    setOpenModal(true);
    setEditing(data);
  };

  // Основная логика применения фильтров
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

    // 4. Сортировка по дате обновления
    if (sortDateUpdateAt !== 'default') {
      tempData = tempData.sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();

        if (sortDateUpdateAt === 'asc') {
          return dateA - dateB;
        } else if (sortDateUpdateAt === 'desc') {
          return dateB - dateA;
        } else {
          return 0;
        }
      });
    }

    // 5. Сортировка по дате публикации
    if (sortDatePublishedAt !== 'default') {
      tempData = tempData.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();

        if (sortDatePublishedAt === 'asc') {
          return dateA - dateB;
        } else if (sortDatePublishedAt === 'desc') {
          return dateB - dateA;
        } else {
          return 0;
        }
      });
    }

    setFilteredData(tempData);
  }, [data, selectedOption, searchTerm, sortDateUpdateAt, sortDatePublishedAt]);

  const columns: IColumn<IPage>[] = [
    { header: 'Title', accessor: 'title' },
    { header: 'Active', accessor: 'active' },
    { header: 'UpdatedAt', accessor: 'updatedAt' },
    { header: 'PublishedAt', accessor: 'publishedAt' },
    {
      header: 'Edit button',
      accessor: (current: IPage): JSX.Element => (
        <button onClick={() => handleOpenModal(current)}>Edit</button>
      ),
    },
  ];

  return (
    <div>
      <Title title="Pages" />
      <Filters
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        titleKey={TITLE_KEY}
        onSortDateUpdateAt={setSortDateUpdateAt}
        onSortDatePublishedAt={setSortDatePublishedAt}
      />
      <Table<IPage> data={filteredData} columns={columns} />
      {openModal && editing && (
        <Modal
          setData={setData}
          setOpenModal={setOpenModal}
          curKey={TITLE_KEY}
          id={editing.id}
          placeholder={editing.title}
        />
      )}
    </div>
  );
};

export default Pages;
