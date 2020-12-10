/** @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import React, { useContext } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/colors';
import { Routes } from '../../code/enums/routes';
import { t } from '../../code/helpers/translations';
import { ExitToApp } from '@material-ui/icons';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import { UserContext } from '../../App';
import CommentIcon from '@material-ui/icons/Comment';

interface MenuBarProps {
  handleUserLogOut: () => void;
}

const MenuBarComponent: React.FC<MenuBarProps> = ({ handleUserLogOut }) => {
  const loggedUser = useContext(UserContext);

  return (
    <div css={appBar}>
      <AppBar position="static">
        <Toolbar>
          <div css={dashboardTitleWrapper}>
            <Link to={Routes.Home} css={title}>
              <Typography variant="h6">{t('menuBar.dashboard')}</Typography>
            </Link>
          </div>
          <div css={menuItemWrapper}>
            <Link to={Routes.Home} css={title}>
              <Button color="inherit">
                <AssignmentIcon />
                <span css={buttonText}>{t('menuBar.assignments')}</span>
              </Button>
            </Link>
          </div>
          <div css={menuItemWrapper}>
            <Link to={Routes.Seminars} css={title}>
              <Button color="inherit">
                <GroupIcon />
                <span css={buttonText}>{t('menuBar.seminars')}</span>
              </Button>
            </Link>
          </div>
          <div css={lastMenuItemWrapper}>
            <Link to={Routes.Reviews} css={title}>
              <Button color="inherit">
                <CommentIcon />
                <span css={buttonText}>{t('menuBar.reviews')}</span>
              </Button>
            </Link>
          </div>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true">
            <AccountCircleIcon />
            <span css={buttonText}>{loggedUser!.name}</span>
          </Button>
          <IconButton aria-label="circle" size="small" css={logoutButton} onClick={() => handleUserLogOut()}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const MenuBarStyled = styled(MenuBarComponent)``;

export const MenuBar = (props: any) => <MenuBarStyled {...props} />;

const appBar = css`
  flex-grow: 1;
`;

const menuItemWrapper = css`
  margin-left: 10px;
`;
const lastMenuItemWrapper = css`
  margin-left: 10px;
  flex-grow: 1;
`;

const title = css`
  color: ${colors.white};
  text-decoration: none;
`;

const buttonText = css`
  margin-left: 5px;
  margin-right: 5px;
`;

const dashboardTitleWrapper = css`
  margin-right: 30px;
`;

const logoutButton = css`
  color: ${colors.white};
`;
