<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { postHog, featureFlags } from '$lib/stores';
	export let data;

	let currentPath: string;
	featureFlags.set(data.featureFlags);
	postHog.init(data.posthogId, data.featureFlags);

	onMount(() => {
		if (browser) {
			const unsubscribePostHog = postHog.subscribe(({ initialized }) => {
				if (initialized) {
					// Subscribe to page store for SPA navigation
					const unsubscribePage = page.subscribe(($page) => {
						if (currentPath && currentPath !== $page.url.pathname) {
							// Function to run on page exit (SPA navigation)
							postHog.capture('$pageleave');
						}

						// Update the current path
						currentPath = $page.url.pathname;

						// Function to run on page load
						postHog.capture('$pageview');
					});

					// Handler for hard reloads or page exits
					const handleBeforeUnload = () => {
						postHog.capture('$pageleave');
					};
					window.addEventListener('beforeunload', handleBeforeUnload);

					return () => {
						// Cleanup
						unsubscribePage();
						window.removeEventListener('beforeunload', handleBeforeUnload);
					};
				}
			});

			return () => {
				// Unsubscribe from PostHog store when component is destroyed
				unsubscribePostHog();
			};
		}
	});
</script>

<div class="container mx-auto">
	<div class="prose max-w-none mx-auto my-8 grid grid-cols-[300px_1fr]">
		<div class="flex flex-col gap-6">
			<a href="/">Home</a>
			<a href="/feature-flag">Feature Flag</a>
			<a href="/feature-flag-toggle">Feature Flag Toggle</a>
			<a href="/feature-flag-cls">Content Layout Shift Test</a>
			<a href="/experiment">Experiment (A/B Test)</a>
			<a href="/experiment-server">Experiment Server (A/B Test)</a>
			<a href="/experiment-server-inherit">Experiment Server Inherit</a>
		</div>

		<div class="p-8 bg-white shadow rounded">
			<slot />
		</div>
	</div>
</div>
