/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { colors } from '../../../../styles/colors';
import { AssignmentGroup } from '../../../../code/interfaces/assignmentGroup';
import { Evaluation } from '../../../../code/interfaces/evaluation';
import { getPercents, removeArrayDuplicatesByProp } from '../../../../code/helpers';

interface GeneralTestGroupViewProps {
  assignmentGroups: AssignmentGroup[];
  evaluations: Evaluation[];
}

const GeneralTestGroupViewComponent: React.FC<GeneralTestGroupViewProps> = ({ assignmentGroups, evaluations }) => {
  const tests: Evaluation[] = removeArrayDuplicatesByProp(evaluations, ['group', 'name']);

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
                    const passedTestEvaluations = evaluations.filter((e: Evaluation) => {
                      return e.group === ag.group && e.name === t.name && e.passed;
                    });

                    const failedTestEvaluations = evaluations.filter((e: Evaluation) => {
                      return e.group === ag.group && e.name === t.name && !e.passed;
                    });

                    const allEvaluations = passedTestEvaluations.length + failedTestEvaluations.length;
                    const passedPercents = getPercents(passedTestEvaluations.length, allEvaluations);
                    const failedPercents = getPercents(failedTestEvaluations.length, allEvaluations);

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
                            <Button css={buttonWrapperPass(passedPercents)}>{passedPercents} %</Button>
                          </Tooltip>
                          <Tooltip title="Fail" placement="top">
                            <Button color="secondary" css={buttonWrapper(failedPercents)}>
                              {failedPercents} %
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
  margin: 50px 10px;
`;

const buttonGroupWrapper = css`
  width: 600px;
  margin-left: 150px;
`;

const testNameButtonWrapper = css`
  width: 100px;
  height: 50px;
`;

const buttonWrapper = (size: number) => {
  return css`
    width: ${size * 4}%;
    min-width: 60px;
    height: 40px;
  `;
};

const buttonWrapperPass = (size: number) => {
  return css`
    width: ${size * 4}%;
    min-width: 60px;
    height: 40px;
    background-color: ${colors.green};
  `;
};
