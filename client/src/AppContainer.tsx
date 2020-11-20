import { State } from './store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import App, { DispatchProps, StateProps } from './App';
import { logUserOut, refreshUserFromCookie } from './store/auth/actions';

const mapStateToProps = (state: State): StateProps => ({
  loggedUser: state.auth.loggedUser,
  refreshCookieState: state.auth.refreshCookieState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      refreshUserFromCookie,
      logUserOut,
    },
    dispatch,
  ),
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
