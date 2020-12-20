/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Box, Button, Collapse, TableCell, TableRow } from '@material-ui/core';
import { t } from '../../../code/helpers/translations';
import { colors } from '../../../styles/colors';
import { getDateString } from '../../../code/helpers/helpers';

interface CollapseTableRowProps {
  name: string;
  stamp: string;
  data: string;
  rowIndex: number;
  selectedRowIndex: number | null;
  handleClick: (rowIndex: number | null, data: string) => void;
}

/**
 * Collapse row - can be shown / hidden
 */
const CollapseTableRowComponent: React.FC<CollapseTableRowProps> = ({
  name,
  stamp,
  data,
  rowIndex,
  selectedRowIndex,
  handleClick,
}) => {
  return (
    <React.Fragment key={rowIndex}>
      <TableRow>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">{getDateString(stamp)}</TableCell>
        <TableCell align="left">
          <Button
            aria-label="circle"
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleClick(rowIndex, data)}
          >
            {selectedRowIndex === rowIndex ? t('app.hide') : t('app.show')}
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
};

const StyledCollapseTableRowComponent = styled(CollapseTableRowComponent)``;

export const CollapseTableRow = (props: any) => <StyledCollapseTableRowComponent {...props} />;

const dataWrapper = css`
  margin-top: 20px;
  font-size: 13px;
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

const collapseWrapper = css`
  margin-top: 10px;
  height: 40px;
`;
