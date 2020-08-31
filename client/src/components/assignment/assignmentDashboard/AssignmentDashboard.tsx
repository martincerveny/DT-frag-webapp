/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Container, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { colors } from '../../../styles/colors';
import { Routes } from '../../../code/routes';
import { Assignment } from '../../../code/interfaces/assignment';
import { fetchAssignments } from '../../../store/assignment/actions';

export interface StateProps {
  assignments: Assignment[];
}

export interface DispatchProps {
  fetchAssignments: typeof fetchAssignments;
}

type AssignmentProps = DispatchProps & StateProps;

const AssignmentDashboardComponent: React.FC<AssignmentProps> = ({ assignments, fetchAssignments }) => {
  useEffect(() => {
    fetchAssignments();
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
                <p css={content}>
                  <List component="nav" aria-label="main mailbox folders">
                    {assignments.map(d => (
                      <ListItem>
                        <Grid container direction="row" justify="space-around" alignItems="center">
                          <Button variant="text">
                            <Link to={`${Routes.Assignments}/${d.id}`} css={linkName}>
                              {d.name}
                            </Link>
                          </Button>
                          <ButtonGroup
                            disableRipple
                            disableFocusRipple
                            variant="outlined"
                            aria-label="outlined primary button group"
                            css={buttonGroupWrapper}
                          >
                            <Button color="secondary" css={buttonWrapper}>
                              Fail: 10%
                            </Button>
                            <Button css={buttonWrapperPass}>Pass: 85%</Button>
                            <Button css={buttonWrapper}>Not submitted: 5%</Button>
                          </ButtonGroup>
                          <Typography>25 days remaining</Typography>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </p>
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
                <p css={content}>{renderLineChart}</p>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  Statistics 2
                </Typography>
                <p css={content}>{renderLineChart}</p>
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

const buttonGroupWrapper = css`
  width: 570px;
`;

const linkName = css`
  color: ${colors.black};
  text-decoration: none;
`;

const buttonWrapper = css`
  width: 190px;
  height: 40px;
`;

const buttonWrapperPass = css`
  width: 190px;
  height: 40px;
  color: ${colors.green};
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

const content = css`
  margin: 20px;
`;
