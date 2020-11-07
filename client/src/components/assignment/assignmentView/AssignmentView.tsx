/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { GeneralTestGroupView } from './comps/GeneralTestGroupView';
import { StudentTableView } from './comps/StudentTableView';
import { AssignmentGroup } from '../../../code/interfaces/assignmentGroup';
import { fetchAssignment, fetchGroupsByAssignment } from '../../../store/assignment/actions';
import { Evaluation } from '../../../code/interfaces/evaluation';
import { fetchEvaluations } from '../../../store/evaluation/actions';
import { AssignmentViewMenu } from '../../../code/enums/assignmentViewMenu';
import { t } from '../../../code/helpers/translations';
import { Assignment } from '../../../code/interfaces/assignment';
import { Loader } from '../../shared/Loader';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleIcon from '@material-ui/icons/People';

export interface StateProps {
  assignmentGroups: AssignmentGroup[];
  evaluations: Evaluation[];
  assignment: Assignment | undefined;
}

export interface DispatchProps {
  fetchGroupsByAssignment: typeof fetchGroupsByAssignment;
  fetchEvaluations: typeof fetchEvaluations;
  fetchAssignment: typeof fetchAssignment;
}

type AssignmentViewProps = DispatchProps & StateProps;

const AssignmentViewComponent: React.FC<AssignmentViewProps> = ({
  assignmentGroups,
  fetchGroupsByAssignment,
  fetchEvaluations,
  evaluations,
  assignment,
  fetchAssignment,
}) => {
  const { assignmentId } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<AssignmentViewMenu>(AssignmentViewMenu.Stats);

  const handleMenuClick = (menuItem: AssignmentViewMenu) => {
    setSelectedMenuItem(menuItem);
  };

  useEffect(() => {
    fetchAssignment(assignmentId);
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
          <AssessmentIcon css={icon} />
          {t('assignmentView.stats')}
        </Button>
        <Button
          variant="contained"
          color={selectedMenuItem === AssignmentViewMenu.Students ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(AssignmentViewMenu.Students)}
        >
          <PeopleIcon css={icon} />
          {t('assignmentView.students')}
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
      {assignment ? (
        <Container maxWidth="lg" css={container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper css={paper}>
                <Grid container direction="column">
                  <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                    {t('assignmentView.assignment')}: {assignment.name}
                  </Typography>
                  {renderHorizontalMenu()}
                  {renderDataComponent()}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Loader />
      )}
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

const icon = css`
  margin-right: 10px;
`;
