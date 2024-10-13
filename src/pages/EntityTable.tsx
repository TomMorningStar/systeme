import React from 'react';
import { useParams } from 'react-router';
import { api } from '../api/getData';
import { Filters } from '../shared/Filters';
import { transformColumns } from '../shared/helpers/transformColumns';
import { Title } from '../shared/Title';
import { IAll, IEntityTable } from '../shared/types';
import { Modal } from '../widgets/modal/Modal';
import { Table } from '../widgets/table/Table';

export const EntityTable: React.FC = () => {
  const [state, setState] = React.useState<IEntityTable | null>(null);
  const [filteredData, setFilteredData] = React.useState<IAll[]>(state?.data || []);

  const [openModal, setOpenModal] = React.useState(false);
  const [editing, setEditing] = React.useState<IAll | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    api
      .getOne(`/entity-table/${id}`)
      .then((data) => {
        if (data) {
          setState(data);
          setFilteredData(data.data);
        }
      })
      .catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setState(null);
        setFilteredData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!state) {
    return <div>No data</div>;
  }

  const handleOpenModal = (currentEditTableEntity: IAll) => {
    setOpenModal(true);
    setEditing(currentEditTableEntity);
  };

  const currentColumns = transformColumns(state.columns, state.label, handleOpenModal);

  return (
    <div>
      <React.Fragment>
        <Title title={state.label} />
        <Filters data={state} accessorKey={state.accessorKey} setFilteredData={setFilteredData} />
        <Table data={filteredData} columns={currentColumns} />
        {openModal && editing && (
          <Modal
            setState={setFilteredData}
            setOpenModal={setOpenModal}
            curKey={state.accessorKey}
            id={id!}
            tableEntity={state}
            editing={editing}
            placeholder={String(editing[state.accessorKey as keyof IAll])}
          />
        )}
      </React.Fragment>
    </div>
  );
};
