<script lang="ts">
	import FacebookIcon from '$lib/assets/icons/facebook.svg';
	import InstagramIcon from '$lib/assets/icons/instagram.svg';
	import LinkedinIcon from '$lib/assets/icons/linkedin.svg';

	import AppstoreLogo from '$lib/assets/images/appstore.png';
	import PlaystoreLogo from '$lib/assets/images/playstore.png';

	const icons = [
		{ name: 'facebook', icon: FacebookIcon, link: '/' },
		{ name: 'linkedin', icon: LinkedinIcon, link: '/' },
		{ name: 'instagram', icon: InstagramIcon, link: '/' }
	];

	const navs = [
		{
			title: 'Upload your first request',
			links: [
				{ name: 'Blog', link: '/' },
				{ name: 'Best Providers', link: '/' },
				{ name: 'Invite your friends', link: '/' },
				{ name: 'City Card', link: '/' }
			]
		},
		{
			title: 'Need help?',
			links: [
				{ name: 'How does it works?', link: '/' },
				{ name: 'GoWork formulas', link: '/' },
				{ name: 'GoWork, is it legal?', link: '/' },
				{ name: 'Contact Us', link: '/' },
				{ name: 'Help/FAQ', link: '/' }
			]
		},
		{
			title: 'About',
			links: [
				{ name: 'GoWork', link: '/' },
				{ name: 'Our Team', link: '/' },
				{ name: 'Jobs/Internship', link: '/' },
				{ name: 'Press Area', link: '/' }
			]
		}
	];
</script>

<footer class="!text-base-content bg-[#F2F2F280] px-6 pb-10 pt-16 sm:px-28">
	<div class="footer grid grid-cols-1 justify-between lg:grid-cols-2 xl:grid-cols-4">
		{#each navs as nav}
			<nav class="gap-4">
				<h6 class="!text-[#000000]! font-[Roboto] text-xl font-medium capitalize">
					{nav.title}
				</h6>
				<div class="flex flex-col justify-center gap-3">
					{#each nav.links as link}
						<a
							href={link.link}
							class="link link-hover font-[Roboto] text-lg font-normal text-[#333333]"
							>{link.name}</a
						>
					{/each}
				</div>
			</nav>
		{/each}
		<div class="flex flex-col gap-8">
			<div class="flex-start flex flex-col gap-4">
				<h6 class="font-[Roboto] text-xl font-medium capitalize !text-[#000000]">Follow Us</h6>
				<div class="-ml-3 flex flex-row gap-6">
					{#each icons as icon}
						<a href={icon.link}><img src={icon.icon} class="size-8" alt="" /></a>
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<h6 class="font-[Roboto] text-xl font-medium capitalize !text-[#000000]">
					Discover our mobile application
				</h6>
				<div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
					<a href="/"><img class="h-12.5" src={AppstoreLogo} alt="" /></a>
					<a href="/"><img class="h-12.5" src={PlaystoreLogo} alt="" /></a>
				</div>
			</div>
		</div>
	</div>
	<div class="footer sm:footer-horizontal justify-center pt-10">
		<aside>
			<p class="font-[Roboto] text-base font-normal text-[#000000]">
				Copyright © {new Date().getFullYear()} | All right reserved by GoWork
			</p>
		</aside>
	</div>
</footer>
