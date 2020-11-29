/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled-base';
import { Grid, IconButton, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { t } from '../../code/helpers/translations';

const TestDescriptionComponent: React.FC = () => (
  <Grid css={gridDescriptionWrapper} container direction="column" spacing={1}>
    <Typography component="h6" variant="h6">
      {t('student.tests')}
    </Typography>
    <Grid item>
      <IconButton aria-label="circle" size="small">
        <FiberManualRecordIcon fontSize="small" />
      </IconButton>
      <span css={descriptionWrapper}>{t('test.pass')}</span>
    </Grid>
    <Grid item>
      <IconButton aria-label="circle" size="small">
        <RadioButtonUncheckedIcon fontSize="small" />
      </IconButton>
      <span css={descriptionWrapper}>{t('test.fail')}</span>
    </Grid>
  </Grid>
);

const StyledTestDescription = styled(TestDescriptionComponent)``;

export const TestDescription: React.FC = () => <StyledTestDescription />;

const descriptionWrapper = css`
  margin-left: 10px;
`;

const gridDescriptionWrapper = css`
  margin-left: 2px;
`;
