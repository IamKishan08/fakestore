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

// Writable store to hold the list of products
export const products = writable<Product[]>([]);

// Writable store to hold the items in the cart
export const cart = writable<CartItem[]>([]);

// Writable store to hold the selected category for filtering
export const selectedCategory = writable<string | null>(null);

// Writable store to hold the search query
export const searchQuery = writable<string>('');

export const isOpen = writable(false);

// Writable stores for new filters and sorting options
export const minPrice = writable<number>(0);
export const maxPrice = writable<number>(Infinity);
export const minRating = writable<number>(0);
export const sortBy = writable<string>('default'); // Options: 'price-asc', 'price-desc', 'popularity'

// Function to fetch products from the API
export const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await response.json();
    products.set(data);
};

// Derived store to filter products based on selected criteria
export const filteredProducts = derived(
    [products, selectedCategory, searchQuery, minPrice, maxPrice, minRating, sortBy],
    ([$products, $selectedCategory, $searchQuery, $minPrice, $maxPrice, $minRating, $sortBy]) => {
        let filtered = $products;

        // Filter by category
        if ($selectedCategory) {
            filtered = filtered.filter(product => product.category === $selectedCategory);
        }

        // Filter by search query
        if ($searchQuery) {
            const query = $searchQuery.toLowerCase();
            filtered = filtered.filter(product => product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
        }

        // Filter by price and rating
        filtered = filtered.filter(product => product.price >= $minPrice && product.price <= $maxPrice && product.rating.rate >= $minRating);

        // Sort products
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

// Writable store to hold the current page number for pagination
export const currentPage = writable(1);

// Writable store to hold the number of items per page
export const itemsPerPage = writable(10);

// Derived store to paginate the filtered products
export const paginatedProducts = derived(
    [filteredProducts, currentPage, itemsPerPage],
    ([$filteredProducts, $currentPage, $itemsPerPage]) => {
        const start = ($currentPage - 1) * $itemsPerPage;
        const end = start + $itemsPerPage;
        return $filteredProducts.slice(start, end);
    }
);

// Derived store to calculate the total number of pages based on the filtered products and items per page
export const totalPages = derived(
    [filteredProducts, itemsPerPage],
    ([$filteredProducts, $itemsPerPage]) => Math.ceil($filteredProducts.length / $itemsPerPage)
);
