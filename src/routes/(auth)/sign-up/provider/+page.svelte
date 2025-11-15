<script lang="ts">
	import LinkButton from '$lib/components/shared/LinkButton.svelte';
	import PopularSearch from '$lib/components/shared/PopularSearch.svelte';
	import Testimonials from '$lib/components/shared/Testimonials.svelte';
	import MobileAppBanner from '$lib/components/shared/MobileAppBanner.svelte';
</script>

<main class="gap-22 container mx-auto flex w-full flex-col bg-white">
	<!-- Signup Section -->
	<section class="hero mt-42.5 gap-8.5 flex w-full flex-col">
		<h2
			class="leading-12 self-center font-[Roboto] text-3xl font-bold text-black sm:self-start md:text-4xl lg:text-[42px]"
		>
			What type of provider are you?
		</h2>
		<div class="grid w-full grid-cols-1 place-content-start gap-6 lg:grid-cols-2">
			<div
				class="flex flex-col items-center justify-between gap-8 rounded-3xl border border-[#DBDBDB] bg-[#F5F5F5] p-10 md:items-start"
			>
				<div
					class="flex flex-col items-center justify-center gap-4 text-wrap p-0 md:items-start md:justify-normal md:pr-44"
				>
					<h6
						class="md:leading-12 text-center font-[Roboto] text-2xl font-bold text-black md:text-left md:text-3xl"
					>
						Particular
					</h6>
					<p
						class="text-center font-[Roboto] text-xl font-normal text-[#171128] md:text-left md:text-[22px]"
					>
						Employee, student, job seeker, pensioner.
					</p>
					<ul
						class="leading-11 list-inside list-disc font-[Roboto] text-xl font-normal text-[#171128] md:text-[22px]"
					>
						<li>Free registration</li>
						<li>Earn up to €7,700 per year</li>
						<li>Your jobs insured by AXA</li>
						<li>Government-approved platform, we take care of all the paperwork for you</li>
						<li>
							Advantageous tax rate at 10.7% ( <a
								href="https://ringtwice.be/fr/economie-collaborative">More info</a
							> )
						</li>
					</ul>
				</div>
				<LinkButton
					title="Register Now"
					link="/sign-up/provider/particular"
					className="text-lg btn-neutral font-medium tracking-wide border-neutral border btn-lg!"
				/>
			</div>
			<div
				class="rounded-4xl flex flex-col items-center justify-between gap-6 bg-[#EAF7EF] p-10 md:items-start"
			>
				<div
					class="flex flex-col items-center justify-center gap-4 text-wrap p-0 md:items-start md:justify-normal md:pr-44"
				>
					<h6
						class="md:leading-12 text-primary text-center font-[Roboto] text-2xl font-bold md:text-left md:text-3xl"
					>
						Professional
					</h6>
					<p
						class="text-center font-[Roboto] text-xl font-normal text-[#171128] md:text-left md:text-[22px]"
					>
						Any self-employed person wishing to work as part of their professional activity.
					</p>
					<ul
						class="leading-11 list-inside list-disc font-[Roboto] text-xl font-normal text-[#171128] md:text-[22px]"
					>
						<li>No income limit</li>
						<li>Access jobs reserved for PROs</li>
						<li>Create quotes easily at will</li>
						<li>Integrated billing system</li>
						<li>Tracking your customers' payments</li>
						<li>A contact person for personalized follow-up</li>
					</ul>
				</div>
				<LinkButton
					title="Register Now"
					link="/sign-up/provider/professional"
					className="text-lg btn-primary font-medium tracking-wide btn-lg!"
				/>
			</div>
		</div>
	</section>

	<section class="flex w-full flex-row justify-around gap-2.5 rounded-3xl bg-[#FFEBFF] px-24 py-12">
		<div class="flex flex-col">
			<div class="font-[Roboto] text-4xl font-bold text-[#CB30E0]">500,000</div>
			<div class="font-[Roboto] text-4xl font-light text-black">satisfied customers</div>
		</div>

		<div class="flex flex-col">
			<div class="font-[Roboto] text-4xl font-bold text-[#CB30E0]">1 million</div>
			<div class="font-[Roboto] text-4xl font-light text-black">visits per month</div>
		</div>

		<div class="flex flex-col">
			<div class="font-[Roboto] text-4xl font-bold text-[#CB30E0]">20,000</div>
			<div class="font-[Roboto] text-4xl font-light text-black">jobs per month</div>
		</div>
	</section>

	<!-- Testemonials Section -->
	<Testimonials />

	<!-- Mobile App Download Section -->
	<MobileAppBanner />

	<!-- Popular Search Section -->
	<PopularSearch />
</main>
