/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Review } from '../../../../code/interfaces/review';
import { LoadingState } from '../../../../code/enums/loading';
import { NoData } from '../../../shared/NoData';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { t } from '../../../../code/helpers/translations';
import { Annotation } from '../../../../code/interfaces/annotation';
import { ReviewTableRow } from './ReviewTableRow';
import { Loader } from '../../../shared/Loader';

export interface ReviewTableProps {
  review: Review;
  annotations: Annotation[];
  annotationsRequestState: LoadingState;
}

const ReviewTableComponent: React.FC<ReviewTableProps> = ({ review, annotations, annotationsRequestState }) => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
  const filteredAnnotations = annotations.filter((a: Annotation) => a.review_id === review.review_id);

  const handleClick = (rowIndex: number | null) => {
    if (selectedRowIndex === rowIndex) {
      setSelectedRowIndex(null);
    } else {
      setSelectedRowIndex(rowIndex);
    }
  };

  return (
    <div css={tableWrapper}>
      {annotationsRequestState === LoadingState.Loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('review.file')}</TableCell>
                <TableCell>{t('review.line')}</TableCell>
                <TableCell>{t('review.note')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAnnotations.length > 0 ? (
                filteredAnnotations.map((fa: Annotation, rowIndex: number) => {
                  return (
                    <ReviewTableRow
                      key={rowIndex}
                      file={fa.name}
                      data={fa.data}
                      line={fa.line}
                      note={fa.note}
                      rowIndex={rowIndex}
                      selectedRowIndex={selectedRowIndex}
                      handleClick={() => handleClick(rowIndex)}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const StyledReviewTable = styled(ReviewTableComponent)``;

export const ReviewTable = (props: any) => <StyledReviewTable {...props} />;

const tableWrapper = css`
  margin: 20px;
  margin-bottom: 100px;
`;
