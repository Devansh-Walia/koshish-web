<script>
  let count = 0;
  const increment = () => count += 1;
</script>

<div class="p-4 bg-blue-100 rounded-lg shadow-md max-w-sm mx-auto mt-10">
  <h2 class="text-xl font-bold text-blue-800 mb-4">Svelte + Tailwind</h2>
  <p class="text-gray-700 mb-4">Count is: <span class="font-mono font-bold">{count}</span></p>
  <button 
    on:click={increment}
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  >
    Increment
  </button>
</div>
