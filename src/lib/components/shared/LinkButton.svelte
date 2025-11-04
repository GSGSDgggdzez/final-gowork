<script lang="ts">
	let { title, link, className = '', isOutline = false, isGhost = false } = $props();
</script>

<a href={link} class="btn btn-outline btn-primary btn-lg px-7.5 rounded-xl py-4 {className}"
	>{title}</a
>
