<script lang="ts">
	import { onMount } from 'svelte';
	import ComponentControl from './ComponentA.svelte';
	import ComponentVariant from './ComponentB.svelte';
	import { postHog } from '$lib/stores';
	const components = { control: ComponentControl, test: ComponentVariant };
	export let data;
	$: ({ variant } = data);
	onMount(() => {
		postHog.capture('$feature_flag_called', {
			$feature_flag_response: variant,
			$feature_flag: 'experimentServer'
		});
	});
</script>

<h1>Experient (A/B Test) Decided on Layout Server</h1>
<p>In this example we only get info from the server when the project loads. No retesting. This can be beneficial for potentially saving money on serverless functions in a large scale project and dependent upon the nature of the experiment. A straightforward A/B experiment this should work well.</p>
<svelte:component this={components[variant]} />
