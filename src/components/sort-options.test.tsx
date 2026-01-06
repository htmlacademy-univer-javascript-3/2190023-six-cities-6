import { describe, expect, it, vi } from "vitest";
import { SortOptions, type SortType } from "./sort-options";
import { userEvent } from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";

describe('SortOptions', () => {
  it('should render sort options with active sort', () => {
    const mockOnSortChange = vi.fn();
    const activeSort: SortType = 'Popular';

    render(<SortOptions activeSort={activeSort} onSortChange={mockOnSortChange} />);

    expect(screen.getByTestId('sort-type')).toHaveTextContent('Popular');
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^sort-option-/)).toHaveLength(4);
  });

  it('should handle sort option click', async () => {
    const user = userEvent.setup();
    const mockOnSortChange = vi.fn();
    const activeSort: SortType = 'Popular';

    render(<SortOptions activeSort={activeSort} onSortChange={mockOnSortChange} />);

    // Open the dropdown
    await user.click(screen.getByTestId('sort-type'));

    // Click on a different option
    await user.click(screen.getByTestId('sort-option-Price: low to high'));

    expect(mockOnSortChange).toHaveBeenCalledWith('Price: low to high');
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
  });
});