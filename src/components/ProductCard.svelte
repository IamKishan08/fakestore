<script lang="ts">
    import { cart } from '../stores/stores';
    import type { Product } from '../stores/stores';
    import { createEventDispatcher } from 'svelte';

    export let product: Product;

    const dispatch = createEventDispatcher();

    const addToCart = () => {
        if (product.id && product.title && product.price && product.description && product.category && product.image) {
            cart.update((items) => {
                const existing = items.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    items.push({ ...product, quantity: 1 });
                }
                return items;
            });
        }
    }; 

    const viewDetails = () => {
        dispatch('viewDetails', product);
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
<div class="border p-4 flex flex-col items-center  glass-effect">
    <img src={product.image} alt={product.title} class="w-32 h-32 object-cover mb-2" on:click={viewDetails}>
    <h2 class="text-sm" on:click={viewDetails}>{product.title}</h2>
    <p class="text-gray-600">₹ {product.price}</p>
    <button class="bg-black text-white px-4 py-2 mt-auto custom-color" on:click={addToCart}>Add to Cart</button>
</div>
