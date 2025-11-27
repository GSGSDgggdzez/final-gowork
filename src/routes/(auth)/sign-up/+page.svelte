<script lang="ts">
	import SignUpProviderCover from '$lib/assets/images/signup-cover-1.png';
	import SignUpTalentCover from '$lib/assets/images/signup-cover-2.png';

	import ArrowLeftIcon from '$lib/assets/icons/arrowleft.svg';

	import Button from '$lib/components/shared/Button.svelte';
	import LinkButton from '$lib/components/shared/LinkButton.svelte';
</script>

<main class="container mx-auto my-24 bg-white">
	<!-- Signup Section -->
	<section class="hero mt-42.5 flex w-full flex-col gap-36">
		<h2
			class="leading-12 text-center font-[Roboto] text-3xl font-bold text-[#333333] md:text-4xl lg:text-[42px]"
		>
			Join the <span class="text-primary"> GoWork</span> Community!
		</h2>
		<div class="grid w-full grid-cols-1 place-content-start gap-36 lg:grid-cols-2 lg:gap-0">
			<div
				class="rounded-4xl md:-mx-6.5 flex flex-col items-center justify-between gap-6 bg-[#EAF7EF] px-6 pb-12 md:items-start md:gap-9 md:pb-16 md:pl-24 md:pr-0"
			>
				<img
					src={SignUpProviderCover}
					class="-mt-26 w-full md:-ml-8 md:w-[75%]"
					alt="provider-banner"
				/>
				<div
					class="flex flex-col items-center justify-center gap-4 text-wrap p-0 md:items-start md:justify-normal md:pr-44"
				>
					<h6
						class="md:leading-12 text-primary text-center font-[Roboto] text-2xl font-bold md:text-left md:text-3xl"
					>
						I'm looking for a talent
					</h6>
					<p
						class="text-center font-[Roboto] text-xl font-normal text-[#171128] md:text-left md:text-2xl"
					>
						Give yourself access to a community of more than
						<span class="font-bold">50,000 active providers.</span>
					</p>
				</div>
				<LinkButton
					title="Find Help"
					link="/sign-up/talent-seeker"
					className="btn-lg! md:btn-xl! btn-primary! w-fit! px-10! md:px-20! py-auto! rounded-[10px]! text-lg md:text-xl font-bold tracking-wide lg:h-auto lg:py-4"
					afterIcon={ArrowLeftIcon}
				/>
			</div>
			<div
				class="rounded-4xl md:-mx-6.5 flex flex-col items-center justify-between gap-6 bg-[#FEFAEE] px-6 pb-12 md:items-start md:gap-9 md:pb-16 md:pl-24 md:pr-0"
			>
				<img
					src={SignUpTalentCover}
					class="-mt-26 w-full md:-ml-4 md:w-[75%]"
					alt="provider-banner"
				/>
				<div
					class="flex flex-col items-center justify-center gap-4 text-wrap p-0 md:items-start md:justify-normal md:pr-44"
				>
					<h6
						class="md:leading-12 text-center font-[Roboto] text-2xl font-bold text-black md:text-left md:text-3xl"
					>
						I share my talent
					</h6>
					<p
						class="text-center font-[Roboto] text-xl font-normal text-[#171128] md:text-left md:text-2xl"
					>
						Access over <span class="font-bold">15,000 service requests</span> per month for free.
					</p>
				</div>
				<LinkButton
					title="Offer My Services"
					link="/sign-up/provider"
					className="btn-lg! md:btn-xl! btn-secondary! w-fit! px-6! md:px-12! py-auto! rounded-[10px]! text-lg md:text-xl font-bold tracking-wide lg:h-auto lg:py-4"
					afterIcon={ArrowLeftIcon}
				/>
			</div>
		</div>
		<div class="-mt-[79px] flex flex-col items-center">
			<span class="font-[Roboto] text-xl font-normal leading-[150%] text-[#171128]"
				>Already Registerd
			</span>
			<a href="/login" class="text-primary font-[Roboto] text-xl font-bold leading-[150%]">Login</a>
		</div>
	</section>
</main>
