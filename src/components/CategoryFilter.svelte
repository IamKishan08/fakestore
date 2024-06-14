<script lang="ts">
    import { selectedCategory } from '../stores/stores';

    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

    const selectCategory = (category: string | null) => {
        selectedCategory.set(category);
    };
</script>

<div class="category-container">
    <button class="category-button" on:click={() => selectCategory(null)}>All</button>
    {#each categories as category}
        <button class="category-button" on:click={() => selectCategory(category)}>{category}</button>
    {/each}
</div>

<style>
    .category-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        margin-bottom: 1rem;
        padding: 0 1rem;
    }

    .category-container::-webkit-scrollbar {
        display: none; /* Hide scrollbar for WebKit browsers */
    }

    .category-container {
        -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
        scrollbar-width: none; /* Hide scrollbar for Firefox */
    }

    .category-button {
        flex: 0 0 auto;
        padding: 0.5rem 1rem;
        background-color: #e5e7eb;
        margin-right: 0.5rem;
        white-space: nowrap;
        border: 2px solid transparent; /* Initial transparent border */
        border-radius: 999px; /* Large value for rounded corners */
        background-image: linear-gradient(to right, #3498db, #2980b9); /* Blue gradient background */
        background-clip: padding-box; /* Clip background to padding box */
        color: white; /* Text color */
    }

    @media (min-width: 768px) {
        .category-container {
            justify-content: center;
            overflow-x: visible;
        }

        .category-button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem; /* Increase font size for desktop */
        }
    }
    @media (min-width: 400px) {
        .category-button {
            font-size: 0.875rem; /* Adjust font size for 400px screens */
        }
    }
</style>
