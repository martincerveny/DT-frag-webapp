/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import React from 'react';
import { DEFAULT_FONT_FAMILY } from './styles/stylingConstants';
import { Login } from './components/login/Login';
import { Home } from './components/home/Home';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AssignmentDashboard } from './components/assignment/assignmentDashboard/AssignmentDashboard';
import { MenuBar } from './components/menuBar/MenuBar';
import {AssignmentView} from "./components/assignment/assignmentView/AssignmentView";

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

const App = () => {
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
          <Route path="/assignments/:assignmentId">
            <AssignmentView />
          </Route>
          <Route path="/assignments">
            <AssignmentDashboard />
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
    <div className="App">
      <CssBaseline />
      {renderGlobalCssSettings()}
      <Router>{renderRoutes()}</Router>
    </div>
  );
};

export default App;

const root = css`
  flex-grow: 1;
`;
