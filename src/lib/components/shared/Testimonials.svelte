<script lang="ts">
	import { Splide, SplideTrack, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	import TestBg from '$lib/assets/images/bg-1.png';
</script>

<!-- Testemonials Section -->
<section
	class="relative flex w-full flex-row items-center gap-0 rounded-none bg-[white] py-20 lg:overflow-hidden lg:rounded-[64px]"
>
	<div
		class="z-10 ml-0 flex w-full flex-row items-center justify-center bg-white lg:justify-normal"
	>
		<div
			class="absolute hidden size-[482px] bg-cover bg-right lg:flex"
			style="background-image: url({TestBg});"
		></div>
		<div class="z-100 w-full">
			<Splide
				options={{
					rewind: true,
					autoplay: true,
					type: 'loop',
					pagination: false,
					perPage: 1,
					perMove: 1,
					speed: 1200,
					flickMaxPages: 1,
					arrows: true,
					gap: '30px',
					width: '100%'
				}}
				hasTrack={false}
			>
				<div
					class="flex w-full flex-col-reverse justify-center gap-0 px-0 lg:w-[95%] lg:flex-row lg:justify-between lg:gap-0 lg:pl-60 lg:pr-10"
				>
					<SplideTrack>
						<SplideSlide>
							<div
								class="flex w-full flex-col flex-wrap gap-3 rounded-none bg-white p-10 shadow-[rgba(0,0,0,0.05)] lg:w-[600px] lg:rounded-xl"
							>
								<div class="flex flex-row items-center justify-center gap-3.5 lg:justify-normal">
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
								<p
									class="text-center font-[Roboto] text-lg font-normal leading-7 text-[#1E1E1E] lg:text-left"
								>
									"Their attention to detail and creative design approach transformed our website
									into a visually stunning and highly functional platform. We’ve seen a 30% increase
									in traffic since the relaunch. I highly recommend them to anyone seeking
									professional web design services!"
								</p>
							</div>
						</SplideSlide>
					</SplideTrack>
					<div
						class="z-100 flex w-full flex-col justify-center gap-8 pl-0 lg:justify-normal lg:pl-10"
					>
						<div class="flex flex-col gap-4">
							<span
								class="text-center font-[Roboto] text-base font-medium uppercase leading-5 text-[rgba(42,174,92,1)] lg:text-left"
							>
								Testimonial
							</span>
							<h5
								class="leading-14 text-center font-[Roboto] text-[36px] font-bold text-[rgba(30,30,30,1)] lg:text-left"
							>
								Client's Success Stories
							</h5>
						</div>
						<div
							class="splide__arrows bottom-0 right-0 flex flex-row justify-center lg:justify-normal"
						>
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
