/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { Square, SquareFill, XSquareFill } from 'react-bootstrap-icons';
import { ProgressBar } from '../../shared/ProgressBar';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { getDateString } from '../../../code/helpers';
import { Activity } from '../../../code/interfaces/activity';
import { setLoadingState } from '../../../store/seminar/actions';
import { LoadingState } from '../../../code/loading';
import { AssignmentArray } from '../../../code/interfaces/assignmentArray';
import { AuthorAssignment } from '../../../code/interfaces/authorAssignment';
import { Assignment } from '../../../code/interfaces/assignment';

interface SeminarTableProps {
  enrollments: Enrollment[];
  currentSeminar: number;
  attendance: Attendance[];
  activity: Activity[];
  authorAssignments: AssignmentArray | undefined;
  setLoadingState: typeof setLoadingState;
  loadingState: LoadingState;
  assignments: Assignment[];
}

const SeminarTableComponent: React.FC<SeminarTableProps> = ({
  enrollments,
  currentSeminar,
  attendance,
  activity,
  authorAssignments,
  setLoadingState,
  loadingState,
  assignments,
}) => {
  let studentActivity: Activity[] | null = null;
  let studentAssignmentsPassed: AuthorAssignment[] | null = null;
  let studentAssignmentsNotPassed: AuthorAssignment[] | null = null;
  let notSubmittedAssignments: string[] | null = null;

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

                  if (authorAssignments && authorAssignments.assignmentsPassed.length > 0) {
                    studentAssignmentsPassed = authorAssignments.assignmentsPassed.filter(
                      (assignmentPassed: AuthorAssignment) => {
                        return assignmentPassed['author'] === e.student;
                      },
                    );
                  }

                  if (authorAssignments && authorAssignments.assignmentsNotPassed.length > 0) {
                    studentAssignmentsNotPassed = authorAssignments.assignmentsNotPassed.filter(
                      (assignmentNotPassed: AuthorAssignment) => {
                        return assignmentNotPassed['author'] === e.student;
                      },
                    );
                  }

                  if (studentAssignmentsPassed && studentAssignmentsNotPassed) {
                    const assignmentNames = assignments.map(({ name }) => name);
                    const studentAssignments = studentAssignmentsPassed
                      .concat(studentAssignmentsNotPassed)
                      .map(({ assignment_name }) => assignment_name);

                    notSubmittedAssignments = assignmentNames.filter(n => !studentAssignments.includes(n));
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {e.name}
                      </TableCell>
                      <TableCell align="right">
                        {studentAssignmentsPassed &&
                          studentAssignmentsPassed.map((sap: AuthorAssignment, index: number) => {
                            return (
                              <Tooltip key={index} title={sap.assignment_name} placement="top">
                                <SquareFill color="green" size={20} css={iconMargin} />
                              </Tooltip>
                            );
                          })}
                        {studentAssignmentsNotPassed &&
                          studentAssignmentsNotPassed.map((sanp: AuthorAssignment, index: number) => {
                            return (
                              <Tooltip key={index} title={sanp.assignment_name} placement="top">
                                <Square size={20} css={iconMargin} />
                              </Tooltip>
                            );
                          })}
                        {notSubmittedAssignments &&
                          notSubmittedAssignments.map((nsa: string, index: number) => {
                            return (
                              <Tooltip key={index} title={nsa} placement="top">
                                <XSquareFill color="gray" size={20} css={iconMargin} />
                              </Tooltip>
                            );
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {studentAttendance.map((sa: Attendance, index: number) => (
                          <Tooltip key={index} title={getDateString(sa.date)} placement="top">
                            <SquareFill color="green" size={20} css={iconMargin} />
                          </Tooltip>
                        ))}
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
