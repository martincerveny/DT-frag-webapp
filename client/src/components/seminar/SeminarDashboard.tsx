/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Seminar } from '../../code/interfaces/seminar';
import {
  fetchActivityPts,
  fetchAttendance,
  fetchEnrollments,
  fetchSeminars,
  setLoadingState,
} from '../../store/seminar/actions';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { SeminarContent } from './comps/SeminarContent';
import { ActivityPts } from '../../code/interfaces/activityPts';
import { LoadingState } from '../../code/loading';
import { fetchAssignments, fetchAuthorAssignments } from '../../store/assignment/actions';
import { AssignmentArray } from '../../code/interfaces/assignmentArray';
import { Assignment } from '../../code/interfaces/assignment';

export interface StateProps {
  seminars: Seminar[];
  seminarEnrollments: Enrollment[];
  attendance: Attendance[];
  activityPts: ActivityPts[];
  authorAssignments: AssignmentArray | undefined;
  loggedUser: undefined | number;
  loadingState: LoadingState;
  assignments: Assignment[];
}

export interface DispatchProps {
  fetchSeminars: typeof fetchSeminars;
  fetchEnrollments: typeof fetchEnrollments;
  fetchAttendance: typeof fetchAttendance;
  fetchActivityPts: typeof fetchActivityPts;
  fetchAuthorAssignments: typeof fetchAuthorAssignments;
  setLoadingState: typeof setLoadingState;
  fetchAssignments: typeof fetchAssignments;
}

type SeminarDashboardProps = DispatchProps & StateProps;

const SeminarDashboardComponent: React.FC<SeminarDashboardProps> = ({
  fetchSeminars,
  seminars,
  loggedUser,
  seminarEnrollments,
  fetchEnrollments,
  fetchAttendance,
  attendance,
  activityPts,
  fetchActivityPts,
  authorAssignments,
  fetchAuthorAssignments,
  loadingState,
  setLoadingState,
  assignments,
  fetchAssignments,
}) => {
  useEffect(() => {
    fetchSeminars(loggedUser);
    fetchAuthorAssignments();
    fetchAssignments();
  }, []);

  return (
    <div css={root}>
      <Container maxWidth="lg" css={container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  Seminar Dashboard
                </Typography>
                {seminars.length > 0 && (
                  <SeminarContent
                    seminarEnrollments={seminarEnrollments}
                    seminars={seminars}
                    fetchEnrollments={fetchEnrollments}
                    attendance={attendance}
                    fetchAttendance={fetchAttendance}
                    activityPts={activityPts}
                    fetchActivityPts={fetchActivityPts}
                    authorAssignments={authorAssignments}
                    loadingState={loadingState}
                    setLoadingState={setLoadingState}
                    assignments={assignments}
                  />
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const StyledSeminarDashboard = styled(SeminarDashboardComponent)``;

export const SeminarDashboard = (props: any) => <StyledSeminarDashboard {...props} />;

const root = css`
  flex-grow: 1;
`;

const container = css`
  padding-top: 20px;
  padding-bottom: 40px;
`;

const paper = css`
  padding: 2px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  height: 240;
`;

const heading = css`
  margin: 20px;
`;
