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
import { getDateString } from '../../../code/helpers/helpers';
import { PadMisc } from '../../../code/interfaces/padMisc';

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
            {notepads &&
              notepads.padMisc.map((pm: PadMisc, rowIndex: number) => {
                return (
                  <React.Fragment key={rowIndex}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {pm.name}
                      </TableCell>
                      <TableCell align="left">{getDateString(pm.stamp)}</TableCell>
                      <TableCell align="left">
                        <Button
                          aria-label="circle"
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleClick(rowIndex, pm.data)}
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

const StyledPadMiscTableComponent = styled(PadMiscTableComponent)``;

export const PadMiscTable = (props: any) => <StyledPadMiscTableComponent {...props} />;

const collapseWrapper = css`
  margin-top: 10px;
  height: 40px;
`;

const content = css`
  margin-top: 30px;
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
