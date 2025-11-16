import type { FormEvent } from 'react';
import { postComment } from '../store/offer-thunks';
import { login } from '../store/auth-thunk';

// NB: если я выношу использую в этих фнкциях такие события как FormEvent, то они перестают быть чистыми функциями
export const handleLoginSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string,
    dispatch: AppDispatch,
    navigate: (path: string) => void,
    setError: (error: string | null) => void,
) => {
    e.preventDefault();
    setError(null);
    try {
        await dispatch(login({ email, password })).unwrap();
        navigate('/');
    } catch (err: unknown) {
        setError(typeof err === 'string' ? err : 'Unknown error');
    }
}

export const handleCommentSubmit = async (
    offerId: string,
    comment: string,
    rating: number,
    e: FormEvent,
    dispatch: AppDispatch,
    setComment: (value: string) => void,
    setRating: (value: number) => void,
    setIsSubmitting: (value: boolean) => void,
) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(postComment({ offerId, comment, rating }));
    setComment('');
    setRating(0);
    setIsSubmitting(false);
};