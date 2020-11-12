/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import {
  Box,
  Button,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Notepads } from '../../../code/interfaces/notepads';
import { t } from '../../../code/helpers/translations';
import { colors } from '../../../styles/colors';
import { PadAssignment } from '../../../code/interfaces/padAssignment';
import { getDateString } from '../../../code/helpers/helpers';

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
            {notepads &&
              notepads.padAssignments.map((pa: PadAssignment, rowIndex: number) => {
                return (
                  <React.Fragment key={rowIndex}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {pa.assignment_name}
                      </TableCell>
                      <TableCell align="left">{getDateString(pa.stamp)}</TableCell>
                      <TableCell align="left">
                        <Button
                          aria-label="circle"
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleClick(rowIndex, pa.data)}
                        >
                          {selectedRowIndex === rowIndex ? t('student.notepads.hide') : t('student.notepads.show')}
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell css={contentCellWrapper} colSpan={3}>
                        <Collapse in={rowIndex === selectedRowIndex} timeout="auto" unmountOnExit css={collapseWrapper}>
                          <Box css={contentBoxWrapper}>
                            <div css={dataWrapper}>
                              <pre>{data}</pre>
                            </div>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledPadAssignmentsTableComponent = styled(PadAssignmentsTableComponent)``;

export const PadAssignmentsTable = (props: any) => <StyledPadAssignmentsTableComponent {...props} />;

const collapseWrapper = css`
  margin-top: 10px;
  height: 40px;
`;

const dataWrapper = css`
  margin-top: 20px;
  font-size: 13px;
`;

const tableWrapper = css`
  margin-top: 20px;
`;

const contentCellWrapper = css`
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
`;

const contentBoxWrapper = css`
  padding: 10px;
  border: dashed 1px ${colors.blue};
`;
