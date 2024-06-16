<script lang="ts">
    import { cart } from '../stores/stores';
    import type { Product } from '../stores/stores';
    import { createEventDispatcher } from 'svelte';

    // Export the product property to be passed in
    export let product: Product;

    // Create an event dispatcher
    const dispatch = createEventDispatcher();

    // Function to add the product to the cart
    const addToCart = () => {
        if (product.id && product.title && product.price && product.description && product.category && product.image) {
            cart.update((items) => {
                const existing = items.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity += 1; // Increment quantity if product already in cart
                } else {
                    items.push({ ...product, quantity: 1 }); // Add new product to cart
                }
                return items;
            });
        }
    }; 

    // Function to view product details
    const viewDetails = () => {
        dispatch('viewDetails', product); // Dispatch event to view product details
    };
</script>

<style>
    .custom-color {
        background-image: linear-gradient(to right, #3498db, #61a8d7);
        color: white;
        border-radius: 5px;
    }
    .glass-effect {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
</style>

<div class="border p-4 flex flex-col items-center glass-effect">
    <!-- Product image with click event to view details -->
    <img src={product.image} alt={product.title} class="w-32 h-32 object-cover mb-2" on:click={viewDetails}>
    
    <!-- Product title with click event to view details -->
    <h2 class="text-sm" on:click={viewDetails}>{product.title}</h2>
    
    <!-- Product price -->
    <p class="text-gray-600">₹ {product.price}</p>
    
    <!-- Button to add product to cart -->
    <button class="bg-black text-white px-4 py-2 mt-auto custom-color" on:click={addToCart}>Add to Cart</button>
</div>
