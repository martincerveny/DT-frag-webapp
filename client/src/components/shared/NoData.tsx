/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled-base';
import { Grid } from '@material-ui/core';
import { t } from '../../code/helpers/translations';

const NoDataComponent: React.FC = () => (
  <Grid container alignItems="center" justify="center" css={noDataWrapper}>
    {t('app.noData')}
  </Grid>
);

const StyledNoData = styled(NoDataComponent)``;

const noDataWrapper = css`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const NoData: React.FC = () => <StyledNoData />;
