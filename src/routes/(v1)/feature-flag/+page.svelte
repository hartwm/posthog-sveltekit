<script lang="ts">
	import { postHog, featureFlags } from '$lib/stores/postHogV3';
	import { onDestroy, onMount, tick } from 'svelte';

	let storeValue;
	const unsubscribe = featureFlags.subscribe((value) => {
		storeValue = value;
		console.log('Store updated:', value);
	});
	onDestroy(unsubscribe); // Don't forget to unsubscribe

	let flagIsEnabled = postHog.getFeatureFlag('flagIsEnabled');
	const toggle = () => {
		postHog.capture('click_button', {
			$set: { flag_enabled: !$featureFlags.flagIsToggle }
		});
		postHog.reloadFeatureFlags();
		postHog.getFeatureFlag('flagIsToggle');
		tick();
	};
	onMount(() => {
		// $postHog.featureFlags.flagIsEnabled = false;
		// setTimeout(() => {
		// }, 100);
	});
</script>

<h1>Feature Flags</h1>

<div class="prose mx-auto"><pre> {JSON.stringify($featureFlags, null, 2)}</pre></div>
<dl>
	<dt>flagIsEnabled: {flagIsEnabled}</dt>
	<dd>
		{#if flagIsEnabled}
			Show if true
		{/if}
	</dd>
</dl>
<!-- <dl>
	<dt>flagIsDisabled: {postHog.getFeatureFlag('flagIsDisabled')}</dt>
	<dd>
		{#if !$postHog.featureFlags.flagIsDisabled}
			Show if disabled (false/undefined)
		{/if}
	</dd>
</dl> -->
<dl>
	<dt>flagIsToggle: {$featureFlags.flagIsToggle}</dt>
	<dd>
		<button on:click={toggle} class="bg-blue-500 text-white p-2 px-4 rounded">Toggle</button><br />
		{$featureFlags.flagIsToggle ? 'Enabled' : 'Disabled'}
	</dd>
</dl>
