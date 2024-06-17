import { render, fireEvent } from '@testing-library/svelte';
import CategorySelector from '../../components/CategoryFilter.svelte'; // Update with correct path
import { selectedCategory } from '../../stores/stores';
import { vi, describe, it, expect } from 'vitest';
import { get } from 'svelte/store'; // Import the get function

describe('CategorySelector.svelte', () => {
  it('should set selectedCategory to null when "All" button is clicked', async () => {
    const { getByText } = render(CategorySelector);

    const allButton = getByText('All');
    await fireEvent.click(allButton);

    expect(get(selectedCategory)).toBe(null);
  });

  it('should set selectedCategory to the correct category when a category button is clicked', async () => {
    const { getByText } = render(CategorySelector);

    const electronicsButton = getByText('electronics');
    await fireEvent.click(electronicsButton);

    expect(get(selectedCategory)).toBe('electronics'); 
  });


});
