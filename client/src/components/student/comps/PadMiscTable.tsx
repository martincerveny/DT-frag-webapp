/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Notepads } from '../../../code/interfaces/notepads';
import { t } from '../../../code/helpers/translations';
import { PadMisc } from '../../../code/interfaces/padMisc';
import { NotepadTableRow } from './shared/NotepadTableRow';
import { NoData } from '../../shared/NoData';

interface PadMiscTableProps {
  notepads: Notepads | undefined;
}

const PadMiscTableComponent: React.FC<PadMiscTableProps> = ({ notepads }) => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
  const [data, setData] = React.useState<string>('');

  const handleClick = (rowIndex: number | null, data: string) => {
    if (selectedRowIndex === rowIndex) {
      setSelectedRowIndex(null);
      setData('');
    } else {
      setSelectedRowIndex(rowIndex);
      setData(data);
    }
  };

  return (
    <div css={content}>
      <Typography variant="h6" color="primary">
        {t('student.notepads.miscPads')}
      </Typography>
      <TableContainer css={tableWrapper} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('student.notepads.name')}</TableCell>
              <TableCell>{t('student.notepads.date')}</TableCell>
              <TableCell>{t('student.notepads.data')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notepads && notepads.padMisc.length > 0 ? (
              notepads.padMisc.map((pm: PadMisc, rowIndex: number) => (
                <NotepadTableRow
                  key={rowIndex}
                  name={pm.name}
                  stamp={pm.stamp}
                  data={data}
                  rowIndex={rowIndex}
                  selectedRowIndex={selectedRowIndex}
                  handleClick={() => handleClick(rowIndex, pm.data)}
                />
              ))
            ) : (
              <NoData />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledPadMiscTableComponent = styled(PadMiscTableComponent)``;

export const PadMiscTable = (props: any) => <StyledPadMiscTableComponent {...props} />;

const content = css`
  margin-top: 30px;
`;

const tableWrapper = css`
  margin-top: 20px;
`;
