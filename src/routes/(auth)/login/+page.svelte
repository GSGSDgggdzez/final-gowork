<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<Navbar />

<div class="max-w-7xl mx-auto px-6 md:px-12">
	<!-- Breadcrumb -->
	<div class="my-10">
		<h1 class="text-4xl font-bold text-gray-800 mb-3">Login</h1>
		<p class="text-sm text-gray-500">
			<a href="/" class="hover:text-green-600">Home</a> &gt;
			<a href="/login" class="text-green-600 font-medium">Login</a>
		</p>
	</div>

	<!-- Login Section -->
	<section class="bg-accent-green backdrop-blur-sm py-8 px-8 md:px-16 rounded-2xl shadow-sm">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Form Section -->
			<form class="bg-white rounded-2xl shadow p-8 md:p-10">
				<h2 class="font-extrabold text-3xl text-gray-800 mb-8">Welcome Back 👋</h2>

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

				<!-- Login Button -->
				<button
					type="submit"
					class="relative w-full bg-primary-green text-white font-medium py-3 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2"
				>
					Login
					<span class="absolute right-5">
						<FontAwesomeIcon icon={faArrowRight} />
					</span>
				</button>

				<!-- Forgot Password -->
				<a href="/forgot_password" class="block mt-4 text-sm text-gray-500 hover:text-primary-green text-right">
					Forgot Password?
				</a>

				<!-- Signup Redirect -->
				<div class="flex justify-center gap-2 mt-8 text-sm">
					<p>New here?</p>
					<a href="/sign_up" class="text-primary-green font-semibold hover:underline">
						Join GoWork
					</a>
				</div>
			</form>

			<!-- Image Section -->
			<div class="flex justify-center">
				<img
					src="./image14.png"
					alt="workers"
					class="w-full max-w-md rounded-2xl object-cover"
				/>
			</div>
		</div>
	</section>
</div>

<Footer />
