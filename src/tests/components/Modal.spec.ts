import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ProductModal from '../../components/Modal.svelte';
import { cart } from '../../stores/stores';
import type { Product } from '../../stores/stores';

vi.mock('../../stores/stores', () => {
  return {
    cart: {
      update: vi.fn(),
    },
  };
});

describe('ProductModal.svelte', () => {
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
    const { getByText, getByAltText } = render(ProductModal, { product: mockProduct, closeModal: vi.fn() });

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText((content, element) => {
        return element !== null && element.tagName.toLowerCase() === 'p' && /₹\s*100/.test(element?.textContent || '');
      })).toBeInTheDocument();
    expect(getByAltText('Test Product')).toBeInTheDocument();
    expect(getByText('★ ★ ★ ★ ☆')).toBeInTheDocument();
    expect(getByText('(4.5)')).toBeInTheDocument();
    expect(getByText('A test product')).toBeInTheDocument();
    expect(getByText('Category: Test Category')).toBeInTheDocument();
  });

  it('should add product to cart and show toast message', async () => {
    const { getByText, queryByRole } = render(ProductModal, { product: mockProduct, closeModal: vi.fn() });

    const addButton = getByText('Add to Cart');
    await fireEvent.click(addButton);

    expect(cart.update).toHaveBeenCalled();
    expect(cart.update).toHaveBeenCalledWith(expect.any(Function));

    const toast = queryByRole('status');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent('Added to cart');
  });

  it('should call closeModal when close button is clicked', async () => {
    const closeModal = vi.fn();
    const { getByRole } = render(ProductModal, { product: mockProduct, closeModal });

    const closeButton = getByRole('button', { name: 'close' });
    await fireEvent.click(closeButton);

    expect(closeModal).toHaveBeenCalled();
  });

  it('should call closeModal when outside of the modal is clicked', async () => {
    const closeModal = vi.fn();
    const { container } = render(ProductModal, { product: mockProduct, closeModal });

    const backdrop = container.querySelector('.fixed.inset-0');
    if (backdrop) {
      await fireEvent.click(backdrop);
      expect(closeModal).toHaveBeenCalled();
    } else {
      throw new Error('Backdrop not found');
    }
  });
});
