import { writable, derived } from 'svelte/store';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export type CartItem = Product & {
    quantity: number;
};

export const products = writable<Product[]>([]);
export const cart = writable<CartItem[]>([]);
export const selectedCategory = writable<string | null>(null);
export const searchQuery = writable<string>('');

// New filter and sorting stores
export const minPrice = writable<number>(0);
export const maxPrice = writable<number>(Infinity);
export const minRating = writable<number>(0);
export const sortBy = writable<string>('default'); // 'price-asc', 'price-desc', 'popularity'

// Fetch products
export const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await response.json();
    products.set(data);
};

export const filteredProducts = derived(
    [products, selectedCategory, searchQuery, minPrice, maxPrice, minRating, sortBy],
    ([$products, $selectedCategory, $searchQuery, $minPrice, $maxPrice, $minRating, $sortBy]) => {
        let filtered = $products;

        if ($selectedCategory) {
            filtered = filtered.filter(product => product.category === $selectedCategory);
        }

        if ($searchQuery) {
            const query = $searchQuery.toLowerCase();
            filtered = filtered.filter(product => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
        }

        filtered = filtered.filter(product => product.price >= $minPrice && product.price <= $maxPrice && product.rating.rate >= $minRating);

        if ($sortBy === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if ($sortBy === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if ($sortBy === 'popularity') {
            filtered.sort((a, b) => b.rating.count - a.rating.count);
        }

        return filtered;
    }
);

// Pagination
export const currentPage = writable(1);
export const itemsPerPage = writable(10);

export const paginatedProducts = derived(
    [filteredProducts, currentPage, itemsPerPage],
    ([$filteredProducts, $currentPage, $itemsPerPage]) => {
        const start = ($currentPage - 1) * $itemsPerPage;
        const end = start + $itemsPerPage;
        return $filteredProducts.slice(start, end);
    }
);

export const totalPages = derived(
    [filteredProducts, itemsPerPage],
    ([$filteredProducts, $itemsPerPage]) => Math.ceil($filteredProducts.length / $itemsPerPage)
);
