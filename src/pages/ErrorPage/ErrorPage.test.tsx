import { describe, test, expect, afterEach, beforeEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

describe('ErrorPage tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('renders error title correctly', () => {
    const titleElement = screen.getByText('Not Found');

    expect(titleElement).toBeInTheDocument();
  });

  test('renders error link correctly', () => {
    const linkElement = screen.getByRole('link', { name: '[main page]' });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('#/main');
  });

  test('renders main page when user click main page link', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByText(/main page/i));
    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });
});
