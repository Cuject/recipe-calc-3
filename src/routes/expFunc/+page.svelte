<script>
	import { onMount } from 'svelte';
	import WastedTime from '$lib/components/WastedTime.svelte';

	let wastedTimeComponent;
	
	let changeNumberInChild;
	
	onMount(function(){
		changeNumberInChild = function(){
			wastedTimeComponent.changeNumber(Math.floor(Math.random() * 100) + 1)
		}
	})

</script>

<WastedTime bind:this={wastedTimeComponent} />

<p>
	Click below
</p>

<button on:click|preventDefault={changeNumberInChild}>click me</button>