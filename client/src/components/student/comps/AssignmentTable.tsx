/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import {
  Box,
  Collapse,
  Grid,
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
import { colors } from '../../../styles/colors';
import { Evaluation } from '../../../code/interfaces/evaluation';
import { t } from '../../../code/helpers/translations';
import { TestDescription } from '../../shared/TestDescription';
import _ from 'underscore';
import { NoData } from '../../shared/NoData';
import { LoadingState } from '../../../code/enums/loading';
import { Loader } from '../../shared/Loader';

interface AssignmentTableProps {
  assignments: Assignment[];
  evaluations: Evaluation[];
  evaluationsRequestState: LoadingState;
}

const AssignmentTableComponent: React.FC<AssignmentTableProps> = ({
  assignments,
  evaluations,
  evaluationsRequestState,
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
  const [selectedTestIndex, setSelectedTestIndex] = React.useState<number | null>(null);
  const [testName, setTestName] = React.useState<string>('');
  const [data, setData] = React.useState<string>('');

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

  const renderTestButton = (test: Evaluation, rowIndex: number, testIndex: number) => {
    return (
      <Tooltip title={test.group} placement="top" key={testIndex}>
        <IconButton
          aria-label="circle"
          size="small"
          onClick={() => handleClick(rowIndex, testIndex, test.data, test.name)}
        >
          {test.passed ? <FiberManualRecordIcon fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <div css={content}>
      <TestDescription />
      {evaluationsRequestState === LoadingState.Loading ? (
        <Loader />
      ) : assignments.length > 0 ? (
        <TableContainer css={tableWrapper} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('student.assignment')}</TableCell>
                <TableCell>{t('student.tests')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((a: Assignment, rowIndex: number) => {
                const assignmentEvals = evaluations.filter(
                  (ae: Evaluation) => ae.assignment_id === a.id && ae.name !== 'group',
                );
                const groupByAssignmentEvals = Object.values(_.groupBy(assignmentEvals, 'group'));

                return (
                  <React.Fragment key={rowIndex}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {a.name}
                      </TableCell>
                      <TableCell align="left">
                        {assignmentEvals.length > 0 ? (
                          <Grid container direction="row" justify="flex-start" alignItems="center">
                            {groupByAssignmentEvals.map((group: Evaluation[], groupIndex: number) => {
                              return (
                                <div css={groupWrapper} key={groupIndex}>
                                  {group.map((test: Evaluation, testIndex: number) =>
                                    renderTestButton(test, rowIndex, testIndex),
                                  )}
                                  {groupIndex < groupByAssignmentEvals.length - 1 ? <span css={verticalLine} /> : ''}
                                </div>
                              );
                            })}
                          </Grid>
                        ) : (
                          <div>{t('student.notSubmitted')}</div>
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
      ) : (
        <NoData />
      )}
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

const groupWrapper = css`
  display: inline-block;
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

const verticalLine = css`
  border-left: 2px solid ${colors.gray};
  margin-left: 12px;
  margin-right: 12px;
`;
