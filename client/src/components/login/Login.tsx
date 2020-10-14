/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import { t } from '../../code/translations';

interface LoginProps {
  handleIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginComponent: React.FC<LoginProps> = ({ handleIsLoggedIn }) => {
  return (
    <Container component="main" maxWidth="xs">
      <div css={paper}>
        <Typography component="h1" variant="h5">
          {t('loginPage.login')}
        </Typography>
        <form css={form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            css={submitButton}
            onClick={() => handleIsLoggedIn(true)}
          >
            {t('loginPage.signin')}
          </Button>
        </form>
      </div>
    </Container>
  );
};

const StyledLogin = styled(LoginComponent)``;

export const Login = (props: LoginProps) => <StyledLogin {...props} />;

const paper = css`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const form = css`
  width: 100%;
  margin-top: 10px;
`;

const submitButton = css`
  margin-top: 30px;
`;
