import { describe, it, expect, vi } from 'vitest';
import { handleLoginSubmit, handleCommentSubmit } from '../../functions/async-acts';
import type { AppDispatch } from '../../store';

describe('handleSubmit', () => {
    // handleLoginSubmit
    it('handleLoginSubmit should navigate to root on success and clears error', async () => {
        const unwrap = vi.fn().mockResolvedValue(undefined);
        const dispatch = vi.fn().mockReturnValue({ unwrap }) as AppDispatch;
        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent;
        const navigate = vi.fn();
        const setError = vi.fn();

        await handleLoginSubmit(e, 'sasha@test.com', 'password', dispatch, navigate, setError);

        expect(e.preventDefault).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(unwrap).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/');
        expect(setError).toHaveBeenCalledWith(null);
    });

    it('handleLoginSubmit should set error on failure and does not navigate', async () => {
        const unwrap = vi.fn().mockRejectedValue('Invalid email or password');
        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent;
        const dispatch = vi.fn().mockReturnValue({ unwrap });
        const navigate = vi.fn();
        const setError = vi.fn();

        await handleLoginSubmit(e, 'sasha@test.com', 'password', dispatch, navigate, setError);

        expect(e.preventDefault).toHaveBeenCalledOnce();
        expect(navigate).not.toHaveBeenCalled();
        expect(setError).toHaveBeenCalledWith('Invalid email or password');
    });

    // handleCommentSubmit
    it('handleCommentSubmit should dispatch, reset and toggle submitting on success', async () => {
        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent;
        const dispatch = vi.fn().mockResolvedValue(undefined);
        const setComment = vi.fn();
        const setRating = vi.fn();
        const setIsSubmitting = vi.fn();

        await handleCommentSubmit('1', 'ы'.repeat(50), 5, e, dispatch, setComment, setRating, setIsSubmitting);

        expect(e.preventDefault).toHaveBeenCalledOnce();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(setComment).toHaveBeenCalledWith('');
        expect(setRating).toHaveBeenCalledWith(0);
        expect(setIsSubmitting).toHaveBeenNthCalledWith(1, true);
        expect(setIsSubmitting).toHaveBeenNthCalledWith(2, false);
    });

    it('handleCommentSubmit should propogate error and does not reset submitting on failure', async () => {
        const e = { preventDefault: vi.fn() } as unknown as React.FormEvent;
        const dispatch = vi.fn().mockRejectedValue(new Error('Network error'));
        const setComment = vi.fn();
        const setRating = vi.fn();
        const setIsSubmitting = vi.fn();

        await expect(
            handleCommentSubmit('1', 'ы'.repeat(50), 5, e, dispatch, setComment, setRating, setIsSubmitting)
        ).rejects.toThrow('Network error');

        expect(e.preventDefault).toHaveBeenCalledOnce();
        expect(setIsSubmitting).toHaveBeenCalledTimes(1);
        expect(setIsSubmitting).toHaveBeenCalledWith(true);
        expect(setComment).not.toHaveBeenCalled();
        expect(setRating).not.toHaveBeenCalled();
    })
});