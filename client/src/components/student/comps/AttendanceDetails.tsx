/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { getDateString, removeArrayDuplicatesByProp } from '../../../code/helpers/helpers';
import { StudentAttendance } from '../../../code/interfaces/studentAttendance';
import { t } from '../../../code/helpers/translations';
import { LoadingState } from '../../../code/enums/loading';
import { Loader } from '../../shared/Loader';
import { NoData } from '../../shared/NoData';

interface AttendanceDetailsProps {
  studentAttendance: StudentAttendance[];
  studentAttendanceRequestState: LoadingState;
}

const AttendanceDetailsComponent: React.FC<AttendanceDetailsProps> = ({
  studentAttendance,
  studentAttendanceRequestState,
}) => {
  const seminars = removeArrayDuplicatesByProp(studentAttendance, ['seminar_id']);

  return (
    <div css={content}>
      {studentAttendanceRequestState === LoadingState.Loading ? (
        <Loader />
      ) : seminars.length > 0 ? (
        seminars.map((s: StudentAttendance, seminarIndex: number) => {
          return (
            <Grid container direction="row" justify="space-between" alignItems="center" key={seminarIndex}>
              <List>
                <Typography variant="h6" color="primary">
                  {t('student.seminar')}: {s.seminar_name}
                </Typography>
                {studentAttendance.map((sa: StudentAttendance, saIndex: number) => {
                  if (sa.seminar_id === s.seminar_id) {
                    return (
                      <ListItem key={saIndex}>
                        <ListItemText primary={getDateString(sa.date)} />
                      </ListItem>
                    );
                  }
                  return null;
                })}
              </List>
            </Grid>
          );
        })
      ) : (
        <NoData />
      )}
    </div>
  );
};

const StyledAttendanceDetailsComponent = styled(AttendanceDetailsComponent)``;

export const AttendanceDetails = (props: any) => <StyledAttendanceDetailsComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;
