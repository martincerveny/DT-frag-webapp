/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { SeminarTable } from './comps/SeminarTable';

const SeminarDashboardComponent: React.FC = () => {
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
                <div css={content}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                    Seminar 1
                  </Typography>
                  <SeminarTable />
                  <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                    Seminar 2
                  </Typography>
                  <SeminarTable />
                  <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                    Seminar 3
                  </Typography>
                  <SeminarTable />
                </div>
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

const content = css`
  margin: 20px;
`;
