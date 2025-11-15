<script lang="ts">
	interface InputProps {
		beforeIcon?: string;
		afterIcon?: string;
		type?: string;
		className?: string;
		addIconClass?: string;
		name?: string;
		placeholder?: string;
		value?: string;
		onchange?: (event: Event) => void;
		oninput?: (event: Event) => void;
	}

	let {
		beforeIcon,
		afterIcon,
		type = 'text',
		className = '',
		addIconClass = '',
		name = '',
		placeholder = '',
		value = $bindable(''),
		onchange,
		oninput
	}: InputProps = $props();
</script>

<label
	class="input py-auto input-lg sm:input-xl w-full rounded-[10px] border-[1.3px] border-[#D3D1DB] bg-[#F9F9FB] text-[#A19CAF] focus:border-[#D3D1DB] focus:outline-[#D3D1DB] focus:ring-[#D3D1DB] lg:h-auto lg:py-3"
>
	{#if beforeIcon}
		<img src={beforeIcon} class="size-7.5 text-[#A19CAF] {addIconClass}" alt="before-icon" />
	{/if}
	<input
		class="input-xl pl-0 font-[Roboto] text-lg font-normal text-[#A19CAF] focus:ring-0 {className}"
		{type}
		{name}
		{placeholder}
		{onchange}
		{oninput}
	/>
	{#if afterIcon}
		<img src={afterIcon} class="size-7.5 text-[#A19CAF] {addIconClass}" alt="after-icon" />
	{/if}
</label>
