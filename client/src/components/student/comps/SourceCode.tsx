/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router';
import { Grid, List } from '@material-ui/core';
import { fetchSubmissionFilesByStudent } from '../../../store/student/actions';
import { StudentFile } from '../../../code/interfaces/studentFile';

interface SourceCodeProps {
  fetchSubmissionFilesByStudent: typeof fetchSubmissionFilesByStudent;
  studentFiles: StudentFile[];
}

const SourceCodeComponent: React.FC<SourceCodeProps> = ({ studentFiles, fetchSubmissionFilesByStudent }) => {
  const { studentId } = useParams();

  useEffect(() => {
    fetchSubmissionFilesByStudent(studentId);
  }, []);

  return (
    <div css={content}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <List></List>
      </Grid>
    </div>
  );
};

const StyledSourceCodeComponent = styled(SourceCodeComponent)``;

export const SourceCode = (props: any) => <StyledSourceCodeComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;

const note = css`
  margin-left: 150px;
`;
