import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routerConfig from '../src/routes/routerConfig';

// Tests
describe.skip('Renders main page correctly', async () => {
  /**
   * Resets all renders after each test
   */
  afterEach(() => {
    cleanup();
  });

  it('renders main page when path is /', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });

  it('renders registration page when user click Sign Up', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.getByText(/main/i)).toBeInTheDocument();

    await user.click(screen.getByText(/sign up/i));
    expect(screen.getByText(/registration/i)).toBeInTheDocument();
  });
});
