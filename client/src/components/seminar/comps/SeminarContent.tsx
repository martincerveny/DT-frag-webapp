/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Grid, Typography } from '@material-ui/core';
import { SeminarTable } from './SeminarTable';
import { Seminar } from '../../../code/interfaces/seminar';
import { fetchActivityPts, fetchAttendance, fetchEnrollments, setLoadingState } from '../../../store/seminar/actions';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { ActivityPts } from '../../../code/interfaces/activityPts';
import { LoadingState } from '../../../code/loading';
import { AssignmentArray } from '../../../code/interfaces/assignmentArray';
import { Assignment } from '../../../code/interfaces/assignment';
import { Square, SquareFill, XSquareFill } from 'react-bootstrap-icons';

export interface SeminarContentProps {
  seminarEnrollments: Enrollment[];
  seminars: Seminar[];
  attendance: Attendance[];
  activityPts: ActivityPts[];
  authorAssignments: AssignmentArray | undefined;
  fetchAttendance: typeof fetchAttendance;
  fetchActivityPts: typeof fetchActivityPts;
  fetchEnrollments: typeof fetchEnrollments;
  loadingState: LoadingState;
  setLoadingState: typeof setLoadingState;
  assignments: Assignment[];
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
  loadingState,
  setLoadingState,
  assignments,
}) => {
  useEffect(() => {
    const seminarIds = Array.prototype.map.call(seminars, s => s.id).toString();
    fetchEnrollments(seminarIds);
    fetchAttendance(seminarIds);
    fetchActivityPts();
  }, [seminars]);

  return (
    <div css={content}>
      {renderIconDescription()}
      {seminars.map((s: Seminar, index: number) => {
        return (
          <div key={index}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
              Seminar {s.name}
            </Typography>
            <SeminarTable
              fetchEnrollments={fetchEnrollments}
              seminarEnrollments={seminarEnrollments}
              seminars={seminars}
              attendance={attendance}
              currentSeminar={s.id}
              activityPts={activityPts}
              authorAssignments={authorAssignments}
              setLoadingState={setLoadingState}
              loadingState={loadingState}
              assignments={assignments}
            />
          </div>
        );
      })}
    </div>
  );
};

const renderIconDescription = () => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <SquareFill color="green" size={20} />
        <span css={descriptionWrapper}>- yes / pass</span>
      </Grid>
      <Grid item>
        <Square size={20} />
        <span css={descriptionWrapper}>- no / fail</span>
      </Grid>
      <Grid item>
        <XSquareFill color="gray" size={20} />
        <span css={descriptionWrapper}>- no submit</span>
      </Grid>
    </Grid>
  );
};

const StyledSeminarContent = styled(SeminarContentComponent)``;

export const SeminarContent = (props: any) => <StyledSeminarContent {...props} />;

const heading = css`
  margin: 20px;
`;

const content = css`
  margin: 20px;
`;

const descriptionWrapper = css`
  margin-left: 10px;
`;
