<template>
	<transition name="scale" mode="out-in" appear>
		<div
			v-show="alert.isVisible"
			@click="alert.isVisible = false"
			class="absolute left-0 right-3 top-[61%] z-50 mx-auto flex max-w-fit cursor-pointer items-center justify-between rounded bg-red-100 fill-red-600 px-3 py-2 font-medium text-red-600 shadow-2xl md:left-auto md:right-3 md:top-2 md:mx-auto">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-inherit" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
					clip-rule="evenodd" />
			</svg>

			<p class="mx-3 w-full text-center text-inherit">{{ alert.message }}</p>

			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-inherit" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd" />
			</svg>
		</div>
	</transition>
</template>

<script setup>
	import { useStore } from 'vuex';
	const alert = useStore().state.alert;
</script>

<style scoped>
	/* Pop-up notification transitions */
	.scale-enter {
		scale: 0;
		translate: 100%;
	}

	.scale-enter-active,
	.scale-leave-active {
		transition: all 0.2s linear;
	}

	.scale-leave-to {
		scale: 0;
		translate: 100%;
	}
</style>
