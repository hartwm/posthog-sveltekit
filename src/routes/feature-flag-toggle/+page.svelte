<script lang="ts">
	import { postHog, featureFlags } from '$lib/stores';
	import { onMount } from 'svelte';

	const toggle = () => {
		// sending posthog event based on click
		postHog.capture('click_button', {
			// toggling flag_enabled value
			$set: { flag_enabled: !$featureFlags.flagIsToggle }
		});

		// Using a timeout in this instance to allow time for the event to be sent, received and reprocess the flag
		setTimeout(() => {
			postHog.getFeatureFlag('flagIsToggle');
		}, 150);
	};

	onMount(() => {
		postHog.getFeatureFlag('flagIsToggle');
	});
</script>

<h1>Feature Flags Toggle</h1>
<p>This is meant to show features that are enabled based on user behavior, authentication, etc.</p>

<div>
	<h3>flagIsToggle: {$featureFlags.flagIsToggle}</h3>
	<button on:click={toggle} class="bg-blue-500 text-white p-2 px-4 rounded">Toggle</button>
</div>
