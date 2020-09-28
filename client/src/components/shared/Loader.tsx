/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled-base';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingState } from '../../code/loading';

const Spinner: React.FC = () => (
  <Grid container alignItems="center" justify="center" css={circularProgressWrapper}>
    <CircularProgress color="primary" />
  </Grid>
);

interface LoaderProps {
  loadingState: LoadingState;
}

const LoaderComponent: React.FC<LoaderProps> = props => (
  <div>
    {props.loadingState === LoadingState.Success && props.children}
    {props.loadingState === LoadingState.Loading && <Spinner />}
  </div>
);

const StyledLoader = styled(LoaderComponent)``;

const circularProgressWrapper = css`
  margin-top: 50px;
  margin-bottom: 50px;
`;
export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => <StyledLoader {...props} />;
