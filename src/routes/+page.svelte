<script lang="ts">
    import { onMount } from 'svelte';
    import { paginatedProducts, fetchProducts, currentPage, totalPages, searchQuery } from '../stores/stores';
    import ProductCard from '../components/ProductCard.svelte';
    import CategoryFilter from '../components/CategoryFilter.svelte';
    import Modal from '../components/Modal.svelte';
    import type { Product } from '../stores/stores';
    import BannerSlideShow from '../components/BannerSlideShow.svelte';
    import { fly } from 'svelte/transition';
    import AdvanceFilter from '../components/AdvanceFilter.svelte';

    let selectedProduct: Product | null = null;

    // Function to change the current page
    const changePage = (page: number) => {
        currentPage.set(page);
    };

    // Function to open the detailed product view modal
    const openModal = (event: CustomEvent<Product>) => {
        selectedProduct = event.detail;
    };

    // Function to close the detailed product view modal
    const closeModal = () => {
        selectedProduct = null;
    };

    // Function to update the search query
    const updateSearchQuery = (event: Event) => {
        const query = (event.target as HTMLInputElement).value;
        searchQuery.set(query);
        currentPage.set(1); // Reset to the first page on new search
    };

    // Fetch products when the component mounts
    onMount(fetchProducts);
</script>

<!-- Custom style tag -->
<style>
    .custom-color {
        background-color: #3498db;
        color: white;
    }
</style>

<div class="bg-custom">
    <div class="mt-16 p-4">
        <!-- Search bar -->
        <input
            type="text"
            placeholder="Search for products..."
            class="w-full p-2 border rounded"
            on:input={updateSearchQuery}
        />
    </div>
    
    <!-- Advanced filter component -->
    <AdvanceFilter/>
    <br>
    
    <!-- Category filter component -->
    <CategoryFilter />
    
    <!-- Banner slideshow component -->
    <BannerSlideShow />

    <!-- Displaying each product in a grid view -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {#each $paginatedProducts as product}
            <div transition:fly={{ y: 200, duration: 300 }}>
                <ProductCard {product} on:viewDetails={openModal} />
            </div>
        {/each}
    </div>

    <!-- Page number handling -->
    <div class="flex justify-center mt-4">
        {#each Array($totalPages).fill(0).map((_, i) => i + 1) as page}
            <button
                class="px-4 py-2 mx-1 bg-blue-500 rounded-full font-bold text-white custom-color"
                class:bg-black-200={page === $currentPage}
                on:click={() => changePage(page)}
            >{page}</button>
        {/each}
    </div>
    
    <!-- Modal for detailed product view -->
    {#if selectedProduct}
        <Modal product={selectedProduct} closeModal={closeModal} />
    {/if}
</div>
