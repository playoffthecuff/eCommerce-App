import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

// Tests
describe('Renders main page correctly', async () => {
  /**
   * Resets all renders after each test
   */
  afterEach(() => {
    cleanup();
  });

  it('renders main page when path is /', async () => {
    // const router = createMemoryRouter(routerConfig, {
    //   initialEntries: ['/'],
    // });

    render(<App />);

    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });

  it('renders registration page when user click Sign Up', async () => {
    render(<App />);

    const user = userEvent.setup();

    expect(screen.getByText(/main/i)).toBeInTheDocument();

    await user.click(screen.getByText(/sign up/i));
    expect(screen.getByText(/registration/i)).toBeInTheDocument();
  });
});
