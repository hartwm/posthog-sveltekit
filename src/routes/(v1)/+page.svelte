<script lang="ts">
	import postHogStore from '$lib/stores/postHog';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	export let data;
	onMount(() => {
		const val = postHogStore.getFeatureFlag('flagIsEnabled');
		const vals = posthog.isFeatureEnabled('flagIsEnabled');
		console.log(val);
		console.log(vals);
	});
</script>

<h1>PostHog + Sveltekit</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
