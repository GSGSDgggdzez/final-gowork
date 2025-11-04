<script lang="ts">
	import goworkLogo from '$lib/assets/gowork-logo.png';

	let isMobileMenuOpen: boolean = $state(false);

	const handleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};
</script>

<header class="z-99 fixed left-0 right-0 top-0 bg-white">
	<div
		class="navbar border-b-1 shadow-[0px_3.2px_3.2px_0px_rgba(0,0,0,0.10) h-24 w-full justify-between border-[#EAEAEA] px-[25px]"
	>
		<div class="flex-auto">
			<a href="/"><img src={goworkLogo} class="h-8 sm:h-12" alt="" /></a>
		</div>
		<div class="flex-end hidden flex-row justify-between gap-2.5 md:flex">
			<a
				href="/"
				class="btn btn-primary btn-outline btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-medium tracking-wide"
				>Offer My Service</a
			>
			<a
				href="/"
				class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-medium tracking-wide"
				>Request a Service</a
			>
		</div>
		<div class="flex md:hidden">
			<button
				class="btn btn-lg btn-ghost rounded-xl px-2 py-2"
				onclick={handleMobileMenu}
				aria-label="humburger"
			>
				{#if isMobileMenuOpen === true}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						class="text-primary size-8"
					>
						<path
							d="M6.46967 16.4697C6.17678 16.7626 6.17678 17.2374 6.46967 17.5303C6.76256 17.8232 7.23744 17.8232 7.53033 17.5303L7 17L6.46967 16.4697ZM12.5303 12.5303C12.8232 12.2374 12.8232 11.7626 12.5303 11.4697C12.2374 11.1768 11.7626 11.1768 11.4697 11.4697L12 12L12.5303 12.5303ZM11.4697 11.4697C11.1768 11.7626 11.1768 12.2374 11.4697 12.5303C11.7626 12.8232 12.2374 12.8232 12.5303 12.5303L12 12L11.4697 11.4697ZM17.5303 7.53033C17.8232 7.23744 17.8232 6.76256 17.5303 6.46967C17.2374 6.17678 16.7626 6.17678 16.4697 6.46967L17 7L17.5303 7.53033ZM12.5303 11.4697C12.2374 11.1768 11.7626 11.1768 11.4697 11.4697C11.1768 11.7626 11.1768 12.2374 11.4697 12.5303L12 12L12.5303 11.4697ZM16.4697 17.5303C16.7626 17.8232 17.2374 17.8232 17.5303 17.5303C17.8232 17.2374 17.8232 16.7626 17.5303 16.4697L17 17L16.4697 17.5303ZM11.4697 12.5303C11.7626 12.8232 12.2374 12.8232 12.5303 12.5303C12.8232 12.2374 12.8232 11.7626 12.5303 11.4697L12 12L11.4697 12.5303ZM7.53033 6.46967C7.23744 6.17678 6.76256 6.17678 6.46967 6.46967C6.17678 6.76256 6.17678 7.23744 6.46967 7.53033L7 7L7.53033 6.46967ZM7 17L7.53033 17.5303L12.5303 12.5303L12 12L11.4697 11.4697L6.46967 16.4697L7 17ZM12 12L12.5303 12.5303L17.5303 7.53033L17 7L16.4697 6.46967L11.4697 11.4697L12 12ZM12 12L11.4697 12.5303L16.4697 17.5303L17 17L17.5303 16.4697L12.5303 11.4697L12 12ZM12 12L12.5303 11.4697L7.53033 6.46967L7 7L6.46967 7.53033L11.4697 12.5303L12 12Z"
							fill="currentColor"
						/>
					</svg>
				{:else}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						class="text-primary size-8 scale-x-[-1] transform"
					>
						<path
							d="M5 7.75C4.58579 7.75 4.25 8.08579 4.25 8.5C4.25 8.91421 4.58579 9.25 5 9.25V8.5V7.75ZM19 9.25C19.4142 9.25 19.75 8.91421 19.75 8.5C19.75 8.08579 19.4142 7.75 19 7.75V8.5V9.25ZM5 11.75C4.58579 11.75 4.25 12.0858 4.25 12.5C4.25 12.9142 4.58579 13.25 5 13.25V12.5V11.75ZM17 13.25C17.4142 13.25 17.75 12.9142 17.75 12.5C17.75 12.0858 17.4142 11.75 17 11.75V12.5V13.25ZM5 15.75C4.58579 15.75 4.25 16.0858 4.25 16.5C4.25 16.9142 4.58579 17.25 5 17.25V16.5V15.75ZM12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5C12.75 16.0858 12.4142 15.75 12 15.75V16.5V17.25ZM5 8.5V9.25H19V8.5V7.75H5V8.5ZM5 12.5V13.25H17V12.5V11.75H5V12.5ZM5 16.5V17.25H12V16.5V15.75H5V16.5Z"
							fill="currentColor"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
	{#if isMobileMenuOpen === true}
		<div class="top-24 m-8 flex flex-col justify-center gap-2.5">
			<a
				href="/"
				class="btn btn-primary btn-outline btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-medium tracking-wide"
				>Offer My Service</a
			>
			<a
				href="/"
				class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 font-[Roboto] text-lg font-medium tracking-wide"
				>Request a Service</a
			>
		</div>
	{/if}
</header>
