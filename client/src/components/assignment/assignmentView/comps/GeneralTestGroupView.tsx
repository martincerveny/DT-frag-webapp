/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { colors } from '../../../../styles/colors';

const GeneralTestGroupViewComponent: React.FC = () => {
  const tests: any = [
    {
      name: 'subtest1',
    },
    {
      name: 'subtest2',
    },
    {
      name: 'subtest3',
    },
  ];
  return (
    <div css={content}>
      <List component="nav" aria-label="main mailbox folders">
        {tests.map((t: any, index: any) => (
          <ListItem key={index}>
            <Grid container direction="column">
              <Typography variant="h6">Test group {index}</Typography>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Button variant="text">
                  <p> {t.name}</p>
                </Button>
                <ButtonGroup
                  disableRipple
                  disableFocusRipple
                  variant="contained"
                  aria-label="outlined primary button group"
                  css={buttonGroupWrapper}
                >
                  <Tooltip title="Pass" placement="top">
                    <Button css={buttonWrapperPass(40)}>40%</Button>
                  </Tooltip>
                  <Tooltip title="Fail" placement="top">
                    <Button color="secondary" css={buttonWrapper(60)}>
                      60%
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const StyledGeneralTestGroupViewComponent = styled(GeneralTestGroupViewComponent)``;

export const GeneralTestGroupView = (props: any) => <StyledGeneralTestGroupViewComponent {...props} />;

const content = css`
  margin: 10px;
`;

const buttonGroupWrapper = css`
  width: 400px;
  margin-left: 100px;
`;

const buttonWrapper = (size: number) => {
  return css`
    width: ${size * 4}px;
    height: 40px;
  `;
};

const buttonWrapperPass = (size: number) => {
  return css`
    width: ${size * 4}px;
    height: 40px;
    background-color: ${colors.green};
  `;
};
