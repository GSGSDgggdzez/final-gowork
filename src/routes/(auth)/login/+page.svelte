<script lang="ts">
	import LoginCover from '$lib/assets/images/login-cover.png';

	import EmailIcon from '$lib/assets/icons/email.svg';
	import LockIcon from '$lib/assets/icons/lock.svg';

	import ArrowLeftIcon from '$lib/assets/icons/arrowleft.svg';

	import Input from '$lib/components/shared/Input.svelte';
	import Button from '$lib/components/shared/Button.svelte';
</script>

<main class="container mx-auto my-24 bg-white">
	<!-- Login Section -->
	<section
		class="hero mt-34 rounded-4xl flex w-full flex-col-reverse items-start justify-between gap-8 bg-[#EAF7EF] p-10 sm:p-20 lg:flex-row-reverse lg:items-center lg:gap-0"
	>
		<img
			src={LoginCover}
			class="col-span-2 w-full object-cover px-10 sm:px-0 lg:w-[468px]"
			alt="login-cover"
		/>
		<form class="flex w-full flex-col gap-6 lg:w-[40%]">
			<h2
				class="leading-12 text-center font-[Roboto] text-[28px] font-bold text-[#171128] sm:text-left sm:text-4xl"
			>
				Login
			</h2>
			<Input
				name="email"
				type="email"
				placeholder="Email"
				beforeIcon={EmailIcon}
				className="gap-0.5"
			/>
			<Input
				name="password"
				type="password"
				placeholder="Password"
				beforeIcon={LockIcon}
				className="gap-0"
			/>
			<Button
				title="Login"
				className="!btn-xl btn-primary !py-auto mt-3.5 !rounded-[10px] text-xl font-bold tracking-wide lg:h-auto lg:py-4"
				afterIcon={ArrowLeftIcon}
			/>
			<div class="gap-13.5 -mt-1.5 flex flex-col">
				<a
					href="/forgot-password"
					class="font-[Roboto] text-lg font-normal leading-[150%] text-[#3E3751]"
					>Forgot password?</a
				>
				<div class="flex flex-col items-center">
					<span class="font-[Roboto] text-lg font-normal leading-[120%] text-[#171128]"
						>Are you new here?</span
					>
					<a href="/sign-up" class="text-primary font-[Inter] text-lg font-bold leading-[150%]"
						>Join GoWork</a
					>
				</div>
			</div>
		</form>
	</section>
</main>
