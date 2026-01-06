import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
    it('should render spinner loading element', () => {
        const { container } = render(<Spinner />);
        expect(container.querySelector('.spinner')).toBeTruthy();
    })
})