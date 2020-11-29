/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled-base';
import { CircularProgress, Grid } from '@material-ui/core';

const LoaderComponent: React.FC = () => (
  <Grid container alignItems="center" justify="center" css={circularProgressWrapper}>
    <CircularProgress color="primary" />
  </Grid>
);

const StyledLoader = styled(LoaderComponent)``;

export const Loader = (props: any) => <StyledLoader {...props} />;

const circularProgressWrapper = css`
  margin-top: 50px;
  margin-bottom: 50px;
`;
