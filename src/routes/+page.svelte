<script lang="ts">
	import { featureFlags as flagStore } from '$lib/stores.js';
	export let data;
	$: ({ featureFlags, ...identity } = data);
</script>

<svelte:head>
	<title>PostHog Analytics, Feature Flags, A/B Testing Examples for Sveltekit</title>
</svelte:head>

<h1>PostHog + Sveltekit</h1>
<h3>Cookie/User Identity</h3>
<pre>{JSON.stringify(identity, null, 2)}</pre>

<h3>Server Request to PostHog API /decide</h3>
<pre>{JSON.stringify(featureFlags, null, 2)}</pre>

<h3>Subscribed Feature Flag Store</h3>
<pre>{JSON.stringify($flagStore, null, 2)}</pre>
