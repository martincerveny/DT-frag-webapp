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
import { NoData } from '../../shared/NoData';

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

interface StudentDetails {
  studentAttendance: Attendance[];
  studentActivity: ActivityPts[];
  studentAssignmentsPassed: AuthorAssignment[];
  studentAssignmentsFailed: AuthorAssignment[];
  studentAssignmentsNotSubmitted: Assignment[];
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
  const renderTableHead = (
    <TableHead>
      <TableRow>
        <TableCell>{t('seminar.seminarTable.name')}</TableCell>
        <TableCell align="right">{t('seminar.seminarTable.assignments')}</TableCell>
        <TableCell align="right">{t('seminar.seminarTable.attendance')}</TableCell>
        <TableCell align="right">{t('seminar.seminarTable.activity')}</TableCell>
      </TableRow>
    </TableHead>
  );

  const getStudentDetails = (e: Enrollment): StudentDetails => {
    const studentAttendance = attendance
      .filter((a: Attendance) => a['student'] === e.student)
      .sort((a: Attendance, b: Attendance) => new Date(a['date']).getTime() - new Date(b['date']).getTime());

    const studentActivity = activityPts.filter((activityPts: ActivityPts) => activityPts['student'] === e.student);

    const studentAssignmentsPassed = passedAssignments.filter(
      (passedAssignment: AuthorAssignment) => passedAssignment['author'] === e.student,
    );

    const studentAssignmentsFailed = failedAssignments.filter(
      (failedAssignment: AuthorAssignment) => failedAssignment['author'] === e.student,
    );

    const studentAssignments = studentAssignmentsPassed
      .concat(studentAssignmentsFailed)
      .map(({ assignment_name }) => assignment_name);

    const studentAssignmentsNotSubmitted = assignments.filter(a => !studentAssignments.includes(a.name));

    return {
      studentAttendance,
      studentActivity,
      studentAssignmentsPassed,
      studentAssignmentsFailed,
      studentAssignmentsNotSubmitted,
    };
  };

  const renderAssignments = (sd: StudentDetails) => {
    return (
      <React.Fragment>
        {sd.studentAssignmentsPassed.map((sap: AuthorAssignment, index: number) => (
          <Link key={index} to={`${Routes.Assignments}/${sap.assignment_id}`}>
            <Tooltip title={sap.assignment_name} placement="top">
              <SquareFill size={20} css={passedButton} />
            </Tooltip>
          </Link>
        ))}

        {sd.studentAssignmentsFailed.map((sanp: AuthorAssignment, index: number) => (
          <Link key={index} to={`${Routes.Assignments}/${sanp.assignment_id}`}>
            <Tooltip title={sanp.assignment_name} placement="top">
              <Square size={20} css={notPassedButton} />
            </Tooltip>
          </Link>
        ))}

        {sd.studentAssignmentsNotSubmitted.map((nsa: Assignment, index: number) => (
          <Link key={index} to={`${Routes.Assignments}/${nsa.id}`}>
            <Tooltip title={nsa.name} placement="top">
              <XSquareFill size={20} css={notSubmittedButton} />
            </Tooltip>
          </Link>
        ))}
      </React.Fragment>
    );
  };

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

  const renderActivity = (studentDetails: StudentDetails) => {
    return (
      activityMax && (
        <ProgressBar
          points={studentDetails.studentActivity.length > 0 ? studentDetails.studentActivity[0].points : 0}
          maxPoints={activityMax.points}
        />
      )
    );
  };

  return (
    <div css={content}>
      {seminarEnrollments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {renderTableHead}
            <TableBody>
              {seminarEnrollments.map((e: Enrollment, index: number) => {
                if (currentSeminar === e.seminar_id) {
                  const studentDetails = getStudentDetails(e);

                  return (
                    studentDetails && (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Link to={`${Routes.Student}/${e.student}`} css={linkName}>
                            {e.name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{renderAssignments(studentDetails)}</TableCell>
                        <TableCell align="right">{renderAttendance(studentDetails.studentAttendance)}</TableCell>
                        <TableCell align="right">{renderActivity(studentDetails)}</TableCell>
                      </TableRow>
                    )
                  );
                }
                return null;
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
