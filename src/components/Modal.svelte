<script lang="ts">
    // Import the Product type and cart store from stores
    import type { Product } from '../stores/stores';
    import { cart } from '../stores/stores';

    // Export product and closeModal properties
    export let product: Product | null = null;
    export let closeModal: () => void;

    let showToast = false;

    // Function to add the product to the cart
    const addToCart = () => {
        if (product) {
            cart.update((items) => {
                const existing = items.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity += 1; // Increment quantity if product already in cart
                } else {
                    items.push({ ...product, quantity: 1 }); // Add new product to cart
                }
                return items;
            });
            // Show toast message
            showToast = true;
            setTimeout(() => {
                showToast = false;
            }, 2000); // Hide toast after 2 seconds
        }
    };

    // Function to get star rating based on the product rating
    const getRatingStars = (rating: number) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push('★'); // Full star
            } else {
                stars.push('☆'); // Empty star
            }
        }
        return stars.join(' ');
    };
</script>

{#if product}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" on:click={closeModal}>
        <div class="bg-white p-4 rounded-lg w-full max-w-lg relative modal-content" on:click|stopPropagation>
            <button class="absolute top-2 right-2 close-button" on:click={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="content-wrapper">
                <h2 class="text-2xl mb-4">{product.title}</h2>
                <img src={product.image} alt={product.title} class="w-64 h-64 object-cover mb-4 mx-auto">
                <p class="text-lg mb-2">Price: ₹ {product.price}</p>
                {#if product.rating}
                    <p class="text-yellow-500 mb-2 flex items-center">
                        {getRatingStars(product.rating.rate)}
                        <span class="ml-2 text-gray-700">({product.rating.rate})</span>
                    </p>
                {/if}
                <p class="text-gray-600 mb-4">{product.description}</p>
                <p class="text-sm text-gray-500 mb-4">Category: {product.category}</p>
                <button class="bg-black text-white px-4 py-2 mt-4 custom-color" on:click={addToCart}>Add to Cart</button>
            </div>
        </div>
    </div>
{/if}
{#if showToast}
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50" role="status" aria-live="polite">
        Added to cart
    </div>
{/if}

<style>
    .custom-color {
        background-image: linear-gradient(to right, #3498db, #61a8d7);
        color: white;
        border-radius: 5px;
    }
    .modal-content {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.8);
        overflow: hidden;
    }
    .content-wrapper {
        max-height: 70vh;
        overflow-y: auto;
        scrollbar-width: none; 
    }
    .content-wrapper::-webkit-scrollbar {
        display: none;
    }
    /* For star ratings */
    .text-yellow-500 {
        color: #f59e0b;
    }
    /* Align close button properly */
    .close-button {
        top: 0.5rem;
        right: 0.5rem;
    }
</style>
