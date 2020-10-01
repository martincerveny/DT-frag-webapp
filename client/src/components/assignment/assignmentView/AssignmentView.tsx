/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { GeneralTestGroupView } from './comps/GeneralTestGroupView';
import { StudentView } from './comps/StudentView';
import { AssignmentGroup } from '../../../code/interfaces/assignmentGroup';
import { fetchGroupsByAssignment } from '../../../store/assignment/actions';
import { Evaluation } from '../../../code/interfaces/evaluation';
import { fetchEvaluations } from '../../../store/evaluation/actions';

export interface StateProps {
  assignmentGroups: AssignmentGroup[];
  evaluations: Evaluation[];
}

export interface DispatchProps {
  fetchGroupsByAssignment: typeof fetchGroupsByAssignment;
  fetchEvaluations: typeof fetchEvaluations;
}

type AssignmentViewProps = DispatchProps & StateProps;

const AssignmentViewComponent: React.FC<AssignmentViewProps> = ({
  assignmentGroups,
  fetchGroupsByAssignment,
  fetchEvaluations,
  evaluations,
}) => {
  const { assignmentId } = useParams();

  useEffect(() => {
    fetchGroupsByAssignment(assignmentId);
    fetchEvaluations(assignmentId);
  }, []);

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
                <GeneralTestGroupView assignmentGroups={assignmentGroups} evaluations={evaluations} />
                <StudentView
                  evaluations={evaluations}
                  assignmentGroups={assignmentGroups}
                />
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
  flex-direction: column;
  height: 240;
`;

const heading = css`
  margin: 20px;
`;
