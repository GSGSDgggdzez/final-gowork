<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<Navbar />

<div class="max-w-7xl mx-auto px-6 md:px-12">
	<!-- Breadcrumb -->
	<Breadcrumb title="Forgot Password">
	  <a href="/" class="hover:text-green-600">Home</a>
	  <svg class="w-3 h-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
	    viewBox="0 0 24 24" stroke="currentColor">
	    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
	  </svg>
	  <a href="/forgot_password" class="hover:text-green-600">Verify Email</a>
	  <svg class="w-3 h-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
	    viewBox="0 0 24 24" stroke="currentColor">
	    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
	  </svg>
	  <a href="/login/set_pwd" class="text-green-600 font-medium" aria-current="page">
	    Create New Password
	  </a>
	</Breadcrumb>


	<!-- Login Section -->
	<section class="bg-accent-green backdrop-blur-sm py-8 px-8 md:px-16 rounded-2xl shadow-sm">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Form Section -->
			<form class="bg-white rounded-2xl shadow p-8 md:p-10">
				<h2 class="font-extrabold text-3xl text-gray-800 mb-8">Enter New Password</h2>

				<!-- New Password -->
				<div
					class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
				>
					<span class="text-gray-400 mr-3">
						<FontAwesomeIcon icon={faLock} />
					</span>
					<input
						type="password"
						placeholder="New Password"
						class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
					/>
				</div>

                <!-- Confirm New Password -->
				<div
					class="flex items-center border border-gray-200 bg-[#f9f9fb] py-1 px-4 rounded-lg mb-6 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition"
				>
					<span class="text-gray-400 mr-3">
						<FontAwesomeIcon icon={faLock} />
					</span>
					<input
						type="password"
						placeholder="Confirm New Password"
						class="flex-1 bg-transparent outline-none border-none text-sm focus:ring-0 focus:border-none"
					/>
				</div>


				<!-- Confirm Button -->
				<button
					type="submit"
					class="relative w-full bg-primary-green text-white font-medium py-3 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2"
				>
					Confirm Button
					<span class="absolute right-5">
						<FontAwesomeIcon icon={faArrowRight} />
					</span>
				</button>
			</form>

			<!-- Image Section -->
			<div class="flex justify-center items-center relative w-64 h-64 mx-auto">
				<!-- Decorative Circle -->
				<div class="absolute w-48 h-48 bg-primary-gold rounded-full top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 -z-10"></div>

				<!-- Main Image -->
				<img
					src="../image19.png"
					alt="workers"
					class="object-cover relative z-10 w-[15em] h-[15em]"
				/>
			</div>
		</div>
	</section>
</div>

<Footer />
