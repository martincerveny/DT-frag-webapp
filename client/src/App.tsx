/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import React, { useEffect } from 'react';
import { DEFAULT_FONT_FAMILY } from './styles/stylingConstants';
import { CssBaseline, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { MenuBar } from './components/menuBar/MenuBar';
import { Routes } from './code/enums/routes';
import { APP_THEME } from './styles/themes';
import { AssignmentDashboardContainer } from './components/assignment/assignmentDashboard/AssignmentDashboardContainer';
import { AssignmentViewContainer } from './components/assignment/assignmentView/AssignmentViewContainer';
import { SeminarDashboardContainer } from './components/seminar/SeminarDashboardContainer';
import { StudentViewContainer } from './components/student/StudentViewContainer';
import { LoginContainer } from './components/login/LoginContainer';
import { logUserOut, refreshUserFromCookie } from './store/auth/actions';
import { Person } from './code/interfaces/person';
import { SnackbarContainer } from 'uno-material-ui/dist';
import { LoadingState } from './code/enums/loading';
import { Loader } from './components/shared/Loader';
import { t } from './code/helpers/translations';
import { ReviewDashboardContainer } from './components/review/reviewDashboard/ReviewDashboardContainer';
import { ReviewDetailContainer } from './components/review/reviewDetail/ReviewDetailContainer';

export interface StateProps {
  loggedUser: undefined | Person;
  refreshCookieState: LoadingState;
}

export interface DispatchProps {
  refreshUserFromCookie: typeof refreshUserFromCookie;
  logUserOut: typeof logUserOut;
}

type AppProps = DispatchProps & StateProps;

export const UserContext = React.createContext<Person | undefined>(undefined);

const renderGlobalCssSettings = () => (
  <Global
    styles={css`
      .App {
        font-family: ${DEFAULT_FONT_FAMILY};
        display: flex;
      }
    `}
  />
);

const App: React.FC<AppProps> = ({ loggedUser, refreshUserFromCookie, logUserOut, refreshCookieState }) => {
  useEffect(() => {
    refreshUserFromCookie();
  }, [refreshUserFromCookie]);

  const renderRoutes = () => {
    if (refreshCookieState === LoadingState.Loading) {
      return renderLoading(t('app.loading'));
    }

    let routes = getUnloggedRoutes();
    if (loggedUser) {
      routes = getLoggedRoutes();
    }
    return <Router>{routes}</Router>;
  };

  const handleUserLogOut = () => {
    logUserOut();
  };

  const renderMenuBar = () => {
    return <MenuBar handleUserLogOut={handleUserLogOut} />;
  };

  const getLoggedRoutes = () => {
    return (
      <div css={root}>
        {renderMenuBar()}
        <Switch>
          <Route path={Routes.AssignmentView}>
            <AssignmentViewContainer />
          </Route>
          <Route path={Routes.Seminars}>
            <SeminarDashboardContainer />
          </Route>
          <Route path={Routes.StudentView}>
            <StudentViewContainer />
          </Route>
          <Route path={Routes.ReviewDetail}>
            <ReviewDetailContainer />
          </Route>
          <Route path={Routes.Reviews}>
            <ReviewDashboardContainer />
          </Route>
          <Route path={Routes.Home}>
            <AssignmentDashboardContainer />
          </Route>
        </Switch>
      </div>
    );
  };

  const getUnloggedRoutes = () => {
    return (
      <Route path="/">
        <LoginContainer />
      </Route>
    );
  };

  const renderLoading = (text: string) => {
    return (
      <div css={loadingApp}>
        <Loader />
        <Typography>{text}</Typography>
      </div>
    );
  };

  return (
    <ThemeProvider theme={APP_THEME}>
      <SnackbarContainer />
      <div className="App">
        <CssBaseline />
        {renderGlobalCssSettings()}
        <UserContext.Provider value={loggedUser}>{renderRoutes()}</UserContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;

const root = css`
  flex-grow: 1;
`;

const loadingApp = css`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
