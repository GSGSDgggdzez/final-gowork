<script lang="ts">
	import TalentSeeker from '$lib/assets/images/signup-talent-seeker.png';

	import UserIcon from '$lib/assets/icons/user.svg';
	import EmailIcon from '$lib/assets/icons/email.svg';
	import ArrowLeftIcon from '$lib/assets/icons/arrowleft.svg';
	import LockIcon from '$lib/assets/icons/lock.svg';
	import IdcardIcon from '$lib/assets/icons/idcard.svg';

	import Input from '$lib/components/shared/Input.svelte';
	import Button from '$lib/components/shared/Button.svelte';
</script>

<main class="container mx-auto my-24 bg-white">
	<!-- Join Waiting List Section -->
	<section
		class="hero mt-34 rounded-4xl flex w-full flex-col-reverse items-start justify-between gap-8 overflow-hidden bg-[#EAF7EF] p-10 sm:px-20 sm:py-14 lg:flex-row-reverse lg:items-center lg:gap-0"
	>
		<img
			src={TalentSeeker}
			class="col-span-2 -mb-64 w-full object-cover px-10 sm:px-0 lg:w-[480px]"
			alt="signup-seeker"
		/>
		<form class="flex w-full flex-col gap-6 lg:w-[40%]">
			<h2
				class="leading-12 text-center font-[Roboto] text-[28px] font-bold text-[#171128] sm:text-left sm:text-4xl"
			>
				I'm looking for talent
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
				name="password"
				type="password"
				placeholder="Password"
				beforeIcon={LockIcon}
				className="gap-0"
			/>
			<Input name="id" placeholder="Government ID" beforeIcon={IdcardIcon} className="gap-0" />
			<label
				class="label gap-5 text-wrap font-[Roboto] text-base font-normal leading-[120%] text-black"
			>
				<input
					type="checkbox"
					checked={false}
					class="checkbox checkbox-md checkbox-primary checked:border-primary rounded-md border-[#D2D2D2]"
				/>
				I am registering as a company, Work with providers with a VAT number.
			</label>
			<label
				class="label gap-5 text-wrap font-[Roboto] text-base font-normal leading-[120%] text-black"
			>
				<input
					type="checkbox"
					checked={false}
					class="checkbox checkbox-md checkbox-primary checked:border-primary rounded-md border-[#D2D2D2]"
				/>
				I would like to receive information and promotions.
			</label>
			<Button
				title="Register"
				className="!btn-xl btn-primary btn-block! !py-auto mt-3.5 w-full !rounded-[10px] text-xl font-bold tracking-wide lg:h-auto lg:py-4 xl:w-[75%] 2xl:w-[50%]"
				afterIcon={ArrowLeftIcon}
			/>
		</form>
	</section>
</main>
