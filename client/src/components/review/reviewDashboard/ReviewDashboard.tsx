/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { t } from '../../../code/helpers/translations';
import { Assignment } from '../../../code/interfaces/assignment';
import { fetchAssignments } from '../../../store/assignment/actions';
import { ReviewRequest } from '../../../code/interfaces/reviewRequest';
import { LoadingState } from '../../../code/enums/loading';
import { fetchReviewRequests } from '../../../store/review/actions';
import { Loader } from '../../shared/Loader';
import { Link } from 'react-router-dom';
import { Routes } from '../../../code/enums/routes';
import { colors } from '../../../styles/colors';

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
    <Grid item xs={6}>
      <Grid container direction="column" css={assignmentButtonsWrapper} justify="center" alignItems="flex-start">
        <Typography component="h3" variant="subtitle1" color="primary" gutterBottom css={subHeading}>
          Assignments
        </Typography>
        {assignments.map((a: Assignment, index: number) => (
          <Button
            key={index}
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
      <Grid item xs={6}>
        <Grid container direction="column" alignItems="flex-start" justify="flex-start">
          <Typography component="h3" variant="subtitle1" color="primary" gutterBottom css={subHeading}>
            Review requests
          </Typography>
          {selectedAssignment === null ? (
            <Grid item css={infoWrapper}>
              {t('review.selectAssignment')}
            </Grid>
          ) : reviewRequestsRequestState === LoadingState.Loading ? (
            <Loader />
          ) : reviewRequests.length > 0 ? (
            reviewRequests.map((rr: ReviewRequest, index: number) => (
              <Grid item css={studentNameWrapper} key={index}>
                <Link to={`${Routes.Reviews}/student/${rr.student}/assignment/${selectedAssignment}`} css={linkName}>
                  {rr.name}
                </Link>
              </Grid>
            ))
          ) : (
            <Grid item css={infoWrapper}>
              {t('app.noData')}
            </Grid>
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

const buttonWrapper = css`
  margin-bottom: 2px;
  min-width: 230px;
`;

const subHeading = css`
  margin-bottom: 15px;
`;

const infoWrapper = css`
  font-weight: bold;
`;

const linkName = css`
  color: ${colors.black};
  text-decoration: none;
  &:hover {
    text-decoration: underline !important;
    color: ${colors.blue} !important;
  }
`;

const studentNameWrapper = css`
  font-size: 16px;
  margin-bottom: 10px;
`;
