import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CommentForm } from "./comment-form";

vi.mock('../store/redux', () => ({
    useAppDispatch: () => vi.fn(),
}));

const testOfferId = 'caa8de63-ec63-499c-9d33-531461e865f6';

describe('CommentForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render comment form with all elements', () => {
        render(<CommentForm offerId={testOfferId} />);

        expect(screen.getByLabelText('Your review')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByText(/at least/i)).toBeInTheDocument();
    });

    it('should button submit disables and enables on user actions', async () => {
        render(<CommentForm offerId={testOfferId} />);
        const user = userEvent.setup();

        const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toBeDisabled();

        await user.click(screen.getByTitle('perfect'));
        expect(button).toBeDisabled();

        await user.type(textarea, 'Short comment');
        expect(button).toBeDisabled();

        await user.clear(textarea);
        await user.type(textarea, 'A'.repeat(50));
        expect(button).toBeEnabled();
    })
})