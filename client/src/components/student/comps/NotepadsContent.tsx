/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router';
import { Notepads } from '../../../code/interfaces/notepads';
import { fetchNotepadsByStudent } from '../../../store/student/actions';
import { Loader } from '../../shared/Loader';
import { PadAssignmentsTable } from './PadAssignmentsTable';
import { PadMiscTable } from './PadMiscTable';

interface NotepadsProps {
  notepads: Notepads | undefined;
  fetchNotepadsByStudent: typeof fetchNotepadsByStudent;
}

const NotepadsContentComponent: React.FC<NotepadsProps> = ({ notepads, fetchNotepadsByStudent }) => {
  const { studentId } = useParams();

  useEffect(() => {
    fetchNotepadsByStudent(studentId);
  }, []);

  return (
    <div css={content}>
      {notepads ? (
        <div>
          <PadAssignmentsTable notepads={notepads} />
          <PadMiscTable notepads={notepads} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const StyledNotepadsContentComponent = styled(NotepadsContentComponent)``;

export const NotepadsContent = (props: any) => <StyledNotepadsContentComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;
