/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Assignment } from '../../../code/interfaces/assignment';
import { fetchAssignments, fetchAuthorAssignments } from '../../../store/assignment/actions';
import { AssignmentList } from './comps/AssignmentList';
import { AssignmentArray } from '../../../code/interfaces/assignmentArray';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { fetchEnrollments } from '../../../store/seminar/actions';

export interface StateProps {
  assignments: Assignment[];
  authorAssignments: AssignmentArray | undefined;
  allEnrollments: Enrollment[];
}

export interface DispatchProps {
  fetchAssignments: typeof fetchAssignments;
  fetchAuthorAssignments: typeof fetchAuthorAssignments;
  fetchEnrollments: typeof fetchEnrollments;
}

type AssignmentDashboardProps = DispatchProps & StateProps;

const AssignmentDashboardComponent: React.FC<AssignmentDashboardProps> = ({
  assignments,
  fetchAssignments,
  authorAssignments,
  fetchAuthorAssignments,
  allEnrollments,
  fetchEnrollments,
}) => {
  useEffect(() => {
    fetchAssignments();
    fetchAuthorAssignments();
    fetchEnrollments();
  }, []);

  const exampleData = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    {
      name: 'Page B',
      uv: 900,
      pv: 3400,
      amt: 500,
    },
    { name: 'Page C', uv: 100, pv: 2200, amt: 1400 },
  ];

  const renderLineChart = (
    <LineChart width={500} height={300} data={exampleData}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  return (
    <div css={root}>
      <Container maxWidth="lg" css={container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  Assignment Dashboard
                </Typography>
                <AssignmentList
                  assignments={assignments}
                  authorAssignments={authorAssignments}
                  allEnrollments={allEnrollments}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  Statistics 1
                </Typography>
                <div css={content}>{renderLineChart}</div>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  Statistics 2
                </Typography>
                <div css={content}>{renderLineChart}</div>
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
