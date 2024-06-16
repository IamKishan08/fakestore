<script lang="ts">
  
  import Footer from './../components/Footer.svelte';
  import "../app.css";
  import Header from "../components/Header.svelte";
  import { onMount } from 'svelte';
  import { fetchProducts } from '../stores/stores';

  // Running code on component mount
  onMount(async () => {
      // Calling the fetchProducts function asynchronously
      await fetchProducts();
  });
</script>

<Header/>
<main class="content-container pt-6">
  <!-- Creating a slot for dynamic content -->
  <slot></slot>
</main>
<Footer/>
