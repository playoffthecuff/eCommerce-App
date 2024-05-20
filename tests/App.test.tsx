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

    expect(screen.getByText(/BEST SELLING BIKES/i)).toBeInTheDocument();
  });
});
