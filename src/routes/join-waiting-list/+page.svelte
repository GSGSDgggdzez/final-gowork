<script lang="ts">
	import WaitCover from '$lib/assets/images/login-cover.png';

	import UserIcon from '$lib/assets/icons/user.svg';
	import EmailIcon from '$lib/assets/icons/email.svg';
	import PhoneIcon from '$lib/assets/icons/phone.svg';
	import AddressIcon from '$lib/assets/icons/address.svg';
	import ArrowDownIcon from '$lib/assets/icons/arrowdown.svg';
	import ArrowLeftIcon from '$lib/assets/icons/arrowleft.svg';

	import Input from '$lib/components/shared/Input.svelte';
	import Button from '$lib/components/shared/Button.svelte';
</script>

<main class="container mx-auto my-24 bg-white">
	<!-- Join Waiting List Section -->
	<section
		class="hero mt-34 rounded-4xl flex w-full flex-col-reverse items-start justify-between gap-8 bg-[#EAF7EF] p-10 sm:p-20 lg:flex-row-reverse lg:items-center lg:gap-0"
	>
		<img
			src={WaitCover}
			class="col-span-2 w-full object-cover px-10 sm:px-0 lg:w-[468px]"
			alt="wait-cover"
		/>
		<form class="flex w-full flex-col gap-6 lg:w-[40%]">
			<h2
				class="leading-12 text-center font-[Roboto] text-[28px] font-bold text-[#171128] sm:text-left sm:text-4xl"
			>
				Join Waiting List
			</h2>
			<div class="flex w-full flex-col gap-6 sm:flex-row">
				<Input name="firstname" placeholder="First Name" beforeIcon={UserIcon} className="gap-0" />
				<Input name="lastname" placeholder="Last Name" beforeIcon={UserIcon} className="gap-0" />
			</div>
			<Input
				name="email"
				type="email"
				placeholder="Email"
				beforeIcon={EmailIcon}
				className="gap-0.5"
			/>
			<Input
				name="phone"
				type="number"
				placeholder="Phone Number"
				beforeIcon={PhoneIcon}
				className="gap-0"
			/>
			<Input name="address" placeholder="Address" beforeIcon={AddressIcon} className="gap-0" />
			<Input
				name="services"
				placeholder="Which service you need"
				afterIcon={ArrowDownIcon}
				className="gap-0"
			/>
			<Button
				title="Join Waiting List"
				className="!btn-xl btn-primary !py-auto mt-3.5 w-full !rounded-[10px] text-xl font-bold tracking-wide lg:h-auto lg:py-4 xl:w-[75%] 2xl:w-[50%]"
				afterIcon={ArrowLeftIcon}
			/>
		</form>
	</section>
</main>
