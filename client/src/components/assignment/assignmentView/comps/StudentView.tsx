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
import { Evaluation } from '../../../../code/interfaces/evaluation';
import { removeArrayDuplicatesByProp, sumArrayProps } from '../../../../code/helpers';
import { AssignmentGroup } from '../../../../code/interfaces/assignmentGroup';

interface StudentViewProps {
  evaluations: Evaluation[];
  assignmentGroups: AssignmentGroup[];
  handleClick: (index: number | null) => void;
  selectedIndex: number | null;
}

const StudentViewComponent: React.FC<StudentViewProps> = ({
  evaluations,
  handleClick,
  selectedIndex,
  assignmentGroups,
}) => {
  const uniqueStudentEvals = removeArrayDuplicatesByProp(evaluations, ['author_name']);

  return (
    <div css={content}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date</TableCell>
              {assignmentGroups.map((ag: AssignmentGroup, index: number) => (
                <TableCell key={index} align="right">
                  {ag.group}
                </TableCell>
              ))}
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueStudentEvals.map((e: Evaluation, index: number) => {
              const studentEvals = evaluations.filter((se: Evaluation) => se.author === e.author);
              const maxEvalId = Math.max.apply(
                Math,
                studentEvals.map(function(o) {
                  return o.eval_id;
                }),
              );
              const maxStudentEval = studentEvals.filter((mse: Evaluation) => mse.eval_id === maxEvalId);
              const points = sumArrayProps(maxStudentEval, 'points');

              return (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {e.author_name}
                    </TableCell>
                    <TableCell align="right">{new Date(maxStudentEval[0].stamp).toLocaleDateString()}</TableCell>
                    {assignmentGroups.map((ag: AssignmentGroup, index: number) => {
                      const studentTests = maxStudentEval.filter((mse: Evaluation) => ag.group === mse.group);
                      return (
                        <TableCell key={index} align="right">
                          {studentTests.map((test: Evaluation, index: number) => {
                            return (
                              <IconButton aria-label="circle" size="small" key={index}>
                                {test.passed ? (
                                  <FiberManualRecordIcon fontSize="small" />
                                ) : (
                                  <RadioButtonUncheckedIcon fontSize="small" />
                                )}
                              </IconButton>
                            );
                          })}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">{points}</TableCell>
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
