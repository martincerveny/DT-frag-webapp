/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, ButtonGroup, Grid, List, ListItem, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Assignment} from "../../../../code/interfaces/assignment";
import {Routes} from "../../../../code/routes";
import {colors} from "../../../../styles/colors";

export interface AssignmentListProps {
  assignments: Assignment[];
}

const AssignmentListComponent: React.FC<AssignmentListProps> = ({ assignments }) => {
  return (
    <div css={content}>
      <List component="nav" aria-label="main mailbox folders">
        {assignments.map((d: Assignment, index: number) => (
          <ListItem key={index}>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Button variant="text">
                <Link to={`${Routes.Assignments}/${d.id}`} css={linkName}>
                  {d.name}
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
                  <Button css={buttonWrapperPass(66)}>66%</Button>
                </Tooltip>
                <Tooltip title="Fail" placement="top">
                  <Button color="secondary" css={buttonWrapper(25)}>
                    25%
                  </Button>
                </Tooltip>
                <Tooltip title="Not submitted" placement="top">
                  <Button css={buttonWrapper(9)}>9%</Button>
                </Tooltip>
              </ButtonGroup>
              <Typography>25 days remaining</Typography>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const StyledAssignmentListComponent = styled(AssignmentListComponent)``;

export const AssignmentList = (props: any) => <StyledAssignmentListComponent {...props} />;

const buttonGroupWrapper = css`
  width: 400px;
`;

const linkName = css`
  color: ${colors.black};
  text-decoration: none;
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
    color: ${colors.green};
  `;
};

const content = css`
  margin: 20px;
`;
