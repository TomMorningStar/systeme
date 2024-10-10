import React from 'react';

interface Props {
  title: string;
}

export const Title: React.FC<Props> = ({ title }) => {
  return <h1 className="text-3xl mb-4">{title}</h1>;
};
