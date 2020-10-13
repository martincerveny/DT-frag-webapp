/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled-base';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoaderComponent: React.FC = () => (
  <Grid container alignItems="center" justify="center" css={circularProgressWrapper}>
    <CircularProgress color="primary" />
  </Grid>
);

const StyledLoader = styled(LoaderComponent)``;

const circularProgressWrapper = css`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const Loader: React.FC = () => <StyledLoader />;
