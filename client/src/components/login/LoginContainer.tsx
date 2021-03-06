import { State } from '../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, Login, StateProps } from './Login';
import { login } from '../../store/auth/actions';

const mapStateToProps = (state: State): StateProps => ({
  loginRequestState: state.auth.loginRequestState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      login,
    },
    dispatch,
  ),
});

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
