/** @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import React from 'react';
import { AppBar, Button, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/colors';
import { Routes } from '../../code/interfaces/routes';

const MenuBarComponent: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElRole, setAnchorElRole] = React.useState(null);

  const handleClickChangeRole = (event: any) => {
    setAnchorElRole(event.currentTarget);
  };

  const handleCloseChangeRole = () => {
    setAnchorElRole(null);
  };

  const handleClickUser = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  return (
    <div css={appBar}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <Link to={Routes.Home} css={title}>
              <Typography variant="h6">Dashboard</Typography>
            </Link>
          </div>
          <div css={menuItemWrapper}>
            <Link to={Routes.Home} css={title}>
              <Button color="inherit">
                <span css={buttonText}>Assignments</span>
              </Button>
            </Link>
          </div>
          <div css={lastMenuItemWrapper}>
            <Link to={Routes.Seminars} css={title}>
              <Button color="inherit">
                <span css={buttonText}>Seminars</span>
              </Button>
            </Link>
          </div>
          <Tooltip title="Change role">
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickChangeRole}>
              <SettingsIcon />
              <span css={buttonText}>Vedu cvičení</span>
              <ExpandMoreIcon />
            </Button>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorElRole}
            keepMounted
            open={Boolean(anchorElRole)}
            onClose={handleCloseChangeRole}
          >
            <MenuItem onClick={handleCloseChangeRole}>Vedu cvičení</MenuItem>
            <MenuItem onClick={handleCloseChangeRole}>Opravuji domácí úkoly</MenuItem>
            <MenuItem onClick={handleCloseChangeRole}>Zadávám domácí úkoly</MenuItem>
          </Menu>

          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickUser}>
            <AccountCircleIcon />
            <span css={buttonText}>xcerveny@fi.muni.cz</span>
            <ExpandMoreIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorElUser}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleCloseUser}
          >
            <MenuItem onClick={handleCloseUser}>Odhlásit</MenuItem>
          </Menu>
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
