/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Assignment } from '../../../../code/interfaces/assignment';
import { Routes } from '../../../../code/routes';
import { colors } from '../../../../styles/colors';
import { getPercents, getRemainingDays } from '../../../../code/helpers';
import { AssignmentArray } from '../../../../code/interfaces/assignmentArray';
import { AuthorAssignment } from '../../../../code/interfaces/authorAssignment';
import { Enrollment } from '../../../../code/interfaces/enrollment';
import {Loader} from "../../../shared/Loader";

export interface AssignmentListProps {
  assignments: Assignment[];
  authorAssignments: AssignmentArray | undefined;
  allEnrollments: Enrollment[];
}

const AssignmentListComponent: React.FC<AssignmentListProps> = ({ assignments, authorAssignments, allEnrollments }) => {
  return (
    <div css={content}>
      {assignments && authorAssignments ? (
        <List component="nav" aria-label="main mailbox folders">
          {assignments.map((a: Assignment, index: number) => {
            const studentsPassed =
              authorAssignments &&
              authorAssignments.assignmentsPassed.filter((i: AuthorAssignment) => {
                if (i.assignment_id === a.id) {
                  return i;
                }
              });

            const studentsNotPassed =
              authorAssignments &&
              authorAssignments.assignmentsNotPassed.filter((i: AuthorAssignment) => {
                if (i.assignment_id === a.id) {
                  return i;
                }
              });

            let studentsPassedPercent = studentsPassed && getPercents(studentsPassed.length, allEnrollments.length);
            let studentsNotPassedPercent =
              studentsNotPassed && getPercents(studentsNotPassed.length, allEnrollments.length);

            studentsPassedPercent = studentsPassedPercent ?? 0;
            studentsNotPassedPercent = studentsNotPassedPercent ?? 0;
            const studentsNotSubmittedPercent = 100 - studentsPassedPercent - studentsNotPassedPercent;

            return (
              <ListItem key={index}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                  <Button variant="text">
                    <Link to={`${Routes.Assignments}/${a.id}`} css={linkName}>
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
                    <Tooltip title="Pass" placement="top">
                      <Button css={buttonWrapperPass(studentsPassedPercent)}>{studentsPassedPercent} %</Button>
                    </Tooltip>
                    <Tooltip title="Fail" placement="top">
                      <Button color="secondary" css={buttonWrapper(studentsNotPassedPercent)}>
                        <Grid container direction="row">
                          {studentsNotPassedPercent} %
                        </Grid>
                      </Button>
                    </Tooltip>
                    <Tooltip title="Not submitted" placement="top">
                      <Button css={buttonWrapper(studentsNotSubmittedPercent)}>{studentsNotSubmittedPercent} %</Button>
                    </Tooltip>
                  </ButtonGroup>
                  <Typography>{getRemainingDays(a.end)}</Typography>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      ) : <Loader/>}
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
