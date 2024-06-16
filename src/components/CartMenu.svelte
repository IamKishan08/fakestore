<script lang="ts">
    import { writable, get } from 'svelte/store';
    import { cart } from '../stores/stores';

    // Function to load cart from local storage
    const loadCartFromLocalStorage = () => {
        if (typeof localStorage !== 'undefined') {
            console.log('Attempting to load cart from local storage...');
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                console.log('Cart loaded from local storage:', JSON.parse(storedCart));
                return JSON.parse(storedCart);
            } else {
                console.log('No cart found in local storage.');
            }
        }
        return [];
    };

    // Function to save cart to local storage
    const saveCartToLocalStorage = (items: any[]) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(items));
            console.log('Cart saved to local storage:', items);
        }
    };

    // Initialize cart with items from local storage if in the browser
    if (typeof localStorage !== 'undefined') {
        const initialCart = loadCartFromLocalStorage();
        cart.set(initialCart);
    }

    export let isOpen = writable(false);

    const closeCart = () => {
        isOpen.set(false);
    };

    const increaseQuantity = (id: number) => {
        cart.update(items => {
            const item = items.find(i => i.id === id);
            if (item) item.quantity += 1;
            saveCartToLocalStorage(items);
            return items;
        });
    };

    const decreaseQuantity = (id: number) => {
        cart.update(items => {
            const item = items.find(i => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                items = items.filter(i => i.id !== id);
            }
            saveCartToLocalStorage(items);
            return items;
        });
    };

    // Subscribe to cart store to save changes to local storage
    cart.subscribe(items => {
        saveCartToLocalStorage(items);
    });

    // Calculate total amount
    $: totalAmount = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
</script>

<div class="cart-menu fixed right-0 top-0 w-80 h-full bg-white bg-opacity-30 shadow-lg backdrop-filter backdrop-blur-lg transform transition-transform duration-300 ease-in-out" class:translate-x-full={!$isOpen}>
    <div class="p-4 border-b flex justify-between items-center custom-color1">
        <h2 class="text-xl font-bold">Your Cart</h2>
        <button class="text-2xl" on:click={closeCart}>&times;</button>
    </div>
    <div class="p-4 overflow-y-auto cart-items">
        {#each $cart as item, i}
            <div class="flex justify-between items-center mb-4">
                <img src={item.image} alt={item.title} class="w-20 h-20 object-cover">
                <div class="flex-1 mx-4">
                    <p>{item.title}</p>
                    <p>₹ {item.price}</p>
                </div>
                <div class="flex items-center">
                    <button class="border px-2 py-1" on:click={() => decreaseQuantity(item.id)}>-</button>
                    <span class="px-2">{item.quantity}</span>
                    <button class="border px-2 py-1" on:click={() => increaseQuantity(item.id)}>+</button>
                </div>
                {#if i < $cart.length - 1}
                    <hr class="separator">
                {/if}
            </div>
        {/each}
    </div>
    <div class="p-4 border-t">
        <div class="flex justify-between mb-4">
            <p>Subtotal ({$cart.length} Items)</p>
            <p>₹ {totalAmount.toFixed(2)}</p>
        </div>
        <button class="w-full bg-black text-white py-2 custom-color">Continue to Checkout</button>
    </div>
</div>

<style>
    .translate-x-full {
        transform: translateX(100%);
    }

    .custom-color {
        background-image: linear-gradient(to right, #3498db, #61a8d7);
        color: white;
        border-radius: 5px;
    }

    .custom-color1 {
        background-image: linear-gradient(to right, #3498db, #61a8d7);
        color: white;
    }

    .cart-items {
        max-height: 60vh; /* Adjust based on your preference */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .cart-items::-webkit-scrollbar {
        display: none;  /* Chrome, Safari, and Opera */
    }

    .cart-menu {
        display: flex;
        flex-direction: column;
    }

    .bg-opacity-30 {
        background-color: rgba(255, 255, 255, 0.8);
    }

    .backdrop-filter {
        backdrop-filter: blur(10px);
    }

    .backdrop-blur-lg {
        backdrop-filter: blur(10px);
    }
</style>
