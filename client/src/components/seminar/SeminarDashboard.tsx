/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {Button, ButtonGroup, Container, Grid, List, ListItem, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {colors} from "../../styles/colors";

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
                                <p css={content}>
                                            test
                                </p>
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

const buttonGroupWrapper = css`
  width: 450px;
`;

const linkName = css`
  color: ${colors.black};
  text-decoration: none;
`;

const buttonWrapper = css`
  width: 150px;
  height: 40px;
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
