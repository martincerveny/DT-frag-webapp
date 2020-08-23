/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  return (
    <div>
      <Paper>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/assignments">Assignments</Link>
          </li>
        </ul>
      </Paper>
    </div>
  );
};

const StyledHome = styled(HomeComponent)``;

export const Home = (props: any) => <StyledHome {...props} />;
