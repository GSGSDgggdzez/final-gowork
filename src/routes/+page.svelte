<script lang="ts">
	import { Splide, SplideTrack, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	import Hero1 from '$lib/assets/images/hero-1.png';
	import Hero2 from '$lib/assets/images/hero-2.jpg';
	import Hero3 from '$lib/assets/images/hero-3.png';
	import Hero4 from '$lib/assets/images/hero-4.png';

	import miniCarousel1 from '$lib/assets/images/mini-carousel-1.jpg';
	import miniCarousel2 from '$lib/assets/images/mini-carousel-2.jpg';

	import categoryImage1 from '$lib/assets/images/category-carousel-1.png';
	import categoryImage2 from '$lib/assets/images/category-carousel-2.png';
	import categoryImage3 from '$lib/assets/images/category-carousel-3.png';
	import categoryImage4 from '$lib/assets/images/category-carousel-4.png';

	import frameImage1 from '$lib/assets/images/frame-1.png';
	import frameImage2 from '$lib/assets/images/frame-2.png';

	import AppPhoneMockup from '$lib/assets/images/app-phone-mockup.png';
	import AppstoreLogo from '$lib/assets/images/appstore.png';
	import PlaystoreLogo from '$lib/assets/images/playstore.png';

	import ProfilesIcon from '$lib/assets/icons/profiles.svg';
	import MindIcon from '$lib/assets/icons/mind.svg';
	import PlatformIcon from '$lib/assets/icons/platform.svg';
	import SupportIcon from '$lib/assets/icons/support.svg';

	const categories = [
		{ title: 'Plumbing', image: categoryImage1, link: '/' },
		{ title: 'Gardening', image: categoryImage2, link: '/' },
		{ title: 'Cooking', image: categoryImage3, link: '/' },
		{ title: 'Pets', image: categoryImage4, link: '/' }
	];

	const processes = [
		{
			name: 'User Registration',
			summary:
				'Clients and service providers create accounts on the GoWork platform (mobile or web) by providing essential details—name, contact information, and role selection (client or provider).'
		},
		{
			name: 'Service Request',
			summary:
				'Clients submit service requests (e.g., plumbing, gardening, cooking) via a simple form detailing service type, description, location, and requirements.'
		},
		{
			name: 'Provider Proposals',
			summary:
				'Verified service providers receive instant notifications of new requests, review details, and submit proposals including pricing and availability.'
		},
		{
			name: 'Proposal Selection',
			summary:
				'Clients review multiple proposals, compare profiles, ratings, and prices, and select the most suitable provider. They can communicate directly through the platform for clarifications.'
		},
		{
			name: 'Job Execution & Payment',
			summary:
				'The provider completes the job as agreed. Payment is processed securely via integrated Stripe and mobile money systems.'
		},
		{
			name: 'Reviews & Ratings',
			summary:
				'Both clients and providers leave feedback to maintain transparency, quality, and trust.'
		}
	];

	const providerFeatures = [
		{ desc: 'Over 4,000 jobs every week for independent contractors and individuals' },
		{ desc: 'Set your own hours and decide how much you want to be paid.' },
		{ desc: 'Get paid within 48 hours for your services.' }
	];

	const serviceSteps = [
		{ id: 1, desc: 'Describe your need' },
		{ id: 2, desc: 'eceive offers quickly' },
		{ id: 3, desc: 'Pay & rate the service' }
	];

	const serviceFeatures = [
		{
			title: 'Verified & Qualified Profiles',
			desc: "Want to know who you're dealing with? So do we! That's why we verify the identity of our service providers.",
			icon: ProfilesIcon
		},

		{
			title: 'Freedom Of Mind',
			desc: "A guaranteed service is worth two! That's why they are all covered by personal injury & property.",
			icon: MindIcon
		},
		{
			title: 'Approved Platform',
			desc: 'Our platform is recognized by the Belgian government. All services are declared and paid online.',
			icon: PlatformIcon
		},
		{
			title: 'Support At Disposal',
			desc: 'We go beyond connecting you. Our team guides you from registration to service declaration.',
			icon: SupportIcon
		}
	];

	const popularSearches = [
		{ keyword: 'Carpenter Brussels', link: '/' },
		{ keyword: 'Handyman Brussels', link: '/' },
		{ keyword: 'Painter Liege', link: '/' },
		{ keyword: 'Plumber Namur', link: '/' },
		{ keyword: 'Message Cork', link: '/' },
		{ keyword: 'Moving to Brussels', link: '/' },
		{ keyword: 'Electrician Charleroi', link: '/' },
		{ keyword: 'Electrical Liege', link: '/' }
	];
</script>

<main class="container mx-auto mt-24 bg-white">
	<!-- Hero Section -->
	<section
		class="hero mt-34 flex w-full flex-col items-start justify-between gap-8 rounded-[20px] bg-[#EAF7EF] px-10 py-10 md:flex-row-reverse lg:items-center lg:gap-0"
	>
		<div class="grid grid-cols-3 grid-rows-2 gap-5">
			<img src={Hero1} class="col-span-2 h-[250px] w-full object-cover shadow-xl" alt="" />
			<img src={Hero2} class="col-span-1 h-[250px] w-full object-cover shadow-xl" alt="" />
			<img src={Hero3} class="col-span-1 h-[250px] w-full object-cover shadow-xl" alt="" />
			<img src={Hero4} class="col-span-2 h-[250px] w-full object-cover shadow-xl" alt="" />
		</div>
		<div>
			<h1
				class="md:leading-14 font-[Roboto] text-[42px] font-bold leading-10 text-[#333333] md:text-[52px]"
			>
				Neighbors with <span class="text-primary">Talent</span>,<br /> right next door!
			</h1>
			<p class="pt-5.5 pb-11 font-[Roboto] text-xl font-normal leading-8 text-[#666666]">
				Choose the best deal among 50,000 people and pros<br /> by requesting a service!
			</p>
			<a
				href="/"
				class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-medium tracking-wide"
				>Get a Service</a
			>
			<div class="flex flex-row gap-14 pt-11">
				<div class="flex flex-col">
					<span class="font-[Inter] text-lg font-extrabold text-black">50,000</span>
					<p class="font-[Inter] text-lg font-normal text-black">Clients</p>
				</div>
				<div class="flex flex-col">
					<span class="font-[Inter] text-lg font-extrabold text-black">15,000</span>
					<p class="font-[Inter] text-lg font-normal text-black">Reviews</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Categories With Carousel Section -->
	<section class="w-full bg-white px-10 py-20 sm:px-0">
		<Splide
			options={{
				rewind: true,
				autoplay: false,
				type: 'loop',
				pagination: false,
				perPage: 4,
				perMove: 1,
				breakpoints: {
					1280: {
						perPage: 4,
						perMove: 1
					},
					1024: {
						perPage: 3,
						perMove: 1
					},
					768: {
						perPage: 2,
						perMove: 1,
						gap: '24px'
					},
					640: {
						perPage: 1,
						perMove: 1
					}
				},
				speed: 1200,
				flickMaxPages: 1,
				arrows: true,
				gap: '36px'
			}}
			hasTrack={false}
		>
			<div class="flex w-full flex-col justify-between gap-5 pb-9 md:flex-row md:gap-0">
				<h3 class="font-[Roboto] text-3xl font-semibold text-black md:text-[44px]">
					What are you <span class="!text-primary">looking</span> for?
					<svg
						width="172"
						height="10"
						viewBox="0 0 172 10"
						fill="#2AAE5C"
						xmlns="http://www.w3.org/2000/svg"
						class="md:ml-62 ml-42 w-30 -mt-1 md:w-auto"
					>
						<path
							d="M170.134 6.62944C170.498 6.66194 170.832 6.83775 171.064 7.11991C171.296 7.40197 171.406 7.76727 171.371 8.13374C171.335 8.50021 171.156 8.83733 170.874 9.06923C170.592 9.30123 170.229 9.409 169.866 9.37056C167.058 9.07343 164.221 8.76061 161.372 8.44146C110.645 2.35913 59.0664 -2.30387 8.40001 6.44899C5.58345 6.92888 2.80367 7.44147 0 8C2.79433 7.39653 5.56607 6.83873 8.37579 6.31343C58.9029 -3.26775 110.831 0.57188 161.643 5.83904C164.493 6.11221 167.329 6.37882 170.134 6.62944Z"
							fill="#2AAE5C"
						/>
					</svg>
				</h3>
				<div class="splide__arrows flex flex-row items-center justify-between md:justify-end">
					<a
						href="/"
						class="btn btn-primary btn-md md:btn-lg px-7.5 mr-3.5 rounded-xl py-4 font-[Roboto] text-lg font-normal tracking-wide"
						>See All</a
					>
					<div class="relative flex flex-row items-center justify-center">
						<button
							class="btn btn-circle splide__arrow splide__arrow--prev hover:!bg-primary group/1 !relative !-bottom-5 !left-0 ml-2.5 !size-10 !bg-[#E6E6E6] !opacity-100"
							aria-label="control-left"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="!size-7 text-black group-hover/1:text-white"
							>
								<path
									d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
									fill="currentColor"
								/>
							</svg>
						</button>
						<button
							class="btn btn-circle splide__arrow splide__arrow--next hover:!bg-primary group/2 !relative !-bottom-5 !left-0 ml-2.5 !size-10 !bg-[#E6E6E6] !opacity-100"
							aria-label="control-right"
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								class="!size-7 text-black group-hover/2:text-white"
							>
								<path
									d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<SplideTrack>
				{#each categories as category}
					<SplideSlide>
						<div class="flex flex-col gap-5">
							<img
								src={category.image}
								alt=""
								class="h-[357px] w-full rounded-[20px] object-cover shadow-xl"
							/>
							<div
								class="absolute bottom-0 left-0 right-0 mx-3 mb-3 flex flex-row items-center justify-between rounded-xl bg-[#FFFFFFE5] px-5 py-3"
							>
								<h6 class="relative text-center font-[Roboto] text-[22px] font-medium text-black">
									{category.title}
								</h6>
								<a
									href={category.link}
									class="btn btn-circle hover:!bg-primary group/1 !size-11 !bg-[#BFE7CE]"
									aria-label="control-left"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										class="!size-8 -rotate-45 text-black group-hover/1:text-white"
									>
										<path
											d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
											fill="currentColor"
										/>
									</svg>
								</a>
							</div>
						</div>
					</SplideSlide>
				{/each}
			</SplideTrack>
		</Splide>
	</section>

	<!-- Request Service With Carousel Section -->
	<section
		class="mb-20 flex w-full flex-col-reverse items-start justify-between gap-8 rounded-[20px] bg-[#FEFAEE] px-10 py-14 lg:flex-row lg:items-center lg:gap-0"
	>
		<div>
			<h2 class="leading-12 font-[Roboto] text-4xl font-bold text-[#333333]">
				Upload your <span class="text-primary">first request.</span>
			</h2>
			<p class="py-4.5 font-[Roboto] text-xl font-normal leading-8 text-[#666666]">
				Over 50,000 private and professional service providers<br /> throughout Africa!
			</p>
			<ul class="flex flex-col gap-3 pb-11">
				{#each serviceSteps as feature}
					<li class="flex flex-row gap-3.5">
						<span
							class="bg-primary size-8 rounded-full p-0.5 text-center align-middle font-[Roboto] text-xl font-normal text-white"
							>{feature.id}</span
						><span class="py-1 align-middle font-[Roboto] text-base font-normal text-[#333333]"
							>{feature.desc}</span
						>
					</li>
				{/each}
			</ul>
			<a
				href="/"
				class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-normal tracking-wide"
				>Request a Service</a
			>
		</div>
		<div
			class="border-1 border-primary flex w-full flex-col gap-7 rounded-[20px] bg-white p-10 lg:w-[50%]"
		>
			<Splide
				options={{
					rewind: true,
					autoplay: false,
					type: 'loop',
					pagination: false,
					perPage: 2,
					perMove: 1,
					breakpoints: {
						1280: {
							perPage: 2,
							perMove: 1
						},
						1024: {
							perPage: 2,
							perMove: 1
						},
						767: {
							perPage: 1,
							perMove: 1
						}
					},
					speed: 1200,
					flickMaxPages: 1,
					arrows: true,
					gap: '24px'
				}}
				hasTrack={false}
			>
				<div class="flex flex-row justify-between pb-6">
					<h3 class="font-[Roboto] text-3xl font-bold text-black">Most Popular Requests</h3>
					<div class="splide__arrows right-0 flex flex-row">
						<button
							class="btn btn-circle splide__arrow splide__arrow--prev hover:!bg-primary group/1 !relative !left-0 -mb-4 ml-2.5 !size-10 !bg-[#E6E6E6] !opacity-100 md:!mb-0"
							aria-label="control-left"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="!size-7 text-black group-hover/1:text-white"
							>
								<path
									d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
									fill="currentColor"
								/>
							</svg>
						</button>
						<button
							class="btn btn-circle splide__arrow splide__arrow--next hover:!bg-primary group/2 !relative !left-0 ml-2.5 !size-10 !bg-[#E6E6E6] !opacity-100"
							aria-label="control-right"
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								class="!size-7 text-black group-hover/2:text-white"
							>
								<path
									d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
				</div>
				<SplideTrack>
					<SplideSlide>
						<div class="flex flex-col gap-5">
							<img src={miniCarousel1} alt="" class="w-full rounded-2xl object-cover shadow-xl" />
							<div class="flex flex-col items-center gap-2 px-1 text-center align-middle">
								<h5 class="text-center font-[Roboto] text-[22px] font-medium text-black">
									Small Job Work
								</h5>
								<p class="text-center font-[Roboto] text-lg font-normal text-[#666666]">
									Repair water leakage & Leaf collection
								</p>
								<span class="text-center font-[Roboto] text-[22px] font-medium text-black"
									>$ 50</span
								>
							</div>
						</div>
					</SplideSlide>
					<SplideSlide>
						<div class="flex flex-col gap-5">
							<img src={miniCarousel2} alt="" class="w-full rounded-2xl object-cover shadow-xl" />
							<div class="flex flex-col items-center gap-2 px-1 text-center align-middle">
								<h5 class="text-center font-[Roboto] text-xl font-medium text-black">
									Small Job Work
								</h5>
								<p class="text-center font-[Roboto] text-lg font-normal text-[#666666]">
									Repair water leakage & Leaf collection
								</p>
								<span class="text-center font-[Roboto] text-[22px] font-medium text-black"
									>$ 50</span
								>
							</div>
						</div>
					</SplideSlide>
				</SplideTrack>
			</Splide>
		</div>
	</section>

	<!-- Service Feature Section -->
	<section class="w-full bg-white">
		<div
			class="border-primary pt-14.5 flex w-full flex-row justify-between rounded-[20px] border-2 px-14 pb-16 lg:flex-row-reverse"
		>
			<div class="grid grid-cols-1 justify-between gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
				{#each serviceFeatures as feature}
					<div class="flex flex-col items-center gap-4">
						<span
							class="bg-primary flex size-[84px] items-center justify-center rounded-full md:size-[100px] lg:size-[124px]"
						>
							<img src={feature.icon} class="size-[42px] md:size-[64px] lg:size-[75px]" alt="" />
						</span>
						<h5 class="text-primary text-center font-[Roboto] text-xl font-medium">
							{feature.title}
						</h5>
						<p class="text-center font-[Roboto] text-lg font-normal text-[#666666]">
							{feature.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="-mt-6.5 container mx-auto flex w-full items-center justify-center">
			<a
				href="/"
				class="btn btn-primary btn-lg px-7.5 flex-none rounded-xl py-4 font-[Roboto] text-lg font-normal tracking-wide"
				>Request a Service</a
			>
		</div>
	</section>

	<!-- Service Provider Section -->
	<section
		class="my-20 mb-20 flex w-full flex-col-reverse items-center justify-between gap-9 lg:flex-row"
	>
		<div
			class="flex h-auto w-full flex-col justify-center gap-4 rounded-[20px] bg-[#EAF7EF] px-10 py-14 lg:h-[600px] lg:w-[50%]"
		>
			<h6 class="leading-12 font-[Roboto] text-3xl font-bold text-[#1A1A1A]">
				Use your skills to make money, whether you're a professional or an individual!
			</h6>
			<p class="font-[Roboto] text-xl font-normal text-[#666666]">Do like Alain and register:</p>
			<ul class="flex flex-col gap-3 pb-6">
				{#each providerFeatures as feature}
					<li class="flex flex-row gap-3.5">
						<span class="flex size-8 items-center rounded-full bg-[#6AC68D] p-1">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="text-primary size-6"
							>
								<path
									d="M5 12.5L9.667 17L19 8"
									stroke="white"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span>
						<span class="py-1 align-middle font-[Roboto] text-base font-normal text-[#333333]"
							>{feature.desc}</span
						>
					</li>
				{/each}
			</ul>
			<div>
				<a
					href="/"
					class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-normal tracking-wide"
					>Become a service provider</a
				>
			</div>
		</div>
		<div class="w-full lg:w-[50%]">
			<img src={frameImage1} class="h-auto w-full lg:h-[600px]" alt="" />
		</div>
	</section>

	<!-- How It Works Section -->
	<section
		class="pt-34 flex w-full flex-col items-center justify-between gap-14 rounded-[20px] bg-[#FEFAEE] px-10 pb-14 lg:flex-row"
	>
		<div class="w-full lg:w-[40%]">
			<img src={frameImage2} class="w-full" alt="" />
		</div>
		<div class="gap-4.5 flex w-full flex-col justify-center lg:w-[60%]">
			<h6 class="leading-12 font-[Roboto] text-3xl font-bold text-[#1A1A1A]">How It Works</h6>
			<div class="gap-4.5 flex flex-row">
				<div class="gap-23 flex flex-col">
					{#each Array.from({ length: 6 }) as _, i}
						<span class="z-20 mt-1.5 size-3.5 rounded-full bg-[#F4C952]"></span>
					{/each}
				</div>
				<hr class="border-1 absolute z-10 ml-[6.5px] mt-1.5 h-[574px] border-dashed border-black" />
				<div class="flex flex-col gap-7">
					{#each processes as process}
						<p class="font-[Roboto] text-lg font-light text-black">
							<span class="text-primary font-medium">{process.name}:</span><br />{process.summary}
						</p>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Testemonials Section -->
	<section
		class="relative mt-20 flex w-full flex-row items-center gap-0 rounded-none bg-[white] py-20 lg:overflow-hidden lg:rounded-[200px]"
	>
		<div
			class="z-10 ml-0 flex h-auto w-full flex-row items-center justify-center rounded-none bg-white lg:-ml-10 lg:h-[450px] lg:w-[500px] lg:justify-normal lg:rounded-l-[200px] lg:rounded-r-full lg:bg-[#FEFAEE]"
		>
			<div
				class="absolute h-auto w-[450px] rounded-none bg-white lg:h-[450px] lg:rounded-l-[200px] lg:rounded-r-full lg:bg-[#FCEFCB]"
			></div>
			<div class="z-100">
				<Splide
					options={{
						rewind: true,
						autoplay: true,
						type: 'loop',
						pagination: false,
						perPage: 1,
						perMove: 1,
						breakpoints: {
							1024: {
								width: '450px'
							}
						},
						speed: 1200,
						flickMaxPages: 1,
						arrows: true,
						gap: '30px',
						width: '28%'
					}}
					hasTrack={false}
				>
					<div
						class="flex flex-col-reverse justify-center gap-0 px-0 lg:flex-row lg:justify-between lg:gap-0 lg:pl-60 lg:pr-10"
					>
						<SplideTrack>
							<SplideSlide>
								<div
									class="flex w-[450px] flex-col flex-wrap gap-3 rounded-none bg-white p-10 shadow-[rgba(0,0,0,0.05)] lg:w-[600px] lg:rounded-xl"
								>
									<div class="flex flex-row gap-3.5">
										<div class="avatar">
											<div class="w-20 rounded-full">
												<img
													src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
													alt="Tailwind-CSS-Avatar-component"
												/>
											</div>
										</div>
										<div class="flex flex-col gap-1">
											<h6 class="font-[Roboto] text-2xl font-extrabold text-[#2AAE5C]">
												John Anderson
											</h6>
											<span class="font-[Roboto] text-base font-medium text-[#555555]">
												CEO at Innovate Solutions
											</span>
										</div>
									</div>
									<p class="font-[Roboto] text-lg font-normal leading-7 text-[#1E1E1E]">
										"Their attention to detail and creative design approach transformed our website
										into a visually stunning and highly functional platform. We’ve seen a 30%
										increase in traffic since the relaunch. I highly recommend them to anyone
										seeking professional web design services!"
									</p>
								</div>
							</SplideSlide>
							<SplideSlide>
								<div
									class="flex w-[450px] flex-col flex-wrap gap-3 rounded-none bg-white p-10 shadow-[rgba(0,0,0,0.05)] lg:w-[600px] lg:rounded-xl"
								>
									<div class="flex flex-row gap-3.5">
										<div class="avatar">
											<div class="w-20 rounded-full">
												<img
													src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
													alt="Tailwind-CSS-Avatar-component"
												/>
											</div>
										</div>
										<div class="flex flex-col gap-1">
											<h6 class="font-[Roboto] text-2xl font-extrabold text-[#2AAE5C]">
												John Anderson
											</h6>
											<span class="font-[Roboto] text-base font-medium text-[#555555]">
												CEO at Innovate Solutions
											</span>
										</div>
									</div>
									<p class="font-[Roboto] text-lg font-normal leading-7 text-[#1E1E1E]">
										"Their attention to detail and creative design approach transformed our website
										into a visually stunning and highly functional platform. We’ve seen a 30%
										increase in traffic since the relaunch. I highly recommend them to anyone
										seeking professional web design services!"
									</p>
								</div>
							</SplideSlide>
							<SplideSlide>
								<div
									class="flex w-[450px] flex-col flex-wrap gap-3 rounded-none bg-white p-10 shadow-[rgba(0,0,0,0.05)] lg:w-[600px] lg:rounded-xl"
								>
									<div class="flex flex-row gap-3.5">
										<div class="avatar">
											<div class="w-20 rounded-full">
												<img
													src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
													alt="Tailwind-CSS-Avatar-component"
												/>
											</div>
										</div>
										<div class="flex flex-col gap-1">
											<h6 class="font-[Roboto] text-2xl font-extrabold text-[#2AAE5C]">
												John Anderson
											</h6>
											<span class="font-[Roboto] text-base font-medium text-[#555555]">
												CEO at Innovate Solutions
											</span>
										</div>
									</div>
									<p class="font-[Roboto] text-lg font-normal leading-7 text-[#1E1E1E]">
										"Their attention to detail and creative design approach transformed our website
										into a visually stunning and highly functional platform. We’ve seen a 30%
										increase in traffic since the relaunch. I highly recommend them to anyone
										seeking professional web design services!"
									</p>
								</div>
							</SplideSlide>
						</SplideTrack>
						<div class="z-100 flex w-full flex-col justify-center gap-8 lg:justify-normal">
							<div class="flex flex-col gap-4">
								<span
									class="font-[Roboto] text-base font-medium uppercase leading-5 text-[rgba(42,174,92,1)]"
								>
									Testimonial
								</span>
								<h5
									class="leading-14 text-center font-[Roboto] text-[36px] font-bold text-[rgba(30,30,30,1)] lg:text-left"
								>
									Client's Success Stories
								</h5>
							</div>
							<div class="splide__arrows bottom-0 right-0 flex flex-row">
								<button
									class="btn btn-circle splide__arrow splide__arrow--prev !relative !left-0 -mb-4 ml-2.5 !size-10 !bg-[#E6E6E6] !opacity-100 hover:!bg-[#F4C952] md:!mb-0"
									aria-label="control-left"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										class="!size-7 text-black"
									>
										<path
											d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
											fill="currentColor"
										/>
									</svg>
								</button>
								<button
									class="btn btn-circle splide__arrow splide__arrow--next !relative !left-0 ml-2.5 !size-10 !bg-[#E6E6E6] !opacity-100 hover:!bg-[#F4C952]"
									aria-label="control-right"
								>
									<svg
										viewBox="0 0 24 24"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										class="!size-7 text-black"
									>
										<path
											d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.75 17L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19 12L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L19 12L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L13.75 7L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V12V11.25ZM13.75 17L14.2672 17.5431L19.5172 12.5431L19 12L18.4828 11.4569L13.2328 16.4569L13.75 17ZM19 12L19.5172 11.4569L14.2672 6.4569L13.75 7L13.2328 7.5431L18.4828 12.5431L19 12ZM19 12V11.25L5 11.25V12V12.75L19 12.75V12Z"
											fill="currentColor"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</Splide>
			</div>
		</div>
	</section>

	<!-- Mobile App Download Section -->
	<section
		class="pt-25.5 px-15 gap-18 container relative mx-auto mt-20 flex w-full flex-col justify-between rounded-[20px] bg-[#2AAE5C] lg:flex-row lg:gap-0"
	>
		<div class="flex flex-col justify-start gap-6">
			<h2 class="leading-12 text-left font-[Roboto] text-4xl font-bold text-white">
				Download our mobile app
			</h2>
			<div class="flex flex-col justify-center gap-4 sm:flex-row sm:justify-normal sm:gap-6">
				<a href="/"><img class="h-12.5" src={AppstoreLogo} alt="" /></a>
				<a href="/"><img class="h-12.5" src={PlaystoreLogo} alt="" /></a>
			</div>
		</div>

		<div
			class="relative bottom-0 flex h-[142px] w-full justify-center rounded-t-[200px] bg-[#F4C952] lg:h-[204px] lg:w-[702px]"
		>
			<img
				src={AppPhoneMockup}
				class="-mt-20 h-24 md:-mt-28 md:h-[248px] lg:-mt-36 lg:h-[348px]"
				alt="App Phone Mockup"
			/>
		</div>
	</section>

	<!-- Popular Search Section -->
	<section
		class="relative flex w-full flex-col items-center justify-between gap-10 bg-white px-10 py-20"
	>
		<h2 class="leading-12 text-center font-[Roboto] text-4xl font-bold text-[#333333]">
			Popular Search in <span class="text-primary">Africa</span>
		</h2>
		<div class="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
			{#each Array.from({ length: 4 }) as _, i}
				{#each popularSearches as search}
					<a
						href={search.link}
						class="link link-hover font-[Roboto] text-lg font-normal text-[#333333]"
						>{search.keyword}</a
					>
				{/each}
			{/each}
		</div>
	</section>
</main>
