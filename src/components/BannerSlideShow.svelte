<script lang="ts">
    import { onMount } from 'svelte';

    let currentIndex = 0;
    let interval: ReturnType<typeof setInterval>;
    const banners = [
        'https://i.ibb.co/YXWph3j/Christmas-Sales-Etsy-Big-Shop-Banner.jpg',
        'https://i.ibb.co/sVkNXGk/Clothing-Shop-Etsy-Big-Shop-Banner.jpg',
        'https://i.ibb.co/VJyMqG3/Banner-001.jpg'
    ];

    onMount(() => {
        startSlideshow();
    });

    const startSlideshow = () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % banners.length;
        }, 3000); // Change image every 3 seconds
    };

    const stopSlideshow = () => {
        clearInterval(interval);
    };

    const showPrevious = () => {
        currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % banners.length;
    };
</script>

<style>
    .slideshow-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        margin: auto;
        overflow: hidden;
    }

    .banner {
        width: 100%;
        display: none;
    }

    .banner.active {
        display: block;
    }

    .controls {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
    }

    .control-btn {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
    }
</style>

<div class="slideshow-container" on:mouseover={stopSlideshow} on:mouseleave={startSlideshow} >
    {#each banners as banner, index}
        <img src={banner} alt="Banner" class:active={index === currentIndex} class="banner">
    {/each}
    <div class="controls">
        <button class="control-btn" on:click={showPrevious}>&#10094;</button>
        <button class="control-btn" on:click={showNext}>&#10095;</button>
    </div>
</div>
