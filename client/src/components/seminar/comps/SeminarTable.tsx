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
import { AuthorAssignment } from '../../../code/interfaces/authorAssignment';
import { Assignment } from '../../../code/interfaces/assignment';
import { colors } from '../../../styles/colors';
import { Routes } from '../../../code/enums/routes';
import { Link } from 'react-router-dom';
import { t } from '../../../code/helpers/translations';
import { AttendanceDeadline } from '../../../code/interfaces/attendanceDeadline';
import moment from 'moment';
import { ActivityMax } from '../../../code/interfaces/activityMax';

interface SeminarTableProps {
  seminarEnrollments: Enrollment[];
  currentSeminar: number;
  attendance: Attendance[];
  activityPts: ActivityPts[];
  activityMax: ActivityMax | undefined;
  passedAssignments: AuthorAssignment[];
  failedAssignments: AuthorAssignment[];
  assignments: Assignment[];
  attendanceDeadline: AttendanceDeadline | undefined;
}

const SeminarTableComponent: React.FC<SeminarTableProps> = ({
  seminarEnrollments,
  currentSeminar,
  attendance,
  activityPts,
  passedAssignments,
  failedAssignments,
  assignments,
  attendanceDeadline,
  activityMax,
}) => {
  let studentActivity: ActivityPts[] | null = null;
  let studentAssignmentsPassed: AuthorAssignment[] | null = null;
  let studentAssignmentsFailed: AuthorAssignment[] | null = null;
  let notSubmittedAssignments: Assignment[] | null = null;

  const renderAttendance = (studentAttendance: Attendance[]) => {
    if (attendanceDeadline) {
      const seminarWeeksCount = 11;
      const lastSemesterWeek = moment(attendanceDeadline.stamp).isoWeek();
      const firstSemesterWeek = lastSemesterWeek - seminarWeeksCount;
      const attendanceItems = [];

      for (let i = firstSemesterWeek; i <= lastSemesterWeek; i++) {
        const weekAttendance = studentAttendance.find((sa: Attendance) => moment(sa.date).isoWeek() === i);
        attendanceItems.push(
          <Tooltip
            key={i}
            title={weekAttendance ? getDateString(weekAttendance.date) : t('seminar.seminarTable.absence')}
            placement="top"
          >
            {weekAttendance ? (
              <SquareFill color="green" size={20} css={attendanceButton} />
            ) : (
              <Square size={20} css={attendanceButton} />
            )}
          </Tooltip>,
        );
      }
      return attendanceItems;
    }
  };

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

                  if (passedAssignments.length > 0) {
                    studentAssignmentsPassed = passedAssignments.filter((passedAssignment: AuthorAssignment) => {
                      return passedAssignment['author'] === e.student;
                    });
                  }

                  if (failedAssignments.length > 0) {
                    studentAssignmentsFailed = failedAssignments.filter((failedAssignment: AuthorAssignment) => {
                      return failedAssignment['author'] === e.student;
                    });
                  }

                  if (studentAssignmentsPassed && studentAssignmentsFailed) {
                    const studentAssignments = studentAssignmentsPassed
                      .concat(studentAssignmentsFailed)
                      .map(({ assignment_name }) => assignment_name);

                    notSubmittedAssignments = assignments.filter(a => !studentAssignments.includes(a.name));
                  }

                  return (
                    studentAssignmentsPassed &&
                    studentAssignmentsFailed &&
                    notSubmittedAssignments && (
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
                          {studentAssignmentsFailed &&
                            studentAssignmentsFailed.map((sanp: AuthorAssignment, index: number) => {
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
                        <TableCell align="right">{renderAttendance(studentAttendance)}</TableCell>
                        <TableCell align="right">
                          {activityMax && (
                            <ProgressBar
                              points={(studentActivity && studentActivity[0].points) ?? 0}
                              maxPoints={activityMax.points}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  );
                }
                return null;
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
