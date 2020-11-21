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
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Evaluation } from '../../../../code/interfaces/evaluation';
import { getGroupByGroups, removeArrayDuplicatesByProp, sumArrayProps } from '../../../../code/helpers/helpers';
import { AssignmentGroup } from '../../../../code/interfaces/assignmentGroup';
import { colors } from '../../../../styles/colors';
import { t } from '../../../../code/helpers/translations';
import { TestDescription } from '../../../shared/TestDescription';

interface StudentTableViewProps {
  evaluations: Evaluation[];
}

const StudentTableViewComponent: React.FC<StudentTableViewProps> = ({ evaluations }) => {
  const uniqueStudentEvals = removeArrayDuplicatesByProp(evaluations, ['author_name']);
  const uniqueTestGroups: Evaluation[] = removeArrayDuplicatesByProp(evaluations, ['group', 'name']).sort(
    (s1: Evaluation, s2: Evaluation) => Number(s1.sequence) - Number(s2.sequence),
  );
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
  const [selectedTestIndex, setSelectedTestIndex] = React.useState<string | null>(null);
  const [testName, setTestName] = React.useState<string>('');
  const [data, setData] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(15);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    setSelectedRowIndex(null);
    setSelectedTestIndex(null);
    setData('');
    setTestName('');
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (rowIndex: number | null, testIndex: string | null, data: string, testName: string) => {
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
      <TestDescription />
      <TableContainer component={Paper} css={tableWrapper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('assignmentView.studentTable.name')}</TableCell>
              <TableCell align="left">{t('assignmentView.studentTable.date')}</TableCell>
              {getGroupByGroups(uniqueTestGroups).map((group: string, index: number) => (
                <TableCell key={index} align="left">
                  {group}
                </TableCell>
              ))}
              <TableCell align="left">{t('assignmentView.studentTable.points')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueStudentEvals
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((e: Evaluation, rowIndex: number) => {
                const studentEval = evaluations.filter((se: Evaluation) => se.author === e.author);
                const points = sumArrayProps(studentEval, 'points');

                return (
                  <React.Fragment key={rowIndex}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {e.author_name}
                      </TableCell>
                      <TableCell align="left">{new Date(studentEval[0].stamp).toLocaleDateString()}</TableCell>
                      {getGroupByGroups(uniqueTestGroups).map((group: string, groupIndex: number) => {
                        let studentTests = studentEval
                          .filter((mse: Evaluation) => group === mse.group)
                          .sort((s1: Evaluation, s2: Evaluation) => Number(s1.sequence) - Number(s2.sequence));

                        return (
                          <TableCell key={groupIndex} align="left">
                            {studentTests.map((test: Evaluation, testIndex: number) => {
                              return (
                                <Tooltip title={test.name} placement="top" key={testIndex}>
                                  <IconButton
                                    aria-label="circle"
                                    size="small"
                                    onClick={() =>
                                      handleClick(
                                        rowIndex,
                                        groupIndex.toString() + testIndex.toString(),
                                        test.data,
                                        test.name,
                                      )
                                    }
                                  >
                                    {test.passed ? (
                                      <FiberManualRecordIcon fontSize="small" />
                                    ) : (
                                      <RadioButtonUncheckedIcon fontSize="small" />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              );
                            })}
                          </TableCell>
                        );
                      })}
                      <TableCell align="left">{points / 100}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell css={contentCellWrapper} colSpan={3 + uniqueTestGroups.length}>
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
      <TablePagination
        rowsPerPageOptions={[10, 15, 20, 50]}
        component="div"
        count={uniqueStudentEvals.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

const StyledStudentTableViewComponent = styled(StudentTableViewComponent)``;

export const StudentTableView = (props: any) => <StyledStudentTableViewComponent {...props} />;

const collapseWrapper = css`
  margin-top: 10px;
  height: 40px;
`;

const content = css`
  margin: 50px 20px;
`;

const tableWrapper = css`
  margin-top: 20px;
`;

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
  border: dashed 1px ${colors.gray};
`;
