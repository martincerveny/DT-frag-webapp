/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Grid, Typography } from '@material-ui/core';
import { SeminarTable } from './SeminarTable';
import { Seminar } from '../../../code/interfaces/seminar';
import {
  fetchActivityMaxPts,
  fetchActivityPts,
  fetchAttendance,
  fetchAttendanceDeadline,
  fetchEnrollments,
} from '../../../store/seminar/actions';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { ActivityPts } from '../../../code/interfaces/activityPts';
import { Assignment } from '../../../code/interfaces/assignment';
import { Square, SquareFill, XSquareFill } from 'react-bootstrap-icons';
import { t } from '../../../code/helpers/translations';
import { AttendanceDeadline } from '../../../code/interfaces/attendanceDeadline';
import { ActivityMax } from '../../../code/interfaces/activityMax';
import { AuthorAssignment } from '../../../code/interfaces/authorAssignment';

export interface SeminarContentProps {
  seminarEnrollments: Enrollment[];
  seminars: Seminar[];
  attendance: Attendance[];
  activityPts: ActivityPts[];
  activityMax: ActivityMax | undefined;
  passedAssignments: AuthorAssignment[];
  failedAssignments: AuthorAssignment[];
  fetchAttendance: typeof fetchAttendance;
  fetchAttendanceDeadline: typeof fetchAttendanceDeadline;
  fetchActivityPts: typeof fetchActivityPts;
  fetchEnrollments: typeof fetchEnrollments;
  fetchActivityMaxPts: typeof fetchActivityMaxPts;
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
  passedAssignments,
  failedAssignments,
  assignments,
  fetchAttendanceDeadline,
  attendanceDeadline,
  activityMax,
  fetchActivityMaxPts,
}) => {
  useEffect(() => {
    const seminarIds = Array.prototype.map.call(seminars, s => s.id).toString();
    fetchEnrollments(seminarIds);
    fetchAttendance(seminarIds);
    fetchActivityMaxPts();
    fetchActivityPts();
    fetchAttendanceDeadline();
  }, [seminars, fetchActivityPts, fetchAttendanceDeadline, fetchAttendance, fetchEnrollments, fetchActivityMaxPts]);

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
          <div key={index} css={seminarTableWrapper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
              {t('seminar.seminar')} {s.name}
            </Typography>
            <SeminarTable
              seminarEnrollments={seminarEnrollments}
              seminars={seminars}
              attendance={attendance}
              currentSeminar={s.id}
              activityPts={activityPts}
              activityMax={activityMax}
              passedAssignments={passedAssignments}
              failedAssignments={failedAssignments}
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

const seminarTableWrapper = css`
  margin-bottom: 100px;
`;
