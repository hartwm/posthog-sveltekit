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

<h1>Experient (A/B Test) Decided on +page.server.ts</h1>
<p>In this example we only get info from the server, no repaints.</p>
<svelte:component this={components[variant]} />
