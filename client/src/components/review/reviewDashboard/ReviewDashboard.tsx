/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { t } from '../../../code/helpers/translations';
import { Assignment } from '../../../code/interfaces/assignment';
import { fetchAssignments } from '../../../store/assignment/actions';
import { colors } from '../../../styles/colors';
import { ReviewRequest } from '../../../code/interfaces/reviewRequest';
import { LoadingState } from '../../../code/enums/loading';
import { fetchReviewRequests } from '../../../store/review/actions';
import { Loader } from '../../shared/Loader';
import { NoData } from '../../shared/NoData';

export interface StateProps {
  assignments: Assignment[];
  reviewRequests: ReviewRequest[];
  reviewRequestsRequestState: LoadingState;
}

export interface DispatchProps {
  fetchAssignments: typeof fetchAssignments;
  fetchReviewRequests: typeof fetchReviewRequests;
}

type ReviewDashboardProps = DispatchProps & StateProps;

const ReviewDashboardComponent: React.FC<ReviewDashboardProps> = ({
  fetchAssignments,
  assignments,
  fetchReviewRequests,
  reviewRequestsRequestState,
  reviewRequests,
}) => {
  const [selectedAssignment, setSelectedAssignment] = React.useState<number | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleSelectAssignmentClick = (id: number) => {
    fetchReviewRequests(id);
    setSelectedAssignment(id);
  };

  const renderAssignmentButtons = (
    <Grid item xs={4}>
      <Grid container direction="column" css={assignmentButtonsWrapper} justify="center" alignItems="flex-start">
        {assignments.map((a: Assignment) => (
          <Button
            color={selectedAssignment === a.id ? 'primary' : 'default'}
            disableElevation
            variant="contained"
            css={buttonWrapper}
            onClick={() => handleSelectAssignmentClick(a.id)}
          >
            {a.name}
          </Button>
        ))}
      </Grid>
    </Grid>
  );

  const renderReviewRequests = () => {
    return (
      <Grid item xs={8}>
        <Grid container direction="column" alignItems="center" justify="center">
          {selectedAssignment === null ? (
            t('review.selectAssignment')
          ) : reviewRequestsRequestState === LoadingState.Loading ? (
            <Loader />
          ) : reviewRequests.length > 0 ? (
            reviewRequests.map((rr: ReviewRequest) => <div>{rr.name}</div>)
          ) : (
            <NoData />
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <div css={root}>
      <Container maxWidth="lg" css={container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper css={paper}>
              <Grid container direction="column">
                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                  {t('review.dashboard')}
                </Typography>
                <Grid container direction="row">
                  {renderAssignmentButtons}
                  {renderReviewRequests()}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const StyledReviewDashboard = styled(ReviewDashboardComponent)``;

export const ReviewDashboard = (props: any) => <StyledReviewDashboard {...props} />;

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

const assignmentButtonsWrapper = css`
  padding-left: 20px;
  margin-bottom: 50px;
`;

const linkName = css`
  color: ${colors.white};
  text-decoration: none;
`;

const buttonWrapper = css`
  margin-bottom: 2px;
  min-width: 190px;
`;
