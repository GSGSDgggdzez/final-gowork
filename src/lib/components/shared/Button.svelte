<script lang="ts">
	let { title, className = '', isOutline = false, isGhost = false } = $props();
</script>

<button
	class="btn btn-primary btn-lg px-7.5 rounded-xl py-4 {className} {isOutline
		? 'btn-outline'
		: ''} {isGhost ? 'btn-ghost' : ''}">{title}</button
>
