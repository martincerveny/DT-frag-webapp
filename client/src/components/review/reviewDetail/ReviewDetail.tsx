/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Container, Grid, Paper, TableContainer, Typography } from '@material-ui/core';
import { t } from '../../../code/helpers/translations';
import { Person } from '../../../code/interfaces/person';
import { fetchStudent } from '../../../store/student/actions';
import { useParams } from 'react-router';
import { LoadingState } from '../../../code/enums/loading';
import { Loader } from '../../shared/Loader';
import { Review } from '../../../code/interfaces/review';
import { fetchAnnotations, fetchReviews } from '../../../store/review/actions';
import { Assignment } from '../../../code/interfaces/assignment';
import { fetchAssignment } from '../../../store/assignment/actions';
import { ReviewTable } from './comps/ReviewTable';
import { NoData } from '../../shared/NoData';
import { Annotation } from '../../../code/interfaces/annotation';
import { ReviewContent } from './comps/ReviewContent';

export interface StateProps {
  student: Person | undefined;
  studentRequestState: LoadingState;
  reviews: Review[];
  reviewsRequestState: LoadingState;
  assignment: Assignment | undefined;
  assignmentRequestState: LoadingState;
  annotations: Annotation[];
  annotationsRequestState: LoadingState;
}

export interface DispatchProps {
  fetchStudent: typeof fetchStudent;
  fetchReviews: typeof fetchReviews;
  fetchAssignment: typeof fetchAssignment;
  fetchAnnotations: typeof fetchAnnotations;
}

type ReviewDetailProps = DispatchProps & StateProps;

const ReviewDetailComponent: React.FC<ReviewDetailProps> = ({
  student,
  fetchStudent,
  studentRequestState,
  fetchReviews,
  reviews,
  reviewsRequestState,
  fetchAssignment,
  assignment,
  assignmentRequestState,
  annotations,
  annotationsRequestState,
  fetchAnnotations,
}) => {
  const { studentId, assignmentId } = useParams();

  useEffect(() => {
    fetchStudent(studentId);
    fetchAssignment(assignmentId);
    fetchReviews(studentId, assignmentId);
  }, [fetchStudent, fetchReviews, fetchAssignment, studentId, assignmentId]);

  return (
    <div css={root}>
      {studentRequestState === LoadingState.Loading || assignmentRequestState === LoadingState.Loading ? (
        <Loader />
      ) : (
        student &&
        assignment && (
          <Container maxWidth="lg" css={container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper css={paper}>
                  <Grid container direction="column">
                    <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                      {t('review.reviewsStudent')}: {student.name} ({student.login})
                    </Typography>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom css={secondHeading}>
                      {t('assignmentView.assignment')}: {assignment.name}
                    </Typography>
                    {reviewsRequestState === LoadingState.Loading ? (
                      <Loader />
                    ) : reviews.length > 0 ? (
                      <ReviewContent
                        reviews={reviews}
                        annotations={annotations}
                        annotationsRequestState={annotationsRequestState}
                        fetchAnnotations={fetchAnnotations}
                      />
                    ) : (
                      <NoData />
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )
      )}
    </div>
  );
};

const StyledReviewDetail = styled(ReviewDetailComponent)``;

export const ReviewDetail = (props: any) => <StyledReviewDetail {...props} />;

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
  margin-top: 20px;
  margin-left: 20px;
`;

const secondHeading = css`
  margin-left: 20px;
`;
