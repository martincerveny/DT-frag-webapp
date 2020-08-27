/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import React from 'react';
import { DEFAULT_FONT_FAMILY } from './styles/stylingConstants';
import { Login } from './components/login/Login';
import { Home } from './components/home/Home';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { MenuBar } from './components/menuBar/MenuBar';
import { AssignmentView } from './components/assignment/assignmentView/AssignmentView';
import { SeminarDashboard } from './components/seminar/SeminarDashboard';
import { Routes } from './code/interfaces/routes';
import { APP_THEME } from './styles/themes';
import { performUserLogin } from './store/general/actions';

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

const App: React.FC<AppProps> = ({ loggedUser }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false); // true for testing purposes

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
            <AssignmentView />
          </Route>
          <Route path={Routes.Seminars}>
            <SeminarDashboard />
          </Route>
          <Route path="/">
            <Home />
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
