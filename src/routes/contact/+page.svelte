<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faSearch } from "@fortawesome/free-solid-svg-icons";
</script>

<Navbar />

<div class="max-w-7xl mx-auto px-6 md:px-12">
	<!-- Breadcrumb -->
	<div class="my-10">
		<h1 class="text-4xl font-bold text-gray-800 mb-3">Contact</h1>
		<p class="text-sm text-gray-500">
			<a href="/" class="hover:text-green-600">Home</a> &gt;
			<a href="/contact" class="text-green-600 font-medium">Contact</a>
		</p>
	</div>

	<!-- Contact Section -->
	<section class="bg-accent-green/20 backdrop-blur-sm py-12 px-8 md:px-16 rounded-2xl shadow-sm">
		<div class="grid md:grid-cols-2 gap-10 items-center">
			<!-- Left -->
			<div>
				<h3 class="text-3xl font-extrabold text-gray-800 mb-6">How can we help you?</h3>

				<!-- Search box -->
				<div class="flex items-center bg-white rounded-full shadow-sm overflow-hidden border border-gray-100 mb-8 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition">
					<span class="px-4 text-gray-400">
						<FontAwesomeIcon icon={faSearch} />
					</span>
					<input
						type="text"
						class="flex-1 py-3 px-2 focus:ring-0 focus:border-none border-none  text-sm bg-transparent"
						placeholder="Search FAQs or topics..."
					/>
					<button class="bg-primary-green text-white px-6 py-2 font-medium rounded-full hover:bg-green-700 transition">
						Search
					</button>
				</div>

				<h3 class="text-2xl font-semibold text-gray-800 mb-4">Would you like to contact us?</h3>

				<!-- Contact grid -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{#each [
						{ img: 'phone-vector.png', title: 'Phone', text: '084 394 3590' },
						{ img: 'email-vector.png', title: 'Email', text: 'contact@gowork.com' },
						{ img: 'calender-vector.png', title: 'Working Days', text: 'All Days' },
						{ img: 'location-vector.png', title: 'Location', text: '1988 Bhoola Rd Oos-londen, Eastern Cape, South Africa' }
					] as item}
						<div class="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
							<img src={item.img} alt={item.title} class="w-10 h-10 object-contain" />
							<div>
								<h4 class="uppercase text-xs font-semibold text-primary-green mb-1">
									{item.title}
								</h4>
								<p class="text-sm text-gray-600 leading-snug">{item.text}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right -->
			<div class="flex justify-center">
				<img
					src="image15.png"
					alt="Contact illustration"
					class="w-full max-w-md rounded-2xl shadow-lg object-cover"
				/>
			</div>
		</div>
	</section>
</div>
