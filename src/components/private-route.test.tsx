import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from "vitest";
import { PrivateRoute } from "./private-route";
import { AuthorizationStatus } from "../store/auth-slice";
import { useAppSelector } from '../store/redux';

// Mock react-router
vi.mock('react-router', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid={`navigate-${to}`} />,
}));

// Mock Redux
vi.mock('../store/redux', () => ({
  useAppSelector: vi.fn(),
}));

// Mock Spinner
vi.mock('./spinner', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe('PrivateRoute', () => {
  it('should show loading when authorization status is unknown', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Unknown);

    render(<PrivateRoute><div>Test Child</div></PrivateRoute>);

    expect(screen.getByText('Проверка авторизации...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should navigate to login when not authorized', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Unauthorized);

    render(<PrivateRoute><div>Test Child</div></PrivateRoute>);

    expect(screen.getByTestId('navigate-/login')).toBeInTheDocument();
  });

  it('should render children when authorized', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Authorized);

    render(<PrivateRoute><div>Test Child</div></PrivateRoute>);

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});