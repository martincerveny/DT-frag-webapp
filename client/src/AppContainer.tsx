import { State } from './store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import App, { DispatchProps, StateProps } from './App';
import { performUserLogin } from './store/general/actions';

const mapStateToProps = (state: State): StateProps => ({
  loggedUser: state.general.loggedUser,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      login: performUserLogin,
    },
    dispatch,
  ),
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
