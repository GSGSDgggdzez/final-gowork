<script lang="ts">
	import '$lib/styles/app.css';

	import favicon from '$lib/assets/favicon.svg';

	import { page } from '$app/state';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import LinkButton from '$lib/components/shared/LinkButton.svelte';

	let { children }: { children: any } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
	<title>GoWork</title>
</svelte:head>

<Header>
	{#snippet headerSnippet()}
		{#if page.url.pathname !== '/'}
			<LinkButton
				title="Request a Service"
				link="/sign-up/talent-seeker"
				className="btn-primary text-lg font-medium tracking-wide btn-lg!"
			/>

			{#if page.url.pathname !== '/login'}
				<LinkButton
					title="Login"
					link="/login"
					isOutline={true}
					className="text-lg btn-primary font-medium tracking-wide btn-lg!"
				/>
			{/if}
			{#if !page.url.pathname.startsWith('/sign-up')}
				<LinkButton
					title="Register"
					link="/sign-up"
					isOutline={true}
					className="text-lg btn-primary font-medium tracking-wide btn-lg!"
				/>
			{/if}
		{:else}
			{#if !page.url.pathname.startsWith('/sign-up')}
				<LinkButton
					title="Offer My Service"
					link="/sign-up/provider"
					isOutline={true}
					className="text-lg btn-primary font-medium tracking-wide btn-lg!"
				/>
			{/if}
			<LinkButton
				title="Request a Service"
				link="/sign-up/talent-seeker"
				className="text-lg btn-primary font-medium tracking-wide btn-lg!"
			/>
		{/if}
	{/snippet}
</Header>

{@render children?.()}

<Footer />
