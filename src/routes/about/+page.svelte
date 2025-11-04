<script lang="ts">
	import { Splide, SplideTrack, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	import AboutHero from '$lib/assets/images/about-cover.png';
	import WhyImage from '$lib/assets/images/why-gowork.png';
	import WhoImage from '$lib/assets/images/who-gowork.png';

	import CatImage1 from '$lib/assets/images/cat-image-1.jpg';
	import CatImage2 from '$lib/assets/images/cat-image-2.jpg';
	import CatImage3 from '$lib/assets/images/cat-image-3.jpg';
	import CatImage4 from '$lib/assets/images/cat-image-4.jpg';
	import CatImage5 from '$lib/assets/images/cat-image-5.jpg';
	import CatImage6 from '$lib/assets/images/cat-image-6.jpg';

	const categories = [
		{ title: 'Home Clean', figures: '35K', image: CatImage1 },
		{ title: 'Personal Care', figures: '658 Hrs', image: CatImage2 },
		{ title: 'Furniture Moved', figures: '45,000', image: CatImage3 },
		{ title: 'Pampered Animals', figures: '5,500', image: CatImage4 },
		{ title: 'Freshly Painted', figures: '3,500', image: CatImage5 },
		{ title: 'Plumbing Work', figures: '3,500 Hrs', image: CatImage6 }
	];
</script>

<main class="mt-24 w-full bg-white">
	<!-- About Hero Section -->
	<section
		class="hero bg-linear-to-r lg:px-45 flex h-[1000px] w-full flex-col items-start justify-center gap-8 from-white to-transparent bg-cover bg-center px-10 py-10 sm:h-[800px] sm:px-20 md:px-40"
		style="background-image: url({AboutHero});"
	>
		<div class="flex w-full flex-col gap-5 sm:w-[80%] md:w-[65%] lg:w-[50%]">
			<h1
				class="md:leading-14.5 font-[Roboto] text-4xl font-bold leading-9 text-[#333333] sm:text-[42px] sm:leading-10 md:text-[52px]"
			>
				A Community of More<br /> Than <span class="text-primary">500,000 Users</span>
			</h1>
			<div class="flex flex-1 flex-col flex-wrap">
				<span class="font-[Roboto] text-2xl font-extrabold leading-9 text-[#333333]"
					>What is GoWork?</span
				>
				<p class="text-wrap font-[Roboto] text-xl font-normal leading-8 text-[#666666]">
					At GoWork, our mission is to connect people who are looking for help with others who
					can—and most importantly, love to—help. We believe in wholeheartedly sharing talent. And
					if our community is any guide, neighborhoods are full of hidden talent! <br /><br />You'd
					be surprised how good your neighbor is at playing the piano, how much of an animal lover
					she is, or even how fluent in Japanese they are! Imagine how amazing it would be to learn
					a few words for your next trip to Japan, wouldn't it?
				</p>
			</div>
		</div>
	</section>

	<!-- Why and Who GoWork Section -->
	<section class="container mx-auto my-12 flex flex-col">
		<div
			class="rounded-t-4xl flex flex-col items-center gap-10 bg-[#EAF7EF] px-6 pb-5 pt-20 lg:flex-row lg:px-20"
		>
			<img src={WhyImage} class="w-full lg:w-[50%]" alt="why" />
			<div class="flex flex-col gap-3">
				<h3
					class="leading-12 font-[Roboto] text-4xl font-bold text-[#333333] sm:text-[42px] sm:leading-10 md:text-5xl"
				>
					Why <span class="text-primary">GoWork?</span>
				</h3>
				<p class="py-4.5 font-[Roboto] text-xl font-normal leading-8 text-black">
					GoWork is all about creating that little sign of trust between people—just like the
					feeling of familiarity when someone rings twice at your door. Amazing things happen when
					two people come together. Whether you’re looking for help or offering your talents,
					joining GoWork means becoming part of a community and experiencing incredible things.
				</p>
			</div>
		</div>
		<div
			class="rounded-4xl -mt-5 flex flex-col items-center gap-10 bg-[#FEFAEE] px-6 py-20 lg:flex-row-reverse lg:px-20"
		>
			<img src={WhoImage} class="rounded-4xl w-full lg:w-[50%]" alt="why" />
			<div class="flex flex-col gap-3">
				<h3
					class="leading-12 font-[Roboto] text-4xl font-bold text-[#333333] sm:text-[42px] sm:leading-10 md:text-5xl"
				>
					Who is <span class="text-primary">GoWork?</span>
				</h3>
				<p class="py-4.5 font-[Roboto] text-xl font-normal leading-8 text-black">
					Founded in 2013, GoWork (formerly ListMinut) is a 100% Belgian web startup operating
					nationwide. What started as a graduation project has grown into a platform where more than
					500,000 users have found help nearby, thanks to over 36,000 talented service providers.
					Today, the GoWork family (yes, we like to call ourselves a small family) is made up of 27
					motivated, enthusiastic, and ambitious people—and we're only growing!
				</p>
			</div>
		</div>
	</section>

	<!-- GoWork Work Categories Section -->
	<section class="flex w-full flex-col items-center justify-center gap-12 bg-white">
		<h3
			class="leading-12 text-center font-[Roboto] text-4xl font-bold text-[#333333] sm:text-[42px] sm:leading-10 md:text-5xl"
		>
			GoWork is also...
		</h3>
		<Splide
			options={{
				rewind: true,
				autoplay: true,
				type: 'loop',
				pagination: false,
				perPage: 6,
				perMove: 1,
				breakpoints: {
					1280: {
						perPage: 4
					},
					1024: {
						perPage: 3
					},
					768: {
						perPage: 2
					},
					640: {
						perPage: 1,
						gap: '0px'
					}
				},
				speed: 1200,
				flickMaxPages: 1,
				arrows: false,
				gap: '6px',
				width: '100%'
			}}
			hasTrack={false}
		>
			<SplideTrack>
				{#each categories as category}
					<SplideSlide>
						<div
							class="flex h-[582px] w-[302px] flex-col justify-end gap-10 overflow-hidden bg-cover bg-center object-center"
							style="background-image: url({category.image});"
						>
							<div
								class="p-10.5 bg-linear-to-b absolute flex w-[302px] flex-col gap-2 from-[#D9D9D900] to-[#000000]"
							>
								<h4 class="font-[Roboto] text-3xl font-bold text-white">{category.figures}</h4>
								<span class="font-[Roboto] text-2xl font-bold text-white">{category.title}</span>
							</div>
						</div>
					</SplideSlide>
				{/each}
			</SplideTrack>
		</Splide>
		<div class="flex flex-col gap-12 px-6">
			<p class="font-[Roboto] text-xl font-normal leading-8 text-black">
				Discover what GoWork can do for you and how it can make a difference in your everyday life.
			</p>
			<div class="flex flex-row justify-center">
				<a
					href="/"
					class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-medium tracking-wide"
					>Discover GoWork</a
				>
			</div>
		</div>
	</section>
</main>
