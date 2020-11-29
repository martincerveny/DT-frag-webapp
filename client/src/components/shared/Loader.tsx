/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled-base';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingState } from '../../code/enums/loading';

interface LoaderProps {
  requestState: LoadingState;
}

export const Spinner: React.FC = () => (
  <Grid container alignItems="center" justify="center" css={circularProgressWrapper}>
    <CircularProgress color="primary" />
  </Grid>
);

const LoaderComponent: React.FC<LoaderProps> = ({ requestState }) => (
  <div>{requestState === LoadingState.Loading && <Spinner />}</div>
);

const StyledLoader = styled(LoaderComponent)``;

export const Loader = (props: any) => <StyledLoader {...props} />;

const circularProgressWrapper = css`
  margin-top: 50px;
  margin-bottom: 50px;
`;
