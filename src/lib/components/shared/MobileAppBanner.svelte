<script lang="ts">
	import AppPhoneMockup from '$lib/assets/images/app-phone-mockup.png';
	import AppstoreLogo from '$lib/assets/images/appstore.png';
	import PlaystoreLogo from '$lib/assets/images/playstore.png';
</script>

<!-- Mobile App Download Section -->
<section
	class="pt-25.5 px-15 gap-18 container relative mx-auto flex w-full flex-col justify-between rounded-[20px] bg-[#2AAE5C] lg:flex-row lg:gap-0"
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
