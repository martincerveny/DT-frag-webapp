/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { Assignment } from '../../../code/interfaces/assignment';
import {
  fetchAssignments,
  fetchFailedAssignments,
  fetchPassedAssignments,
  fetchSubmissionCountPerDay,
  fetchSubmissionCountPerHour,
} from '../../../store/assignment/actions';
import { AssignmentList } from './comps/AssignmentList';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { fetchEnrollments } from '../../../store/seminar/actions';
import { colors } from '../../../styles/colors';
import { SubmissionCountPerHour } from '../../../code/interfaces/submissionCountPerHour';
import { t } from '../../../code/helpers/translations';
import { NoData } from '../../shared/NoData';
import { AuthorAssignment } from '../../../code/interfaces/authorAssignment';
import { LoadingState } from '../../../code/enums/loading';
import { Loader } from '../../shared/Loader';
import { SubmissionCountPerDay } from '../../../code/interfaces/submissionCountPerDay';
import { getDayOfWeek } from '../../../code/helpers/helpers';

export interface StateProps {
  assignments: Assignment[];
  passedAssignments: AuthorAssignment[];
  failedAssignments: AuthorAssignment[];
  allEnrollments: Enrollment[];
  submissionCountPerHour: SubmissionCountPerHour[];
  submissionCountPerDay: SubmissionCountPerDay[];
  assignmentRequestState: LoadingState;
  passedAssignmentRequestState: LoadingState;
  failedAssignmentRequestState: LoadingState;
}

export interface DispatchProps {
  fetchAssignments: typeof fetchAssignments;
  fetchPassedAssignments: typeof fetchPassedAssignments;
  fetchFailedAssignments: typeof fetchFailedAssignments;
  fetchEnrollments: typeof fetchEnrollments;
  fetchSubmissionCountPerHour: typeof fetchSubmissionCountPerHour;
  fetchSubmissionCountPerDay: typeof fetchSubmissionCountPerDay;
}

type AssignmentDashboardProps = DispatchProps & StateProps;

const AssignmentDashboardComponent: React.FC<AssignmentDashboardProps> = ({
  assignments,
  fetchAssignments,
  passedAssignments,
  failedAssignments,
  fetchFailedAssignments,
  fetchPassedAssignments,
  allEnrollments,
  fetchEnrollments,
  submissionCountPerHour,
  fetchSubmissionCountPerHour,
  assignmentRequestState,
  passedAssignmentRequestState,
  failedAssignmentRequestState,
  fetchSubmissionCountPerDay,
  submissionCountPerDay,
}) => {
  useEffect(() => {
    fetchAssignments();
    fetchPassedAssignments();
    fetchFailedAssignments();
    fetchEnrollments();
    fetchSubmissionCountPerHour();
    fetchSubmissionCountPerDay();
  }, [
    fetchAssignments,
    fetchPassedAssignments,
    fetchFailedAssignments,
    fetchEnrollments,
    fetchSubmissionCountPerHour,
    fetchSubmissionCountPerDay,
  ]);

  const renderFirstStats = (
    <BarChart
      width={575}
      height={300}
      data={submissionCountPerDay.map((s: SubmissionCountPerDay) => ({
        day: getDayOfWeek(s.day),
        submission_count: parseInt(s.submission_count, 10),
      }))}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis name="Day" dataKey="day" />
      <YAxis dataKey="submission_count" domain={[0, 'dataMax']} />
      <Tooltip />
      <Bar name="Submission count" dataKey="submission_count" fill={colors.lightPurple} />
    </BarChart>
  );

  const renderSecondStats = (
    <BarChart
      width={575}
      height={300}
      data={submissionCountPerHour.map((s: SubmissionCountPerHour) => ({
        ...s,
        submission_count: parseInt(s.submission_count, 10),
      }))}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis name="Hour of the day" dataKey="hour" />
      <YAxis dataKey="submission_count" domain={[0, 'dataMax']} />
      <Tooltip />
      <Bar name="Submission count" dataKey="submission_count" fill={colors.lightPurple} />
    </BarChart>
  );

  return (
    <div css={root}>
      <Container maxWidth="lg" css={container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  {t('assignment.dashboard')}
                </Typography>
                {assignmentRequestState === LoadingState.Loading ||
                passedAssignmentRequestState === LoadingState.Loading ||
                failedAssignmentRequestState === LoadingState.Loading ? (
                  <Loader />
                ) : assignments.length > 0 ? (
                  <AssignmentList
                    assignments={assignments}
                    passedAssignments={passedAssignments}
                    failedAssignments={failedAssignments}
                    allEnrollments={allEnrollments}
                  />
                ) : (
                  <NoData />
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  {t('assignment.statistics.graph1')}
                </Typography>
                <div css={content}>{submissionCountPerDay.length > 0 ? renderFirstStats : <NoData />}</div>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  {t('assignment.statistics.graph2')}
                </Typography>
                <div css={content}>{submissionCountPerHour.length > 0 ? renderSecondStats : <NoData />}</div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const StyledAssignmentDashboard = styled(AssignmentDashboardComponent)``;

export const AssignmentDashboard = (props: any) => <StyledAssignmentDashboard {...props} />;

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

const content = css`
  margin: 20px;
`;
