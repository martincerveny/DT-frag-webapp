/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Seminar } from '../../code/interfaces/seminar';
import {
  fetchActivity,
  fetchAttendance,
  fetchEnrollments,
  fetchSeminars,
  setLoadingState,
} from '../../store/seminar/actions';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { SeminarContent } from './comps/SeminarContent';
import { Activity } from '../../code/interfaces/activity';
import { AssignmentPassed } from '../../code/interfaces/assignmentPassed';
import { fetchAssignmentsPassed } from '../../store/assignment/actions';
import { Loader } from '../shared/Loader';
import { LoadingState } from '../../code/loading';

export interface StateProps {
  seminars: Seminar[];
  enrollments: Enrollment[];
  attendance: Attendance[];
  activity: Activity[];
  assignmentsPassed: AssignmentPassed[];
  loggedUser: undefined | number;
  loadingState: LoadingState;
}

export interface DispatchProps {
  fetchSeminars: typeof fetchSeminars;
  fetchEnrollments: typeof fetchEnrollments;
  fetchAttendance: typeof fetchAttendance;
  fetchActivity: typeof fetchActivity;
  fetchAssignmentsPassed: typeof fetchAssignmentsPassed;
  setLoadingState: typeof setLoadingState;
}

type SeminarDashboardProps = DispatchProps & StateProps;

const SeminarDashboardComponent: React.FC<SeminarDashboardProps> = ({
  fetchSeminars,
  seminars,
  loggedUser,
  enrollments,
  fetchEnrollments,
  fetchAttendance,
  attendance,
  activity,
  fetchActivity,
  assignmentsPassed,
  fetchAssignmentsPassed,
  loadingState,
  setLoadingState,
}) => {
  useEffect(() => {
    fetchSeminars(loggedUser);
    fetchAssignmentsPassed();
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
                    enrollments={enrollments}
                    seminars={seminars}
                    fetchEnrollments={fetchEnrollments}
                    attendance={attendance}
                    fetchAttendance={fetchAttendance}
                    activity={activity}
                    fetchActivity={fetchActivity}
                    assignmentsPassed={assignmentsPassed}
                    loadingState={loadingState}
                    setLoadingState={setLoadingState}
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
  flexdirection: column;
  height: 240;
`;

const heading = css`
  margin: 20px;
`;
