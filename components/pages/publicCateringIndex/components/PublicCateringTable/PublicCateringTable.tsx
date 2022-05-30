import React from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import { PublicCatering } from 'types/publicCateringType';

import DataCell from './DataCell';

import { StyledTable, ColorLabel, HeaderCell, UserInfo, EmptyList } from './styled';

type Props = {
  data: PublicCatering[];
};

const PublicCateringTable = ({ data }: Props) => {
  const columnNames = ['name', 'rating', 'address', 'startWorking', 'endWorking'];

  return (
    <>
      {data.length > 0 ? (
        <StyledTable data-testid="public-catering-table" data-cy="public-catering-table">
          <thead>
            <tr>
              {columnNames.map((name, id) => (
                <HeaderCell key={name} colSpan={!id ? 2 : 1}>
                  {name}
                </HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ name, rating, address, startWorking, endWorking }) => {
              return (
                <tr key={id} data-cy="activity-row" data-id={id}>
                  <ColorLabel color={color} />
                  <DataCell>{name}</DataCell>
                  <DataCell>{rating}</DataCell>
                  <DataCell>{address}</DataCell>
                  <DataCell>{startWorking.toString()}</DataCell>
                  <DataCell>{endWorking.toString()}</DataCell>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      ) : (
        <EmptyList data-testid="activity-table-empty">No records found</EmptyList>
      )}
    </>
  );
};

export default PublicCateringTable;
