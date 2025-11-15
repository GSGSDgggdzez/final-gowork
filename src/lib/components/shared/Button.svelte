<script lang="ts">
	interface InputProps {
		beforeIcon?: string;
		afterIcon?: string;
		className?: string;
		addIconClass?: string;
		isOutline?: boolean;
		isGhost?: boolean;
		title?: string;
		onclick?: (event: Event) => void;
	}

	let {
		beforeIcon,
		afterIcon,
		className = '',
		addIconClass = '',
		isOutline = false,
		isGhost = false,
		title = '',
		onclick
	}: InputProps = $props();
</script>

<button
	{onclick}
	class="btn btn-lg sm:btn-xl px-7.5 rounded-xl py-4 font-[Roboto] {isOutline &&
		'btn-outline'} {isGhost && 'btn-ghost'} {className}"
	>{#if beforeIcon}
		<img src={beforeIcon} class="size-7 {addIconClass}" alt="before-icon" />
	{/if}
	{title}
	{#if afterIcon}
		<img src={afterIcon} class="size-7 {addIconClass}" alt="after-icon" />
	{/if}
</button>
