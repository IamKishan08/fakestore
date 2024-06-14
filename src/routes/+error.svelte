<script context="module" lang="ts">
    export function load({ error, status }: { error: Error, status: number }) {
        return {
            props: {
                error,
                status
            }
        };
    }
</script>

<script lang="ts">
    export let error: Error;
    export let status: number;
</script>

<main class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
    <div class="bg-white p-8 rounded shadow-md">
        <h1 class="text-4xl font-bold mb-4">Error {status}</h1>
        <p class="text-lg mb-4">{error.message}</p>
        <a href="/" class="text-blue-500 hover:underline">Go back to homepage</a>
    </div>
</main>

<style>
    main {
        background-color: #55585e;
    }
</style>
