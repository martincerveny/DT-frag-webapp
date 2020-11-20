/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from '@emotion/styled';
import { t } from '../../code/helpers/translations';
import { Avatar, CircularProgress } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { colors } from '../../styles/colors';
import { login } from '../../store/auth/actions';
import { LoadingState } from '../../code/enums/loading';

export interface StateProps {
  loadingState: LoadingState;
}

export interface DispatchProps {
  login: typeof login;
}

type LoginProps = DispatchProps & StateProps;

const LoginComponent: React.FC<LoginProps> = ({ login, loadingState }) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const isSubmitting = loadingState === LoadingState.Loading;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography css={heading} component="h1" variant="h2">
        Frag
      </Typography>
      <div css={paper}>
        <Avatar css={loginIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          {t('loginPage.login')}
        </Typography>
        <form css={form} method="post" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('loginPage.username')}
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChangeUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('loginPage.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            css={submitButton}
            disabled={isSubmitting}
          >
            {!isSubmitting ? t('loginPage.signin') : <CircularProgress size={20} />}
          </Button>
        </form>
      </div>
    </Container>
  );
};

const StyledLogin = styled(LoginComponent)``;

export const Login = (props: LoginProps) => <StyledLogin {...props} />;

const paper = css`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const heading = css`
  margin-top: 30px;
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
  height: 40px;
`;

const loginIcon = css`
  margin-bottom: 0px;
  background-color: ${colors.blue};
`;
