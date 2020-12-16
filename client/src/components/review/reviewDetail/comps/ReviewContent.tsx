/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Review } from '../../../../code/interfaces/review';
import { LoadingState } from '../../../../code/enums/loading';
import { Typography } from '@material-ui/core';
import { t } from '../../../../code/helpers/translations';
import { Annotation } from '../../../../code/interfaces/annotation';
import { fetchAnnotations } from '../../../../store/review/actions';
import { ReviewTable } from './ReviewTable';
import { getDateString } from '../../../../code/helpers/helpers';

export interface ReviewContentProps {
  reviews: Review[];
  annotations: Annotation[];
  annotationsRequestState: LoadingState;
  fetchAnnotations: typeof fetchAnnotations;
}

const ReviewContentComponent: React.FC<ReviewContentProps> = ({
  reviews,
  annotations,
  fetchAnnotations,
  annotationsRequestState,
}) => {
  useEffect(() => {
    const reviewIds = Array.prototype.map.call(reviews, (r: Review) => r.review_id).toString();
    console.log(reviewIds);
    fetchAnnotations(reviewIds);
  }, [reviews, fetchAnnotations]);

  return (
    <div>
      {reviews.map((r: Review, index: number) => (
        <div key={index}>
          <Typography component="h3" variant="subtitle2" color="primary" gutterBottom css={heading}>
            {t('review.author')}: {r.review_author_name}
          </Typography>
          <Typography component="h3" variant="subtitle2" color="primary" gutterBottom css={secondHeading}>
            {t('review.date')}: {getDateString(r.review_created)}
          </Typography>
          <ReviewTable review={r} annotations={annotations} annotationsRequestState={annotationsRequestState} />
        </div>
      ))}
    </div>
  );
};

const StyledReviewContent = styled(ReviewContentComponent)``;

export const ReviewContent = (props: any) => <StyledReviewContent {...props} />;

const heading = css`
  margin-top: 20px;
  margin-left: 20px;
`;

const secondHeading = css`
  margin-left: 20px;
`;
