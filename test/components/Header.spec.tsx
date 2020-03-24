import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from '../../src/renderer/components/Header/Header';

describe('Header component', () => {
  it('Renders', async () => {
    const { getByText } = render(<Header username={null} />);
    expect(await getByText('Microblog Electron App')).toBeInTheDocument();
  });
});
