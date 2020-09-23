/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import React from 'react';
import { DEFAULT_FONT_FAMILY } from './styles/stylingConstants';
import { Login } from './components/login/Login';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { MenuBar } from './components/menuBar/MenuBar';
import { SeminarDashboard } from './components/seminar/SeminarDashboard';
import { Routes } from './code/routes';
import { APP_THEME } from './styles/themes';
import { performUserLogin } from './store/general/actions';
import { AssignmentDashboardContainer } from './components/assignment/assignmentDashboard/AssignmentDashboardContainer';
import { AssignmentViewContainer } from './components/assignment/assignmentView/AssignmentViewContainer';

export interface StateProps {
  loggedUser: undefined;
}

export interface DispatchProps {
  login: typeof performUserLogin;
}

type AppProps = DispatchProps & StateProps;

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

const App: React.FC<AppProps> = ({ loggedUser, login }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(true); // true for testing purposes

  const handleIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  const renderRoutes = () => {
    if (isLoggedIn) {
      return getLoggedRoutes();
    }

    return getUnloggedRoutes();
  };

  const renderMenuBar = () => {
    return <MenuBar />;
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
            <SeminarDashboard />
          </Route>
          <Route path="/">
            <AssignmentDashboardContainer />
          </Route>
        </Switch>
      </div>
    );
  };

  const getUnloggedRoutes = () => {
    return (
      <Route path="/">
        <Login handleIsLoggedIn={handleIsLoggedIn} />
      </Route>
    );
  };

  return (
    <ThemeProvider theme={APP_THEME}>
      <div className="App">
        <CssBaseline />
        {renderGlobalCssSettings()}
        <Router>{renderRoutes()}</Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

const root = css`
  flex-grow: 1;
`;
