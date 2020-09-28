/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { colors } from '../../../../styles/colors';
import { AssignmentGroup } from '../../../../code/interfaces/assignmentGroup';
import { Evaluation } from '../../../../code/interfaces/evaluation';
import { removeArrayDuplicates } from '../../../../code/helpers';

interface GeneralTestGroupViewProps {
  assignmentGroups: AssignmentGroup[];
  evaluations: Evaluation[];
}

const GeneralTestGroupViewComponent: React.FC<GeneralTestGroupViewProps> = ({ assignmentGroups, evaluations }) => {
  const tests: Evaluation[] = removeArrayDuplicates(evaluations, ['group', 'name']);

  return (
    <div css={content}>
      {tests.length > 0 && (
        <List component="nav" aria-label="main mailbox folders">
          {assignmentGroups.map((ag: AssignmentGroup, index: any) => (
            <ListItem key={index}>
              <Grid container direction="column">
                <Typography variant="h6">{ag.group}</Typography>
                {tests.map((t: Evaluation, index) => {
                  if (t.group === ag.group) {
                    return (
                      <Grid key={index} container direction="row" justify="flex-start" alignItems="center">
                        <Button css={testNameButtonWrapper} variant="text">
                          <p>{t.name}</p>
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
                    );
                  }
                })}
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
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
  margin-left: 150px;
`;

const testNameButtonWrapper = css`
  width: 100px;
  height: 50px;
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
