<script lang="ts">
	import Footer from './../components/Footer.svelte';
    import "../app.css";
    import Header from "$lib/Header.svelte";
    import { onMount } from 'svelte';
    import { fetchProducts } from '../stores/stores';
    onMount(async () => {
        await fetchProducts();
    });
  </script>

<Header/>
<main class="content-container pt-6">
  
  <slot></slot>
</main>
<Footer/>

