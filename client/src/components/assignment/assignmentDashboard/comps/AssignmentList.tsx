/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Assignment } from '../../../../code/interfaces/assignment';
import { Routes } from '../../../../code/enums/routes';
import { colors } from '../../../../styles/colors';
import { getPercents, getRemainingDays } from '../../../../code/helpers/helpers';
import { AuthorAssignment } from '../../../../code/interfaces/authorAssignment';
import { Enrollment } from '../../../../code/interfaces/enrollment';
import { Loader } from '../../../shared/Loader';
import { t } from '../../../../code/helpers/translations';

export interface AssignmentListProps {
  assignments: Assignment[];
  passedAssignments: AuthorAssignment[];
  failedAssignments: AuthorAssignment[];
  allEnrollments: Enrollment[];
}

const AssignmentListComponent: React.FC<AssignmentListProps> = ({
  assignments,
  passedAssignments,
  failedAssignments,
  allEnrollments,
}) => {
  const countStats = (a: Assignment) => {
    const studentsPassed = passedAssignments.filter((i: AuthorAssignment) => i.assignment_id === a.id);
    const studentsNotPassed = failedAssignments.filter((i: AuthorAssignment) => i.assignment_id === a.id);
    const studentsPassedPercent = studentsPassed ? getPercents(studentsPassed.length, allEnrollments.length) : 0;
    const studentsNotPassedPercent = studentsNotPassed
      ? getPercents(studentsNotPassed.length, allEnrollments.length)
      : 0;
    const studentsNotSubmittedPercent = 100 - studentsPassedPercent - studentsNotPassedPercent;

    return { studentsPassedPercent, studentsNotPassedPercent, studentsNotSubmittedPercent };
  };

  return (
    <div css={content}>
      {assignments && allEnrollments ? (
        <List component="nav" aria-label="main mailbox folders">
          {assignments.map((a: Assignment, index: number) => {
            const stats = countStats(a);
            return (
              <ListItem key={index}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Button variant="text">
                    <Link to={`${Routes.Assignment}/${a.id}`} css={linkName}>
                      {a.name}
                    </Link>
                  </Button>

                  <ButtonGroup
                    disableRipple
                    disableFocusRipple
                    variant="outlined"
                    aria-label="outlined primary button group"
                    css={buttonGroupWrapper}
                  >
                    <Tooltip title={t('tooltip.pass')} placement="top">
                      <Button css={buttonWrapperPass(stats.studentsPassedPercent)}>
                        {stats.studentsPassedPercent} %
                      </Button>
                    </Tooltip>
                    <Tooltip title={t('tooltip.fail')} placement="top">
                      <Button color="secondary" css={buttonWrapper(stats.studentsNotPassedPercent)}>
                        <Grid container direction="row">
                          {stats.studentsNotPassedPercent} %
                        </Grid>
                      </Button>
                    </Tooltip>
                    <Tooltip title={t('tooltip.notSubmitted')} placement="top">
                      <Button css={buttonWrapper(stats.studentsNotSubmittedPercent)}>
                        {stats.studentsNotSubmittedPercent} %
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                  <Typography>{a.end ? getRemainingDays(a.end) : ''}</Typography>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const StyledAssignmentListComponent = styled(AssignmentListComponent)``;

export const AssignmentList = (props: any) => <StyledAssignmentListComponent {...props} />;

const buttonGroupWrapper = css`
  width: 500px;
`;

const linkName = css`
  color: ${colors.black};
  text-decoration: none;
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
    height: 40px;
    min-width: 60px;
    color: ${colors.green};
  `;
};

const content = css`
  margin: 20px;
`;
