import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from '../../src/renderer/components/Header/Header';

describe('Header component', () => {
  it('Correctly renders with no username', () => {
    const { queryByText } = render(
      <Header username={null} onAuthClick={() => null} onLogoutClick={() => null} />
    );
    expect(queryByText('Microblog Electron App')).toBeInTheDocument();
    expect(queryByText('Hello')).not.toBeInTheDocument();
    expect(queryByText('Login')).toBeInTheDocument();
    expect(queryByText('Sign Up')).toBeInTheDocument();
    expect(queryByText('Logout')).not.toBeInTheDocument();
  });

  it('Correctly renders with username', () => {
    const { queryByText } = render(
      <Header username="test_user" onAuthClick={() => null} onLogoutClick={() => null} />
    );
    expect(queryByText('Microblog Electron App')).toBeInTheDocument();
    expect(queryByText('Hello, test_user')).toBeInTheDocument();
    expect(queryByText('Logout')).toBeInTheDocument();
    expect(queryByText('Login')).not.toBeInTheDocument();
    expect(queryByText('Sign Up')).not.toBeInTheDocument();
  });

  it('Calls auth function parameter', () => {
    const onAuthClick = jest.fn();

    const { getByText } = render(
      <Header username={null} onAuthClick={onAuthClick} onLogoutClick={() => null} />
    );

    fireEvent.click(getByText('Login'));
    expect(onAuthClick).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('Sign Up'));
    expect(onAuthClick).toHaveBeenCalledTimes(2);
  });

  it('Calls logout function parameter', () => {
    const onLogoutClick = jest.fn();

    const { getByText } = render(
      <Header username="test_user" onAuthClick={() => null} onLogoutClick={onLogoutClick} />
    );

    fireEvent.click(getByText('Logout'));
    expect(onLogoutClick).toHaveBeenCalled();
  });
});
