<script>
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />

<div class="max-w-5xl mx-auto px-6 md:px-12">
	<!-- Breadcrumb -->
	<div class="my-10">
		<h1 class="text-4xl font-bold text-gray-800 mb-3">Request a Service</h1>
		<p class="text-sm text-gray-500">
			<a href="/" class="hover:text-green-600">Home</a> &gt;
			<a href="/request_service" class="text-green-500 hover:text-green-600">Request a Service</a>
		</p>
	</div>

	<!-- Steps Section -->
	<div class="relative flex justify-between items-center max-w-3xl mx-auto mt-12">
		<!-- Line -->
		<div class="absolute top-5 left-30 w-128 border-t-3 border-dotted border-green-300 z-0"></div>

		<!-- Step 1 -->
		<div class="relative z-10 flex flex-col items-center text-center w-1/3">
			<div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-semibold">
				1
			</div>
			<span class="text-sm mt-3 text-green-600 font-medium">Select your category</span>
		</div>

		<!-- Step 2 -->
		<div class="relative z-10 flex flex-col items-center text-center w-1/3">
			<div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-500 font-semibold">
				2
			</div>
			<span class="text-sm mt-3 text-gray-600">Describe your need</span>
		</div>

		<!-- Step 3 -->
		<div class="relative z-10 flex flex-col items-center text-center w-1/3">
			<div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-500 font-semibold">
				3
			</div>
			<span class="text-sm mt-3 text-gray-600">Your application is online</span>
		</div>
	</div>

    <!-- Main content -->
     <div class="bg-accent-gold py-5 px-15 w-[65em] my-10 rounded-lg">
        <h2 class="text-2xl font-bold">Select your category</h2>
        <!-- grid sec -->
         <div class="grid grid-cols-3 gap-[16em] w-2xl px-5">
            {#each [
                {img: 'diy-svg.png', title: 'DIY', text: 'Small jobs, painting, electricity, plumbing, repairs, etc.'},
                {img: 'household-svg.png', title: 'Housekeeping', text: 'Cleaning, ironing, cooking, sewing'},
                {img: 'gardening-svg.png', title: 'Gardening', text: 'Mowing, hedge trimming, maintenance, gutter cleaning, etc.'},
                {img: 'animals-svg.png', title: 'Animals', text: 'Pet sitting, home visits, dog walking, grooming, etc.'},
                {img: 'lessons-svg.png', title: 'Courses & Assistance', text: 'Private lessons, language courses, writing and translation'},
                {img: 'transportation-svg.png', title: 'Transportation', text: 'Moving, bulky waste removal, delivery, etc.'},
                {img: 'computer-svg.png', title: 'Computer', text: 'Repair, troubleshooting, training, assistance,..'},
                {img: 'baby-sitter-svg.png', title: 'Babysitting', text: 'One-off care, recurring care,...'},
                {img: 'glass-svg.png', title: 'Events', text: 'Photographer, caterer, waiter, musician'},
                {img: 'hands-svg.png', title: 'Care & Well Being', text: 'Massage, hairdressing, senior assistance, etc'}
            ]as span}
            <div class="bg-white rounded-lg flex flex-row gap-2 py-5 px-3 w-[18em] items-center cursor-pointer">
                <div>
                    <img src={span.img} alt={span.title}>
                </div>
                <div>
                    <h2 class="text-lg text-green-500 font-bold">{span.title}</h2>
                    <p class="text-sm">{span.text}</p>
                </div>
            </div>
            {/each}
         </div>
     </div>
</div>

<Footer />
