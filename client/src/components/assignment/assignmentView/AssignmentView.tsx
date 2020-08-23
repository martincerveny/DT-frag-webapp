/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {Container, Grid, Paper, Typography} from '@material-ui/core';
import {
    useParams
} from "react-router-dom";
import {colors} from "../../../styles/colors";

const AssignmentViewComponent: React.FC = () => {
    const {assignmentId} = useParams();
    return (
        <div css={root}>
            <Container maxWidth="lg" css={container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper css={paper}>
                            <Grid container direction="column">
                                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                                    Assignment: {assignmentId}
                                </Typography>
                                <p css={content}>
                                </p>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const StyledAssignmentViewComponent = styled(AssignmentViewComponent)``;

export const AssignmentView = (props: any) => <StyledAssignmentViewComponent {...props} />;

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
