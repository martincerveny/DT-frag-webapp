/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { Square, SquareFill, XSquareFill } from 'react-bootstrap-icons';
import { ProgressBar } from '../../shared/ProgressBar';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { getDateString } from '../../../code/helpers/helpers';
import { ActivityPts } from '../../../code/interfaces/activityPts';
import { setLoadingState } from '../../../store/seminar/actions';
import { LoadingState } from '../../../code/enums/loading';
import { AssignmentArray } from '../../../code/interfaces/assignmentArray';
import { AuthorAssignment } from '../../../code/interfaces/authorAssignment';
import { Assignment } from '../../../code/interfaces/assignment';
import { colors } from '../../../styles/colors';
import { Routes } from '../../../code/enums/routes';
import { Link } from 'react-router-dom';
import { t } from '../../../code/helpers/translations';
import { AttendanceDeadline } from '../../../code/interfaces/attendanceDeadline';
import * as differenceInDays from 'date-fns/differenceInDays';

interface SeminarTableProps {
  seminarEnrollments: Enrollment[];
  currentSeminar: number;
  attendance: Attendance[];
  activityPts: ActivityPts[];
  authorAssignments: AssignmentArray | undefined;
  setLoadingState: typeof setLoadingState;
  loadingState: LoadingState;
  assignments: Assignment[];
  attendanceDeadline: AttendanceDeadline | undefined;
}

const SeminarTableComponent: React.FC<SeminarTableProps> = ({
  seminarEnrollments,
  currentSeminar,
  attendance,
  activityPts,
  authorAssignments,
  setLoadingState,
  loadingState,
  assignments,
  attendanceDeadline,
}) => {
  let studentActivity: ActivityPts[] | null = null;
  let studentAssignmentsPassed: AuthorAssignment[] | null = null;
  let studentAssignmentsNotPassed: AuthorAssignment[] | null = null;
  let notSubmittedAssignments: Assignment[] | null = null;

  return (
    <div css={content}>
      {seminarEnrollments.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('seminar.seminarTable.name')}</TableCell>
                <TableCell align="right">{t('seminar.seminarTable.assignments')}</TableCell>
                <TableCell align="right">{t('seminar.seminarTable.attendance')}</TableCell>
                <TableCell align="right">{t('seminar.seminarTable.activity')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seminarEnrollments.map((e: Enrollment, index: number) => {
                if (currentSeminar === e.seminar_id) {
                  const studentAttendance = attendance
                    .filter((a: Attendance) => {
                      return a['student'] === e.student && a['seminar_id'] === e.seminar_id;
                    })
                    .sort(
                      (a: Attendance, b: Attendance) => new Date(a['date']).getTime() - new Date(b['date']).getTime(),
                    );

                  if (activityPts.length > 0) {
                    studentActivity = activityPts.filter((activityPts: ActivityPts) => {
                      return activityPts['student'] === e.student;
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
                    const studentAssignments = studentAssignmentsPassed
                      .concat(studentAssignmentsNotPassed)
                      .map(({ assignment_name }) => assignment_name);

                    notSubmittedAssignments = assignments.filter(a => !studentAssignments.includes(a.name));
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <Link to={`${Routes.Student}/${e.student}`} css={linkName}>
                          {e.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {studentAssignmentsPassed &&
                          studentAssignmentsPassed.map((sap: AuthorAssignment, index: number) => {
                            return (
                              <Link key={index} to={`${Routes.Assignments}/${sap.assignment_id}`}>
                                <Tooltip title={sap.assignment_name} placement="top">
                                  <SquareFill size={20} css={passedButton} />
                                </Tooltip>
                              </Link>
                            );
                          })}
                        {studentAssignmentsNotPassed &&
                          studentAssignmentsNotPassed.map((sanp: AuthorAssignment, index: number) => {
                            return (
                              <Link key={index} to={`${Routes.Assignments}/${sanp.assignment_id}`}>
                                <Tooltip title={sanp.assignment_name} placement="top">
                                  <Square size={20} css={notPassedButton} />
                                </Tooltip>
                              </Link>
                            );
                          })}
                        {notSubmittedAssignments &&
                          notSubmittedAssignments.map((nsa: Assignment, index: number) => {
                            return (
                              <Link key={index} to={`${Routes.Assignments}/${nsa.id}`}>
                                <Tooltip title={nsa.name} placement="top">
                                  <XSquareFill size={20} css={notSubmittedButton} />
                                </Tooltip>
                              </Link>
                            );
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {studentAttendance.map((sa: Attendance, index: number) => (
                          <Tooltip key={index} title={getDateString(sa.date)} placement="top">
                            <SquareFill color="green" size={20} css={attendanceButton} />
                          </Tooltip>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {studentActivity && activityPts.length > 0 && (
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

const attendanceButton = css`
  margin-left: 1px;
`;

const passedButton = css`
  margin-left: 1px;
  color: green;
  &:hover {
    color: ${colors.blue} !important;
    background-color: ${colors.blue} !important;
  }
`;

const notPassedButton = css`
  margin-left: 1px;
  &:hover {
    color: ${colors.blue} !important;
    background-color: ${colors.blue} !important;
  }
`;

const notSubmittedButton = css`
  margin-left: 1px;
  color: ${colors.gray};
  &:hover {
    color: ${colors.blue} !important;
  }
`;

const content = css`
  margin: 20px;
`;

const linkName = css`
  color: ${colors.black};
  text-decoration: none;
  &:hover {
    text-decoration: underline !important;
    color: ${colors.blue} !important;
  }
`;
