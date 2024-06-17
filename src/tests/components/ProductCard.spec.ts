import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../../components/ProductCard.svelte';
import { cart } from '../../stores/stores';
import type { Product } from '../../stores/stores';

// Mock the cart store
vi.mock('../../stores/stores', () => {
  return {
    cart: {
      update: vi.fn(),
    },
  };
});

describe('ProductCard.svelte', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'A test product',
    category: 'Test Category',
    image: 'test-image.jpg',
    rating: {
      rate: 4.5,
      count: 10
    }
  };

  it('should render the product details', () => {
    const { getByText, getByAltText } = render(ProductCard, { product: mockProduct });

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('₹ 100')).toBeInTheDocument();
    expect(getByAltText('Test Product')).toBeInTheDocument();
  });

  it('should add product to cart and show toast message', async () => {
    const { getByText, queryByRole } = render(ProductCard, { product: mockProduct });

    const addButton = getByText('Add to Cart');
    await fireEvent.click(addButton);

    expect(cart.update).toHaveBeenCalled();
    expect(cart.update).toHaveBeenCalledWith(expect.any(Function));

    const toast = queryByRole('status');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent('Added to cart');
  });

  it('should dispatch viewDetails event when product is clicked', async () => {
    const { getByText, component } = render(ProductCard, { product: mockProduct });

    const viewDetailsSpy = vi.fn();
    component.$on('viewDetails', viewDetailsSpy);

    const productTitle = getByText('Test Product');
    await fireEvent.click(productTitle);

    expect(viewDetailsSpy).toHaveBeenCalled();
    expect(viewDetailsSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: mockProduct }));
  });
});
