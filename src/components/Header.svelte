<script lang="ts">
  import { writable } from 'svelte/store';
  import CartMenu from './CartMenu.svelte';
  import { cart } from '../stores/stores';

  // Store to manage the cart's open/close state
  export let isOpen = writable(false);

  // Function to open the cart
  const openCart = () => {
      isOpen.set(true);
  };

  // Reactive statement to calculate the total quantity of items in the cart
  $: cartCount = $cart.reduce((total, item) => total + item.quantity, 0);
</script>

<style>
  .custom-color {
      background-image: linear-gradient(to right, #3498db, #61a8d7);
      color: white;
      border-radius: 5px;
  }
  header {
      background-image: linear-gradient(to right, #3498db, #cfe2ef);
  }
</style>

<header class="fixed w-full top-0 left-0 flex justify-between items-center p-4 bg-sky-100 z-50">
  <h1 class="text-2xl font-extrabold italic text-white">FakeStore</h1>
  <button class="px-4 py-2 bg-black text-white relative custom-color" on:click={openCart}>
      Cart ({cartCount})
  </button>
  <CartMenu {isOpen} />
</header>
