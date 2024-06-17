import { render, fireEvent } from '@testing-library/svelte';
import FilterSortComponent from '../../components/AdvanceFilter.svelte'; // Update with the correct path
import { minPrice, maxPrice, minRating, sortBy } from '../../stores/stores';
import { get } from 'svelte/store'; // Import the get function from Svelte's store API
import { vi, describe, it, expect } from 'vitest';

describe('FilterSortComponent.svelte', () => {
  it('should update minPrice when the min price range input is changed', async () => {
    const { getByLabelText } = render(FilterSortComponent);

    const minPriceInput = getByLabelText('Min Price: ₹0'); 
    await fireEvent.input(minPriceInput, { target: { value: '50' } });

    expect(get(minPrice)).toBe(50);
  });

  it('should update maxPrice when the max price range input is changed', async () => {
    const { getByLabelText } = render(FilterSortComponent);

    const maxPriceInput = getByLabelText('Max Price: ₹1000'); 
    await fireEvent.input(maxPriceInput, { target: { value: '800' } });

    expect(get(maxPrice)).toBe(800);
  });

  it('should update minRating when the min rating range input is changed', async () => {
    const { getByLabelText } = render(FilterSortComponent);

    const minRatingInput = getByLabelText('Min Rating: 0');
    await fireEvent.input(minRatingInput, { target: { value: '3' } }); // Simulate inputting a value of 3

    expect(get(minRating)).toBe(3);
  });

  it('should update sortBy when the sort by select input is changed', async () => {
    const { getByLabelText } = render(FilterSortComponent);

    const sortBySelect = getByLabelText('Sort By');
    await fireEvent.change(sortBySelect, { target: { value: 'price-desc' } });

    expect(get(sortBy)).toBe('price-desc');
  });


});
