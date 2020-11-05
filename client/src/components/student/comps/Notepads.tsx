/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router';
import { Grid, List, ListItem } from '@material-ui/core';

interface NotepadsProps {}

const NotepadsComponent: React.FC<NotepadsProps> = () => {
  const { studentId } = useParams();

  return (
    <div css={content}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <List>
          <ListItem>{studentId}</ListItem>
        </List>
      </Grid>
    </div>
  );
};

const StyledNotepadsComponent = styled(NotepadsComponent)``;

export const Notepads = (props: any) => <StyledNotepadsComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;
