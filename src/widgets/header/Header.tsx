import React from 'react';
import { Link } from 'react-router-dom';
import { IEntityTable } from '../../shared/types';

interface Props {
  routes: IEntityTable[];
}

export const Header: React.FC<Props> = ({ routes }) => {
  const links = Object.entries(routes).map(([key, value]) => {
    const pathTo = value.label.split(' ').join('-').toLowerCase();

    return (
      <Link key={key} to={`${pathTo}/${value.id}`} style={{ marginRight: '10px' }}>
        {value.label}
      </Link>
    );
  });

  return (
    <header>
      <nav style={{ marginBottom: '20px' }}>{links}</nav>
    </header>
  );
};
