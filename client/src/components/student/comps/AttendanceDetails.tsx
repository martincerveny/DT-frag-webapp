/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router';
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { getDateString, removeArrayDuplicatesByProp } from '../../../code/helpers';
import { StudentAttendance } from '../../../code/interfaces/studentAttendance';
import { fetchAttendanceByStudent } from '../../../store/student/actions';

interface AttendanceDetailsProps {
  studentAttendance: StudentAttendance[];
  fetchAttendanceByStudent: typeof fetchAttendanceByStudent;
}

const AttendanceDetailsComponent: React.FC<AttendanceDetailsProps> = ({
  studentAttendance,
  fetchAttendanceByStudent,
}) => {
  const { studentId } = useParams();
  const seminars = removeArrayDuplicatesByProp(studentAttendance, ['seminar_id']);
  useEffect(() => {
    fetchAttendanceByStudent(studentId);
  }, []);

  return (
    <div css={content}>
      {seminars.map((s: StudentAttendance, seminarIndex: number) => {
        return (
          <Grid container direction="row" justify="space-between" alignItems="center" key={seminarIndex}>
            <List>
              <Typography variant="h6" color="primary">
                Seminar: {s.seminar_name}
              </Typography>
              {studentAttendance.map((sa: StudentAttendance, saIndex: number) => {
                if (sa.seminar_id === s.seminar_id) {
                  return (
                    <ListItem key={saIndex}>
                      <ListItemText primary={getDateString(sa.date)} />
                    </ListItem>
                  );
                }
              })}
            </List>
          </Grid>
        );
      })}
    </div>
  );
};

const StyledAttendanceDetailsComponent = styled(AttendanceDetailsComponent)``;

export const AttendanceDetails = (props: any) => <StyledAttendanceDetailsComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;
