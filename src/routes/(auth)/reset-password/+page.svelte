<script lang="ts">
	import ForgotCover from '$lib/assets/images/forgot-cover.png';

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
			src={ForgotCover}
			class="col-span-2 w-full object-cover px-10 sm:px-0 lg:w-[468px]"
			alt="login-cover"
		/>
		<form class="flex w-full flex-col gap-6 lg:w-[40%]">
			<h2
				class="leading-12 text-center font-[Roboto] text-[28px] font-bold text-[#171128] sm:text-left sm:text-4xl"
			>
				Enter New Password
			</h2>
			<Input
				name="password"
				type="password"
				placeholder="Password"
				beforeIcon={LockIcon}
				className="gap-0"
			/>
			<Input
				name="confirm-password"
				type="password"
				placeholder="Confirm Password"
				beforeIcon={LockIcon}
				className="gap-0"
			/>
			<Button
				title="Reset Password"
				className="!btn-xl btn-primary !py-auto mt-3.5 !rounded-[10px] text-xl font-bold tracking-wide lg:h-auto lg:py-4"
				afterIcon={ArrowLeftIcon}
			/>
		</form>
	</section>
</main>
