import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { get } from 'svelte/store';
import {
    products,
    cart,
    selectedCategory,
    searchQuery,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    fetchProducts,
    filteredProducts,
    currentPage,
    itemsPerPage,
    paginatedProducts,
    totalPages
} from '../../stores/stores';

describe('Product Store Tests', () => {
    beforeAll(async () => {
        await fetchProducts(); // Fetch the products before running tests
    });

    it('should fetch and set products correctly', () => {
        const productList = get(products);
        expect(productList.length).toBeGreaterThan(0);
    });

    it('should filter products by category', () => {
        selectedCategory.set('electronics');
        const filtered = get(filteredProducts);
        expect(filtered.every(product => product.category === 'electronics')).toBe(true);
    });

    it('should filter products by search query', () => {
        searchQuery.set('shirt');
        const filtered = get(filteredProducts);
        expect(filtered.every(product => product.title.toLowerCase().includes('shirt') || product.description.toLowerCase().includes('shirt'))).toBe(true);
    });

    it('should filter products by price and rating', () => {
        minPrice.set(10);
        maxPrice.set(50);
        minRating.set(3);
        const filtered = get(filteredProducts);
        expect(filtered.every(product => product.price >= 10 && product.price <= 50 && product.rating.rate >= 3)).toBe(true);
    });

    it('should sort products by price ascending', () => {
        sortBy.set('price-asc');
        const sorted = get(filteredProducts);
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i - 1].price);
        }
    });

    it('should paginate filtered products', () => {
        currentPage.set(1);
        itemsPerPage.set(5);
        const paginated = get(paginatedProducts);
        expect(paginated.length).toBeLessThanOrEqual(5);
    });

    it('should calculate the total number of pages', () => {
        itemsPerPage.set(5);
        const total = get(totalPages);
        const filtered = get(filteredProducts);
        expect(total).toBe(Math.ceil(filtered.length / 5));
    });
});
