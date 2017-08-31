<template>
	<header class="main-header">
		<icon icon="information-outline"></icon>
	</header>
</template>

<style>
	@import "@css/variables";
	.main-header {
		display: flex;
		align-items: center;
		padding-left: 10%;
	  background-color: var(--header-color);
	  width: 90%;
	  height: 20vh;
	  font-family: var(--font);
	  font-size: 5rem;
		color: #fff;
	}
</style>

<script>
	import Icon from '../components/Icon.vue'

	export default {
	  components: {
	    Icon
	  }
	}
</script>
