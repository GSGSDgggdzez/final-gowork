<script lang="ts">
	/*
	interface PopularListItem {
		keyword: string;
		link: string;
	}

	let { popularList }: { popularList?: PopularListItem[] } = $props();

	if (!popularList) {
		popularList = [];
	}
    */

	const popularList = [
		{ keyword: 'Carpenter Brussels', link: '/' },
		{ keyword: 'Handyman Brussels', link: '/' },
		{ keyword: 'Painter Liege', link: '/' },
		{ keyword: 'Plumber Namur', link: '/' },
		{ keyword: 'Message Cork', link: '/' },
		{ keyword: 'Moving to Brussels', link: '/' },
		{ keyword: 'Electrician Charleroi', link: '/' },
		{ keyword: 'Electrical Liege', link: '/' }
	];
</script>

<!-- Popular Search Section -->
<section class="relative flex w-full flex-col items-center justify-between gap-10 bg-white px-10">
	<h2 class="leading-12 text-center font-[Roboto] text-4xl font-bold text-[#333333]">
		Popular Search in <span class="text-primary">Africa</span>
	</h2>
	<div class="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
		{#each Array.from({ length: 4 }) as _, i}
			{#each popularList as search}
				<a
					href={search.link}
					class="link link-hover font-[Roboto] text-lg font-normal text-[#333333]"
					>{search.keyword}</a
				>
			{/each}
		{/each}
	</div>
</section>
