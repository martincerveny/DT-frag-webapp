/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router';
import { Activity } from '../../../code/interfaces/activity';
import { fetchActivityByStudent } from '../../../store/student/actions';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { getDateString } from '../../../code/helpers/helpers';

interface ActivityListProps {
  activity: Activity[];
  fetchActivityByStudent: typeof fetchActivityByStudent;
}

const ActivityListComponent: React.FC<ActivityListProps> = ({ activity, fetchActivityByStudent }) => {
  const { studentId } = useParams();

  useEffect(() => {
    fetchActivityByStudent(studentId);
  }, []);

  return (
    <div css={content}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <List>
          {activity.map((a: Activity, index: number) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={a.points / 100 + ' point(s)'} secondary={getDateString(a.stamp)} />
                <ListItemText css={note} primary={a.note} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </div>
  );
};

const StyledActivityListComponent = styled(ActivityListComponent)``;

export const ActivityList = (props: any) => <StyledActivityListComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;

const note = css`
  margin-left: 150px;
`;
