/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Assignment } from '../../../code/interfaces/assignment';
import {
  fetchAssignments,
  fetchFailedAssignments,
  fetchPassedAssignments,
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

export interface StateProps {
  assignments: Assignment[];
  passedAssignments: AuthorAssignment[];
  failedAssignments: AuthorAssignment[];
  allEnrollments: Enrollment[];
  submissionCountPerHour: SubmissionCountPerHour[];
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
}) => {
  useEffect(() => {
    fetchAssignments();
    fetchPassedAssignments();
    fetchFailedAssignments();
    fetchEnrollments();
    fetchSubmissionCountPerHour();
  }, [fetchAssignments, fetchPassedAssignments, fetchFailedAssignments, fetchEnrollments, fetchSubmissionCountPerHour]);

  const exampleData = [
    { name: 'Page A', uv: 200 },
    {
      name: 'Page B',
      uv: 1900,
    },
    { name: 'Page C', uv: 100 },
    { name: 'Page D', uv: 1200 },
    { name: 'Page D', uv: 50 },
  ];

  const renderLineChart = (
    <LineChart width={500} height={300} data={exampleData}>
      <Line type="monotone" dataKey="uv" stroke={colors.lightPurple} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  const renderBarChart = (
    <BarChart width={500} height={300} data={submissionCountPerHour}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis name="Hour of the day" dataKey="hour" />
      <YAxis />
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
                {assignments.length > 0 ? (
                  assignmentRequestState !== LoadingState.Loading &&
                  passedAssignmentRequestState !== LoadingState.Loading &&
                  failedAssignmentRequestState !== LoadingState.Loading ? (
                    <AssignmentList
                      assignments={assignments}
                      passedAssignments={passedAssignments}
                      failedAssignments={failedAssignments}
                      allEnrollments={allEnrollments}
                    />
                  ) : (
                    <Loader />
                  )
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
                <div css={content}>{submissionCountPerHour.length > 0 ? renderLineChart : <NoData />}</div>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  {t('assignment.statistics.graph2')}
                </Typography>
                <div css={content}>{submissionCountPerHour.length > 0 ? renderBarChart : <NoData />}</div>
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
