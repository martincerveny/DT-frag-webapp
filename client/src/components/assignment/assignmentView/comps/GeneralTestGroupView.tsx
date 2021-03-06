/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { colors } from '../../../../styles/colors';
import { Evaluation } from '../../../../code/interfaces/evaluation';
import { getGroupByGroups, getPercents, removeArrayDuplicatesByProp } from '../../../../code/helpers/helpers';
import { Loader } from '../../../shared/Loader';
import { LoadingState } from '../../../../code/enums/loading';
import { NoData } from '../../../shared/NoData';
import { t } from '../../../../code/helpers/translations';

interface GeneralTestGroupViewProps {
  evaluations: Evaluation[];
  evaluationsRequestState: LoadingState;
}

const GeneralTestGroupViewComponent: React.FC<GeneralTestGroupViewProps> = ({
  evaluations,
  evaluationsRequestState,
}) => {
  const tests: Evaluation[] = removeArrayDuplicatesByProp(evaluations, ['group', 'name']).sort(
    (s1: Evaluation, s2: Evaluation) => Number(s1.sequence) - Number(s2.sequence),
  );

  const renderStatsButtonGroup = (passedPercents: number, failedPercents: number) => {
    return (
      <ButtonGroup
        disableRipple
        disableFocusRipple
        variant="contained"
        aria-label="outlined primary button group"
        css={buttonGroupWrapper}
      >
        <Tooltip title={t('tooltip.pass')} placement="top">
          <Button color="primary" css={buttonWrapperPass(passedPercents)}>
            {passedPercents} %
          </Button>
        </Tooltip>
        <Tooltip title={t('tooltip.fail')} placement="top">
          <Button color="secondary" css={buttonWrapper(failedPercents)}>
            {failedPercents} %
          </Button>
        </Tooltip>
      </ButtonGroup>
    );
  };

  /**
   * Count passed / failed evaluations in percents
   */
  const getStatPercents = (test: string, group: string) => {
    const passedTestEvaluations = evaluations.filter(
      (e: Evaluation) => e.group === group && e.name === test && e.passed,
    );

    const failedTestEvaluations = evaluations.filter(
      (e: Evaluation) => e.group === group && e.name === test && !e.passed,
    );

    const allEvaluations = passedTestEvaluations.length + failedTestEvaluations.length;
    const passedPercents = getPercents(passedTestEvaluations.length, allEvaluations);
    const failedPercents = getPercents(failedTestEvaluations.length, allEvaluations);

    return { passedPercents, failedPercents };
  };

  return (
    <div css={content}>
      {evaluationsRequestState === LoadingState.Loading ? (
        <Loader />
      ) : (
        <List component="nav" aria-label="main mailbox folders">
          {tests.length > 0 ? (
            getGroupByGroups(tests).map((ag: string, index: any) => {
              // stats for the group
              const groupPercents = getStatPercents('group', ag);

              return (
                <ListItem key={index} css={groupWrapper}>
                  <Grid container direction="column">
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Typography css={groupHeading} variant="h6">
                        {ag}
                      </Typography>
                      {!isNaN(groupPercents.passedPercents) &&
                        !isNaN(groupPercents.failedPercents) &&
                        renderStatsButtonGroup(groupPercents.passedPercents, groupPercents.failedPercents)}
                    </Grid>

                    {tests.map((t: Evaluation, index) => {
                      if (t.group === ag && t.name !== 'group') {
                        // stats for tests
                        const percents = getStatPercents(t.name, ag);
                        return (
                          <Grid key={index} container direction="row" justify="flex-start" alignItems="center">
                            <Button css={testNameButtonWrapper} variant="text">
                              <p>{t.name}</p>
                            </Button>
                            {renderStatsButtonGroup(percents.passedPercents, percents.failedPercents)}
                          </Grid>
                        );
                      }
                      return null;
                    })}
                  </Grid>
                </ListItem>
              );
            })
          ) : (
            <NoData />
          )}
        </List>
      )}
    </div>
  );
};

const StyledGeneralTestGroupViewComponent = styled(GeneralTestGroupViewComponent)``;

export const GeneralTestGroupView = (props: any) => <StyledGeneralTestGroupViewComponent {...props} />;

const content = css`
  margin: 20px 10px;
`;

const buttonGroupWrapper = css`
  width: 600px;
  margin-left: 150px;
`;

const groupWrapper = css`
  margin-top: 30px;
`;

const testNameButtonWrapper = css`
  width: 100px;
  height: 50px;
`;

const groupHeading = css`
  width: 100px;
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
    &:hover {
      background-color: ${colors.darkGreen} !important;
    }
  `;
};
