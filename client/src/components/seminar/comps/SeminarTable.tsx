/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { SquareFill } from 'react-bootstrap-icons';
import { ProgressBar } from '../../shared/ProgressBar';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { getDateString } from '../../../code/helpers';
import { Activity } from '../../../code/interfaces/activity';
import { AssignmentPassed } from '../../../code/interfaces/assignmentPassed';
import { setLoadingState } from '../../../store/seminar/actions';
import { LoadingState } from '../../../code/loading';

interface SeminarTableProps {
  enrollments: Enrollment[];
  currentSeminar: number;
  attendance: Attendance[];
  activity: Activity[];
  assignmentsPassed: AssignmentPassed[];
  setLoadingState: typeof setLoadingState;
  loadingState: LoadingState;
}

const SeminarTableComponent: React.FC<SeminarTableProps> = ({
  enrollments,
  currentSeminar,
  attendance,
  activity,
  assignmentsPassed,
  setLoadingState,
  loadingState,
}) => {
  let studentActivity: Activity[] | null = null;
  let studentAssignmentsPassed: AssignmentPassed[] | null = null;

  return (
    <div css={content}>
      {enrollments.length > 0 && (
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
              {enrollments.map((e: Enrollment, index: number) => {
                if (currentSeminar === e.seminar_id) {
                  const studentAttendance = attendance.filter((a: Attendance) => {
                    return a['student'] === e.student && a['seminar_id'] === e.seminar_id;
                  });

                  if (activity.length > 0) {
                    studentActivity = activity.filter((activity: Activity) => {
                      return activity['student'] === e.student;
                    });
                  }

                  if (assignmentsPassed.length > 0) {
                    studentAssignmentsPassed = assignmentsPassed.filter((assignmentPassed: AssignmentPassed) => {
                      return assignmentPassed['author'] === e.student;
                    });
                  }
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {e.name}
                      </TableCell>
                      <TableCell align="right">
                        {studentAssignmentsPassed &&
                          studentAssignmentsPassed.map((sap: AssignmentPassed, index: number) => {
                            return (
                              <Tooltip key={index} title={sap.assignment_name} placement="top">
                                <SquareFill color="green" size={20} css={iconMargin} />
                              </Tooltip>
                            );
                          })}
                        {/*<Square size={20} css={iconMargin} />*/}
                        {/*<XSquareFill color="gray" size={20} css={iconMargin} />*/}
                      </TableCell>
                      <TableCell align="right">
                        {studentAttendance.map((sa: Attendance, index: number) => (
                          <Tooltip key={index} title={getDateString(sa.date)} placement="top">
                            <SquareFill color="green" size={20} css={iconMargin} />
                          </Tooltip>
                        ))}
                        {/*<Square size={20} css={iconMargin} />*/}
                      </TableCell>
                      <TableCell align="right">
                        {studentActivity && activity.length > 0 && (
                          <ProgressBar points={studentActivity[0].points} maxPoints={studentActivity[0].maxPoints} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const StyledSeminarTable = styled(SeminarTableComponent)``;

export const SeminarTable = (props: any) => <StyledSeminarTable {...props} />;

const iconMargin = css`
  margin-left: 1px;
`;

const content = css`
  margin: 20px;
`;
