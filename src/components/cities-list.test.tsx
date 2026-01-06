import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi } from "vitest"
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CitiesList } from './cities-list';

describe('CitiesList', () => {
    it('should render list of cities', () => {
        const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam'];
        const mockOnCityClick = vi.fn();

        render(<CitiesList cities={cities} activeCity="Paris" onCityClick={mockOnCityClick} />);

        expect(screen.getByText('Paris')).toBeInTheDocument();
        expect(screen.getByText('Cologne')).toBeInTheDocument();
        expect(screen.getByText('Brussels')).toBeInTheDocument();
        expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    });

    it('should apply active class to the active city', () => {
        const cities = ['Paris', 'Cologne', 'Brussels'];
        const mockOnCityClick = vi.fn();

        render(<CitiesList cities={cities} activeCity="Cologne" onCityClick={mockOnCityClick} />);

        const cologneLink = screen.getByText('Cologne').closest('a');
        const parisLink = screen.getByText('Paris').closest('a');

        expect(cologneLink).toHaveClass('tabs__item--active');
        expect(parisLink).not.toHaveClass('tabs__item--active');
    });

    it('should call onCityClick when city is clicked', async () => {
        const user = userEvent.setup();
        const cities = ['Paris', 'Cologne'];
        const mockOnCityClick = vi.fn();

        render(<CitiesList cities={cities} activeCity="Paris" onCityClick={mockOnCityClick} />);

        const cologneLink = screen.getByText('Cologne').closest('a');
        await user.click(cologneLink!);

        expect(mockOnCityClick).toHaveBeenCalledWith('Cologne');
        expect(mockOnCityClick).toHaveBeenCalledTimes(1);
    });

    it('should prevent default link behavior on click', async () => {
        const user = userEvent.setup();
        const cities = ['Paris'];
        const mockOnCityClick = vi.fn();

        render(<CitiesList cities={cities} activeCity="Paris" onCityClick={mockOnCityClick} />);

        const link = screen.getByText('Paris').closest('a');
        await user.click(link!);

        expect(mockOnCityClick).toHaveBeenCalled();
    });
});
