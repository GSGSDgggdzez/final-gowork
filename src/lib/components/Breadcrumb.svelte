<script>
  export let title = '';
</script>

<div class="my-10">
  {#if title}
    <h1 class="text-4xl font-bold text-gray-800 mb-3">{title}</h1>
  {/if}

  <nav class="text-sm text-gray-500 flex items-center space-x-2" aria-label="Breadcrumb">
    <slot />
  </nav>
</div>
