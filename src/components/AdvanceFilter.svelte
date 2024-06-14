<script lang="ts">
    import { minPrice, maxPrice, minRating, sortBy } from '../stores/stores';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    // Local writable stores for display purposes
    const minPriceValue = writable(0);
    const maxPriceValue = writable(1000);
    const minRatingValue = writable(0);

    const updateMinPrice = (event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value);
        minPrice.set(value);
        minPriceValue.set(value);
    };

    const updateMaxPrice = (event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value);
        maxPrice.set(value);    
        maxPriceValue.set(value);
    };

    const updateMinRating = (event: Event) => {
        const value = parseFloat((event.target as HTMLInputElement).value);
        minRating.set(value);
        minRatingValue.set(value);
    };

    const updateSortBy = (event: Event) => {
        sortBy.set((event.target as HTMLSelectElement).value);
    };
</script>

<style>
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 200px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }
    @media (max-width: 768px) {
        .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 200px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        z-index: 1;
        right: 0; /* Align the dropdown content to the right */
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }    
    .flex-col.md\:flex-row {
        flex-direction: row;
    }
    .justify-end {
        justify-content: flex-end;
    }
    .items-start {
        align-items: flex-start;
    }
    .md\:order-last {
        order: 9999; /* Ensures these items appear at the end in mobile view */
    }
}
</style>

<div class="flex flex-col md:flex-row justify-end items-start md:space-x-4 mt-4">
    <div class="relative dropdown md:order-last mr-3">
        <button class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
            <span>Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>              
        </button>
        <div class="dropdown-content p-4 border rounded">
            <div class="mb-4">
                <label for="min-price" class="block text-sm font-medium text-gray-700">Min Price: ₹{$minPriceValue}</label>
                <input type="range" min="0" max="1000" step="10" id="min-price" class="w-full" on:input={updateMinPrice} />
            </div>
            <div class="mb-4">
                <label for="max-price" class="block text-sm font-medium text-gray-700">Max Price: ₹{$maxPriceValue}</label>
                <input type="range" min="0" max="1000" step="10" id="max-price" class="w-full" on:input={updateMaxPrice} />
            </div>
            <div class="mb-4">
                <label for="min-rating" class="block text-sm font-medium text-gray-700">Min Rating: {$minRatingValue}</label>
                <input type="range" min="0" max="5" step="0.1" id="min-rating" class="w-full" on:input={updateMinRating} />
            </div>
        </div>
    </div>
    <div class="relative dropdown md:order-last">
        <button class="block text-sm font-medium text-gray-700 flex items-center space-x-2">
            <span>Sort</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
              
        </button>
        <div class="dropdown-content p-4 border rounded">
            <label for="sort-by" class="block text-sm font-medium text-gray-700">Sort By</label>
            <select id="sort-by" class="block w-full mt-1" on:change={updateSortBy}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    </div>
</div>
