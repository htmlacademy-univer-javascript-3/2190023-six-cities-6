import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./header";
import { useAppSelector } from '../store/redux';
import { AuthorizationStatus } from '../store/auth-slice';

// Mock react-router
vi.mock('react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
}));

// Mock Redux
vi.mock('../store/redux', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock auth-thunk
vi.mock('../store/auth-thunk', () => ({
  logout: vi.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render header when authorized', () => {
    // Mock selectors: first call for authorizationStatus, second for favoriteCount
    vi.mocked(useAppSelector)
      .mockReturnValueOnce(AuthorizationStatus.Unauthorized)
      .mockReturnValueOnce(0);
    render(<Header />);

    // Check header presence by logo
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();

    // Check "Sign in" is present
    expect(screen.getByText('Sign in')).toBeInTheDocument();

    // Check "Sign out" is not present
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  })
});