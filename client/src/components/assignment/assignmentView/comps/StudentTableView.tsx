/** @jsx jsx */
import React from 'react';
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
import {
  getDateString,
  getGroupByGroups,
  removeArrayDuplicatesByProp,
  sumArrayProps,
} from '../../../../code/helpers/helpers';
import { colors } from '../../../../styles/colors';
import { t } from '../../../../code/helpers/translations';
import { TestDescription } from '../../../shared/TestDescription';
import { LoadingState } from '../../../../code/enums/loading';
import { Loader } from '../../../shared/Loader';
import { NoData } from '../../../shared/NoData';

interface StudentTableViewProps {
  evaluations: Evaluation[];
  evaluationsRequestState: LoadingState;
}

const StudentTableViewComponent: React.FC<StudentTableViewProps> = ({ evaluations, evaluationsRequestState }) => {
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

  /**
   * Render clickable test button with collapse row
   */
  const renderTestButton = (test: Evaluation, testIndex: number, groupIndex: number, rowIndex: number) => {
    return (
      <Tooltip title={test.name} placement="top" key={testIndex}>
        <IconButton
          aria-label="circle"
          size="small"
          onClick={() => handleClick(rowIndex, groupIndex.toString() + testIndex.toString(), test.data, test.name)}
        >
          {test.passed ? <FiberManualRecordIcon fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    );
  };

  const renderTableHead = (
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
  );

  return (
    <div css={content}>
      <TestDescription />
      {evaluationsRequestState === LoadingState.Loading ? (
        <Loader />
      ) : (
        <div>
          <TableContainer component={Paper} css={tableWrapper}>
            <Table aria-label="simple table">
              {renderTableHead}
              <TableBody>
                {evaluations.length > 0 ? (
                  // unique student evaluations - list of all students
                  uniqueStudentEvals
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((e: Evaluation, rowIndex: number) => {
                      // filter data for each student
                      const studentEval = evaluations.filter((se: Evaluation) => se.author === e.author);
                      const points = sumArrayProps(studentEval, 'points');

                      return (
                        <React.Fragment key={rowIndex}>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              {e.author_name}
                            </TableCell>
                            <TableCell align="left">{getDateString(studentEval[0].stamp)}</TableCell>
                            {getGroupByGroups(uniqueTestGroups).map((group: string, groupIndex: number) => {
                              // filter tests for each group
                              const studentTests = studentEval
                                .filter((mse: Evaluation) => group === mse.group && mse.name !== 'group')
                                .sort((s1: Evaluation, s2: Evaluation) => Number(s1.sequence) - Number(s2.sequence));

                              return (
                                <TableCell key={groupIndex} align="left">
                                  {studentTests.map((test: Evaluation, testIndex: number) =>
                                    renderTestButton(test, testIndex, groupIndex, rowIndex),
                                  )}
                                </TableCell>
                              );
                            })}
                            <TableCell align="left">{points / 100}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell css={contentCellWrapper} colSpan={3 + uniqueTestGroups.length}>
                              <Collapse
                                in={rowIndex === selectedRowIndex}
                                timeout="auto"
                                unmountOnExit
                                css={collapseWrapper}
                              >
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
                    })
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
      )}
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
