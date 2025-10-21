<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faUser, faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<!-- Navbar -->
<div class="navbar bg-base-100 shadow-sm py-2 px-4 sticky top-0 z-50 flex items-center">
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
		<h1 class="text-4xl font-bold text-gray-800 mb-3">Login</h1>
		<p class="text-sm text-gray-500">
			<a href="/" class="hover:text-green-600">Home</a> &gt;
			<a href="/sign_up" class="hover:text-green-600">Signup</a> &gt;
			<a href="/sign_up" class="text-green-600 font-medium">Find Help</a>
		</p>
	</div>

	<!-- Login Section -->
	<section class="bg-accent-green backdrop-blur-sm py-8 px-8 md:px-16 rounded-2xl shadow-sm">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Form Section -->
			<form class="bg-white rounded-2xl shadow p-8 md:p-10">
				<h2 class="font-extrabold text-3xl text-gray-800 mb-8">I'm looking for talent</h2>

                <!-- Name -->
				<div class="grid grid-cols-2 gap-4">

                    <!-- First Name -->
                    <div
                        class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
                    >
                        <span class="text-gray-400 mr-3">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="email"
                            placeholder="First Name"
                            class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
                        />
                    </div>

                    <!-- Last Name -->
                    <div
                        class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
                    >
                        <span class="text-gray-400 mr-3">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="email"
                            placeholder="Last Name"
                            class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
                        />
                    </div>
                </div>

				<!-- Email -->
				<div
					class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
				>
					<span class="text-gray-400 mr-3">
						<FontAwesomeIcon icon={faEnvelope} />
					</span>
					<input
						type="email"
						placeholder="Your Email"
						class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
					/>
				</div>

				<!-- Password -->
				<div
					class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
				>
					<span class="text-gray-400 mr-3">
						<FontAwesomeIcon icon={faLock} />
					</span>
					<input
						type="password"
						placeholder="Your Password"
						class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
					/>
				</div>

                <!-- Confirm Password -->
				<div
					class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
				>
					<span class="text-gray-400 mr-3">
						<FontAwesomeIcon icon={faLock} />
					</span>
					<input
						type="password"
						placeholder="Confirm Password"
						class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
					/>
				</div>

                <!-- Preferences -->
                <div class="flex flex-col space-y-2 my-2">
                    <div>
                        <input type="checkbox" name="pref" id="client_pref" class="rounded-sm">
                        <label for="client_pref" class="text-black text-sm">I am registering as a company<br> &nbsp;
                        Work with providers with a VAT number.</label>
                    </div>
                    <div>
                        <input type="checkbox" name="pref" id="notif_pref" class="rounded-sm">
                        <label for="notif_pref" class="text-black text-sm">I would like to receive information and promotions.</label>
                    </div>
                </div>

				<!-- Login Button -->
				<button
					type="submit"
					class="relative w-full bg-primary-green text-white font-medium py-3 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2"
				>
					Register
					<span class="absolute right-5">
						<FontAwesomeIcon icon={faArrowRight} />
					</span>
				</button>

				

				<!-- Signin Redirect -->
				<div class="flex justify-center gap-2 mt-8 text-sm">
					<p class="text-black">Have an account?</p>
					<a href="/login" class="text-primary-green font-semibold hover:underline">
						Login
					</a>
				</div>
			</form>

			<!-- Image Section -->
			<div class="flex justify-center">
				<img
					src="../image18.png"
					alt="workers"
					class="w-full max-w-md rounded-2xl object-cover"
				/>
			</div>
		</div>
	</section>
</div>

<Footer />

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
