/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

interface StudentViewProps {
  dataRows: any;
  handleClick: (index: number | null) => void;
  selectedIndex: number | null;
}

const StudentViewComponent: React.FC<StudentViewProps> = ({ dataRows, handleClick, selectedIndex }) => {
  return (
    <div css={content}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Test</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((d: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {d.name}
                    </TableCell>
                    <TableCell align="right">{d.date}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="circle" size="small" onClick={() => handleClick(index)}>
                        <RadioButtonUncheckedIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="circle" size="small" onClick={() => handleClick(index)}>
                        <FiberManualRecordIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="circle" size="small" onClick={() => handleClick(index)}>
                        <FiberManualRecordIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">0</TableCell>
                  </TableRow>
                  <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                    <TableRow>
                      <div css={collapseWrapper}>Test Info</div>
                    </TableRow>
                  </Collapse>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledStudentViewComponent = styled(StudentViewComponent)``;

export const StudentView = (props: any) => <StyledStudentViewComponent {...props} />;

const collapseWrapper = css`
  margin: 15px;
  height: 40px;
`;

const content = css`
  margin: 20px;
`;
