/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { colors } from '../../../styles/colors';
import { SquareFill, Square, XSquareFill } from 'react-bootstrap-icons';
import {ProgressBar} from "../../shared/ProgressBar";

const SeminarTableComponent: React.FC = () => {
  return (
    <div css={content}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Assignments</TableCell>
              <TableCell align="right">Attendance</TableCell>
              <TableCell align="right">Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1">
              <TableCell component="th" scope="row">
                Jan Novak
              </TableCell>
              <TableCell align="right">
                <SquareFill color="green" size={20} css={iconMargin} />
                <Square size={20} css={iconMargin} />
                <XSquareFill color="gray" size={20} css={iconMargin} />
              </TableCell>
              <TableCell align="right">
                <SquareFill color="green" size={20} css={iconMargin} />
                <Square size={20} css={iconMargin} />
                <SquareFill color="green" size={20} css={iconMargin} />
                <Square size={20} css={iconMargin} />
              </TableCell>
              <TableCell align="right">
                <ProgressBar progress={20}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledSeminarTable = styled(SeminarTableComponent)``;

export const SeminarTable = (props: any) => <StyledSeminarTable {...props} />;

const greenIcon = css`
  color: ${colors.green};
`;

const iconMargin = css`
  margin-left: 1px;
`;

const grayIcon = css`
  color: ${colors.gray};
`;

const content = css`
  margin: 20px;
`;
