/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Assignment } from '../../../code/interfaces/assignment';
import { fetchAssignments } from '../../../store/assignment/actions';
import { colors } from '../../../styles/colors';
import { useParams } from 'react-router';
import { fetchEvaluationsByStudent } from '../../../store/evaluation/actions';
import { Evaluation } from '../../../code/interfaces/evaluation';

interface AssignmentTableProps {
  assignments: Assignment[];
  fetchAssignments: typeof fetchAssignments;
  fetchEvaluationsByStudent: typeof fetchEvaluationsByStudent;
  evaluations: Evaluation[];
}

const AssignmentTableComponent: React.FC<AssignmentTableProps> = ({
  assignments,
  fetchAssignments,
  fetchEvaluationsByStudent,
  evaluations,
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
  const [selectedTestIndex, setSelectedTestIndex] = React.useState<number | null>(null);
  const [testName, setTestName] = React.useState<string>('');
  const [data, setData] = React.useState<string>('');
  const { studentId } = useParams();

  useEffect(() => {
    fetchAssignments();
    fetchEvaluationsByStudent(studentId);
  }, []);

  const handleClick = (rowIndex: number | null, testIndex: number | null, data: string, testName: string) => {
    if (selectedTestIndex === testIndex && selectedRowIndex === rowIndex) {
      setSelectedRowIndex(null);
      setSelectedTestIndex(null);
      setData('');
      setTestName('');
    } else {
      setSelectedRowIndex(rowIndex);
      setSelectedTestIndex(testIndex);
      setData(data);
      setTestName(testName);
    }
  };

  return (
    <div css={content}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Assignment</TableCell>
              <TableCell>Tests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((a: Assignment, rowIndex: number) => {
              const assignmentEvals = evaluations.filter((ae: Evaluation) => ae.assignment_id === a.id);
              const maxEvalId = Math.max.apply(
                Math,
                assignmentEvals.map(function(o) {
                  return o.eval_id;
                }),
              );
              const currentAssignmentEval = assignmentEvals.filter((cae: Evaluation) => cae.eval_id === maxEvalId);

              return (
                <React.Fragment key={rowIndex}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {a.name}
                    </TableCell>
                    <TableCell align="left">
                      {currentAssignmentEval.length > 0 ? (
                        currentAssignmentEval.map((test: Evaluation, testIndex: number) => {
                          return (
                            <Tooltip title={test.name} placement="top" key={testIndex}>
                              <IconButton
                                aria-label="circle"
                                size="small"
                                onClick={() => handleClick(rowIndex, testIndex, test.data, test.name)}
                              >
                                {test.passed ? (
                                  <FiberManualRecordIcon fontSize="small" />
                                ) : (
                                  <RadioButtonUncheckedIcon fontSize="small" />
                                )}
                              </IconButton>
                            </Tooltip>
                          );
                        })
                      ) : (
                        <div>N/A</div>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell css={contentCellWrapper} colSpan={2}>
                      <Collapse in={rowIndex === selectedRowIndex} timeout="auto" unmountOnExit css={collapseWrapper}>
                        <Box css={contentBoxWrapper}>
                          <Typography variant="h6" color="primary">
                            {testName}
                          </Typography>
                          <div css={dataWrapper}>{data}</div>
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

const StyledAssignmentTableComponent = styled(AssignmentTableComponent)``;

export const AssignmentTable = (props: any) => <StyledAssignmentTableComponent {...props} />;

const collapseWrapper = css`
  margin-top: 10px;
  height: 40px;
`;

const content = css`
  margin: 50px 20px;
`;

const dataWrapper = css`
  margin-top: 20px;
`;

const contentCellWrapper = css`
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
`;

const contentBoxWrapper = css`
  padding: 10px;
  border: dashed 1px ${colors.gray};
`;
