/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Typography } from '@material-ui/core';
import { SeminarTable } from './SeminarTable';
import { Seminar } from '../../../code/interfaces/seminar';
import { fetchActivity, fetchAttendance, fetchEnrollments, setLoadingState } from '../../../store/seminar/actions';
import { Enrollment } from '../../../code/interfaces/enrollment';
import { Attendance } from '../../../code/interfaces/attendance';
import { Activity } from '../../../code/interfaces/activity';
import { AssignmentPassed } from '../../../code/interfaces/assignmentPassed';
import { LoadingState } from '../../../code/loading';

export interface SeminarContentProps {
  enrollments: Enrollment[];
  seminars: Seminar[];
  attendance: Attendance[];
  activity: Activity[];
  assignmentsPassed: AssignmentPassed[];
  fetchAttendance: typeof fetchAttendance;
  fetchActivity: typeof fetchActivity;
  fetchEnrollments: typeof fetchEnrollments;
  loadingState: LoadingState;
  setLoadingState: typeof setLoadingState;
}

const SeminarContentComponent: React.FC<SeminarContentProps> = ({
  enrollments,
  seminars,
  fetchEnrollments,
  attendance,
  fetchAttendance,
  activity,
  fetchActivity,
  assignmentsPassed,
  loadingState,
  setLoadingState,
}) => {
  useEffect(() => {
    const seminarIds = Array.prototype.map.call(seminars, s => s.id).toString();
    fetchEnrollments(seminarIds);
    fetchAttendance(seminarIds);
    fetchActivity();
  }, [seminars]);

  return (
    <div css={content}>
      {seminars.map((s: Seminar, index: number) => {
        return (
          <div key={index}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
              Seminar {s.name}
            </Typography>
            <SeminarTable
              fetchEnrollments={fetchEnrollments}
              enrollments={enrollments}
              seminars={seminars}
              attendance={attendance}
              currentSeminar={s.id}
              activity={activity}
              assignmentsPassed={assignmentsPassed}
              setLoadingState={setLoadingState}
              loadingState={loadingState}
            />
          </div>
        );
      })}
    </div>
  );
};

const StyledSeminarContent = styled(SeminarContentComponent)``;

export const SeminarContent = (props: any) => <StyledSeminarContent {...props} />;

const heading = css`
  margin: 20px;
`;

const content = css`
  margin: 20px;
`;
