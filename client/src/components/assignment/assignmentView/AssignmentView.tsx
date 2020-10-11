/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { GeneralTestGroupView } from './comps/GeneralTestGroupView';
import { StudentTableView } from './comps/StudentTableView';
import { AssignmentGroup } from '../../../code/interfaces/assignmentGroup';
import { fetchGroupsByAssignment } from '../../../store/assignment/actions';
import { Evaluation } from '../../../code/interfaces/evaluation';
import { fetchEvaluations } from '../../../store/evaluation/actions';
import { AssignmentViewMenu } from '../../../code/assignmentViewMenu';

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
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<AssignmentViewMenu>(AssignmentViewMenu.Stats);

  const handleMenuClick = (menuItem: AssignmentViewMenu) => {
    setSelectedMenuItem(menuItem);
  };

  useEffect(() => {
    fetchGroupsByAssignment(assignmentId);
    fetchEvaluations(assignmentId);
  }, []);

  const renderHorizontalMenu = () => {
    return (
      <Grid container direction="row">
        <Button
          variant="contained"
          color={selectedMenuItem === AssignmentViewMenu.Stats ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(AssignmentViewMenu.Stats)}
        >
          Stats
        </Button>
        <Button
          variant="contained"
          color={selectedMenuItem === AssignmentViewMenu.Students ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(AssignmentViewMenu.Students)}
        >
          Students
        </Button>
      </Grid>
    );
  };

  const renderDataComponent = () => {
    if (selectedMenuItem === AssignmentViewMenu.Stats) {
      return <GeneralTestGroupView assignmentGroups={assignmentGroups} evaluations={evaluations} />;
    } else if (selectedMenuItem === AssignmentViewMenu.Students) {
      return <StudentTableView evaluations={evaluations} assignmentGroups={assignmentGroups} />;
    }
  };

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
                {renderHorizontalMenu()}
                {renderDataComponent()}
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

const menuButton = css`
  margin-left: 20px;
`;
