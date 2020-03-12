import React from 'react';

import View from '../components/Header/Header';

const HeaderContainer: React.FunctionComponent = () => {
  // const props = useSelector((state: RootState) => {
  //   return {
  //     username: state.auth.username
  //   };
  // });

  return <View username={null} />;
};

export default HeaderContainer;

// import { connect } from 'react-redux';
// import { Dispatch } from 'redux';

// import Header from '../components/Header/Header';
// import { RootState } from '../reducers';
// import { AuthAction, /* login, */ signup } from '../actions/authActions';
// import { IUserCreate } from '../../types/user';

// const mapStateToProps = (state: RootState) => ({
//   username: state.auth.username
// });

// const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
//   // login: () => dispatch(login()),
//   signup: (data: IUserCreate) => dispatch(signup(data))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
