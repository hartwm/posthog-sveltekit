<script lang="ts">
	import { postHog, featureFlags } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		postHog.getFeatureFlag('flagIsEnabled');
		postHog.getFeatureFlag('flagIsDisabled');
	});
</script>

<h1>Feature Flags</h1>
<p>
	This is meant to show basic flags. We simply use the getFeatureFlag for consistency and disabled
	values return false instead of undefined which is sufficent for general purposes. You could of
	course add <code>isFeatureEnabled()</code> to the store.
</p>
<div>
	<h3>flagIsEnabled: {$featureFlags.flagIsEnabled}</h3>
	<h3>flagIsDisabled: {$featureFlags.flagIsDisabled}</h3>
</div>
