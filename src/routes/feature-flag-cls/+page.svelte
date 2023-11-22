<script lang="ts">
	import { postHog, featureFlags } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		postHog.getFeatureFlag('flagIsEnabled');
	});
</script>

<h1>Feature Flags - Cumulative Layout Shift Test</h1>
<p>This is to show no obvous page jump (CLS). See https://web.dev/articles/cls</p>
<div>
	{#if $featureFlags.flagIsEnabled}
		<div class="h-[50vh] w-full bg-blue-500">Flag is enabled</div>
	{/if}

	{#if !$featureFlags.flagIsEnabled}
		<div class="h-[50vh] w-full bg-orange-500">Flag is disabled</div>
	{/if}

	<div class="h-[50vh] w-full bg-green-500">Always present div</div>
</div>
