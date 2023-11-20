<script lang="ts">
	import { postHog, featureFlags } from '$lib/stores';
	import { onMount } from 'svelte';
	import ComponentA from './ComponentA.svelte';
	import ComponentB from './ComponentB.svelte';
	onMount(() => {
		postHog.getFeatureFlag('experimentComponent');
	});
</script>

<h1>Experient (A/B Test)</h1>
<div>
	{#if $featureFlags.experimentComponent == 'test'}
		<ComponentB />
	{:else}
		<ComponentA />
	{/if}
</div>
