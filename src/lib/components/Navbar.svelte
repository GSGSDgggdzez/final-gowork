<script>

</script>

<div class="navbar bg-gray-100 shadow-sm py-2 px-4 sticky top-0 z-50 flex items-center">
  <!-- Logo -->
  <div class="navbar-start flex items-center">
    <a href="/" class="btn-ghost text-xl flex items-center gap-2">
      <img src="./logo.svg" alt="GoWork logo" class="h-8"/>
    </a>
  </div>

  <!-- Nav Links -->
  <div class="navbar-end flex gap-3 flex-nowrap overflow-x-auto w-full justify-end">
    <a 
      href="/about"
      class="border-2 border-primary-green py-1 px-2 md:px-3 rounded-lg w-[90px] md:w-auto text-xs md:text-base font-semibold transition-colors duration-200 text-gray-700 hover:bg-green-300 hover:text-gray-800 whitespace-nowrap">
      Offer Service
    </a>

    <a 
      href="/waiting_list"
      class="border-2 border-primary-green py-1 px-2 md:px-3 rounded-lg w-[120px] md:w-auto text-xs md:text-base font-semibold transition-colors duration-200 text-gray-700 hover:bg-green-300 hover:text-gray-800 whitespace-nowrap">
      Request Service
    </a>
  </div>
</div>

<style>
  .navbar-end a {
    font-size: 0.9rem;
  }
  @media (max-width: 640px) {
    .navbar {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    .navbar-end a {
      font-size: 0.75rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      min-width: 80px;
    }
    .navbar-start img {
      height: 2rem;
      width: auto;
    }
  }
</style>
