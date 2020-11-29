/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Notepads } from '../../../code/interfaces/notepads';
import { Loader } from '../../shared/Loader';
import { PadAssignmentsTable } from './PadAssignmentsTable';
import { PadMiscTable } from './PadMiscTable';
import { LoadingState } from '../../../code/enums/loading';
import { NoData } from '../../shared/NoData';

interface NotepadsProps {
  notepads: Notepads | undefined;
  studentNotepadsRequestState: LoadingState;
}

const NotepadsContentComponent: React.FC<NotepadsProps> = ({ notepads, studentNotepadsRequestState }) => {
  return (
    <div css={content}>
      {studentNotepadsRequestState === LoadingState.Loading ? (
        <Loader />
      ) : notepads ? (
        <div>
          <PadAssignmentsTable notepads={notepads} />
          <PadMiscTable notepads={notepads} />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

const StyledNotepadsContentComponent = styled(NotepadsContentComponent)``;

export const NotepadsContent = (props: any) => <StyledNotepadsContentComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;
