<template>
	<main id="app">
		<main-header></main-header>
	</main>
</template>

<style>
	#app {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}
</style>

<script>
	import MainHeader from './layouts/MainHeader.vue'

	export default {
	  components: {
	    MainHeader
	  }
	}
</script>
