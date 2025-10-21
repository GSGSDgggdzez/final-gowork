<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	// import { faDot } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="bg-white">
    <!-- Navbar -->
<div class="navbar bg-gray-100 shadow-sm py-2 px-4 sticky top-0 z-50 flex items-center">
  <!-- Logo -->
  <div class="navbar-start flex items-center">
    <a href="/" class="btn-ghost text-xl flex items-center gap-2">
      <img src="../logo.svg" alt="GoWork logo" class="h-8"/>
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
    <div class="max-w-7xl mx-auto px-6 md:px-12">
        <!-- Breadcrumb -->
        <div class="my-10">
            <h1 class="text-4xl font-bold text-gray-800 mb-3">Register</h1>
            <p class="text-sm text-gray-500">
                <a href="/" class="hover:text-green-600">Home</a> &gt;
                <a href="/sign_up" class="hover:text-green-600">Signup</a> &gt;
                <a href="/register_provider" class="text-green-600 font-medium">Offer My Services</a>
            </p>
        </div>
    </div>

    <!-- Main content sec -->
    <div class="mx-[18em] my-20">
        <h1 class="text-3xl font-bold text-black">What type of provider are you?</h1>
        <!-- grid sec -->
         <div class="grid grid-cols-2 gap-4">
             <div class="my-4 bg-gray-100 border border-gray-300 rounded-xl py-5 px-8 space-y-3">
                <h2 class="text-xl font-bold text-black">Particular</h2>
                <p class="text-md text-black">Employee, student, job seeker, pensioner.</p>
                <ul class="text-black space-y-4 mt-3 mx-5">
                    <li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Free Registration</li>
                    <li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Earn up to &euro;7,700 per year</li>
                    <li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Your jobs insure by AXA</li><li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Government-approved platform, we take care of all the paperwork for you</li><li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Advantageous tax rate at 10.7% (<a href="https://ringtwice.be/fr/economie-collaborative"> More info</a> )</li>
                </ul>
                <button class="rounded-md text-white bg-black py-2 px-3 my-5">Register Now</button>
             </div>

             <div class="my-4 bg-green-50 rounded-xl py-5 px-8 space-y-3">
                <h2 class="text-xl font-bold text-green-500">Proffessional</h2>
                <p class="text-md text-black">Any self-employed person wishing to work as part of their professional activity.</p>
                <ul class="text-black space-y-4 mt-3 mx-5">
                    <li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>No income limit</li>
                    <li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Access jobs reserved for PROs</li>
                    <li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Create quotes easily at will</li><li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Integrated biling system</li><li class="flex items-center gap-2 relative"><span class="bg-black text-xl text-white p-1 rounded-full absolute top-2 -left-3"></span>Tracking your customers' payments</li>
                </ul>
                <button class="rounded-md text-white bg-green-600 hover:bg-green-700 py-2 px-3 my-5">Register Now</button>
             </div>
         </div>
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