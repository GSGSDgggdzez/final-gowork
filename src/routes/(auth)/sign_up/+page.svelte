<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />

<div class="max-w-7xl mx-auto px-6 md:px-12">
	<!-- Breadcrumb -->
	<div class="my-10">
		<h1 class="text-4xl font-bold text-gray-800 mb-3">Register</h1>
		<p class="text-sm text-gray-500">
			<a href="/" class="hover:text-green-600">Home</a> &gt;
			<a href="/sign_up" class="text-green-600 font-medium">Signup</a>
		</p>
	</div>

	<!-- Two-Card Section -->
	<section class="max-w-6xl mx-auto my-16 grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-sm">
		<!-- Left Card -->
		<div class="bg-accent-green flex flex-col items-center text-center md:text-left  md:items-center gap-8 p-8 md:p-10">
			<img
				src="./image16.png"
				alt="Looking for talent"
				class="w-64 h-64 md:w-48 md:h-48 object-cover rounded-xl"
			/>
			<div class="md:pl-4">
				<h3 class="text-2xl font-semibold text-green-700 mb-2">I'm looking for talent</h3>
				<p class="text-gray-700 mb-4">
					Give yourself access to a community of more than
					<span class="font-semibold">50,000 active providers</span>
				</p>
				<a href="/sign_up/register_client">
					<button
						class="bg-green-600 text-white font-medium px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition w-full md:w-auto"
					>
						Find help →
					</button>
				</a>
			</div>
		</div>

		<!-- Right Card -->
		<div class="bg-accent-gold flex flex-col items-center text-center md:text-left md:items-center gap-8 p-8 md:p-10">
			<img
				src="./image17.png"
				alt="Share my talent"
				class="w-100 h-100 md:w-48 md:h-48 object-cover rounded-xl"
			/>
			<div class="md:pl-4">
				<h3 class="text-2xl font-semibold text-gray-800 mb-2">I share my talent</h3>
				<p class="text-gray-700 mb-4">
					Access over
					<span class="font-semibold">15,000 service requests</span> per month for free.
				</p>
				<a href="/sign_up/register_provider">
					<button
						class="bg-primary-gold text-gray-800 font-medium px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition w-full md:w-auto"
					>
						Offer my services →
					</button>
				</a>
			</div>
		</div>
	</section>

	<!-- Already Registered -->
	<div class="mt-8 text-center">
		<h2 class="text-lg font-semibold">Already Registered?</h2>
		<a href="/login" class="text-lg text-green-500 font-medium hover:underline">Login</a>
	</div>
</div>

<Footer/>