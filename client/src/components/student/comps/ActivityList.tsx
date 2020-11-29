/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Activity } from '../../../code/interfaces/activity';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { getDateString } from '../../../code/helpers/helpers';
import { LoadingState } from '../../../code/enums/loading';
import { Loader } from '../../shared/Loader';
import { NoData } from '../../shared/NoData';

interface ActivityListProps {
  activity: Activity[];
  studentActivityRequestState: LoadingState;
}

const ActivityListComponent: React.FC<ActivityListProps> = ({ activity, studentActivityRequestState }) => {
  return (
    <div css={content}>
      {studentActivityRequestState === LoadingState.Loading ? (
        <Loader />
      ) : activity.length > 0 ? (
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
      ) : (
        <NoData />
      )}
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
