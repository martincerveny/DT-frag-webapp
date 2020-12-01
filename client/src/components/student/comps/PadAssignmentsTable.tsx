/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Notepads } from '../../../code/interfaces/notepads';
import { t } from '../../../code/helpers/translations';
import { PadAssignment } from '../../../code/interfaces/padAssignment';
import { NotepadTableRow } from './shared/NotepadTableRow';
import { NoData } from '../../shared/NoData';

interface PadAssignmentsTableProps {
  notepads: Notepads | undefined;
}

const PadAssignmentsTableComponent: React.FC<PadAssignmentsTableProps> = ({ notepads }) => {
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
    <div>
      <Typography variant="h6" color="primary">
        {t('student.notepads.assignmentPads')}
      </Typography>
      <TableContainer css={tableWrapper} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('student.assignment')}</TableCell>
              <TableCell>{t('student.notepads.date')}</TableCell>
              <TableCell>{t('student.notepads.data')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notepads && notepads.padAssignments.length > 0 ? (
              notepads.padAssignments.map((pa: PadAssignment, rowIndex: number) => (
                <NotepadTableRow
                  key={rowIndex}
                  name={pa.assignment_name}
                  stamp={pa.stamp}
                  data={data}
                  rowIndex={rowIndex}
                  selectedRowIndex={selectedRowIndex}
                  handleClick={() => handleClick(rowIndex, pa.data)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledPadAssignmentsTableComponent = styled(PadAssignmentsTableComponent)``;

export const PadAssignmentsTable = (props: any) => <StyledPadAssignmentsTableComponent {...props} />;

const tableWrapper = css`
  margin-top: 20px;
`;
