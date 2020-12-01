/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Grid, Typography } from '@material-ui/core';
import { SeminarTable } from './SeminarTable';
import { Seminar } from '../../../code/interfaces/seminar';
import {
  fetchActivityPts,
  fetchAttendance,
  fetchAttendanceDeadline,
  fetchEnrollments,
} from '../../../store/seminar/actions';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { ActivityPts } from '../../../code/interfaces/activityPts';
import { AssignmentArray } from '../../../code/interfaces/assignmentArray';
import { Assignment } from '../../../code/interfaces/assignment';
import { Square, SquareFill, XSquareFill } from 'react-bootstrap-icons';
import { t } from '../../../code/helpers/translations';
import { AttendanceDeadline } from '../../../code/interfaces/attendanceDeadline';

export interface SeminarContentProps {
  seminarEnrollments: Enrollment[];
  seminars: Seminar[];
  attendance: Attendance[];
  activityPts: ActivityPts[];
  authorAssignments: AssignmentArray | undefined;
  fetchAttendance: typeof fetchAttendance;
  fetchAttendanceDeadline: typeof fetchAttendanceDeadline;
  fetchActivityPts: typeof fetchActivityPts;
  fetchEnrollments: typeof fetchEnrollments;
  assignments: Assignment[];
  attendanceDeadline: AttendanceDeadline | undefined;
}

const SeminarContentComponent: React.FC<SeminarContentProps> = ({
  seminarEnrollments,
  seminars,
  fetchEnrollments,
  attendance,
  fetchAttendance,
  activityPts,
  fetchActivityPts,
  authorAssignments,
  assignments,
  fetchAttendanceDeadline,
  attendanceDeadline,
}) => {
  useEffect(() => {
    const seminarIds = Array.prototype.map.call(seminars, s => s.id).toString();
    fetchEnrollments(seminarIds);
    fetchAttendance(seminarIds);
    fetchActivityPts();
    fetchAttendanceDeadline();
  }, [seminars, fetchActivityPts, fetchAttendanceDeadline, fetchAttendance, fetchEnrollments]);

  const renderIconDescription = () => {
    return (
      <Grid container direction="column" css={iconDescriptionWrapper}>
        <Grid item>
          <SquareFill color="green" size={20} />
          <span css={descriptionWrapper}>{t('seminar.yesPass')}</span>
        </Grid>
        <Grid item>
          <Square size={20} />
          <span css={descriptionWrapper}>{t('seminar.noFail')}</span>
        </Grid>
        <Grid item>
          <XSquareFill color="gray" size={20} />
          <span css={descriptionWrapper}>{t('seminar.noSubmit')}</span>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      {renderIconDescription()}
      {seminars.map((s: Seminar, index: number) => {
        return (
          <div key={index}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
              {t('seminar.seminar')} {s.name}
            </Typography>
            <SeminarTable
              seminarEnrollments={seminarEnrollments}
              seminars={seminars}
              attendance={attendance}
              currentSeminar={s.id}
              activityPts={activityPts}
              authorAssignments={authorAssignments}
              assignments={assignments}
              attendanceDeadline={attendanceDeadline}
            />
          </div>
        );
      })}
    </div>
  );
};

const StyledSeminarContent = styled(SeminarContentComponent)``;

export const SeminarContent = (props: any) => <StyledSeminarContent {...props} />;

const heading = css`
  margin: 20px;
`;

const descriptionWrapper = css`
  margin-left: 10px;
`;

const iconDescriptionWrapper = css`
  padding: 20px;
`;
