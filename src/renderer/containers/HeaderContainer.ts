import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Header from '../components/Header/Header';
import { RootState } from '../reducers';
import { AuthAction, login, signup } from '../actions/authActions';

const mapStateToProps = (state: RootState) => ({
    username: state.auth.username
});

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
    login: () => dispatch(login()),
    signup: () => dispatch(signup())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
